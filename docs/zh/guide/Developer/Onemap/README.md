# onemap关联说明

[[toc]]

::: tip
这部分主要是平台onemap一张图的js文件修改说明。
:::

## data.map文件

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


## mlfunc.js文件

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

> 新加矿井需设置，指定某图层为绘制人员定位路径的图层，将路线绘制好。
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

