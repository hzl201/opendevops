# 开发环境搭建

[[toc]]

::: tip
这部分主要是讲平台开发环境搭建的流程，涉及到的主要知识点是svn及vs2012的基本操作。
:::

## vs2012旗舰版安装激活教程
- 下载地址：https://www.nocang.com/visual-studio-ultimate-2012/
- 序列号：YKCW6-BPFPF-BT8C9-7DCTH-QXGWC

## svn插件安装
- svn插件下载地址 链接: https://pan.baidu.com/s/1F1IWlwVwpSaec0AXrmYrYg 提取码: rx52
- ![](/JneRvrSUYZNtgLG.jpg)

## 源码更新

**第一次获取源码**
- ![](/iyG8XrvEpNbq1zO.jpg)
- ![](/wbQxBgd9JqihKFz.jpg)
- 连接svn，输入https://XXXXX.XXXX/svn/xm18-001 ，其中XX项目SVN下载地址，输入用户名和密码下载源码，时间一般是2小时左右，很漫长。可以只下载需要的内容，如把地址换成'https://XXXXX.XXXX/svn/xm18-001/src'

**强制同步拉取最新源码到本地**
- 打开临矿集团(LRSMES1.4.8_Release) 无手机端.sln
- 点击最上面的解决方案临矿集团，右键，update
- ![](/BGEQ3eJcsxMaP7Z.jpg)

**修改源码**
- 修改LRSMES.webUI下的js文件，然后保存。
- ![](/1VSIrvQCLTBza47.jpg)

**提交源码**
- 右键LRSMES.webUI，点击Commit，输入备注，然后上传本地修改到服务器的源码库。
- ![](/Esg5TfqxhDuCMoe.jpg)
- ![](/Xv9paTLVznwbGJq.jpg)

## 编译
- 编译前先检查一下冲突，若发现有些文件是红色提示，则需要将冲突文件修改一下。
一般是web.config文件。
- ![](/R91SOPumHBDQrGi.jpg)
- 这是黄色提示，不用管。实在不行就把所有不一致的文件手动删除，再update一次。
- 然后点击最上面的解决方案临矿集团，右键，生成解决方案。
- ![](/CGX2RS7qEQb36Ho.jpg)


## 发布

**本地发布**
- 发布到本地目录下面，记得先清空目录再发布。选中webui，右键-发布。
- ![](/kUdNQEVOBiSTGDj.jpg)
- ![](/Ep2wldamsQJW6PX.jpg)
- ![](/mnL1tojER3vqcVr.jpg)


**服务器手动发布**
- 不需要全部覆盖，只需要把这三个文件夹压缩后拷贝到服务器上，覆盖web目录的对应文件。
- ![](/mnEN4Y3zcFveB8R.jpg)
- 然后打开IIS，右键某个煤矿，浏览物理路径如E:\Code\LKJT_guotun\src\LRSMES.WebUI，进行复制更新。
- ![](/EjQILDeKwR4ptyG.jpg)
- 最好回收一下应用程序池并重启web网站，找到对应的应用程序池并回收，最后重启网站。
- ![](/pHYjlhdAWTR5CwL.jpg)
- ![](/W79BIGYtQJZmljC.jpg)
- ![](/wEhqBWDZ9iKV7mT.jpg)
- 清空浏览器缓存，登录平台进行检查。









