# web配置

[[toc]]

::: tip
这部分主要是平台webconfig及baseconfig的配置说明。修改配置文件以后要重启web的应用程序池和web服务，不要使用多个web连接同一个应用程序池。
:::

## webconfig

- 配置文件在web根目录的Web.config。

**数据库配置**
> 连接各类数据库，注意不要连测试数据库，另外ip尽量连内网ip，不要连外网ip。数据库密码尽量不要有“@”符号。

## baseconfig

- 配置文件在App_Data\config\base.config

**是否开启验证码**
> 配置首页登陆时是否显示验证码，若不显示，则输入账号和密码可直接登陆，若显示，则需要输入正确的验证码才能登陆成功。若多次登陆失败，则点击验证码可刷新。
- `<add key="isVerificationCode" value="true" />`

**集团系统网址**
> 配置集团服务器的ip。主要功能是读取集团的收发文附件。目前164服务器目录读取失败，只能手动写死为163，待164服务器重装操作系统后能解决。

**文档上传路径**
> 配置本单位上传的文件默认保存位置。需注意这里使用的是绝对路径。
- `<add key="FilePath" value="D:\lyWeb"/>`

**万能密码**
> usesyskey是本web的万能密码，方便开发人员进行测试，可登陆任意账号，注意该万能密码不要让矿上操作人员知道。
`<add key="usesyskey" value="longruan!@#$" />`

- 详细的配置示例：


```shell
<?xml version="1.0" encoding="utf-8"?>
<appSettings>
  <!--网络监测 默认多少秒获取一次 马祥龙 2015-12-16-->
  <add key="MoniterTimer" value="10000" />
  <!--主页面-->
  <add key="IndexView" value="Index_kuang" />
  <!--登录面-->
  <add key="LoginView" value="Login_liyan" />
  <!--导航页-->
  <add key="GuideView" value="Guide" />
  <!--首页面-->
  <add key="MainView" value="Main_L" />
  <!--快捷菜单最大数量-->
  <add key="MaxShortCut" value="7" />
  <!--默认皮肤-->
  <add key="DefaultSkin" value="default" />
  <!--集团系统网址-->
  <add key="JT_WEB_URL" value="http://172.16.0.163"/>
  <!--在线人员功能-->
  <add key="UserOnline" value="false" />
  <!--接收消息-->
  <add key="ReceiveNotices" value="false"/>
   <!--是否开启验证码-->
  <add key="isVerificationCode" value="true" />
  <!--是否开启异常日志记录-->
  <add key="IsErrorLog" value="true" />
  <!--默认数据权限table-->
  <add key="MainDataPermission" value="默认数据源" />
  <!--用户编码格式-->
  <add key="UserNoFormat" value="LR-yyyyMMdd" />
  <!--用户默认密码-->
  <add key="DefaultLoginPass" value="123456" />
  <!--用户小图标存放-->
  <add key="UserIcon" value="/Upload/UserICON/" />
  <!--超级管理员-->
  <add key="SuperAdmin" value="lrsys"/>

  <!--文档上传 路径-->
  <add key="DocumentPath" value="App_Data\DOCUMENT\" />
  <!--<add key="DocumentPath" value="F:\DOCUMENT\" />-->
  <add key="FilePath" value="D:\lyWeb"/>
  <!--文档附件 路径-->
  <add key="DocumentAttachPath" value="App_Data\DOCUMENT\attach\" />
  <!--文档上传 是否按照日期文件夹分类-->
  <add key="IsDocumentDateForlder" value="true"/>
  <!--监测监控的图纸存放路径,要与底层的地图服务指定文件夹保持一致-->
  <add key="MTNW_MapPath" value="" />

  <!--允许打开的tab页面数量-->
  <add key="maxTabCount" value="5"/>

  <add key="AllowDocumentType" value="*.txt;*.jpg;*.jpge;*.gif;*.png;*.zip;*.doc;*.docx;*.ppt;*.pptx;*.xls;*.xlsx;*.dwg;*.lfm;*.lfmx;*.pdf;*.wmv;*.mp4;*.flv;*.avi;" />
 <!--一储量报表地址-->
  <add key="TomcatFRReportServiceUrl" value="http://10.155.0.81:8086/WebReport/ReportServer?reportlet=lk_ZYCLdb" />
  <!--一帆软调度链接地址-->
  <add key="FineReport_BDDM" value="http://172.16.0.165:8086/WebReport/ReportServer?reportlet=lk_bddm_jt"/>
  <!--一安全链接地址-->
  <add key="FineReport_SafeManager" value="http://172.16.0.165:8086/WebReport/ReportServer?reportlet=lk_SafeManager"/>
  <!--一帆软地测防治水链接地址-->
  <add key="FineReport_DCDB" value="http://172.16.0.165:8086/WebReport/ReportServer?reportlet=lk_dcdb_jt"/>
  <!--一Business地址-->
  <add key="FineReport_Business" value="http://172.16.0.165:8086/WebReport/ReportServer?reportlet=LK_Business"/>
  <!--集团新标准 一通三防-->
  <add key="FineReport_YTSF" value="http://172.16.0.165:8086/WebReport/ReportServer?reportlet=jt_new/YTSF"/>
  <!--集团新标准 安全管理-->
  <add key="FineReport_SW" value="http://172.16.0.165:8086/WebReport/ReportServer?reportlet=jt_new/jt_SafeManager"/>
  <!--一通三防 瓦斯管理-->
  <add key="FineReport_OTTP" value="http://172.16.0.165:8086/WebReport/ReportServer?reportlet=lkjt_ottp"/>
  <!--一矿压链接地址-->
  <add key="FineReport_KYDB" value="http://172.16.0.165:8086/WebReport/ReportServer?reportlet=lk_KYdb"/>
  <!--一束管链接地址-->
  <add key="FineReport_SGDB" value="http://172.16.0.165:8086/WebReport/ReportServer?reportlet=lk_SGdb"/>
    <!--大数据中心开发报表-->
  <add key="FineReport_DSJ" value="http://172.16.0.165:8086/WebReport/ReportServer?reportlet=LK_DSJ"/>

  <!--汇总指定类型的文件-->
  <add key="CollectionDocumentType" value=".lfm,.lfmx,.dwg"></add>
  <!--汇总指定类型文件到指定的路径-->
  <add key="CollectionDocumentPath" value="Upload\OneMap\"></add>
  
  <!--2018-0402 马祥龙 是否通过站点过滤数据-->
  <add key="IsFilterBySite" value="Y"/>
  <add key="MineType" value="井工矿"/>
  <add key="GroupType" value="集团公司"/>

  <!--消息服务地址-->
  <add key="MessageServerUrl" value="http://172.16.0.165:81/insert?apiKey=779f2b58-0517-4a06-83e5-33487a5d76ad"/>
  <!--一数字档案数据库配置-->
  <add key="DigitalArchivesConn" value="Data Source=172.16.0.166;Initial Catalog=LKJT_DigitalArchives;User ID=sa;Password=password;"/>
  <!--一张图-->
  <add key="oneMap_DocumentPort" value="8405"/>
  <!--一张图矿井免登录 根据各矿配置用户名密码-->
  <add key="FreeLogin" value="lysite,password"/>
  <add key="CertificateIcon" value="/Upload/CertificateIcon/" />
  <add key="Import" value="/Upload/Import/" />
  <!--站点ID，里彦煤矿-->
  <add key="siteID" value="37d44cd7cf5247f8a7bb81beac9f0308"/>
  <!--配置显示一张图得部门ID，使用','分隔-->
  <add key="displayOneMapDept" value="1,5bf1a9093587401d971d5cde67221119,6585776961e94cd3aa1ce6692def8798,720e273157cc43a0b6eb5540cfc5fd63"/>
  <!--是否自动初始化消息配置-->
  <add key="isInitMessage" value="false"/>
  <!--首次登录修改密码-->
  <add key="firstChangePassword" value="true"/>
<add key="usesyskey" value="password" />
</appSettings>
```




