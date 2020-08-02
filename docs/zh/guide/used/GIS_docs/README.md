# GIS协同操作说明
[[toc]]

::: tip
这部分主要是GIS软件的使用文档...
:::


## GIS地测四件套使用说明书

**1.地测空间管理信息系统**

> 讲解gis软件基础命令和地质专业菜单的使用方法。
- 地测空间管理信息系统使用手册：[下载地址](https://pan.baidu.com/s/1hxzJLbbgAOirWDRz5qv2LQ) 链接: https://pan.baidu.com/s/1hxzJLbbgAOirWDRz5qv2LQ 提取码: vj7s



**2.通风安全管理信息系统**

> 讲解通风专业菜单的使用方法。
- 通风安全管理信息系统使用手册：[下载地址](https://pan.baidu.com/s/1N-c1tXkgGesVzEI5kW5Hzw) 链接: https://pan.baidu.com/s/1N-c1tXkgGesVzEI5kW5Hzw 提取码: bmd7


**3.煤矿井下供电设计系统**

> 讲解机电专业菜单的使用方法。
- 煤矿井下供电设计系统使用手册：[下载地址](https://pan.baidu.com/s/1VgsN84wz9qhC3YpS4FYO1w) 链接: https://pan.baidu.com/s/1VgsN84wz9qhC3YpS4FYO1w 提取码: kpb1


**4.采矿辅助设计系统**

> 讲解设计专业菜单的使用方法。
- 采矿辅助设计系统使用手册：[下载地址](https://pan.baidu.com/s/1jCwRQGfvblG0UhL3HNdh8A) 链接: https://pan.baidu.com/s/1jCwRQGfvblG0UhL3HNdh8A 提取码: 4ky5

## GIS协同及地图服务管理手册

> 讲解地图服务和协同服务的管理方法，一张图制图平台协同及地图服务管理、图种分类标准。
- 一张图制图平台协同及地图服务管理手册：[下载地址](https://pan.baidu.com/s/1kJgrrpY_8uFlaSUweIM-wQ) 链接: https://pan.baidu.com/s/1kJgrrpY_8uFlaSUweIM-wQ 提取码: 5pq5 


---

> 讲解如何进行图纸修改。
- 一张图制图图纸修改手册：[下载地址](https://pan.baidu.com/s/1Ij6VmHlS0zjwj0sIwi2AOQ) 链接: https://pan.baidu.com/s/1Ij6VmHlS0zjwj0sIwi2AOQ 提取码: qvvx

- 注意：先把admin用户下的所有图层类别和图层都创建并添加好，再创建其他用户（建议都为英文），创建时该用户会继承admin的当前分类和图层名，但不会自动与admin实时同步。而且创建用户后可以在用户名称上右键添加该用户的中文姓名，方便区分。


## GIS一张图图纸管理

**1.一张图数据处理规范**

> 讲解矿井图纸数据处理规范和属性数据录入要求。
- 临矿属性表：[下载地址](https://pan.baidu.com/s/1PZBixCXuJs75SRlwfGh3xA) 链接: https://pan.baidu.com/s/1PZBixCXuJs75SRlwfGh3xA 提取码: z2dr
- 制图字体规范：[下载地址](https://pan.baidu.com/s/1jC5GTZladOoACdLCvnNkPg) 链接: https://pan.baidu.com/s/1jC5GTZladOoACdLCvnNkPg 提取码: qkwp

**回采工作面高亮区域绘制**
- 先在一张图配置里进行工作面对应关系配置，匹配好平台生产技术基础信息的工作面与gis已绘制的工作面信息。
- ![](/bVgMyHcEKqPh6wt.jpg)
- 打开gis软件，在回采工作面图层使用多段线沿着工作面轮廓绘制闭合的区域并添加属性信息。`注意：工作面属性的“是否在采”要改为“是”才能在平台显示该工作面的信息。`
- ![](/muN5RK.png)

**回采工作面月度区域绘制**
- 打开gis软件，在工作面月度图层沿着上个月和本月的停采线轮廓绘制闭合区域，并添加属性信息。
- ![](/lPM8qjBn5GuarSR.jpg)
- 颜色代码如下：
- 
| 月份 | 颜色代码    |
|----|---------|
| 1  | #E0A0C0 |
| 2  | #A0C060 |
| 3  | #E0A060 |
| 4  | #A0E0E0 |
| 5  | #C0A0FF |
| 6  | #80FF80 |
| 7  | #00FF80 |
| 8  | #00FFFF |
| 9  | #800000 |
| 10 | #808080 |
| 11 | #FF8080 |
| 12 | #FFFF80 |
- 绘制后的效果如下。点击月度下面的某一月，能定位到该月度的位置并展示本月的推进度和产量信息，其中推进度和产量数据是从综合调度的矿端掘进日报自动抓取的。
- ![](/DpsHMVdAPYhl4iZ.jpg)


**回采工作面配风**
- 更多-配风。录入参数。
- ![](/j6MaJlfpuQFLCcI.jpg)
- 按照提示进行参数录入。
- ![](/W5bpejKmDwQPvtU.jpg)
- ![](/zVXNPkWIdsC4Zv3.jpg)

**回采工作面及掘进工作面关联文档路径**
- 点击工作面-关联信息。这里就能查看到已经关联的文档。
- ![](/CGfVJH9Usbd4kDl.jpg)
- 关联路径是这几个，上传时需要包含工作面名称关键字，如上传的文档名是XX工作面回采地质说明书，只有这样才能识别是哪个工作面的关联文档。：
- 规程措施 对应 矿端平台-生产技术-文档管理-生产资料-规程措施
- 回采地质说明书 对应 矿端平台-地测防治水-地质管理-地质三书-回采地质说明书
- 掘进地质说明书 对应 矿端平台-地测防治水-地质管理-地质三书-掘进地质说明书
- 作业规程 对应 矿端平台-安全管理-安全综合管理-规程措施-作业规程

**掘进工作面掘进头绘制**
- 详见通风安全管理信息系统使用手册。
- 在掘进工作面图层绘制新的掘进头,先在gis3.2里找到隐患防治与评价-绘制掘进头
- ![](/k9n51VOsF28CSLz.jpg)
- 再找到一般符号库里的掘进工作面掘进头，输入掘进头名称“掘进工作面掘进头”，这里必须写死，否则平台不识别。
- ![](/kdyxv9TEm7jqfG3.jpg)
 

**掘进工作面危险源设置**
- 详见通风安全管理信息系统使用手册。
- 当危险源在预警范围内才会报警。
- ![](/2C4SbVHaEmviNMy.jpg)

**钻孔关联**
- 钻孔是自动关联地质测量数据库的数据的，不需要手动录入属性。

**机电设备关联**
- 机电设备列表已做了同步，从矿端机电平台同步到龙软平台，同步后可以在矿端平台-机电运输-机电设备共享-设备地点管理。进行布点操作，把设备列表里的机电设备部到图上对应位置。
- 点击“添加”在图上某位置左键点击进行布点。
- ![](/gJ9HlTsI6A4u2xG.jpg)
- 若需要重新布点，则在左侧已布点的设备清单里删掉该布点，再重新布点。
- ![](/aGH8msuPz1tWOKX.jpg)

**安全监测布点**
- 对安全监测测点进行布点，将厂家上传的传感器清单展示并拖动到图上对应位置。
- 在左侧列表找到需要布点的传感器，点击“布点”，拖动到图上，左键确定。布点后列表左侧显示为“移除”字样。
- ![](/xYkH9fP5F1VMtZa.jpg)


**人员定位布点**
- 同安全监测布点。

**人员定位路径画法**

> 讲解人员定位路径的绘制方法。
- 人员定位路径画法：[下载地址](https://pan.baidu.com/s/1k_flD41c__qSLnWXJrPGcQ) 链接: https://pan.baidu.com/s/1k_flD41c__qSLnWXJrPGcQ 提取码: atxk

**工业视频布点**
- 对地面和井下设备分别进行布点。

**水文监测布点**
- 同安全监测及人员定位布点。


## GIS其他功能

**1.安全巡检操作**

- 安全巡检简易操作：[下载地址](https://pan.baidu.com/s/1tcvae3HKHEcXZjGlf4tgew) 链接: https://pan.baidu.com/s/1tcvae3HKHEcXZjGlf4tgew 提取码: 9bxi

**2.地质三书**

> 讲解自动生成地质三书的方法。
- 地质三书功能：[下载地址](https://pan.baidu.com/s/1qb7vB1VipKlCJqIdXM-5iA) 链接: https://pan.baidu.com/s/1qb7vB1VipKlCJqIdXM-5iA 提取码: hg2i

**3.水害预测**

> 讲解生成水害预测图的方法。
- 水害预测功能：[下载地址](https://pan.baidu.com/s/1HjFgg7wlcE7jr1-CmrUYJg) 链接: https://pan.baidu.com/s/1HjFgg7wlcE7jr1-CmrUYJg 提取码: mec8



最后，感谢你的支持，我们正在不断完善文档和平台功能，你也可以加入我们的的交流群进行反馈信息，给我们带来你的意见和建议。