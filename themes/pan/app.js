// 在head 中 加载 必要静态
document.write('<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/mdui@0.4.3/dist/css/mdui.min.css">');
// markdown支持
document.write('<style>.mdui-appbar .mdui-toolbar{height:56px;font-size:1pc}.mdui-toolbar>*{padding:0 6px;margin:0 2px}.mdui-toolbar>i{opacity:.5}.mdui-toolbar>.mdui-typo-headline{padding:0 1pc 0 0}.mdui-toolbar>i{padding:0}.mdui-toolbar>a:hover,a.active,a.mdui-typo-headline{opacity:1}.mdui-container{max-width:980px}.mdui-list-item{transition:none}.mdui-list>.th{background-color:initial}.mdui-list-item>a{width:100%;line-height:3pc}.mdui-list-item{margin:2px 0;padding:0}.mdui-toolbar>a:last-child{opacity:1}@media screen and (max-width:980px){.mdui-list-item .mdui-text-right{display:none}.mdui-container{width:100%!important;margin:0}.mdui-toolbar>.mdui-typo-headline,.mdui-toolbar>a:last-child,.mdui-toolbar>i:first-child{display:block}}</style>');

// 初始化页面，并载入必要资源
function init(){
    document.siteName = $('title').html();
    $('body').addClass("mdui-drawer-body-left mdui-appbar-with-toolbar mdui-theme-primary-indigo mdui-theme-accent-pink mdui-loaded")
    $('body').html(bodyContent)
}

function render(path){
	if(path.indexOf("?") > 0){
		path = path.substr(0,path.indexOf("?"));
	}
    title(path);
    nav(path);
    if(path.substr(-1) == '/'){
    	list(path);
    }else{
	    file(path);
    }
}


// 渲染 title
function title(path){
    path = decodeURI(path);
    $('title').html(document.siteName+' - '+path);
}

// 渲染导航栏
function nav(path){
    var html = navContent.format(document.siteName)
    var arr = path.trim('/').split('/');
    var p = '/';
    if(arr.length > 0){
        for(i in arr){
            var n = arr[i];
            n = decodeURI(n);
            p += n+'/';
            if(n == ''){
                break;
            }
            html += navItem.format(p,n)
        }
    }
    $('#nav').html(html);
}

// 渲染文件列表
function list(path){
	var content = mainContent
	$('#content').html(content);
	$('#list').html(progress);
    $('#readme_md').hide().html('');
	$('#head_md').hide().html('');
    checkPermission(path, list_files)
}

function list_files(path,files){
    html = "";
    for(i in files){
        var item = files[i];
        var p = path+item.name+'/';
        if(item['size']==undefined){
            item['size'] = "";
        }

        item['modifiedTime'] = utc2beijing(item['modifiedTime']);
        item['size'] = formatFileSize(item['size']);
        if(item['mimeType'] == 'application/vnd.google-apps.folder'){
            html += floderItem.format(p,item.name,item['modifiedTime'],item['size'])
        }else{
            var p = path+item.name;
            var c = "file";
            if(item.name == "README.md"){
                 getFile(p, item, function(data){
                    markdown("#readme_md",data);
                });
            }
            if(item.name == "HEAD.md"){
	            getFile(p, item, function(data){
                    markdown("#head_md",data);
                });
            }
            var ext = p.split('.').pop();
            if("|html|php|css|go|java|js|json|txt|sh|md|mp4|webm|avi|bmp|jpg|jpeg|png|gif|m4a|mp3|wav|ogg|mpg|mpeg|mkv|rm|rmvb|mov|wmv|asf|ts|flv|".indexOf(`|${ext.toLowerCase()}|`) >= 0){
	            p += "?a=view";
	            c += " view";
            }
            html += fileItem.format(item.mimeType,p,c,item.name,item['modifiedTime'],item['size']);
        }
    }
    $('#list').html(html);
}


// 文件展示 ?a=view
function file(path){
	var url = window.location.origin + path;
	var name = path.split('/').pop();
	var ext = name.split('.').pop().toLowerCase().replace(`?a=view`,"");
	if("|html|php|css|go|java|js|json|txt|sh|md|".indexOf(`|${ext}|`) >= 0){
		file_code(path);
	}
	else if("|mp4|webm|avi|mpg|mpeg|mkv|rm|rmvb|mov|wmv|asf|ts|flv|".indexOf(`|${ext}|`) >= 0){
		var playBtn = `<a class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent" href="potplayer://${url}"><i class="mdui-icon material-icons">&#xe038;</i>在 potplayer 中播放</a>`;
		if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) { //移动端
			playBtn = `<a class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent" href="intent:${url}#Intent;package=com.mxtech.videoplayer.ad;S.title=${path};end"><i class="mdui-icon material-icons">&#xe039;</i>在mxplayer中播放</a>`;
		}
		$('#content').html(mediaContent.format({"mediaItem":mediaArr['video'],"url":url,"playBtn":playBtn,"display": "none"}))
	}

	else if("|mp3|wav|ogg|m4a|".indexOf(`|${ext}|`) >= 0){
		$('#content').html(mediaContent.format({"mediaItem":mediaArr['audio'],"url":url,"display":"none","playBtn":""}));
	}

	else if("|bmp|jpg|jpeg|png|gif|".indexOf(`|${ext}|`) >= 0){
		$('#content').html(mediaContent.format({"mediaItem":mediaArr['image'],"url":url,"display":"block","playBtn":""}));
	}
}

// 文本展示 |html|php|css|go|java|js|json|txt|sh|md|
function file_code(path){
	var type = {
		"html":"html",
		"php":"php",
		"css":"css",
		"go":"golang",
		"java":"java",
		"js":"javascript",
		"json":"json",
		"txt":"Text",
		"sh":"sh",
		"md":"Markdown",	
	};
	var name = path.split('/').pop();
	var ext = name.split('.').pop();
	var url = window.location.origin + path;
	var content = textContent.format({"url":url})
	$('#content').html(content);
	
	$.get(path, function(data){
		$('#editor').html($('<div/>').text(data).html());
		var code_type = "Text";
		if(type[ext] != undefined ){
			code_type = type[ext];
		}
		var editor = ace.edit("editor");
	    editor.setTheme("ace/theme/ambiance");
	    editor.setFontSize(18);
	    editor.session.setMode("ace/mode/"+code_type);
	    
	    //Autocompletion
	    editor.setOptions({
	        enableBasicAutocompletion: true,
	        enableSnippets: true,
	        enableLiveAutocompletion: true,
	        maxLines: Infinity
	    });
	});
}



//md 支持
function markdown(el, data){
    if(window.md == undefined){
        window.md = window.markdownit();
        markdown(el, data);
    }else{
        var html = md.render(data);
        $(el).show().html(html);
    }
}



// 监听回退事件
window.onpopstate = function(){
    var path = window.location.pathname;
    render(path);
}


$(function(){
    init();
    var path = window.location.pathname;
    $("body").on("click",'.folder',function(){
        var url = $(this).attr('href');
        history.pushState(null, null, url);
        render(url);
        return false;
    });

    $("body").on("click",'.view',function(){
        var url = $(this).attr('href');
        history.pushState(null, null, url);
        render(url);
        return false;
    });
    
    render(path);
});

