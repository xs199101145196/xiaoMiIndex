# xiaoMiIndex

# 前言

小米官网首页项目是使用的api接口,从后台服务器请求数据,图片有一些是网络图片,用此来熟悉Ajax的熟练应用,具体的数据本库并未提供,api文档的话有提供,但是如果没有开启服务器是无法正常阅读



## git 配置：

1. git config --global user.name "ksm"

   > 配置用户名，上传本地 repository 到服务器上的时候，在 Github 上会显示这里配置的上传者信息

2. git config --global user.email "185........@163.com"

   > 配置邮箱

3. git config --list   

   > 查看配置列表


## 配置 sshkey ： 上传代码时使用这个 sshkey 来确认是否有上传权限

1. 创建本地 ssh ： ssh-keygen -t rsa -C "Github 的注册邮箱"

2. 在 Github 中添加这个 sshkey ：

   > 复制  C:\Documents and Settings\Administrator\.ssh\id_rsa.pub 文件中的内容；

   > 登录 Github --> Setting  --> SSH-KEY --> Add SSH-KEY --> 粘贴id_rsa.pub中的内容；

3. 验证： ssh -T git@github.com

   > 出现 Hi somebody! You've successfully authenticated, but GitHub does not provide shell access. 说明配置成功，可以连接上 Github


## 建立仓库 repository ：

1. git init here       -- 创建本地仓库

2. git remote add origin git@github.com:用户名/仓库名.git

   > 把本地仓库和远程仓库关联起来， 如果不执行这个命令的话，每次 push 的时候都需要指定远程服务器的地址


## 从远程仓库中下载新的改动：

1. git pull origin master


## 提交本地修改到远程仓库中：

1. git add -A | --all | . 
   > 将改动添加到本地仓库中

2. git rm xxx
   > 从本地仓库中删除指定文件

3. git rm -r xxx

   > 从本地仓库中删除指定文件夹

4. git commit -m "注释"

   > 把本机缓存中的内容提交到本机的 HEAD 里面

5. git push origin master

   > 把本地的 commit push 到远程仓库中


## 使用 .gitignore 文件忽略指定的内容：

1. 在本地仓库根目录创建 .gitignore 文件。

   > Win7 下不能直接创建，可以创建 ".gitignore." 文件，后面的标点自动被忽略；

2. 过滤文件和文件夹： [Tt]emp/ 过滤 Temp\temp 文件夹； *.suo 过滤 .suo 文件；

3. 不过滤文件和文件夹： !*.c