# 监测数据检查
[[toc]]

::: tip
这部分主要是监测监控数据检查要点。临矿集团安全生产信息共享平台集成10对生产矿井安全监测系统，通过平台实现数据的实时展示、报警预警及统计分析，实现煤矿安全的远程监控。但在实际工作中，存在系统集成的不稳定性，同时，数据的实时性、完整性、准确性也存的问题。鉴于以上情况，对于异常现象,特编写监测监控数据的实施指导资料。
:::

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