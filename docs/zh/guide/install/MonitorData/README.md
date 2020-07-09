# 监测监控数据接入
[[toc]]

::: tip
这部分主要是监测监控数据检查要点。临矿集团安全生产信息共享平台集成10对生产矿井安全监测系统，通过平台实现数据的实时展示、报警预警及统计分析，实现煤矿安全的远程监控。但在实际工作中，存在系统集成的不稳定性，同时，数据的实时性、完整性、准确性也存的问题。鉴于以上情况，对于异常现象,特编写监测监控数据的实施指导资料。
:::

## 矿井监测数据接入实施

### 关于本文档

**文档目的**
- 本文档为矿井安全监测、人员定位、水文、束管、矿压、应力及微震数据接入实施手册，描述了矿端安全监测、人员定位、水文、束管、矿压、应力及微震系统接口部署、配置、运行以及数据采集程序的配置、部署等操作的基本步骤，用于指导用户安装、配置、部署及数据接入。

**适用范围**
- 本手册适用于具有基本计算机使用知识的曲靖市煤矿安全生产信息化平台、临矿集团安全生产共享平台、陕煤集团安全生产共享平台，通过阅读本文档，可以独立完成对本系统的操作。

### 传输原理

- 系统厂家根据标准提供数据文本文件，上传至FTP服务器，再使用采集软件对数据进行解析入库。
- ![](/aNCFsIn5Uf6gL4Z.jpg)

### 厂家接口部署

**重庆煤科院接口配置**
- 厂家最新的转发接口程序已经修改为注册制，需联系厂家进行软件注册后才能使用。注册时需提供煤矿名称和序列号，联系厂家获取授权码并录入。
- ![](/2k1pZDTfEGQRSgF.jpg)
- 【点击】启用生成文件功能，在【任务列表】中输入“瓦斯上传”点击【添加任务】按钮，点击方框中的“瓦斯上传”，选择“文件协议”。
- 依次填写如下信息：（此信息要求矿端或成家提供）
- 矿井编码（按照编码规则，填写煤矿编码）
- 矿端安全监测监控主数据库IP地址，备数据库IP地址
- 数据库名称：
- 用户名：
- 密码：
- 点击【测试】按钮，提示主数据库链接正常（备用数据库无需要求，正常与否都可），表示信息配置成功。
- 点击文件路径【浏览】按钮，选择D:\datalr目录，点击【确定】按钮。
- ![](/Bfcizpe31uNHTDQ.jpg)
- ![](/UCKZvPuaiY5XoTQ.jpg)
- 若安全监测厂家接口程序部署在龙软的监测监控服务器上，则把输出路径修改为本机ftp目录即可，如D:\ftp\anquanjiance\370800053700007。若安全监测厂家接口程序部署在厂家服务器上，还需要进行FTP配置。可选择使用厂家接口程序进行ftp上传，也可以使用龙软的ftp程序进行上传。厂家的接口程序中切换到ftp传输页面，新建一个任务，并录入属性信息，目标路径为anquanjiance/370800053700007的字样。安全监测上传周期为10秒，人员定位120秒。
- ![](https://i.loli.net/2020/07/08/ibp7sanQLJtVZUG.jpg)
- 修改配置后需保存并重启厂家接口程序才能生效。在桌面右下角找到厂家的接口程序，右键，关闭，然后重新运行即可。

**江苏三恒安全监测接口配置**
- 运行KJ70N-FTP.exe程序。
- ![](/J8V5G3MjqKDb7mx.jpg)
- 进行上传参数配置。
- ![](/DJ6QfEARC5uPXjF.jpg)


**江苏三恒人员定位接口配置**
- 运行KJ128A联网数据生成程序.exe。
- ![](/9iaqKVESXP3Chpd.jpg)
- 点击【煤矿编码录入】按钮，点击“修改编码”输入对应的煤矿编码（按照云南曲靖编码规则，填写15位煤矿编码），点击【立即生成】再点击【确定】，点击【退出】按钮即完成煤矿编码录入。
- 【矿井参数文件录入】【区域参数文件录入】【分站/轨迹点参数文件录入】【人员参数文件录入】与煤矿编码录入步骤一致点击【立即生成】按钮时，如有提示信息不全，联系矿端及厂家完善此类信息。

**水文厂家接口部署**
- 水文厂家基本上都是西安欣源和大学教授调试的接口，由于厂家优化做的少，稳定性相对较差。

**应力厂家接口部署**

### 平台数据监控程序及转发程序部署

**龙软安全监测接口程序**

- 安全监测接口程序主要作用是将ftp目录中已上传的安全监测转换txt文件内容进行解析入库，主要涉及到的数据库是矿端安全监测节点库和矿端三维数据库。
- 在接口程序的安全监测接口程序目录中运行SafetyMonitor.exe和SafetyMonitor_Center.exe程序。配置文件扩展名都是config，使用记事本打开。
- （1）修改monitor.xml配置文件。输入煤矿编码和简称。
- `<mine key="370800053700004" name="里彦煤矿"  />`
- （2）修改SafetyMonitor.exe.config配置文件，录入节点库信息。

```
<add key="sqldatabase" value="LKJT_SafeyMonitor_Node_LY"/>
    <add key="sqluid" value="sa"/>
    <add key="sqlpwd" value="sa"/>
    
        <!--读取文件的地址-->
    <add key="fileEntries" value="D:\ftp\anquanjiance\370800053700004\"/>
    <!--历史文件的地址 -->
    <add key="LogfileEntries" value="D:\ftp\anquanjiance\Log\"/>
    <!--读取文件的文件夹-->
    <add key="wenjianjiaName" value="370800053700004"/>
    
        <!--读取文件的地址-->
    <add key="fileEntries" value="D:\ftp\anquanjiance\370800053700004\"/>
    <!--历史文件的地址 -->
    <add key="LogfileEntries" value="D:\ftp\anquanjiance\Log\"/>
    <!--读取文件的文件夹-->
    <add key="wenjianjiaName" value="370800053700004"/>
    
    		<!--程序窗体显示名称-->
		<add key="FormName" value="里彦安全监测数据监控"/>
```
- （3）修改SafetyMonitor_Center.exe.config配置文件，录入中心库信息。
   
```
<!-- 三维数据库-->
    <add key="sqlSanweiserver" value="."/>
    <add key="sqlSanweidatabase" value="3d_LY"/>
    <add key="sqlSanweiuid" value="sa"/>
    <add key="sqlSanweipwd" value="longruan123"/>
    
  <add key="FormName" value="临矿统计安全监测数据转发程序" />
  <add key="sqlNoteserver" value="." />
  <add key="sqlNotedatabase" value="LKJT_SafeyMonitor_Node_LY" />
  <add key="sqlNoteuid" value="sa" />
  <add key="sqlNotepwd" value="sa" />
  <add key="sqlCenterserver" value="172.16.0.166" />
  <add key="sqlCenterdatabase" value="LKJT_MonitorCenter" />
  <add key="sqlCenteruid" value="sa" />
  <add key="sqlCenterpwd" value="sa" />
```

**龙软人员定位接口程序**

- 人员定位接口程序主要作用是将ftp目录中已上传的人员定位转换txt文件内容进行解析入库，主要涉及到的数据库是矿端人员定位节点库和矿端三维数据库。
- 在接口程序的人员定位接口程序目录中运行PersonLocation.exe和PersonLocation_Center.exe程序。配置文件扩展名都是config，使用记事本打开。
- （1）修改Person.xml配置文件。输入煤矿编码和简称。
- `<mine key="370800053700004" name="里彦煤矿"  />`
- （2）修改PersonLocation.exe.config配置文件，录入节点库信息。在这里需要注意人员定位读取的文件夹位置，`<add key="fileEntries" value="D:\ftp\renyuandingwei\" />`这个配置是读取D:\ftp\renyuandingwei\目录下的矿编码文件夹。
 
```
<add key="sqlserver" value="." />
    <add key="sqldatabase" value="LKJT_PersonLocation_Note_LY" />
    <add key="sqluid" value="sa" />
    <add key="sqlpwd" value="longruan123" />
    
<add key="wenjianjiaName" value="370800053700004" />

    <add key="FormName" value="临矿里彦煤矿人员定位数据监控" />
    
    <add key="fileEntries" value="D:\ftp\renyuandingwei\" />
    <add key="LogfileEntries" value="D:\ftp\renyuandingwei\Log\" />
```
        
- （3）修改PersonLocation_Center.exe.config配置文件，录入中心库信息。

```  
<add key="sqlNoteserver" value="." />
  <add key="sqlNotedatabase" value="LKJT_PersonLocation_Note_LY" />
  <add key="sqlNoteuid" value="sa" />
  <add key="sqlNotepwd" value="sa" />
  <add key="sqlSWserver" value="." />
  <add key="sqlSWdatabase" value="3d_LY" />
  <add key="sqlSWuid" value="sa" />
  <add key="sqlSWpwd" value="sa" />
  
    <add key="MineName" value="里彦煤矿" />
  <add key="FormName" value="临矿统计人员定位数据转发程序" />
  <add key="sqlCenterserver" value="172.16.0.166" />
  <add key="sqlCenterdatabase" value="LKJT_PersonLocationCenter" />
  <add key="sqlCenteruid" value="sa" />
  <add key="sqlCenterpwd" value="sa" />
```

**龙软水文监测接口程序**

- 水文接口程序主要作用是将ftp目录中已上传的水文转换txt文件内容进行解析入库，主要涉及到的数据库是矿端水文节点库。
- 在接口程序的目录中运行HydrologicalMonitor.exe程序。配置文件扩展名是config，使用记事本打开。

```
<add key="sqlserver" value="."/>
<add key="sqldatabase" value="LKJT_HydrologicalMonitor_xshyh"/>
<add key="sqluid" value="sa"/>
<add key="sqlpwd" value="sa"/>

<add key="sqlserverCenter" value="172.16.0.166"/>
<add key="sqldatabaseCenter" value="LKJT_MonitorCenter"/>
<add key="sqluidCenter" value="sa"/>
<add key="sqlpwdCenter" value="sa"/>

<!--读取文件的地址-->
<add key="fileEntries" value="D:\FTP\shuiwenjiance\370800053700009\"/>
<!--历史文件的地址 -->
<add key="LogfileEntries" value="D:\FTP\shuiwenjiance\Log\"/>
<!--煤矿编码-->
<add key="MineID" value="370800053700009"/>
<!--程序窗体显示名称-->
<add key="FormName" value="新上海一号煤矿水文监测"/>
```
**龙软应力接口程序**
- 应力分三种接口程序，两种是读数据库的，一种是读转换文件的。

- 读数据库的应力接口程序主要作用是直接读取矿端应力数据库的内容，进行解析入库，主要涉及到的数据库是矿端应力和微震节点库。
- 在接口程序的目录中运行ImpactPressure.exe，配置文件ImpactPressure.exe.config。

**龙软微震接口程序**

- 微震接口程序主要作用是将ftp目录中已上传的微震转换txt文件内容进行解析入库，主要涉及到的数据库是矿端应力和微震节点库。
- 在接口程序的目录中运行ImpactPressure.exe。其中配置在微震接口程序配置文件ImpactPressure.exe.config和微震三维测点程序配置文件Microseismic.exe.config，使用记事本打开。  
```
<!--数据库信息-->
<add key="LRsqlserver" value="10.154.129.12"/>
<add key="LRsqldatabase" value="LKJT_MinePressure_PZ"/>
<add key="LRsqluid" value="sa"/>
<add key="LRsqlpwd" value="sa"/>

<!--读取文件的地址-->
<add key="fileEntries" value="D:\ftp\weizhen\370800053700006"/>
<!--历史文件的地址 -->
<add key="LogfileEntries" value="D:\ftp\weizhen\Log\"/>
    
<!--煤矿编码-->
<add key="MineID" value="370800053700006"/>
<!--煤矿名称-->
<add key="MineName" value="彭庄煤矿"/>
```

**龙软三级预警接口程序**

- 在接口程序的人员定位接口程序目录中运行PersonSWMonitor.exe。配置文件PersonSWMonitor.exe.config,使用记事本打开。

```
<!--安全监测监测数据库-->
		<add name="SafetyConnectionString" connectionString="server=10.154.129.12;database=LKJT_SafeyMonitor_Node_PZ;uid=sa;pwd=sa" providerName="System.Data.SqlClient" />
		<!--束管监测数据库-->
		<add name="SgConnectionString" connectionString="server=172.16.0.166;database=LKJT_Base_1.4.8;uid=sa;pwd=sa" providerName="System.Data.SqlClient" />
		<!--人员定位数据库-->
		<add name="PersonConnectionString" connectionString="server=10.154.129.12;database=LKJT_PersonLocation_Note_PZ;uid=sa;pwd=sa" providerName="System.Data.SqlClient" />
		<!--矿压监测数据库-->
		<add name="PressureConnectionString" connectionString="server=.;database=SecurityKY;uid=sa;pwd=sa" providerName="System.Data.SqlClient" />
		<!--监测预警数据库-->
		<add name="WarnDataConnectionString" connectionString="server=172.16.0.166;database=EarlyWarn;uid=sa;pwd=sa" providerName="System.Data.SqlClient" />
```

### 数据库配置

**添加组织机构**
- 临矿需要这样新建组织机构。使用超级管理员登录集团端平台，在平台运维-系统设置里可以看到管理页面。
- 新增矿井，需要先创建组织机构，组织机构布局是临矿集团为根节点，临矿集团的科室与煤矿是二级节点（若有二级公司，则二级公司在二级节点，所属煤矿在三级节点）。
- 组织机构创建时需要把煤矿的类型选对，一般都是井工矿。
- 在平台运维-系统设置-站点管理菜单进行操作，添加一个矿井。已实施的矿井都有站点地址，需修改为对应的ip。未实施的都暂时将地址写为http://172.16.0.165，修改好排序，未实施的矿井在在后面。

**数据库命名规范**
- 节点库命名如下，LKJT_PersonLocation_Note_LY，LKJT意思是临矿集团，PersonLocation代表人员定位，LY代表里彦煤矿。

| 数据库关键字 | 说明 | 备注 |
| --- | --- | --- |
| SafeyMonitor | 安全监测 |  |
| PersonLocation | 人员定位 |  |
| HydrologicalMonitor | 水文监测 |  |
| MinePressure | 应力和微震 |  |

**安全监测节点库修改**

- 在节点库中的[dbo].[SM_MineTime]表里直接添加信息。右键编辑该表。
- 示例：
- 
| MineID | MineName | DemoName | SysDeptID | MineTime | ServerTime | Reason | IsDel |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 370800053700006 | 彭庄煤矿 | NULL | 700bce3696ec437ca93bf7458ea1a95d | 2020-07-09 14:41:26.000 | 2020-07-09 14:41:33.000 | 正常 | N |
- 其中MineID是煤矿编码，SysDeptID是在中心库LKJT_Base_1.4.8数据库[dbo].[T_SYS_ORGANIZATION]表里查到的SysDeptID。查询方法是：`where Name like  '%顺兴%'   ##顺兴要改为你要添加的矿井`

**安全监测中心库修改**

- MonitorCenter中心库需修改多个表。配置以后在平台监测监控实时数据页面就可以显示为“已接入”。
- [dbo].[AutomationDataBase]表
- 										
| DeptID | MineID | MineName | NodeName | MonitorType | ConnectionString | Remark |
| --- | --- | --- | --- | --- | --- | --- |
| 6ea325338c644926b708407fa7d5d983 | 370800053700001 | 鲁西煤矿 | 鲁西3D | 综合自动化 | server=10.155.0.83;database=3d;uid=sa;pwd=longruan123 | NULL |
- [dbo].[DataBaseConfig]表
- 		
| NodeName | MonitorType | ConnectionString | Remark |
| --- | --- | --- | --- |
| 鲁西安全监测节点库 | 安全监测 | server=10.155.0.83;database=LKJT_SafeyMonitor_Node;uid=sa;pwd=sa | NULL |
- [dbo].[MineConfig]表 databaseid对应[DataBaseConfig]表里的第一个id。
- 			
| DatabaseID | SysDeptID | MineName | MineID | MonitorType | IsAccess |
| --- | --- | --- | --- | --- | --- |
| 1 | 6ea325338c644926b708407fa7d5d983 | 鲁西煤矿 | 370800053700001 | 安全监测 | Y |
- [dbo].[MineRealTimeTransforStatus]表
- 										
| MineID | MonitorType | IsAccessed | MineIP | MineRemark | ConnectFlag | LastConnectClientTime | LastConnectServerTime |WriteFlag | LastWriteClientTime | LastWriteServerTime | ReasonRemark | WorkerNum | LeaderNum | TOTALTIMES | LASTSTATICESTIME |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 370800053700001 | 安全监测 | Y | 10.155.0.83 | NULL | Y | 2017-10-20 09:13:52.240 | 2017-10-20 09:13:52.240 | Y | 2020-07-09 15:11:12.000 | 2020-07-09 15:11:26.000 | NULL | NULL | NULL | 0 |	2017-10-20 09:13:52.240 |								

**人员定位节点库修改**

- [dbo].[PL_MineList]表
- 					
| MineID | MineName | IsDel | DemoName |
| --- | --- | --- | --- |
| 370800053700006 | 彭庄煤矿 | N | NULL |
- [dbo].[PL_MineTime]表
- 	
| MineID | MineTime | ServerTime | Reason |
| --- | --- | --- | --- |
| 370800053700006 | 2020-07-09 14:52:06.000 | 2020-07-09 14:50:59.000 | 正常 |

**人员定位中心库修改**

- PersonLocationCenter是人员定位中心库。
- [dbo].[PL_SetDatabase]表
- 								
| ID | NoteName | IP | DatabaseSource | DatabaseName | DatabaseUid | DatabasePwd | Remark |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1005 | 彭庄节点库 | 10.154.129.12 | 10.154.129.12 | LKJT_PersonLocation_Note_PZ | sa | sa | NULL |

- [dbo].[PL_SetMine]表

| DatabaseID	| SysDeptID |	MineID	| MineName |	DemoName |
| --- | --- | --- | --- | --- |
| 1005 | 	700bce3696ec437ca93bf7458ea1a95d	| 370800053700006	 | 彭庄煤矿|	示范一矿 |
- [dbo].[PL_TranforStatus]表

| MineID |	TransforStatus | LastTime |BreakReason | Remark | 	CollectorIP | CollectorReserveIP | FirstTime |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 370800053700006 | 	Y	| 2020-07-09 15:27:08.000 | 正常 |NULL	| 172.16.0.166 | 10.154.129.12 | 2018-06-10 10:13:12.240 |


**水文监测节点库修改**

- [dbo].[SW_MineTime]表
- 		
| MineID | <span class="Apple-tab-span" style="white-space:pre"></span>MineName | SysDeptID | MineTime | ServerTime | Reason | IsDel |
| --- | --- | --- | --- | --- | --- | --- |
| 370800053700006 | 彭庄煤矿 | 700bce3696ec437ca93bf7458ea1a95d | 2018-04-02 09:12:38.000 | 2018-04-02 09:12:45.000 | 正常 | N |

**水文监测中心库修改**

- MonitorCenter中心库需修改多个表。
- [dbo].[HydrologicalDataBase]表
-
| DeptID |	MineID	| MineName | NodeName | MonitorType | ConnectionString	| Remark |
| --- | --- | --- | --- | --- | --- | --- |
| 6ea325338c644926b708407fa7d5d983 | 370800053700001 | 鲁西煤矿 |	鲁西水文监测 | 水文监测 | server=10.155.0.83;database=LKJT_HydrologicalMonitor;uid=sa;pwd=sa |	NULL |

- [dbo].[HydrologicalTransforStatus]表

| MineID |	MonitorType | IsAccessed | 	MineIP	| MineRemark |	ConnectFlag | LastConnectClientTime | 	LastConnectServerTime | WriteFlag | LastWriteClientTime | LastWriteServerTime	| ReasonRemark | 	WorkerNum |	LeaderNum	| TOTALTIMES | LASTSTATICESTIME |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 370800053700001	| 水文监测 | Y | 10.155.0.83 | NULL | Y |2017-10-20 09:13:52.240 | 2017-10-20 09:13:52.240 | Y | 2020-07-09 15:30:30.000 | 2020-07-09 15:30:30.000 | NULL | NULL	| NULL	| 0	| 2017-10-20 09:13:52.240 |

**应力和微震节点库修改**



- [dbo].[MineTime]表
- 
| MineID | <span class="Apple-tab-span" style="white-space:pre"></span>MineName | SysDeptID | MineTime | ServerTime | Reason | IsDel |
| --- | --- | --- | --- | --- | --- | --- |
| 370800053700006 | 彭庄煤矿 | 700bce3696ec437ca93bf7458ea1a95d | 2018-04-02 09:12:38.000 | 2018-04-02 09:12:45.000 | 正常 | N |

**应力和微震中心库修改**

- MonitorCenter中心库的[dbo].[ImpactPressureDataBase]表

| DeptID	| MineID |	MineName | NodeName | MonitorType | ConnectionString |	Remark |
| --- | --- | --- | --- | --- | --- | --- |
|106af5d767a74b97aaed4697a4d483d0 | 370800053700002 | 王楼煤矿	| 王楼应力监测 |	应力监测	 |server=10.151.129.22;database=LKJT_MinePressure_WL;uid=sa;pwd=sa |	NULL |


## 安全监测实施指导

- （1）安全监测数据的不稳定传输，出现时断时续现象。
- 异常排查指导：对矿井到矿业公司的网络进行测试，是否存在断线、丢包现象；排查安全监测厂家的数据生成接口、文件上传接口是否正常运行。
- （2）安全监测数据展示不符合实时性。
- 异常排查指导：排查矿井安全监测主机的时间是否为北京时间。排查监测文件里内容是否符合：如实时文件监测时间，测定文件的测定信息。
- （3）安全监测数据展示不全、有文件但无展示等情况。
- 异常排查指导：先排查安全监测监测接口是否提示成功。如接口提示失败，查看接口程序下的log日志文件，找到失败原因，对照监测协议和文件对比，找出文件格式问题。
- ![](/wnPDXxSEhicFQVs.png)
- 安全监测数据缺失基本信息，不完整。
- 异常排查指导：对照矿井安全监测系统及厂家生成的配置文件进行检查，针对不完整的传感器进行定向查询，是否缺少基本信息，例如传感器安装位置、传感器类型、传感器单位等基本信息。
- （5）安全监测数据展示不准确。
- 异常排查指导：对照矿井安全监测系统及厂家生成的配置文件进行检查，针对不准确的传感器进行定向查询，例如，瓦斯传感器显示为温度传感器，排查传感器类型是否准确；监测矿井安全监测系统厂家生成的实时文件，针对传感器异常状态进行定向查询，例如，传感器调校状态显示为报警状态，排查传感器状态是否准确；
- 在进行以上排查操作时，可参考安全监测系统的通信协议标准（详情见附件）。链接: https://pan.baidu.com/s/10twmICX-rNJCLrb7HJN17g 提取码: 785r

## 人员定位实施指导

- （1）人员定位数据的不稳定传输，出现时断时续现象。
- 异常排查指导：对矿井到矿业公司的网络进行测试，是否存在断线、丢包现象；排查人员定位厂家的数据生成接口、文件上传接口是否正常运行。
- （2）人员定位数据展示不符合实时性。
- 异常排查指导：排查矿井人员定位主机的时间是否为北京时间。排查监测文件里内容是否符合：如实时文件监测时间，测定文件的测定信息。
- （3）人员定位数据展示不全、有文件但无展示等情况。
- 异常排查指导：先排查人员定位监测接口是否提示成功。如接口提示失败，查看接口程序下的log日志文件，找到失败原因，对照监测协议和文件对比，找出文件格式问题。
- ![](/EAamDg7hLw6M1pq.png)
- （4）人员定位数据缺失基本信息，不完整。
- 异常排查指导：对照矿井人员定位系统及厂家生成的配置文件进行检查，针对不完整的分站及部门、人员信息进行定向查询，是否缺少基本信息，例如部门、用户名、职务等基本信息。
- （5）人员定位数据展示不准确。
- 异常排查指导：对照矿井人员定位系统及厂家生成的实时文件进行检查，针对不准确的人员数据进行定向查询，例如，历史轨迹，排查出井记录是否准确；若人员是矿领导，需要先进行矿领导配置。若是超时超员报警数据出现异常，需要先检查平台的综合预警里关于人员定位的超时超员报警配置，再对照矿井人员定位系统及厂家生成的报警文件进行检查，针对不准确的人员数据进行定向查询，例如入井时间和报警开始时间，排查报警数据是否准确。
- 在进行以上排查操作时，可参考人员定位系统的通信协议标准（详情见附件）。链接: https://pan.baidu.com/s/10-fPGrU8a1S64lzWLoLtyg 提取码: cabs

## 精准人员定位实施指导

- 精准人员定位与旧版人员定位的区别主要是ryss实时文件传输的有x和y坐标，需核对该坐标是否与gis入库的人员定位系统图一致。而且精准人员定位的数据库与龙软接口程序都要修改才能支持传输x和y坐标。
- 在进行以上排查操作时，可参考精准人员定位系统的通信协议标准（详情见附件）。链接: https://pan.baidu.com/s/1O3gmMQ2O0weuL5W_195NlQ 提取码: x9ee

## 水文监测实施指导

- （1）水文监测数据的不稳定传输，出现时断时续现象。
异常排查指导：对矿井到矿业公司的网络进行测试，是否存在断线、丢包现象；排查水文监测厂家的数据生成接口、文件上传接口是否正常运行。
- （2）水文监测数据展示不符合实时性。
-  异常排查指导：排查矿井水文监测主机的时间是否为北京时间。排查监测文件里内容是否符合：如实时文件监测时间，测定文件的测定信息。
- （3）水文监测数据展示不全、有文件但无展示等情况。
- 异常排查指导：如有文件但无展示，先排查水文监测接口是否提示成功。如接口提示失败，查看接口程序下的log，找到失败原因，对照监测协议和文件对比，找出文件格式问题。
- ![](/aqONC2eZT3dFnQb.png)
- （4）水文监测数据缺失基本信息，不完整。
- 异常排查指导：对照矿井水文监测系统及厂家生成的配置文件进行检查，针对不完整的传感器进行定向查询，是否缺少基本信息，例如传感器安装位置、传感器类型、传感器单位等基本信息。
- （5）水文监测数据展示不准确。
- 异常排查指导：对照矿井水文监测系统及厂家生成的配置文件进行检查，针对不准确的传感器进行定向查询，例如，地面水文长观孔传感器和井下普通传感器，排查传感器类型是否准确；监测矿井水文监测系统厂家生成的实时文件，针对传感器的展示数据进行定向查询，例如，传感器的监测值和单位是否准确；
- 在进行以上排查操作时，可参考水文监测系统的通信协议标准（详情见附件）。链接: https://pan.baidu.com/s/1btdkryUJSTUuiyCyIQfSEw 提取码: 2uix

- 案例分析
- 某矿井展示的水文数据有部分传感器无基础数据，而且有些基础数据内容错误，和孔号无法对应。需要对照水文厂家的平台、矿井平台、转换数据，查找问题。
- （1）dev的问题。数据体分为：地面水文长观孔、井下普通传感器。逐一核对传感器编号是否对应，展示的测点名称、监测量、单位是否与厂家平台一致，将不一致的地方标记。有时候是传感器缺失，或者多上传的，需要向矿井地测科科室收集哪些传感器需要展示，将不需要展示的去除；再逐一检查剩余传感器编号是否有缺失，补充。最后补充和调整基础信息。
- （2）rtdata的问题。实时数据是否有漏传、多上传的情况。将rtdata与dev对比，检查有哪些是没传输实时数据的，需要让厂家修改转换接口程序，补充实时数据，并去除不需要展示的数据。
- （3）如何展示含水层层位、孔口标高的信息。需要在平台的水文预警设置里把钻孔的预警信息完善。预警值需要矿端自行决定，若持续报警，则可能是报警值设置有问题。

## 视频监控实施指导

- （1）视频监控数据的不稳定传输，出现时断时续现象。
- 异常排查指导：对矿井到矿业公司的网络进行测试，是否存在断线、丢包现象；排查视频监控厂家的硬盘录像机是否正常运行；排查单个预览失败的摄像头是否正常运行。
- （2）视频监控数据展示不符合实时性。
- 异常排查指导：排查矿井视频监控硬盘录像机的时间是否为北京时间。
- （3）视频监控探头名称不准确。
- 异常排查指导：对照矿井视频监控厂家的硬盘录像机进行检查，针对不完整的传感器进行定向查询，是否缺少基本信息，例如摄像头器安装位置、名称等基本信息。并联系拥有矿端平台管理权限的人员重新获取所有设备的视频通道，以重新获取通道和摄像头信息。
- （4）视频监控从本机无法预览。
- 异常排查指导：需要对本机浏览器进行插件配置，从平台帮助里安装视频插件。

## 束管监测实施指导

- （1）束管监测数据的不稳定传输，出现时断时续现象。
- 异常排查指导：对矿井到矿业公司的网络进行测试，是否存在断线、丢包现象；排查束管监测厂家的数据生成接口、文件上传接口是否正常运行。
- （2）束管监测数据展示不符合实时性。
- 异常排查指导：排查矿井安全监测主机的时间是否为北京时间。排查监测文件里内容是否符合：如实时文件监测时间，测定文件的测定信息。
- （3）束管监测数据展示不全、有文件但无展示等情况。
- 异常排查指导：如有文件但无展示，先排查监测接口是否提示成功。如接口提示失败，查看接口程序下的log，找到失败原因，对照监测协议和文件对比，找出文件格式问题。
- （4）束管监测数据展示不准确。
- 异常排查指导：对照矿井束管监测系统及厂家生成的实时文件进行检查，针对不准确的传感器进行定向查询，例如，CH4监测值显示为N2监测值，排查监测值排序是否准确。
- 在进行以上排查操作时，可参考束管监测系统的通信协议标准（详情见附件）。链接: https://pan.baidu.com/s/1IoRgYOdabiQw9A_6feYHoA 提取码: m8cn

## 矿压、应力、微震实施指导

- （1）矿压、应力、微震监测数据的不稳定传输，出现时断时续现象。
- 异常排查指导：对矿井到矿业公司的网络进行测试，是否存在断线、丢包现象；排查安全监测厂家的数据生成接口、文件上传接口是否正常运行。
- （2）矿压、应力、微震监测数据展示不符合实时性。
- 异常排查指导：排查矿井的矿压、应力、微震监测主机的时间是否为北京时间。
- （3）矿压、应力监测数据展示不全、有文件但无展示等情况。
- 异常排查指导：对照矿井矿压、应力监测系统及厂家生成的配置文件进行检查，针对不完整的工作面进行定向查询，是否缺少基本信息，例如监测区域名称、传感器位置及坐标等基本信息。如有文件但无展示，先排查监测接口是否提示成功。如接口提示失败，查看接口程序下的log，找到失败原因，对照监测协议和文件对比，找出文件格式问题。
- （4）矿压、应力、微震监测数据展示不准确。
- 异常排查指导：对照矿井安全监测系统及厂家生成的实时文件进行检查，针对传感器异常状态进行定向查询，例如，监测点故障状态显示为报警状态，排查监测点状态是否准确；对照矿井矿压、应力监测系统及厂家生成的配置文件进行检查，针对不完整的工作面进行定向查询，是否缺少基本信息，例如监测区域名称、传感器位置及坐标等基本信息。
- 在进行以上排查操作时，可参考矿压、应力、微震监测系统的通信协议标准（详情见附件）。链接: https://pan.baidu.com/s/10aSuv2L1mqL1ODRyW27NeA 提取码: 67a9




最后，感谢你的支持，我们正在不断完善文档和平台功能，你也可以加入我们的的交流群进行反馈信息，给我们带来你的意见和建议。