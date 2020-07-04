var authConfig = {
  "siteName": "Data Share", // 网站名称
  "root_pass": "jiujiangluck",  // 根目录密码，优先于.password
  "version" : "1.0.6", // 程序版本
  "theme" : "material", // material or classic 
  "client_id": "202264815644.apps.googleusercontent.com",
  "client_secret": "X4Z3ca8xfWDb1Voo-F9a7ZxJ",
  "refresh_token": "1//0fp2olSahUne3CgYIARAAGA8SNwF-L9Ir7xGVSrHKhzdUZu3VJX6LvpKZwm5Fr7YTeqOyfTlSeJrz_uzS5cpvC0CBzV2Cb36hgio", // 授权 token
  "root": "0ACFNe3pXRF9qUk9PVA" // 根目录ID
}

var gd

var html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no"/>
<title>${authConfig.siteName}</title>
<link rel="shortcut icon" href="//cdn.jsdelivr.net/gh/jiujiangluck/goindex/themes/logo.png" >
<script src="//cdn.jsdelivr.net/combine/gh/jquery/jquery@3.2/dist/jquery.min.js,gh/jiujiangluck/goindex/themes/${authConfig.theme}/app.js"></script>
</head>
<body>
</body>
</html>
`
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if(gd == undefined){
    gd = new googleDrive(authConfig);
  }

  if(request.method == 'POST'){
    return handlePostRequest(request);
  }
  else{
    return handleGetRequest(request);
  }
 
}




/*post处理api请求：以json形式返回文件或者文件夹信息*/
async function handlePostRequest(request){
let path = new URL(request.url).pathname
let header = {status:200,headers:{'Access-Control-Allow-Origin':'*'}}
if(path.substr(-1) == '/'){
  // check password
  let password = await gd.password(path);
  console.log("dir password", password);
  if(password != undefined && password != null && password != ""){
    try{
      var obj = await request.json();
    }catch(e){
      var obj = {};
    }
    console.log(password,obj);
    if(password.replace("\n", "") != obj.password){
      return new Response(`{"error": {"code": 401,"message": "password error."}}`,header);
    }
  }
  //返回文件夹信息
  let list = await gd.list(path);
  return new Response(JSON.stringify(list),header);
}else{
  //返回文件信息
  let file = await gd.file(path);
  return new Response(JSON.stringify(file),header);
}

}

/*get处理页面请求或者文件请求*/
async function handleGetRequest(request){
  let path = new URL(request.url).pathname;

  if(path.substr(-1) != '/'){ //处理文件
    if (path.split('/').pop().toLowerCase() == ".pwd") { //不允许查看
      return new Response("", { status: 404 });
    }
    try {
      let file = await gd.file(path);
      if (file == undefined){
        return new Response("", { status: 404 }); // if path: /exist/notexist
      }
      let range = request.headers.get('Range');
      return gd.down(file.id, range);
    } catch (e) {
      return new Response("", { status: 404 }); // if path: /notexist/notexist
    }
  }

  //处理页面
  return new Response(html, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}



class googleDrive {
  constructor(authConfig) {
      this.authConfig = authConfig;
      this.paths = [];
      this.files = [];
      this.passwords = [];
      this.paths["/"] = authConfig.root;
      if(authConfig.root_pass != ""){
        this.passwords["/"] = authConfig.root_pass;
      }
  }

  async down(id, range=''){
    let url = `https://www.googleapis.com/drive/v3/files/${id}?alt=media`;
    let requestOption = await this.requestOption();
    requestOption.headers['Range'] = range;
    return await fetch(url, requestOption);
  }

  async file(path){
    if(typeof this.files[path] == 'undefined'){
      this.files[path]  = await this._file(path);
    }
    return this.files[path] ;
  }

  async _file(path){
    let arr = path.split('/');
    let name = arr.pop();
    name = decodeURIComponent(name).replace(/\'/g, "\\'");
    let dir = arr.join('/')+'/';
    console.log(name, dir);
    let parent = await this.findPathId(dir);
    console.log(parent);
    let url = 'https://www.googleapis.com/drive/v3/files';
    let params = {'includeItemsFromAllDrives':true,'supportsAllDrives':true};
    params.q = `'${parent}' in parents and name = '${name}' andtrashed = false`;
    params.fields = "files(id, name, mimeType, size ,createdTime, modifiedTime, iconLink, thumbnailLink, shortcutDetails)";
    url += '?'+this.enQuery(params);
    let requestOption = await this.requestOption();
    let response = await fetch(url, requestOption);
    let obj = await response.json();
    if (obj.files && obj.files[0] && obj.files[0].mimeType == 'application/vnd.google-apps.shortcut'){
      obj.files[0].id = obj.files[0].shortcutDetails.targetId;
      obj.files[0].mimeType = obj.files[0].shortcutDetails.targetMimeType;
    }
    console.log(obj);
    return obj.files[0];
  }

  // 通过reqeust cache 来缓存
  async list(path){
    if (gd.cache == undefined) {
      gd.cache = {};
    }

    if (gd.cache[path]) {
      return gd.cache[path];
    }

    let id = await this.findPathId(path);
    var obj = await this._ls(id);
    if (obj.files && obj.files.length > 1000) {
          gd.cache[path] = obj;
    }

    return obj
  }

  async password(path){
    if(this.passwords[path] !== undefined){
      return this.passwords[path];
    }

    console.log("load",path,".password",this.passwords[path]);

    let file = await gd.file(path+'.password');
    if(file == undefined){
      this.passwords[path] = null;
    }else{
      let url = `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`;
      let requestOption = await this.requestOption();
      let response = await this.fetch200(url, requestOption);
      this.passwords[path] = await response.text();
    }

    return this.passwords[path];
  }

  async _ls(parent){
    console.log("_ls",parent);

    if(parent==undefined){
      return null;
    }
    const files = [];
    let pageToken;
    let obj;
    let params = {'includeItemsFromAllDrives':true,'supportsAllDrives':true};
    params.q = `'${parent}' in parents and trashed = false AND name !='.password'`;
    params.orderBy= 'folder,name,modifiedTime desc';
    params.fields = "nextPageToken, files(id, name, mimeType, size , modifiedTime, shortcutDetails)";
    params.pageSize = 1000;

    do {
      if (pageToken) {
          params.pageToken = pageToken;
      }
      let url = 'https://www.googleapis.com/drive/v3/files';
      url += '?'+this.enQuery(params);
      let requestOption = await this.requestOption();
      let response = await fetch(url, requestOption);
      obj = await response.json();
      obj.files.forEach(file => {
        if (file && file.mimeType == 'application/vnd.google-apps.shortcut') {
          file.id = file.shortcutDetails.targetId;
          file.mimeType = file.shortcutDetails.targetMimeType;
        }
      });
      files.push(...obj.files);
      pageToken = obj.nextPageToken;
    } while (pageToken);

    obj.files = files;
    console.log(obj)
    return obj;
  }

  async findPathId(path){
    let c_path = '/';
    let c_id = this.paths[c_path];

    let arr = path.trim('/').split('/');
    for(let name of arr){
      c_path += name+'/';

      if(typeof this.paths[c_path] == 'undefined'){
        let id = await this._findDirId(c_id, name);
        this.paths[c_path] = id;
      }

      c_id = this.paths[c_path];
      if(c_id == undefined || c_id == null){
        break;
      }
    }
    console.log(this.paths);
    return this.paths[path];
  }

  async _findDirId(parent, name){
    name = decodeURIComponent(name).replace(/\'/g, "\\'");
    
    console.log("_findDirId",parent,name);

    if(parent==undefined){
      return null;
    }

    let url = 'https://www.googleapis.com/drive/v3/files';
    let params = {'includeItemsFromAllDrives':true,'supportsAllDrives':true};
    params.q = `'${parent}' in parents and (mimeType = 'application/vnd.google-apps.folder' or mimeType = 'application/vnd.google-apps.shortcut') and name = '${name}'  and trashed = false`;
    params.fields = "nextPageToken, files(id, name, mimeType, shortcutDetails)";
    url += '?'+this.enQuery(params);
    let requestOption = await this.requestOption();
    let response = await fetch(url, requestOption);
    let obj = await response.json();
    if(obj.files[0] == undefined){
      return null;
    }
    if (obj.files[0].mimeType == 'application/vnd.google-apps.shortcut' && obj.files[0].shortcutDetails.targetMimeType == 'application/vnd.google-apps.folder') {
      obj.files[0].id = obj.files[0].shortcutDetails.targetId;
    } else if (obj.files[0].mimeType == 'application/vnd.google-apps.shortcut' && obj.files[0].shortcutDetails.targetMimeType != 'application/vnd.google-apps.folder'){
      return null;
    }
    return obj.files[0].id;
  }

  async accessToken(){
    console.log("accessToken");
    if(this.authConfig.expires == undefined  ||this.authConfig.expires< Date.now()){
      const obj = await this.fetchAccessToken();
      if(obj.access_token != undefined){
        this.authConfig.accessToken = obj.access_token;
        this.authConfig.expires = Date.now()+3500*1000;
      }
    }
    return this.authConfig.accessToken;
  }

  async fetchAccessToken() {
      console.log("fetchAccessToken");
      const url = "https://www.googleapis.com/oauth2/v4/token";
      const headers = {
          'Content-Type': 'application/x-www-form-urlencoded'
      };
      const post_data = {
          'client_id': this.authConfig.client_id,
          'client_secret': this.authConfig.client_secret,
          'refresh_token': this.authConfig.refresh_token,
          'grant_type': 'refresh_token'
      }

      let requestOption = {
          'method': 'POST',
          'headers': headers,
          'body': this.enQuery(post_data)
      };

      const response = await fetch(url, requestOption);
      return await response.json();
  }

  async fetch200(url, requestOption) {
      let response;
      for (let i = 0; i < 3; i++) {
          response = await fetch(url, requestOption);
          console.log(response.status);
          if (response.status != 403) {
              break;
          }
          await this.sleep(800 * (i + 1));
      }
      return response;
  }

  async requestOption(headers={},method='GET'){
    const accessToken = await this.accessToken();
    headers['authorization'] = 'Bearer '+ accessToken;
    return {'method': method, 'headers':headers};
  }

  enQuery(data) {
      const ret = [];
      for (let d in data) {
          ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
      }
      return ret.join('&');
  }

  sleep(ms) {
      return new Promise(function (resolve, reject) {
          let i = 0;
          setTimeout(function () {
              console.log('sleep' + ms);
              i++;
              if (i >= 2) reject(new Error('i>=2'));
              else resolve(i);
          }, ms);
      })
  }
}

String.prototype.trim = function (char) {
  if (char) {
      return this.replace(new RegExp('^\\'+char+'+|\\'+char+'+$', 'g'), '');
  }
  return this.replace(/^\s+|\s+$/g, '');
};
