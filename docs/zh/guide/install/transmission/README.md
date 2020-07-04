# 服务迁移
[[toc]]

::: tip
这部分主要是各类服务的迁移注意事项。
:::

## 迁移分类

- 1.只切换服务器ip配置，不涉及更换服务器。
- 2.服务器重装操作系统，需单独恢复接口程序及各类服务，不更换服务器ip。
- 3.服务器由物理机迁移到超融合虚拟机，需重新部署接口程序及各类服务，同时也涉及到更换服务器ip。其中有一些接口程序或服务是绑定ip或网卡mac地址的，则需要修改数据库里的ip配置或重新申请web平台或gis软件的注册码。

## 迁移前的准备工作

**数据备份**

- 迁移前需停止进行报表类资料的录入、停止附件上传、停止gis协同的图纸更新操作。并进行Web目录备份、监测监控节点库的备份和一张图gis库、地测库的备份。
- 数据库及备份：其中监测监控节点库数据量太大，建议可以先精简数据库再备份。Web目录若文件资料较多，建议备份两份，打包存放在异地。
- web配置文档备份：其中web配置文件中的webconfig和baseconfig需单独备份2次，监测监控转换接口程序和配置也单独备份2次。一张图Gis的版本号、协同服务、地图服务、文档在线浏览服务的各类配置需截图。ftp软件需要记录ftp帐号密码及权限配置情况。
- 软件操作环境备份：Web平台涉及到的初始环境程序也要备份，如.net4.0环境。SQL Server数据库依赖的.net 3.5环境也需要备份。其他类型软件依赖的环境及版本信息都需要统计并单独备份初始环境的软件及配置方法。

**新服务器搭建初始环境**

- 默认服务器已重新安装纯净版操作系统，并且网络及防火墙已配置完成。
- 服务器初始配置：不同业务对初始环境的要求不一样，但基本的操作思路是一致的。服务器管理员密码及远程桌面打开以后，可以进行初始配置。调整盘符配置，将磁盘按正常的排序进行调整，光驱盘符排在磁盘盘符后面。关闭服务器操作系统的防火墙、安装补丁修复工具（先修复高危补丁，再逐步修复其他补丁），安装杀毒软件，关闭135、137、138、139、445等高危端口，必要时可修改管理员账号名称及远程桌面3389端口为其它，保证服务器拥有基本的网络防护能力。
- 各类服务初始配置：再依次安装各类服务需要的初始环境及软件，进行配置，如web需要IIS7及以上的版本，综合自动化服务器只能安装在32位操作系统，gis一张图的各类服务需要安装服务器版的lrgis3.2软件（其中协同和地图服务若是20191024新版gis软件及以后的版本则需要单独申请服务器专用的注册码），若需要安装帆软报表服务，需注意帆软报表的注册码失效时间，在失效前需重新注册帆软报表服务。如sql server 2014 r2 数据库软件若在win server 2008 r2 上安装时，需要给操作系统打sp1补丁，建议web服务器、监测监控服务器操作系统使用win server 2012操作系统。若数据库等安装程序及数据文件太大，则建议使用ftp工具进行文件传输。

## 开始迁移

**新服务器上恢复各类服务**

- 初始环境搭建完成以后，可以进行服务配置工作。若只是切换服务器ip地址，则不需要恢复服务，只需要修改各类配置文件及数据库即可。

**恢复一张图服务**

- 一张图服务至少包括协同服务、地图服务、文档浏览服务，有可能还有定制的一些等值线、应力微震服务，这里重点讲解协同服务、地图服务、文档浏览服务的切换注意事项。协同服务和地图服务可单独发布，可放在一个新的服务器上，也可合并放在web服务器上。注意：sql数据库的sa密码不能有“@”符号。文档浏览服务只能放在web服务器上，因为需要使用到web目录下的任意一个龙软格式的图纸，web服务器除了需要IIS初始环境，也需要注册gis软件。
- ![](/bHQwDqdRAg6vN8K.jpg)
- 协同服务配置图
- ![](/KyOdJnrco2tFxaH.jpg)
- 地图服务配置图
- ![](/9JKL2Bgsfvzkar3.jpg)
- 文档浏览服务配置图
- 其他如等值线或应力微震服务需要开发人员调整。
- 测试各类服务是否正常运行。
- 恢复后需将监控勾选，并将gis服务主程序加入开机启动项。
- 若是服务器ip调整，则需记录切换前及切换后的各类服务器的ip及数据库帐号密码配置情况，制定配置修改方案，切换配置后发公告进行说明。
- 最后进行数据备份的设置。

**恢复地质测量数据库**

- 地质测量数据库一般占用磁盘空间很小，迁移也方便，将数据库恢复到新的服务器上即可，然后通知使用单位在gis3.2软件里使用新的服务器地址重新进行配置。
- 最后进行数据备份的设置。

**恢复web服务**

- web服务若是注册文件失效，则需重新申请注册码。一般是由开发人员来申请和注册，注册一次以后，只要不删除注册文件App_Data\config\reg.Data，就可以持续使用，web的注册是有时间限制的，最长4年，到期前没有提示，需注意提前申请新的注册码并重新注册一遍，访问web站点后若注册失效，需将机器码发给开发人员重新注册。一般注册失效的情况是注册文件被删除、注册时间到期、检测到该目录被拷贝到其他路径或文件被大规模替换（玄学，随机触发）。
- ![](/APs8lIfNTa9VYJ2.jpg)
- Web目录的路径变化以后还需要调整webconfig和baseconfig文件。
- 最后进行数据备份的设置。

**恢复帆软报表服务**

- 可能有使用单位有私有定制报表，需单独部署帆软报表服务，迁移后需重新注册本单位的帆软报表，一般情况下帆软报表服务是放在矿业公司或集团等上级单位，不需要重新申请和注册帆软报表服务。帆软报表的失效条件是注册时间到期、硬件环境改变如网卡mac地址变化。
- 最后进行数据备份的设置。

**恢复监测监控服务**

- 先恢复数据库。根据节点库的大小，有时候恢复时间很长，最大的两个监测节点库是安全监测和人员定位数据库，需耐心等待。
- 恢复ftp服务。将ftp软件的帐号密码使用通用的ftpuser及LONGruan123进行配置。若有服务器ip变更，则通知使用单位的各类厂家需上传到新的服务器ip中的ftp对应目录。
- 恢复龙软接口程序及守护进程。建议龙软接口程序中的本机ip上传配置不要使用固定ip，可使用“.”代替，点号代表本机。这样监测监控接口程序迁移后基本不需要进行配置变动。
- ![](/C4MONzQSrucRPsK.jpg)
- 常用的接口程序有安全监测、人员定位、水文等。
- 监测监控对ip地址等配置的要求更高，若有服务器ip有变动，则需要修改中心库的ip配置。
- ![](/fog3zAKsWFkGmhj.jpg)
- 人员定位中心库ip修改。
- ![](/fjc58vA9G3aqxUI.jpg)
- 监测中心库三维ip修改。
- ![](/JRFaqK4NzI1hHlm.jpg)
- ![](/zUIQenZ3Oih6YPF.jpg)
- 安全监测中心库ip修改。
- ![](/yd2imQfatUMGRDl.jpg)
- ![](/8e3lqnRCXxAHSPZ.jpg)
- 水文监测中心库ip修改。
- ![](/s9n4mUkaDNXoi1r.jpg)
- 应力和微震ip修改。
- 最后进行数据备份的设置。

**恢复其他服务**

- 定时诊断服务、综合诊断服务、综合自动化、安全巡检及地质编录、三维web等配置由其他开发人员自行负责。

## 迁移后测试

**功能测试**

- 服务迁移完毕以后要进行多次测试，至少3次，以最后一次测试结果为准。若测试不通过，则说明迁移失败。不通过时也分多种情况，web服务若正常，则完成50%，一张图及监测监控都正常则完成80%，达到80%已经可以正常使用，其他服务可分批次重新迁移直至全部测试通过。经过3次及以上测试以后，出具功能测试报表并存档。
- 功能测试清单
* 
| 类别      | 测试内容                                   | 结果（是否通过） |
|:-------:|:--------------------------------------:|:--------:|
| 一张图gis  | 协同可登录并可修改保存，未出现图纸数据丢失的现象。              |          |
| 一张图gis  | 地图服务运行正常。                              |          |
| 一张图gis  | 文档浏览服务运行正常。                            |          |
| 地址测量数据库 | 可使用gis3.2软件访问并登录。                      |          |
| Web服务   | 平台可打开，且可以正常登录。                         |          |
| Web服务   | Web可查看已上传的文档，若不可查看需联系开发人员修改打开后的页面ip配置。 |          |
| Web服务   | 矿端及集团可打开一张图地图。                         |          |
| Web服务   | 文档上传正常，预览正常，下载正常。                      |          |
| 帆软报表    | 可正常打开帆软报表服务。                           |          |
| Web服务   | 可正常上报报表类数据，上传后数据统计准确。                  |          |
| 监测监控    | ftp文件夹内有上传的监测数据，满足实时性、完整性、准确性要求。       |          |
| 监测监控    | 龙软接口程序运行正常，初始文件写入正常，实时数据写入正常，报警转发正常。   |          |
| Web服务   | 矿端及集团可查看最新的监测数据。报警正常。                  |          |
| Web服务   | 用户权限正常，无超限报错。                          |          |
| 综合自动化   | 综合自动化获取数据正常。                           |          |
| Web服务   | 综合自动化数据展示正常。                           |          |

**性能测试**

- 各类服务进行完功能测试以后，需要对服务器进行性能测试，为期3天。主要测试内容是监测服务器的cpu、内存、磁盘io、网络传输情况。发现异常则立即停止服务。经过3天的烤机，确认各类服务运行稳定后需出具性能测试报告并存档。