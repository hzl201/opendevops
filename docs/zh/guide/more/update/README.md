# 如何更新

> 主要介绍下前后端都是如何进行版本更新的

- 代码自动部署计划
-  1.任务要求：
-  (1）每天夜里2点自动获取svn源码服务器的最新代码并编译、打包。
-  2.准备工作：
-  (1）准备所有待更新的服务器的ip地址和登录密码清单。
-  (2）部署jenkins的服务器要求能访问外网，并且其他web服务器能通过http下载此服务器的文件。
-  (3）svn源码库的地址和svn帐号(建议只分配只读权限）。
-  (4）下载jenkins部署时需要的安装包。
-  (5）开发人员正在使用的源码一套。
-  (6）做好web服务器的备份工作。
-  3.具体实施步骤：
-  (1）先测试网络。A服务器分发下载包，其他服务器使用脚本自动下载并解压缩。测试网络速度和稳定性。
-  (2）部署jenkins的服务器最好设置到集团，若集团服务器无法满足需求，只能部署到某一矿端服务器。若安装jenkins后无法自动编译，则需要安装vs2012开发环境。设置为每天2点0分0秒自动下载源码并编译打包。构建一次并推送(一定要保证第一次更新前矿端都已经手动更新到最新），若成功，则只会把刚提交的文件打包。然后把开机启动jenkins的命令设置一下。
-  4.测试：
-  (1）jenkins执行构建后是否能正确打包？构建需要5分钟，期间请勿进行任何操作。构建服务器需删除360安全卫士，否则无法执行bat命令。
-  (2）打包文件是否可以用解压缩软件正确解压？需安装7z压缩软件。
-  (3）打包文件是否能按日期正常筛选最新文件？(若不能，则执行构建时不要中途暂停，重新下载svn源码后，按日期搜索的命令会失效，导致打包文件体积暴增，需要等一个月，解决方法是把开发人员本地备份的源码替换上去）。
-  (4）矿井服务器是否能正常下载更新包？检查目录是否正确创建好，7z压缩软件和wget.exe下载程序是否已经安装。
-  (5）矿井服务器手动修改版本号后是否能自动重新下载更新包？
-  (6）更新后是否能正常显示出新功能？
-  5.回滚：
-  (1）回滚原理是通过手动输入svn版本来确定打包成哪个版本，再强制修改已经部署好的文件。一般情况下不要使用。

## 前端手动更新
> 由于前端是静态文件+配置文件+上传资料，更新起来需要单独更新某几个目录，在svn同步最新代码，然后编译后覆盖对应文件即可。

- 手动更新原理：[传送门](../../../Resources/tools/web平台代码更新/手动更新/代码手动更新方法.docx)

## 前端自动更新方案1.0
> 自动更新的实现方式是将手动操作全部用命令的方式自动执行，并可以在编译时检查代码语句错误，打包时集成js版本控制。
> 目前已实现自动编译并定时分发给测试服务器。

- 自动更新原理及步骤：[传送门](https://www.zybuluo.com/hzl201/note/1473689)
- 自动更新视频操作演示：[传送门](https://www.bilibili.com/video/av68629638)

## 前端自动更新方案2.0

### 改进

1. 构建后能立即推送到web服务器，而且是并发推送，互不影响。
2. 完善的反馈机制，推送更新后，会自动反馈更新结果，并发邮件进行提醒。
3. 实现一键回滚。
4. 增加参数化构建，使用规范的变量名称。

### 实施思路

> 先完成基本的功能需求

* 获取最新源码或获取指定版本（默认获取最新），指定版本则是进行回滚。**注意：目前需要开发人员提交代码到svn3分钟后才能获取到，无解。**
* 打包打成全量包和半增量包（半增量包改为2个月以内的文件）
* 构建、打包是一套，和部署进行分离。通过触发条件进行升级包的定向分发。
* 兼容1.0方案的矿端被动获取的脚本，增加部署成功率。
* 更新后反馈更新结果，并进行检查，若触发条件则发邮件进行提醒。

> 以单独打包的方式实现新功能，若新功能有问题，则能通过一键回滚进行恢复。

* 压缩图片文件（非常稳定，需先手动压缩一次全部推送，以后就只需要压缩修改过的文件即可）
* 对cshtml文件加js和css文件的版本号（有两种实现方式，手动的快速而且稳定，自动需要配很多参数，已解决了乱码问题，测试也稳定了，但cshtml文件有的保存时不是按utf-8 with bom编码进行存储的（是开发的问题，等开发统一保存文件的编码后才算真正解决），暂不推广）
* 压缩js文件（目前矿端正常，但集团有菜单打不开，不推广）
* 若发现自动更新有问题可以手动删除web目录下的revision.txt文件，再手动运行脚本D:\upload\自动更新矿端web代码\自动更新web代码.bat。这样会重新覆盖一次全量文件，算是做了一次全量更新。俗称万能的后悔药。

### 实施步骤

- 1.创建一个Jenkins工程作为编译打包用。
- 2.清理临时目录。
- 3.build并输出文件到临时文件夹。
可以执行参数化构建，在svnurl里加一个参数如：
![](/W6VPY9urajGlcKm.jpg)

```
https://xxxxxxxx/svn/xm18-007-01${SVN_VERSION_NO}
```

构建时默认为空，则会打包最新的svn版本，构建时输入@2333之类的版本号则会回滚到任意版本。**（高危操作，请谨慎执行）**
![](/hvg38xQ2bWARJqt.jpg)

- 4.生成全量包

- 5.生成半增量包（2个月内）

- 6.检查各矿是否需要更新代码
在Jenkins服务器上新建ftp目录websvn，矿端版本文件上传到oldsvn文件夹。

新建D:\upload\oldsvn.bat文件，内容如下

```
@echo off
set localPath=D:\ftp\websvn\oldsvn

echo 更新前先检查各矿web的svn信息
set /p var0=<%localPath%\jituan163_revision.txt
echo 临矿集团163当前的版本号是:%var0%

set /p var1=<%localPath%\jituan164_revision.txt
echo 临矿集团164当前的版本号是:%var1%

set /p var2=<%localPath%\jituan169_revision.txt
echo 临矿集团169当前的版本号是:%var2%

set /p var3=<%localPath%\wanglou_revision.txt
echo 王楼煤矿当前的版本号是:%var3%

set /p var4=<%localPath%\gucheng_revision.txt
echo 古城煤矿当前的版本号是:%var4%

set /p var5=<%localPath%\liyan_revision.txt
echo 里彦煤矿当前的版本号是:%var5%

set /p var6=<%localPath%\xinyi_revision.txt
echo 新驿煤矿当前的版本号是:%var6%

set /p var7=<%localPath%\guotun_revision.txt
echo 郭屯煤矿当前的版本号是:%var7%

set /p var8=<%localPath%\pengzhuang_revision.txt
echo 彭庄煤矿当前的版本号是:%var8%

set /p var10=<%localPath%\luxi_revision.txt
echo 鲁西煤矿当前的版本号是:%var10%

set /p var9=<%localPath%\svn_revision.txt
echo svn最新的版本号是:%var9%


echo 判断是否需要更新

if %var0% geq %var9%(
    echo pass
) else (
    echo 临矿集团163服务器未更新为最新版，更新web代码
	echo you_need_update_server
	curl http://172.22.101.11:8080/job/jituan163_webserver/build?token=fe20f2d33760fbeec0a362dbbf59cd18
)

if %var1% geq %var9%(
    echo pass
) else (
    echo 临矿集团164服务器未更新为最新版，更新web代码
	echo you_need_update_server
	curl http://172.22.101.11:8080/job/jituan164_webserver/build?token=fe20f2d33760fbeec0a362dbbf59cd18
)

if %var2% geq %var9%(
    echo pass
) else (
    echo 临矿集团169服务器未更新为最新版，更新web代码
	echo you_need_update_server
	curl http://172.22.101.11:8080/job/jituan169_webserver/build?token=fe20f2d33760fbeec0a362dbbf59cd18
	
)

if %var3% geq %var9%(
    echo pass
) else (
    echo 王楼煤矿服务器未更新为最新版，更新web代码
	echo you_need_update_server
	curl http://172.22.101.11:8080/job/wanglou_webserver/build?token=fe20f2d33760fbeec0a362dbbf59cd18
)

if %var4% geq %var9%(
    echo pass
) else (
    echo 古城煤矿服务器未更新为最新版，更新web代码
	echo you_need_update_server
	curl http://172.22.101.11:8080/job/gucheng_webserver/build?token=fe20f2d33760fbeec0a362dbbf59cd18
)

if %var5% geq %var9%(
    echo pass
) else (
    echo 里彦煤矿服务器未更新为最新版，更新web代码
	echo you_need_update_server
	curl http://172.22.101.11:8080/job/liyan_webserver/build?token=fe20f2d33760fbeec0a362dbbf59cd18
)

if %var6% geq %var9%(
    echo pass
) else (
    echo 新驿煤矿服务器未更新为最新版，更新web代码
	echo you_need_update_server
	curl http://172.22.101.11:8080/job/xinyi_webserver/build?token=fe20f2d33760fbeec0a362dbbf59cd18
)

if %var7% geq %var9%(
    echo pass
) else (
    echo 郭屯煤矿服务器未更新为最新版，更新web代码
	echo you_need_update_server
	curl http://172.22.101.11:8080/job/guotun_webserver/build?token=fe20f2d33760fbeec0a362dbbf59cd18
)

if %var8% geq %var9%(
    echo pass
) else (
    echo 彭庄煤矿服务器未更新为最新版，更新web代码
	echo you_need_update_server
	curl http://172.22.101.11:8080/job/pengzhuang_webserver/build?token=fe20f2d33760fbeec0a362dbbf59cd18
)

if %var10% geq %var9%(
    echo pass
) else (
    echo 鲁西煤矿服务器未更新为最新版，更新web代码
	echo you_need_update_server
	curl http://172.22.101.11:8080/job/luxi_webserver/build?token=fe20f2d33760fbeec0a362dbbf59cd18
)

ping 127.0.0.1 -n 3 >nul
```

- 7.执行包文件的分发（若ftp目录里判断出矿端的版本不需要更新，则不推送）

新建几个新工程，为每个矿新建一个ssh的远程，若执行了curl命令则会触发该工程，通过ssh执行矿端的更新脚本，更新完成后会上传矿端版本文件到ftp目录。因为是并发部署，各矿之间不会互相干扰，若出现网络问题，则不会更新成功，同时还有矿端设置的1.0用的更新脚本定期检查做备用。可以把Jenkins的并发执行工程数设置大一些，默认是2，同时只能执行2个工程。

矿端的2.0更新脚本内容是这样的

```
@Echo Off

set localPath=D:\lyWeb\revision.txt
set renname=liyan_revision.txt
set ftpip=172.22.101.11
set username=ftpuser
set password=LONGruan123
set ftpPath=.\websvn\oldsvn

wget.exe -O D:\upload\upload.zip http://172.22.101.11/Resources/upload-semi.zip 

del /f /s /q  D:\upload\temp\*.*
RD  /s /q  D:\upload\temp\
mkdir D:\upload\temp\

call C:\"Program Files"\7-Zip\7z.exe x D:\upload\upload.zip -oD:\upload\temp
echo d | xcopy D:\upload\temp\update\Areas D:\lyWeb\Areas /s /e /r /y
echo d | xcopy D:\upload\temp\update\bin D:\lyWeb\bin /s /e /r /y
echo d | xcopy D:\upload\temp\update\Content D:\lyWeb\Content /s /e /r /y
echo d | xcopy D:\upload\temp\update\fonts D:\lyWeb\fonts /s /e /r /y
echo d | xcopy D:\upload\temp\update\Scripts D:\lyWeb\Scripts /s /e /r /y
echo d | xcopy D:\upload\temp\update\Views D:\lyWeb\Views /s /e /r /y
echo f | xcopy D:\upload\temp\update\revision.txt D:\lyWeb\revision.txt /r /y

del /f /s /q  D:\upload\temp\*.*
RD  /s /q  D:\upload\temp\
mkdir D:\upload\temp\

Echo open %ftpip% >ftp.del
Echo %username%>>ftp.del
Echo %password%>>ftp.del
Echo Cd %ftpPath% >>ftp.del
Echo binary>>ftp.del
Echo delete %renname%>>ftp.del
Echo bye>>ftp.del
FTP -s:ftp.del
del ftp.del /q

Echo open %ftpip% >ftp.up
Echo %username%>>ftp.up
Echo %password%>>ftp.up
Echo Cd %ftpPath% >>ftp.up
Echo binary>>ftp.up
Echo put %localPath% %renname%>>ftp.up
Echo bye>>ftp.up
FTP -s:ftp.up
del ftp.up /q


echo lyweb-up执行完毕
```

1.0版矿端的定时检查脚本内容如下：

```
@echo off
echo update配置，用于设置本地更新路径，若需要更新多个web，请自行添加为webPath1、2，例如D:\lyWeb （注意最后不要加\）
set webPath=D:\lyWeb
set jenkinsip=10.155.128.234

echo ftp配置，用于上传更新后的版本信息
set localPath=D:\lyWeb\revision.txt
set renname=liyan_revision.txt
set ftpip=172.22.101.11
set username=ftpuser
set password=LONGruan123
set ftpPath=.\websvn\oldsvn

echo 下载最新的版本号
RD  /s /q  D:\upload\sync\
mkdir D:\upload\sync\
wget.exe -O D:\upload\sync\revision.txt http://%jenkinsip%/revision.txt
set /p var1=<D:\upload\sync\revision.txt
echo 最新的版本号是%var1%

echo 查看本地的版本号，先检查文件是否存在.
if exist %webPath%\revision.txt  (
    echo web目录下revision.txt文件已存在，可以进行进行版本号确认.
) else (
    echo web目录下无revision.txt，开始创建revision.txt文件并写入数值1.
    echo 1 > %webPath%\revision.txt
)
set /p var2=<%webPath%\revision.txt
echo 本地的版本号是%var2%

if %var2% geq %var1% (
    echo 本地的版本大于或等于svn版本，不需要更新。
) else (
    echo 执行更新，将下载最新的文件进行同步。
    del /f /q /s D:\upload\upload.zip
    RD  /s /q  D:\upload\temp\
    mkdir D:\upload\temp\
    if %var2% == 1 (
        echo 将进行全量更新，下载full更新包
        wget.exe -O D:\upload\upload.zip http://%jenkinsip%/Resources/upload-full.zip     
    ) else (
        echo 只进行半增量更新，下载半增量更新包
        wget.exe -O D:\upload\upload.zip http://%jenkinsip%/Resources/upload-semi.zip         
    )
    call C:\"Program Files"\7-Zip\7z.exe x D:\upload\upload.zip -oD:\upload\temp
    echo d | xcopy D:\upload\temp\update\Areas %webPath%\Areas /s /e /r /y
    echo d | xcopy D:\upload\temp\update\bin %webPath%\bin /s /e /r /y
    echo d | xcopy D:\upload\temp\update\Content %webPath%\Content /s /e /r /y
    echo d | xcopy D:\upload\temp\update\fonts %webPath%\fonts /s /e /r /y
    echo d | xcopy D:\upload\temp\update\Scripts %webPath%\Scripts /s /e /r /y
    echo d | xcopy D:\upload\temp\update\Views %webPath%\Views /s /e /r /y
    echo f | xcopy D:\upload\temp\update\revision.txt %webPath%\revision.txt /r /y
	
    Echo open %ftpip% >ftp.del
    Echo %username%>>ftp.del
    Echo %password%>>ftp.del
    Echo Cd %ftpPath% >>ftp.del
    Echo binary>>ftp.del
    Echo delete %renname%>>ftp.del
    Echo bye>>ftp.del
    FTP -s:ftp.del
    del ftp.del /q

    Echo open %ftpip% >ftp.up
    Echo %username%>>ftp.up
    Echo %password%>>ftp.up
    Echo Cd %ftpPath% >>ftp.up
    Echo binary>>ftp.up
    Echo put %localPath% %renname%>>ftp.up
    Echo bye>>ftp.up
    FTP -s:ftp.up
    del ftp.up /q
)

echo 执行完毕。此脚本将于60秒后自动关闭！
ping 127.0.0.1 -n 60 >nul
```

- 8.等一段时间后检查部署情况。等120秒进行检查新建D:\upload\newsvn.bat文件，内容如下:

```
@echo off
set hour1=%time:~0,2%

if %hour1% lss 4 (
    echo 当前小时小于4,等待时间长一些
	ping 127.0.0.1 -n 300 >nul
) else (
    echo 当前小时大于4,等待时间短一些
	ping 127.0.0.1 -n 120 >nul
)

set localPath=D:\ftp\websvn\oldsvn
set localPathtemp=D:\ftp\websvn\temp

del /f /q %localPathtemp%\all_svn.txt

echo 各矿web最新的版本信息如下
set /p var0=<%localPath%\jituan163_revision.txt
echo 临矿集团163当前的版本号是:%var0%
echo 临矿集团163当前的版本号是:%var0% > %localPathtemp%\jituan163_revision.txt
set /p var1=<%localPath%\jituan164_revision.txt
echo 临矿集团164当前的版本号是:%var1%
echo 临矿集团164当前的版本号是:%var1% > %localPathtemp%\jituan164_revision.txt
set /p var2=<%localPath%\jituan169_revision.txt
echo 临矿集团169当前的版本号是:%var2%
echo 临矿集团169当前的版本号是:%var2% > %localPathtemp%\jituan169_revision.txt
set /p var3=<%localPath%\wanglou_revision.txt
echo 王楼煤矿当前的版本号是:%var3%
echo 王楼煤矿当前的版本号是:%var3% > %localPathtemp%\wanglou_revision.txt
set /p var4=<%localPath%\gucheng_revision.txt
echo 古城煤矿当前的版本号是:%var4%
echo 古城煤矿当前的版本号是:%var4% > %localPathtemp%\gucheng_revision.txt
set /p var5=<%localPath%\liyan_revision.txt
echo 里彦煤矿当前的版本号是:%var5%
echo 里彦煤矿当前的版本号是:%var5% > %localPathtemp%\liyan_revision.txt
set /p var6=<%localPath%\xinyi_revision.txt
echo 新驿煤矿当前的版本号是:%var6%
echo 新驿煤矿当前的版本号是:%var6% > %localPathtemp%\xinyi_revision.txt
set /p var7=<%localPath%\guotun_revision.txt
echo 郭屯煤矿当前的版本号是:%var7%
echo 郭屯煤矿当前的版本号是:%var7% > %localPathtemp%\guotun_revision.txt
set /p var8=<%localPath%\pengzhuang_revision.txt
echo 彭庄煤矿当前的版本号是:%var8%
echo 彭庄煤矿当前的版本号是:%var8% > %localPathtemp%\pengzhuang_revision.txt

set /p var10=<%localPath%\luxi_revision.txt
echo 鲁西煤矿当前的版本号是:%var10%
echo 鲁西煤矿当前的版本号是:%var10% > %localPathtemp%\luxi_revision.txt

set /p var9=<%localPath%\svn_revision.txt
echo svn最新的版本号是:%var9%
echo --------svn当前的版本号是:%var9%-------- > %localPathtemp%\svn_revision.txt

echo 判断是否需要发邮件,若有一个煤矿未更新到最新版,则发邮件

if %var0% geq %var9%(
    echo pass
) else (
    echo 临矿集团163服务器未更新为最新版，将发邮件给运维人员
	echo you_need_update_server
)

if %var1% geq %var9%(
    echo pass
) else (
    echo 临矿集团164服务器未更新为最新版，将发邮件给运维人员
	echo you_need_update_server
)

if %var2% geq %var9%(
    echo pass
) else (
    echo 临矿集团169服务器未更新为最新版，将发邮件给运维人员
	echo you_need_update_server
)

if %var3% geq %var9%(
    echo pass
) else (
    echo 王楼煤矿服务器未更新为最新版，将发邮件给运维人员
	echo you_need_update_server
)

if %var4% geq %var9%(
    echo pass
) else (
    echo 古城煤矿服务器未更新为最新版，将发邮件给运维人员
	echo you_need_update_server
)

if %var5% geq %var9%(
    echo pass
) else (
    echo 里彦煤矿服务器未更新为最新版，将发邮件给运维人员
	echo you_need_update_server
)

if %var6% geq %var9%(
    echo pass
) else (
    echo 新驿煤矿服务器未更新为最新版，将发邮件给运维人员
	echo you_need_update_server
)

if %var7% geq %var9%(
    echo pass
) else (
    echo 郭屯煤矿服务器未更新为最新版，将发邮件给运维人员
	echo you_need_update_server
)

if %var8% geq %var9%(
    echo pass
) else (
    echo 彭庄煤矿服务器未更新为最新版，将发邮件给运维人员
	echo you_need_update_server
)

if %var10% geq %var9%(
    echo pass
) else (
    echo 鲁西矿服务器未更新为最新版，将发邮件给运维人员
	echo you_need_update_server
)

echo web版本信息解析完毕
echo 将最新web版本信息保存成文本
copy %localPathtemp%\*.txt %localPathtemp%\all_svn.txt
echo f | xcopy %localPathtemp%\all_svn.txt D:\devopsweb\all_svn.txt /r /y

ping 127.0.0.1 -n 3 >nul
```

- 9.发邮件进行通知。发给技术负责人和提交代码的开发人员。模板如下：


```
<hr/>
<h3>(本邮件是由程序自动下发的，请勿回复！)</h3><hr/>
项目名称：临矿集团安全生产共享平台<br/><hr/>
构建工程：$PROJECT_NAME<br/><hr/>
SVN版本：${SVN_REVISION}<br/><hr/>
构建编号：$BUILD_NUMBER<br/><hr/>
构建状态：$BUILD_STATUS(若失败可能是矿端某台web服务器断线导致主动推送失败)<br/><hr/>
触发原因：${CAUSE}<br/><hr/>
构建日志地址：<a href="${BUILD_URL}console">${BUILD_URL}console</a><br/><hr/>
构建地址：<a href="${BUILD_URL}">${BUILD_URL}</a><br/><hr/>
变更集：${JELLY_SCRIPT,template="html"}<br/><hr/>
将要推送到：临矿集团163(负载均衡165)、临矿集团164(负载均衡165)、临矿集团169、鲁西新平台、王楼、古城、里彦、郭屯、彭庄、新驿<br/><hr/>
推送结果：<pre>${BUILD_LOG_EXCERPT, start="^各矿web最新的版本信息如下", end="^web版本信息解析完毕"}</pre><br/><hr/>
在线查询最新版本信息(实验室功能):http://dp.hzl201.tk:8060/all_svn.txt<br/><hr/>
代码评审(实验室功能):http://sonar.hzl201.tk:8060<br/><hr/>
Jenkins研发：韩志龙<br/><hr/>
```

- 10.gulp打包实现cshtml文件自动加js和css文件md5戳的功能。gulp还需要很多配置，这里只展示集成到Jenkins的方法。脚本如下：

```
echo 把不需要转换的cshtml文件复制到临时目录cshtmlmd5
call D:\upload\iconv\copy-unc.bat

echo 把GB2312格式的cshtml文件复制到临时目录iconv
call D:\upload\iconv\copy-gb2312.bat

echo 把GB2312格式的cshtml文件的编码格式转换成utf-8，解决中文乱码问题
call D:\upload\iconv\iconv2.bat

echo 把GB2312转utf-8格式的cshtml文件从临时目录iconv复制到cshtmlmd5目录
echo d | xcopy D:\upload\lyweb-release\_PublishedWebsites\iconv  D:\upload\lyweb-release\_PublishedWebsites\cshtmlmd5 /s /r /y


echo gulp打包，获取所有js和css文件的md5戳，修改所有cshtml的引用信息，增加v，若有js或css文件被修改，则md5值会变化，相应的cshtml会更新js或css的文件版本信息，解决浏览器缓存未更新的问题，这样就不需要在客户端浏览器手动清理缓存了。

echo 复制gulp依赖包
call C:\"Program Files"\7-Zip\7z.exe x D:\upload\gulp.7z -oD:\upload\lyweb-release\_PublishedWebsites

echo 执行gulp打包命令
ping 127.0.0.1 -n 3 >nul
d:
cd D:\upload\lyweb-release\_PublishedWebsites
gulp

ping 127.0.0.1 -n 3 >nul
echo 执行7z压缩命令
call C:\"Program Files"\7-Zip\7z.exe a D:\upload\sync\upload-semi-md5.zip D:\upload\lyweb-release\_PublishedWebsites\update\
echo f | xcopy D:\upload\sync\upload-semi-md5.zip D:\devopsweb\Resources\upload-semi-md5.zip /r /y /d
```

- 11.gulp打包实现压缩js文件功能。gulp还需要很多配置，这里只展示集成到Jenkins的方法。脚本如下：

```
echo 将压缩js文件
echo 清空D:\upload\update
del /f /q /s D:\upload\update\*.*
RD  /s /q  D:\upload\update\
mkdir D:\upload\update

echo 复制所有文件到D:\upload\min-temp
echo d | xcopy D:\upload\lyweb-release\_PublishedWebsites\LRSMES.WebUI\Areas D:\upload\min-temp\Areas /s /r /y
echo d | xcopy D:\upload\lyweb-release\_PublishedWebsites\LRSMES.WebUI\bin D:\upload\min-temp\bin /s /r /y
echo d | xcopy D:\upload\lyweb-release\_PublishedWebsites\LRSMES.WebUI\Content D:\upload\min-temp\Content /s /r /y
echo d | xcopy D:\upload\lyweb-release\_PublishedWebsites\LRSMES.WebUI\fonts D:\upload\min-temp\fonts /s /r /y
echo d | xcopy D:\upload\lyweb-release\_PublishedWebsites\LRSMES.WebUI\Scripts D:\upload\min-temp\Scripts /s /r /y 
echo d | xcopy D:\upload\lyweb-release\_PublishedWebsites\LRSMES.WebUI\Views D:\upload\min-temp\Views /s /r /y 

echo 将无法压缩的文件先放在临时目录里
call D:\upload\dist\copytotemp.bat
echo 删除无法压缩的文件
call D:\upload\dist\delupdatefile.bat

echo 执行gulp打包命令，压缩js文件
ping 127.0.0.1 -n 3 >nul
d:
cd D:\upload\
gulp

ping 127.0.0.1 -n 3 >nul
echo 复制无法压缩的文件到打包文件夹
echo d | xcopy D:\upload\temp  D:\upload\update /s /r /y

echo 执行7z压缩命令
call C:\"Program Files"\7-Zip\7z.exe a D:\upload\sync\upload-full-jsmin.zip D:\upload\update\
echo f | xcopy D:\upload\sync\upload-full-jsmin.zip D:\devopsweb\Resources\upload-full-jsmin.zip /r /y
```

注意：xcopy命令选用/S时对源目录下及其子目录下的所有文件进行COPY。除非指定/E参数，否则/S不会拷贝空目录，
若不指定/S参数，则XCOPY只拷贝源目录本身的文件，而不涉及其下的子目录。若只复制单个文件，不要加/S参数。


## 使用gulp加md5戳

请先了解gulp的基本用法：使用gulp部署web前端代码[https://www.zybuluo.com/hzl201/note/1639542](https://www.zybuluo.com/hzl201/note/1639542)

### 目标

1. cshtml文件引用js和css文件时若js或css文件有变化，则刷新浏览器后能自动加载最新的js或css文件，不需要清理浏览器缓存文件（目前能实现大部分js出现md5戳）。
2. 开发人员不需要进行任何适配，保留当前的开发习惯和开发流程。
3. cshtml文件加完md5戳以后能多次增加md5戳，不会出现运行多次后出现多个版本号的情况。
4. cshtml文件转换后不能出现乱码。
5. 出现新的cshtml文件后能自动加入转换列表（目前无法实现，只能手动添加）。

### 实施思路

> 分析源码

* js和css文件有重名的情况，只能根据根目录的相对路径+文件名的方式实现索引的唯一性，使用gulp先生成一个映射表，映射表内容分别是：“相对路径+文件名”和处理后的“相对路径+文件名+md5戳”，再通过gulp查询映射表修改所有cshtml文件中的匹配内容。若cshtml文件引用js和css文件不是相对路径，则无法识别并转换。
* 临矿pc端web将近2000个cshtml文件，其中有115个文件是GB2312格式的（又分为两种情况，若这些文件内容中没有中文字符，则不需要转换也能加md5戳，但只要内容存在中文字符，转换后必定乱码），需先转换成UTF-8格式，进行加md5处理后再转换成UTF-8 with BOM格式。其余的cshtml文件是UTF-8 with BOM格式的，可以直接加md5戳。

> 手动实现

* 使用UltraCodingSwitch软件可进行手动把所有文件转换成UTF-8 with BOM格式，速度快，稳定性高。但无法集成到Jenkins的自动发布流程里。
* ![](/jwliTrFdJZvQx9k.jpg)

> 集成到Jenkins

* 使用iconv可进行转换，下载地址：[http://files.cnblogs.com/adgnat/iconv.7z](http://files.cnblogs.com/adgnat/iconv.7z)，但转换前需要先分离cshtml文件，把GB2312格式的文件复制到iconv文件夹，再使用iconv转换成UTF-8格式，再复制到cshtmlmd5文件夹；其他的cshtml文件直接复制到cshtmlmd5文件夹。，若GB2312格式的cshtml文件直接复制到cshtmlmd5文件夹，则必然出现中文乱码。若不是GB2312格式的cshtml文件使用iconv进行处理，则文件内容会变成“锘”。
* 需要把iconv.exe文件放在一个单独的文件夹，并添加好环境变量。否则Jenkins无法正确识别iconv命令。
* ![](/IndMlpshHU4569b.jpg)
* gulp进行转换

### 实施步骤

> 手动获取cshmtl文件的转换列表

* 检查是否有新的cshtml未转换。其中能转换的文件是gb2312格式的，需要加到gb2312处理的脚本里。全部文件是被删除的文件及路径。所有gb2312文件都被加到处理脚本（del和copy都加）以后，剩下的文件就是utf-8格式的，添加到utf-8的白名单里（del和copy都加）。
* 只需要单独运行一次即可，在Jenkins里不需要集成这个方法。

```
@echo off
echo 检查是否有新的cshtml未转换
echo 清理临时文件夹
del /f /q /s D:\upload\lyweb-release\_PublishedWebsites\update\*.*
RD  /s /q  D:\upload\lyweb-release\_PublishedWebsites\update\
mkdir D:\upload\lyweb-release\_PublishedWebsites\update\

del /f /q /s D:\upload\lyweb-release\_PublishedWebsites\iconv\*.*
RD  /s /q  D:\upload\lyweb-release\_PublishedWebsites\iconv\
mkdir D:\upload\lyweb-release\_PublishedWebsites\iconv\

del /f /q /s D:\upload\lyweb-release\_PublishedWebsites\cshtmlmd5\*.*
RD  /s /q  D:\upload\lyweb-release\_PublishedWebsites\cshtmlmd5\
mkdir D:\upload\lyweb-release\_PublishedWebsites\cshtmlmd5\

echo 复制所有文件到iconv文件夹
echo d | xcopy D:\upload\lyweb-release\_PublishedWebsites\LRSMES.WebUI  D:\upload\lyweb-release\_PublishedWebsites\iconv /s /r /y

echo 删除iconv文件夹中已经被处理过的cshtml文件
call D:\upload\iconv\del-unc.bat
call D:\upload\iconv\del-gb2312.bat

echo 删除iconv文件夹中文件名有空格的的cshtml文件
del /f /q /s D:\upload\lyweb-release\_PublishedWebsites\iconv\Areas\MonitorWarning\Views\DM\"副本 Index.cshtml"

echo iconv检查
call D:\upload\iconv\iconv2.bat

echo iconv:cannot convert的cshtml文件是utf-8格式，请添加到utf-8的白名单copy-unc.bat和del-unc.bat里。先把所有的utf-8的文件都添加好。

echo 去除utf-8的文件后，下面的删除列表是gb2312文件，需添加到copy-gb2312.bat和del-gb2312.bat里。
del /f /q /s D:\upload\lyweb-release\_PublishedWebsites\iconv\*.cshtml
```
* del-unc.bat内容如下：

```
@echo off
set path=D:\upload\lyweb-release\_PublishedWebsites\iconv


del /f /q %path%\Areas\Base\Views\_ViewStart.cshtml
del /f /q %path%\Areas\Base\Views\DataDictionary\Index.cshtml
del /f /q %path%\Areas\Base\Views\Demo\CheckPerson.cshtml
del /f /q %path%\Areas\Base\Views\DocCheckRecord\CheckEditPage.cshtml
del /f /q %path%\Areas\BDDM\Views\MineReport\JT_SC_ExpectReport.cshtml
```

* del-gb2312.bat内容如下：

```
@echo off
set path=D:\upload\lyweb-release\_PublishedWebsites\iconv

del /f /q 	%path%\Areas\Base\Views\ExaminationType\ExaminationTypePage.cshtml
del /f /q 	%path%\Areas\Base\Views\ExaminationWebSiteConfig\Index.cshtml
del /f /q 	%path%\Areas\Base\Views\Ex_ExaminationItem\ExItemPage.cshtml
del /f /q 	%path%\Areas\Base\Views\MSG_MAIL_TEMP\MSG_MAIL_TEMPPage.cshtml
del /f /q 	%path%\Areas\Base\Views\MSG_SMS_TEMP\MSG_SMS_TEMPPage.cshtml
```

* iconv2.bat的内容如下：

```
@echo off

d:
cd D:\upload\lyweb-release\_PublishedWebsites\iconv

for /r D:\upload\lyweb-release\_PublishedWebsites\iconv %%i in (*.cshtml) do (
echo 修改GB2312文件编码为UTF-8格式,名称为****.bkp
iconv -f GB2312 -t UTF-8 %%i > %%i.bkp
if exist %%i.bkp (
    echo 删除原GB2312格式文件
    del %%i
    echo 重命名UTF-8格式文件为原文件名称
    ren %%i.bkp %%~nxi
) else (
    echo pass
)
)

del /f /q /s D:\upload\lyweb-release\_PublishedWebsites\iconv\*.bkp

echo 执行完毕。此脚本将于10秒后自动关闭！
ping 127.0.0.1 -n 10 >nul
```

> 自动统一cshtml文件的格式
* 需要集成到Jenkins里，打完full包和拷贝完semi包的文件后，运行这些脚本。

```
echo 把不需要转换的cshtml文件复制到临时目录cshtmlmd5
call D:\upload\iconv\copy-unc.bat

echo 把GB2312格式的cshtml文件复制到临时目录iconv
call D:\upload\iconv\copy-gb2312.bat

echo 把GB2312格式的cshtml文件的编码格式转换成utf-8，解决中文乱码问题
call D:\upload\iconv\iconv2.bat

echo 把GB2312转utf-8格式的cshtml文件从临时目录iconv复制到cshtmlmd5目录
echo d | xcopy D:\upload\lyweb-release\_PublishedWebsites\iconv  D:\upload\lyweb-release\_PublishedWebsites\cshtmlmd5 /s /r /y
```

* copy-unc.bat的内容如下：

```
@echo off
echo 选用/S时对源目录下及其子目录下的所有文件进行COPY。除非指定/E参数，否则/S不会拷贝空目录，若不指定/S参数，则XCOPY只拷贝源目录本身的文件，而不涉及其下的子目录
set from=D:\upload\lyweb-release\_PublishedWebsites\LRSMES.WebUI
set to=D:\upload\lyweb-release\_PublishedWebsites\cshtmlmd5

del /f /q /s D:\upload\lyweb-release\_PublishedWebsites\cshtmlmd5\*.*
RD  /s /q  D:\upload\lyweb-release\_PublishedWebsites\cshtmlmd5\
mkdir D:\upload\lyweb-release\_PublishedWebsites\cshtmlmd5

echo f | xcopy 	%from%\Areas\Base\Views\_ViewStart.cshtml		%to%\Areas\Base\Views\_ViewStart.cshtml		 /r /y
echo f | xcopy 	%from%\Areas\Base\Views\DataDictionary\Index.cshtml		%to%\Areas\Base\Views\DataDictionary\Index.cshtml		 /r /y
echo f | xcopy 	%from%\Areas\Base\Views\Demo\CheckPerson.cshtml		%to%\Areas\Base\Views\Demo\CheckPerson.cshtml		 /r /y
echo f | xcopy 	%from%\Areas\Base\Views\DocCheckRecord\CheckEditPage.cshtml		%to%\Areas\Base\Views\DocCheckRecord\CheckEditPage.cshtml		 /r /y
echo f | xcopy 	%from%\Areas\Base\Views\DocCheckRecord\CheckPage.cshtml		%to%\Areas\Base\Views\DocCheckRecord\CheckPage.cshtml		 /r /y
```

* copy-gb2312.bat的内容如下：

```
@echo off
echo 选用/S时对源目录下及其子目录下的所有文件进行COPY。除非指定/E参数，否则/S不会拷贝空目录，若不指定/S参数，则XCOPY只拷贝源目录本身的文件，而不涉及其下的子目录
set from=D:\upload\lyweb-release\_PublishedWebsites\LRSMES.WebUI
set to=D:\upload\lyweb-release\_PublishedWebsites\iconv

del /f /q /s D:\upload\lyweb-release\_PublishedWebsites\iconv\*.*
RD  /s /q  D:\upload\lyweb-release\_PublishedWebsites\iconv\
mkdir D:\upload\lyweb-release\_PublishedWebsites\iconv


echo f | xcopy 	%from%\Areas\Base\Views\ExaminationType\ExaminationTypePage.cshtml	 %to%\Areas\Base\Views\ExaminationType\ExaminationTypePage.cshtml	 /r /y
echo f | xcopy 	%from%\Areas\Base\Views\ExaminationWebSiteConfig\Index.cshtml	 %to%\Areas\Base\Views\ExaminationWebSiteConfig\Index.cshtml	 /r /y
echo f | xcopy 	%from%\Areas\Base\Views\Ex_ExaminationItem\ExItemPage.cshtml	 %to%\Areas\Base\Views\Ex_ExaminationItem\ExItemPage.cshtml	 /r /y
echo f | xcopy 	%from%\Areas\Base\Views\MSG_MAIL_TEMP\MSG_MAIL_TEMPPage.cshtml	 %to%\Areas\Base\Views\MSG_MAIL_TEMP\MSG_MAIL_TEMPPage.cshtml	 /r /y
echo f | xcopy 	%from%\Areas\Base\Views\MSG_SMS_TEMP\MSG_SMS_TEMPPage.cshtml	 %to%\Areas\Base\Views\MSG_SMS_TEMP\MSG_SMS_TEMPPage.cshtml	 /r /y
echo f | xcopy 	%from%\Areas\Base\Views\T_SYS_ROLE_CATEGORY\T_SYS_ROLE_CATEGORYPage.cshtml	 %to%\Areas\Base\Views\T_SYS_ROLE_CATEGORY\T_SYS_ROLE_CATEGORYPage.cshtml	 /r /y
```

> 获取js和css文件的映射表、对cshtml文件进行转换

* 需要集成到Jenkins里，在统一cshtml文件格式后执行。由于gulp打包后无法执行后续的脚本，需要在Jenkins里再新建一个win的批处理才行。

```
echo gulp打包，获取所有js和css文件的md5戳，修改所有cshtml的引用信息，增加v，若有js或css文件被修改，则md5值会变化，相应的cshtml会更新js或css的文件版本信息，解决浏览器缓存未更新的问题，这样就不需要在客户端浏览器手动清理缓存了。

echo 复制gulp依赖包
call C:\"Program Files"\7-Zip\7z.exe x D:\upload\gulp.7z -oD:\upload\lyweb-release\_PublishedWebsites

echo 执行gulp打包命令
ping 127.0.0.1 -n 3 >nul
d:
cd D:\upload\lyweb-release\_PublishedWebsites
gulp
```

> 合并到semi包

* 在Jenkins里新建一个windows batch command，在gulp转换后执行。添加到semi包打成压缩包的脚本之前。

```
echo 把经过gulp转换后带md5戳的cshtml文件复制到d盘的upload目录的update目录

echo d | xcopy D:\upload\lyweb-release\_PublishedWebsites\update D:\upload\update /s /r /y
```

### 验证

> 未对cshtml文件加md5戳之前打开pc端平台按f12查看js文件时是这样的，是没有md5戳的：
* ![](/e24wCGT8AqYPOzM.jpg)

> 未对cshtml文件加md5戳之前打开gb2312格式的cshtml文件是这样的：
* ![](/sOCmg43j9iPFzSv.jpg)

> 使用iconv转换后的gb2312格式的cshtml文件是这样的：
* ![](/ajYqwpAMUftXk7v.jpg)

> 错误示范：使用iconv转换utf-8格式的cshtml文件是这样的：
* ![](/nfGHuW4thZTMgF5.jpg)

> 使用gulp处理cshtml文件前是这样的：
* ![](/YRSWTc9aZfiGNX1.jpg)

> 使用gulp处理cshtml文件后加md5戳是这样的：
* ![](/8fE4jXWVBduotUN.jpg)

> 集成到semi包并进行更新后是这样的，js文件已经有md5戳了，以后只要代码更新后，执行Jenkins打包部署工程后，js文件若发生变化，md5戳也会变化，相应的刷新浏览器就能自动加载最新的js文件：
* ![](/3saceowdNm4vjQA.jpg)



## 后端更新

> 后端主要是帆软报表的修改和数据库的修改。