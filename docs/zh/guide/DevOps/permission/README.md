# 权限配置

[[toc]]

::: tip
这部分主要讲解关于系统中权限相关的说明
:::

::: warning
注意：超级管理员用户不受权限限制，默认拥有所有权限  
:::

## 菜单库



## 站点管理

> 进行站点的初始化操作。
- 1.集团的站点地址是http://172.16.0.165
- 2.若是未部署的矿井及二级公司，站点地址也是http://172.16.0.165
- 3.若是已单独部署了服务器的矿井，站点地址是矿端服务器的地址。

## 站点菜单配置

> 进行各站点菜单的配置。
> 一般情况下禁止使用“复制站点菜单”的功能，因为这样会导致目前已经配置好的站点菜单被覆盖。只有新创建站点时可以使用“复制站点菜单”功能快速创建站点菜单。
> 若需要进行菜单的调整，需要使用超级管理员进行配置，而且尽量是一个菜单一个菜单进行配置。
> 若有新菜单需要配置，需要由开发人员先配置好菜单库。
 
## 组织机构

> 创建集团的组织机构，其实更好的创建方法是先创建一个公司的组织机构，下面是集团本部、二级公司（若有矿井，则矿井在二级公司下面）、矿井。
> 大类创建以后，再创建初始的科室名称。
> 由运维人员统一调整组织机构，矿端若需要调整组织机构，需要先和运维人员联系。

## 用户管理

**关于管理员**
  
  默认登陆用户`lrsys`已经是超级管理员权限了。 
  每个矿井都有一个矿端管理员，如lyadmin，命名规则是`煤矿简称+admin`，超级管理员把权限配置给矿端管理员，再由矿端管理员管理本矿的其他人员。

**公共账号设置**

> 默认平台搭建完以后可创建公共帐号进行功能测试。
- 各专业公共账号示例：[下载地址](https://pan.baidu.com/s/1fKA6YnpUo0LbYG7Duy6v3w) 链接: https://pan.baidu.com/s/1fKA6YnpUo0LbYG7Duy6v3w 提取码: 5f9x
  

**平台用户导入**

> 需先匹配组织机构，再进行用户导入，否则未被匹配的组织机构下的用户导入后默认在矿端名称根目录下面。

**平台用户组织机构调整**

- 1.若是用户离职，则删除该用户，同时该用户所绑定的安全专业的隐患和三违信息也会丢失。
- 2.若用户从一个矿井单位去另一个矿井单位或者从集团到矿井单位，需删除旧的账号，在新的站点创建新账号并配置权限。
- 3.若用户从矿井内部的科室到另一个科室，需调整该用户所处的科室，然后重新配置权限。

## 角色管理

**权限设置规则，初始化公共账号权限**

> 讲解组织机构设置、菜单库配置、角色权限配置的方法。
- 临矿项目平台用户及权限创建规则：[下载地址](https://pan.baidu.com/s/1dHOVZGVtNyyt2h17jouyxg) 链接: https://pan.baidu.com/s/1dHOVZGVtNyyt2h17jouyxg 提取码: xjq6

**各业务模块责任人账号权限**

> 上线前根据实际情况配置每个人的账号权限。
- 业务模块责任人员排定表示例：[下载地址](https://pan.baidu.com/s/19YRMedn2wTyceAQrZfXpfQ) 链接: https://pan.baidu.com/s/19YRMedn2wTyceAQrZfXpfQ 提取码: eqpc


## 移动端权限配置

- 先下载APP，目前只有安卓的APP，暂无ios的APP。登陆PC平台后点击平台右上角的用户名，扫码下载，使用手机扫码。
- 使用超级管理员或矿端管理员登陆app。或者使用pc端f12开移动调试输入http://221.2.76.14:9092/passport/loginH5 但这种调权限时，每调整一次权限就要清理一次缓存。
- 点击全部分类，下拉找到平台工具-权限管理。
- 找到一个角色，左滑，进行权限配置和添加用户的设置。
- ![](/xeOhlNmjzFDYAyL.jpg)
- 显示为on的是已经添加过权限了。
- ![](/9sdGLV7FOg5tjai.jpg)
- 若需要添加用户，给该角色添加这个人员，使用搜索，输入账号，并将这个人的右侧由off改为on。
- ![](/V3IUiHGfusAeMYg.jpg)

