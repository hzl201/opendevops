# 数据库维护
[[toc]]

::: tip
这部分主要是平台运维数据库备份的介绍。
:::


## **精简数据库**

- 监测类的数据库中安全监测和人员定位的节点数据库的数据量是最大的，需要定期进行清理。
- 下面是删除安全监测节点库历史数据的脚本：人员定位节点库类似，把'%SM_AnalogStatistics_%'换成其他的就行。目前只能手动指定时间段，改create_date<'2019-04-01'的时间为1个月或三个月前的日期，不知道有没有自动根据当前时间删除3个月前数据的方法。

```shell
declare @TableName nvarchar(64);
declare @create_date nvarchar(64);
	
DECLARE MY_CUR CURSOR FOR  --声明游标
SELECT name,create_date FROM sys.tables where (name like '%SM_AnalogStatistics_%' or name like '%SM_HistoryData_%' or name like '%SM_HourStatistics_%' or name like '%SM_DayStatistics_%')
 and  create_date<'2019-04-01' and create_date>'2015-12-09'

OPEN MY_CUR    --打开游标
FETCH NEXT FROM MY_CUR    --获取游标的下一行
into @TableName,@create_date
WHILE @@FETCH_STATUS = 0    --FETCH语句执行成功 
BEGIN
declare @exesql nvarchar(1000);
declare @table varchar(50);
set @table=@TableName;
IF EXISTS  (SELECT  * FROM dbo.SysObjects WHERE ID = object_id(N'['+@table+']') AND OBJECTPROPERTY(ID, 'IsTable') = 1) 
begin
set @exesql='DROP TABLE '+@table+''
print  @exesql
execute sp_executesql @exesql
end
ELSE 
PRINT'不存在'
FETCH NEXT FROM MY_CUR    --获取游标的下一行
    into @TableName,@create_date
END
CLOSE MY_CUR    --关闭游标
DEALLOCATE MY_CUR    --释放游标
```

- 中心库中会积累很多过期的报警数据，需要定期进行清理。
- 下面是删除报警数据的脚本：

```shell
  delete FROM [SafetyMonitor_Center_ZM].[dbo].[SM_WarnData] where Time<='2019-01-01'
```

## 数据库备份

- sql server 数据库备份方法 链接: https://pan.baidu.com/s/1PVXRZmn-A7DMhCVJPAUQfw 提取码: cemx