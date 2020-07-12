var bodyContent = `
<header class="mdui-appbar mdui-appbar-fixed"> 
    <div class="mdui-toolbar mdui-color-theme">
        <span class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white" mdui-drawer="{target: '#left-drawer',swipe:true}"><i class="mdui-icon material-icons">menu</i></span>
        <div id="nav" class="mdui-toolbar mdui-container">Title</div>
        <div class="mdui-toolbar-spacer"></div>
        <a href="javascript:;" class="mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">search</i></a>
        <a href="javascript:;" class="mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">refresh</i></a>
        <span class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white" mdui-dialog="{target: '#dialog-docs-theme'}"  mdui-tooltip="{content: '设置主题'}"><i class="mdui-icon material-icons">color_lens</i></span>
        <a href="https://github.com/jiujiangluck/gd" target="_blank" class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white" mdui-tooltip="{content: '查看 Github'}">
            <img class="mdui-icon" src="//cdn.jsdelivr.net/gh/jiujiangluck/gd/themes/logo-github.svg" alt="logo-github">    
        </a>
    </div>
</header>
  
<div class="mdui-drawer" id="left-drawer">
    ... left drawer content ...
    <button class="mdui-btn" mdui-drawer-close>close</button>
</div>


<div id="content" class="mdui-container doc-container"> 
</div>

<div class="mdui-dialog" id="dialog-docs-theme">
  <div class="mdui-dialog-title">设置文档主题</div>
  <div class="mdui-dialog-content">

    <p class="mdui-typo-title">主题色</p>
    <div class="mdui-row-xs-1 mdui-row-sm-2 mdui-row-md-3">
      <div class="mdui-col">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-layout" value="" checked="">
          <i class="mdui-radio-icon"></i>
          Light
        </label>
      </div>
      <div class="mdui-col">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-layout" value="dark">
          <i class="mdui-radio-icon"></i>
          Dark
        </label>
      </div>
    </div>

    <p class="mdui-typo-title mdui-text-color-theme">主色</p>
    <form class="mdui-row-xs-1 mdui-row-sm-2 mdui-row-md-3">
      <div class="mdui-col mdui-text-color-amber">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-primary" value="amber">
          <i class="mdui-radio-icon"></i>
          Amber
        </label>
      </div>
      <div class="mdui-col mdui-text-color-blue">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-primary" value="blue">
          <i class="mdui-radio-icon"></i>
          Blue
        </label>
      </div>
      <div class="mdui-col mdui-text-color-blue-grey">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-primary" value="blue-grey">
          <i class="mdui-radio-icon"></i>
          Blue Grey
        </label>
      </div>
      <div class="mdui-col mdui-text-color-brown">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-primary" value="brown">
          <i class="mdui-radio-icon"></i>
          Brown
        </label>
      </div>
      <div class="mdui-col mdui-text-color-cyan">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-primary" value="cyan">
          <i class="mdui-radio-icon"></i>
          Cyan
        </label>
      </div>
      <div class="mdui-col mdui-text-color-deep-orange">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-primary" value="deep-orange">
          <i class="mdui-radio-icon"></i>
          Deep Orange
        </label>
      </div>
      <div class="mdui-col mdui-text-color-deep-purple">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-primary" value="deep-purple">
          <i class="mdui-radio-icon"></i>
          Deep Purple
        </label>
      </div>
      <div class="mdui-col mdui-text-color-green">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-primary" value="green">
          <i class="mdui-radio-icon"></i>
          Green
        </label>
      </div>
      <div class="mdui-col mdui-text-color-grey">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-primary" value="grey">
          <i class="mdui-radio-icon"></i>
          Grey
        </label>
      </div>
      <div class="mdui-col mdui-text-color-indigo">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-primary" value="indigo" checked="">
          <i class="mdui-radio-icon"></i>
          Indigo
        </label>
      </div>
      <div class="mdui-col mdui-text-color-light-blue">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-primary" value="light-blue">
          <i class="mdui-radio-icon"></i>
          Light Blue
        </label>
      </div>
      <div class="mdui-col mdui-text-color-light-green">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-primary" value="light-green">
          <i class="mdui-radio-icon"></i>
          Light Green
        </label>
      </div>
      <div class="mdui-col mdui-text-color-lime">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-primary" value="lime">
          <i class="mdui-radio-icon"></i>
          Lime
        </label>
      </div>
      <div class="mdui-col mdui-text-color-orange">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-primary" value="orange">
          <i class="mdui-radio-icon"></i>
          Orange
        </label>
      </div>
      <div class="mdui-col mdui-text-color-pink">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-primary" value="pink">
          <i class="mdui-radio-icon"></i>
          Pink
        </label>
      </div>
      <div class="mdui-col mdui-text-color-purple">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-primary" value="purple">
          <i class="mdui-radio-icon"></i>
          Purple
        </label>
      </div>
      <div class="mdui-col mdui-text-color-red">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-primary" value="red">
          <i class="mdui-radio-icon"></i>
          Red
        </label>
      </div>
      <div class="mdui-col mdui-text-color-teal">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-primary" value="teal">
          <i class="mdui-radio-icon"></i>
          Teal
        </label>
      </div>
      <div class="mdui-col mdui-text-color-yellow">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-primary" value="yellow">
          <i class="mdui-radio-icon"></i>
          Yellow
        </label>
      </div>
    </form>
    <p class="mdui-typo-title mdui-text-color-theme-accent">强调色</p>
    <form class="mdui-row-xs-1 mdui-row-sm-2 mdui-row-md-3">
      <div class="mdui-col mdui-text-color-amber">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-accent" value="amber">
          <i class="mdui-radio-icon"></i>
          Amber
        </label>
      </div>
      <div class="mdui-col mdui-text-color-blue">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-accent" value="blue">
          <i class="mdui-radio-icon"></i>
          Blue
        </label>
      </div>
      <div class="mdui-col mdui-text-color-cyan">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-accent" value="cyan">
          <i class="mdui-radio-icon"></i>
          Cyan
        </label>
      </div>
      <div class="mdui-col mdui-text-color-deep-orange">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-accent" value="deep-orange">
          <i class="mdui-radio-icon"></i>
          Deep Orange
        </label>
      </div>
      <div class="mdui-col mdui-text-color-deep-purple">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-accent" value="deep-purple">
          <i class="mdui-radio-icon"></i>
          Deep Purple
        </label>
      </div>
      <div class="mdui-col mdui-text-color-green">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-accent" value="green">
          <i class="mdui-radio-icon"></i>
          Green
        </label>
      </div>
      <div class="mdui-col mdui-text-color-indigo">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-accent" value="indigo">
          <i class="mdui-radio-icon"></i>
          Indigo
        </label>
      </div>
      <div class="mdui-col mdui-text-color-light-blue">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-accent" value="light-blue">
          <i class="mdui-radio-icon"></i>
          Light Blue
        </label>
      </div>
      <div class="mdui-col mdui-text-color-light-green">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-accent" value="light-green">
          <i class="mdui-radio-icon"></i>
          Light Green
        </label>
      </div>
      <div class="mdui-col mdui-text-color-lime">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-accent" value="lime">
          <i class="mdui-radio-icon"></i>
          Lime
        </label>
      </div>
      <div class="mdui-col mdui-text-color-orange">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-accent" value="orange">
          <i class="mdui-radio-icon"></i>
          Orange
        </label>
      </div>
      <div class="mdui-col mdui-text-color-pink">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-accent" value="pink" checked="">
          <i class="mdui-radio-icon"></i>
          Pink
        </label>
      </div>
      <div class="mdui-col mdui-text-color-purple">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-accent" value="purple">
          <i class="mdui-radio-icon"></i>
          Purple
        </label>
      </div>
      <div class="mdui-col mdui-text-color-red">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-accent" value="red">
          <i class="mdui-radio-icon"></i>
          Red
        </label>
      </div>
      <div class="mdui-col mdui-text-color-teal">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-accent" value="teal">
          <i class="mdui-radio-icon"></i>
          Teal
        </label>
      </div>
      <div class="mdui-col mdui-text-color-yellow">
        <label class="mdui-radio mdui-m-b-1">
          <input type="radio" name="doc-theme-accent" value="yellow">
          <i class="mdui-radio-icon"></i>
          Yellow
        </label>
      </div>
    </form>
  </div>
  <div class="mdui-divider"></div>
  <div class="mdui-dialog-actions">
    <button class="mdui-btn mdui-ripple mdui-float-left" mdui-dialog-cancel="">恢复默认主题</button>
    <button class="mdui-btn mdui-ripple" mdui-dialog-confirm="">ok</button>
  </div>
</div>
<script src="//cdnjs.cloudflare.com/ajax/libs/mdui/0.4.3/js/mdui.min.js"></script>
<script>var $$ = mdui.JQ;</script>
<script src="https://www.iamac.xyz/swap/themes/material/docs.js"></script>
`

var navContent = `
<img src="//cdn.jsdelivr.net/gh/jiujiangluck/gd/themes/logo.png" alt="GoPan">
<a href="/" class="mdui-typo-headline folder">
	{0}
</a>
`

var navItem = `
<i class="mdui-icon material-icons mdui-icon-dark folder" style="margin:0;">chevron_right</i>
<a class="folder" href="{0}">{1}</a>`;


var mainContent = `
<div id="head_md" class="mdui-typo" style="display:none;padding: 20px 0;">
</div>
<div class="mdui-row"> 
    <ul class="mdui-list"> 
        <li class="mdui-list-item th"> 
            <div class="mdui-col-xs-12 mdui-col-sm-7">
                文件
                <i class="mdui-icon material-icons icon-sort" data-sort="name" data-order="more">expand_more</i>
            </div> 
            <div class="mdui-col-sm-3 mdui-text-right">
                修改时间
                <i class="mdui-icon material-icons icon-sort" data-sort="date" data-order="downward">expand_more</i>
            </div> 
            <div class="mdui-col-sm-2 mdui-text-right">
                大小
                <i class="mdui-icon material-icons icon-sort" data-sort="size" data-order="downward">expand_more</i>
            </div> 
        </li> 
    </ul> 
</div> 
<div class="mdui-row"> 
    <ul id="list" class="mdui-list"> 
    </ul> 
</div>
<div id="readme_md" class="mdui-typo" style="display:none; padding: 20px 0;">
</div>
`

var floderItem = `
<li class="mdui-list-item mdui-ripple">
    <a href="{0}" class="folder">
        <div class="mdui-col-xs-12 mdui-col-sm-7 mdui-text-truncate">
            <i class="mdui-icon material-icons">folder_open</i>
            {1}
        </div>
        <div class="mdui-col-sm-3 mdui-text-right">{2}
        </div>
        <div class="mdui-col-sm-2 mdui-text-right">{3}
        </div>
    </a>
</li>
`

var fileItem = `
<li class="mdui-list-item file mdui-ripple" target="_blank">
    <a gd-type="{0}" href="{1}" class="{2}">
        <div class="mdui-col-xs-12 mdui-col-sm-7 mdui-text-truncate">
            <i class="mdui-icon material-icons">insert_drive_file</i>
            {3}
        </div>
        <div class="mdui-col-sm-3 mdui-text-right">{4}
        </div>
        <div class="mdui-col-sm-2 mdui-text-right">{5}
        </div>
    </a>
</li>
`

var progress = `
<div class="mdui-progress"><div class="mdui-progress-indeterminate"></div></div>
`

var textContent = `
<script src="https://cdn.staticfile.org/ace/1.4.7/ace.js"></script>
<script src="https://cdn.staticfile.org/ace/1.4.7/ext-language_tools.js"></script>
<div class="mdui-container">
    <pre id="editor" >
    </pre>
</div>
<div class="mdui-textfield">
	<label class="mdui-textfield-label">下载地址</label>
	<input class="mdui-textfield-input" type="text" value="{url}"/>
</div>
<a href="{url}" class="mdui-fab mdui-fab-fixed mdui-ripple mdui-color-theme-accent">
    <i class="mdui-icon material-icons">file_download</i>
</a>
`

var mediaArr = {
    "audio":`<audio class="mdui-center" preload controls><source src="{url}"></audio>`,
    "video":`<video class="mdui-video-fluid mdui-center" preload controls><source src="{url}"></video>`,
    "image":`<img class="mdui-img-fluid mdui-center" src="{url}"/>`
}

var mediaContent = `
<div class="mdui-container-fluid">
    <br>
    {mediaItem}
    <br>{playBtn}
	<!-- fixed tag -->
	<div class="mdui-textfield">
	  <label class="mdui-textfield-label">下载地址</label>
	  <input class="mdui-textfield-input" type="text" value="{url}"/>
	</div>
	<div class="mdui-textfield">
	  <label class="mdui-textfield-label">HTML 引用地址</label>
	  <textarea class="mdui-textfield-input">{mediaItem}</textarea>
    </div>
    <div class="mdui-textfield" style="display:{display}">
	  <label class="mdui-textfield-label">Markdown 引用地址</label>
	  <textarea class="mdui-textfield-input">![]({url})</textarea>
	</div>
</div>
<a href="{url}" class="mdui-fab mdui-fab-fixed mdui-ripple mdui-color-theme-accent"><i class="mdui-icon material-icons">file_download</i></a>
`