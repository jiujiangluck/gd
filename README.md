# 功能

## 文件管理

批量下载

批量删除

上传

新建文件

编辑

## 预览和引用

提供多媒体文件预览，例如视频，音乐

可以对文件进行引用

## 设置访问密码

可以单独为每个文件夹设置访问权限，只需要在该文件夹内创建`.pwd`文件，其内容为设定的密钥


# 改进

1. 增加UI

    增加了多个基于`bootstrap`的`UI`

2. 简化代码

    去除一部分臃肿代码，加快访问速度

    通过对请求分析，将请求分为POST和GET，分别处理不同任务：

    `POST处理API请求：以JSON形式返回文件或者文件夹信息`

    `GET处理页面请求或者文件请求`

3. 添加上传、批量下载、新建文件等功能
