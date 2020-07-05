# 服务配置
[[toc]]

::: tip
这部分主要是各类服务的初始配置及调整。
:::

## GIS数据库初始配置

**地质测量数据库**

> 主要是保存地测类钻孔与巷道坐标信息。
- 数据库命名规范：GCKDC  #古城煤矿地质测量数据库

**地质测量数据库**

> 主要是保存一张图图纸信息。
- 数据库命名规范：GCKGIS #古城煤矿GIS数据库

## GIS一张图图纸检查

> 主要适用于临矿的里彦、郭屯、彭庄、新驿四个矿。若新创建的煤矿，需要先录入图纸。请先进行gis库的创建并录入图纸。

## 图纸坐标转换

> 在已入库的采掘工程平面图上查找井田边界图层，找到井田边界所有关键点的坐标，再进行坐标转换操作。
- 坐标转换方法详见《坐标转换教程》：[下载地址](https://pan.baidu.com/s/1DmDccNnZ6-EP_aGC-eDRSw) 链接: https://pan.baidu.com/s/1DmDccNnZ6-EP_aGC-eDRSw 提取码: 1utm
- 坐标转换时需要用到的软件,运行坐标转换程序文件夹下的坐标转换.exe程序：[下载地址](https://pan.baidu.com/s/1UiGgFI-zGsEhkLzEAe8UKg) 链接: https://pan.baidu.com/s/1UiGgFI-zGsEhkLzEAe8UKg 提取码: crey


由于矿井提供的图纸的井田边界坐标是高斯坐标，需要转换成地理坐标才能被识别。和上面的《坐标转换教程》内容一致，讲解坐标转换步骤。

**准备转换数据**

- 例如这里准备的数据放在临时文件02.xls，不能是xlsx格式。其中x坐标是7位，y坐标是8位。

- ![](/6AiJ5CqvSEOjoL4.jpg)

**使用坐标转换程序进行转换**

- 使用专用的转换程序进行坐标转换，才能使用这些坐标。打开坐标转换程序文件的坐标转换.exe程序，进行如下设置，陕西这些煤矿的中央经度应该都是108。再导入数据。根据y值前2位判断度带，再选择中央经度。

- ![](/JmMRCyxBkWjsOIT.jpg)
- ![](/T7kwQgniXmbodMR.jpg)
- ![](/7p6NzZdykGAn9MQ.jpg)
- ![](/uxUw7onpjAZresd.jpg)

- 计算完以后再进行度分秒转换，转换时需要excel里都转成数字格式，否则转出的数据有误，附件1中有转换的参考资料。导出数据，生成03.xls文件，把经度和纬度转换为数字。

- ![](/bhLnljpUi7WEIdZ.jpg)

- 选中数值，点击左上角的黄色感叹号，再点击“转换为数字”。

- ![](/okSsUva6l8fNhie.jpg)

- 把纬度和经度复制到xx煤矿范围拐点坐标（转换后）.xls文件中，替换纬度和经度，生成最右侧的数据。

**转换后检查数据**

> 如果填入到矿井边界里验证时发现范围不对（图形轮廓对比一下原图的井田边界轮廓和图形位置：对比一下设置以后能否在平台的一张图看到煤矿的图纸），还有图形的形状是否有异常，可以通过与相邻的矿井边界对比判断，若有问题，需要重新生成拐点坐标，先检查原始数据，再验证转换过程，一般出问题都因为转换过程中的excel表的内容未改为数字格式引起的。

## 平台一张图设置

`注意：请使用超级管理员进行操作`

**添加煤矿代码和边界**

> 将煤矿代码和井田边界数据提供给开发人员。超级管理员登录集团平台，在平台运维-系统管理配置-一张图配置-矿井信息管理菜单添加煤矿。
> 参考其他煤矿的井田边界坐标格式进行配置。

```shell
new L.Polygon([
L.latLng(35.6348, 116.6266),
L.latLng(35.6329 , 116.6244 ),
L.latLng(35.5746 , 116.6244 ),
L.latLng(35.5746 , 116.6744 ),
L.latLng(35.5815 ,116.6911 ),
L.latLng(35.5913 ,116.6911 ),
L.latLng(35.5912 ,116.7105 ),
L.latLng(35.5996 ,116.7244 ),
L.latLng(35.6093 ,116.7244 ),
L.latLng(35.6154 , 116.7094 ),
L.latLng(35.6273 ,116.6958 ),
L.latLng(35.6290 , 116.7013 ),
L.latLng(35.6301 , 116.7116 ),
L.latLng(35.6357,116.7127),
L.latLng(35.6413,116.6911),
L.latLng(35.6579,116.6911),
L.latLng(35.6579,116.6577),
L.latLng(35.6413,116.6577),
L.latLng(35.6401,116.6352),
])
```


**设置需要显示的图层**

> 在一张图配置里进行煤层管理。
> 根据gis库里的煤层分类进行煤层标识的设置。
> 默认要显示地形图和主要在采煤层的图层。

![](/muNIxO.png)

**设置默认打开的图种**

> 联系开发人员设置默认图种。
> 进入到平台一张图界面，只勾选采掘工程平面图，在右侧设为默认图形。

![](/muNTMD.png)

**测试**

> 测试是否能正常显示，若检查时发现煤矿的边界位置错乱或有飞点的情况，则是添加的拐点坐标有问题，可能是格式错误，需要检查拐点坐标，重新进行配置。


**采掘工程类**

修改web目录下的MLfunc.js文件，在该文件夹下找data.map_矿名简写.js名称的文件。修改后提交代码，清理浏览器缓存。

**回采工作面**

- gis里的图层在这里`注意：工作面属性的是否在采要改为是才能在平台显示该工作面的信息。

![](/muN5RK.png)

- 再修改data.map_矿名简写.js文件。图层名称可以使用模糊搜索，如只写一个回采工作面，但一般掘进和回采工作面都用全称会好一些。其他的若有多个图层，需要属性都配置一致，而且有内容。

![](/muNRaR.png)

- associationModule: '掘进地质说明书,回采地质说明书,采掘作业规程',的意思是从这三个菜单中找工作面关键字，若包含这些关键字，则显示出来。

![](/muNhPx.png)

- 属性扩展信息意思是显示这些菜单

![](/muNWI1.png)

- 最后的 labelDisplay意思是怎么显示列表，若可以改成这样的。

```shell
labelDisplay: '名称,块段编号'
```

显示效果如下

![](/muN4G6.png)



**掘进工作面**

**采区**

**煤巷**

**岩巷**

**衔接计划**

**地质测量类**

修改web目录下的MLfunc.js文件，在该文件夹下找data.map_矿名简写.js名称的文件。修改后提交代码，清理浏览器缓存。

**储量**
钻孔、储量块段、断层
钻孔数据从地测库取数

**防治水类**

**防治水**
观测站、积水区、水泵房、涌水点

**一通三防类**

修改web目录下的MLfunc.js文件，在该文件夹下找data.map_矿名简写.js名称的文件。修改后提交代码，清理浏览器缓存。

**通风**
主扇、局扇、测风站

**防尘系统**
隔爆水棚、供水管路

**机电运输类**

机电不用配置

**监测监控类**

修改web目录下的MLfunc.js文件，在该文件夹下找data.map_矿名简写.js名称的文件。修改后提交代码，清理浏览器缓存。
**安全监测**
从安全监测节点库取数

**人员定位**

> 只有人员定位数据已接入时才能绘制路径。
- 人员定位路径画法：[下载地址](https://pan.baidu.com/s/1k_flD41c__qSLnWXJrPGcQ) 链接: https://pan.baidu.com/s/1k_flD41c__qSLnWXJrPGcQ 提取码: atxk

**工业视频**
从视频监控厂家硬盘录像机直接获取数据

**水文监测**
从水文监测节点库取数

**安全巡检**

**应急救援类**
修改web目录下的MLfunc.js文件，在该文件夹下找data.map_矿名简写.js名称的文件。修改后提交代码，清理浏览器缓存。

**安全监测**

**人员定位**

**避灾路线**

**通信系统**

**隐患排查类**

修改web目录下的MLfunc.js文件，在该文件夹下找data.map_矿名简写.js名称的文件。修改后提交代码，清理浏览器缓存。

**三违**

**隐患**

**风险预控类**

修改web目录下的MLfunc.js文件，在该文件夹下找data.map_矿名简写.js名称的文件。修改后提交代码，清理浏览器缓存。

**预测预警**

**安全风险**

**水害预测**

**热害预测**


## 一张图后台管理

> 主要适用于临矿。以下都是直接编辑mlfunc.js文件。



**加载图种分类设置**

> 根据不同矿井的图种分类来单独进行设置。
搜索function openTZ(tzmodulename, callback)
在下面找到需要单独设置的矿井

```shell
    else if (tzmodulename == '压风系统') {
        if (deptName == "王楼煤矿" || deptName == "郭屯煤矿" || deptName == "新驿煤矿") #有的矿井是压风管路系统图，把这些矿井名称填好
            tzName = "安全类^压风管路系统图";
        else
            tzName = "安全类^压风自救系统图";
    }
```

**修改另一个设置**

> 新加入的矿井需要设置。

搜索function InitModule_data_z(m_index, s_index, t_index)
在下面添加新的矿井,如&& deptName != "里彦煤矿"

```shell
                if (selectModuleName == "监测分站" || selectModuleName == "检测分站" || selectModuleName == "截止阀" || selectModuleName == "岩巷" || selectModuleName == "回柱绞车" || selectModuleName == "检测读卡器" || selectModuleName == "电话" || selectModuleName == "回采工作面") {
                    if (deptName != "郭屯煤矿" && deptName != "彭庄煤矿" && deptName != "新驿煤矿" && deptName != "里彦煤矿") {
                        Module_Data_z.sort(SortByProperty);
```


**显示人员轨迹**

> 新加矿井需设置。
搜索function print_rygj(stationID, trace)
在下面添加新矿井

```shell
    else if (deptName == "古城煤矿")
        person_layer = "人员定位路径GCK0000ARY";
    else if (deptName == "王楼煤矿")
        person_layer = "人员定位参考路径WLK0000ARY";
    else if (deptName == "里彦煤矿")
        person_layer = "人员定位路径LYK0000ARY";
    else if (deptName == "郭屯煤矿")
        person_layer = "人员定位路径GTK0300ARY";
    else if (deptName == "彭庄煤矿")
        person_layer = "人员定位路径PZK0303ARY";
    else if (deptName == "新驿煤矿")
        person_layer = "人员定位路径XYK0000ARY";
```



**掘进头危险源设置**

> 掘进工作面的危险源图层设置方法。
搜索function EarlyWarning() 
在下面添加新的矿井

```shell
    else if (deptName == "王楼煤矿") {
        jjtlayer = "掘进工作面";
        dangerlayer = "断层,已采采空区";
        jjtkey = "USER__CUSTOMPROPERTY_中文名称";
    }
    else if (deptName == "鲁西煤矿") {
        jjtlayer = "掘进工作面";
        dangerlayer = "村庄,保护煤柱";
        jjtkey = "USER__CUSTOMPROPERTY_掘进头名称";
    }
    else if (deptName == "新驿煤矿") {
        jjtlayer = "掘进头";
        dangerlayer = "陷落柱,村庄,井田边界,断层,保护煤柱";
        jjtkey = "USER__CUSTOMPROPERTY_掘进头名称";
    }
    else if (deptName == "郭屯煤矿") {
        jjtlayer = "掘进工作面";
        dangerlayer = "陷落柱,村庄,井田边界,断层,煤巷,保护煤柱";
        jjtkey = "USER__CUSTOMPROPERTY_掘进头名称";
    }
    else if (deptName == "彭庄煤矿") {
        jjtlayer = "掘进工作面";
        dangerlayer = "陷落柱,村庄,井田边界,断层,保护煤柱";
        jjtkey = "USER__CUSTOMPROPERTY_掘进头名称";
    }
    else if (deptName == "里彦煤矿") {
        jjtlayer = "掘进工作面";
        dangerlayer = "陷落柱,村庄,井田边界,断层,保护煤柱,积水区,岩巷,煤巷,钻孔"; #主要修改这些图层名称关键字
        jjtkey = "USER__CUSTOMPROPERTY_掘进头名称";
    }
```

## 监测监控维护

**配置管理**

- 需定期检查各业务数据库和龙软转发接口程序的配置，若现场的对接ip或读取的源有更新，配置需同步更新。

**数据检查**

- 需定期抽查上传的源数据。
- 检查log中经常出现的报警，优先对能引起传输中断和数据异常的安全监测和人员定位问题进行处理。
- 对数据库中已写入的数据进行抽查，是否和源数据一致。
- 对平台展示内容进行抽查，查看是否和数据库一致。
