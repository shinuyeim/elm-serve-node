# elm-server RESTful API

## 设计指南
* URL定位资源，method定义动作
* 使用名词复数形式来描述资源
* 不要嵌套资源
* 在响应中返回错误详情
```
GET：用于检索资源。
POST：用于创建资源。
PUT：用于替换资源或集合。
PATCH：用于通过部分JSON数据更新资源。
DELETE：用于删除资源。
```
参考[GitHub REST API v3](https://developer.github.com/v3/)

---
## 接口目录：
[管理员注册](#管理员注册)</br>
[管理员登录](#管理员登录)</br>
[管理员信息变更](#管理员信息变更)</br>

[获取管理员列表](#获取管理员列表)<br/>
[删除管理员](#删除管理员)</br>

[获取商家列表](#获取商家列表)</br>
[获取商家信息](#获取商家信息)</br>
[删除商家](#删除商家)</br>
[新增商家](#新增商家)</br>
[更新商家](#更新商家)</br>

---

## 接口：

### BaseUrl
```
baseUrl: http://localhost:3000
```
### 管理员注册

#### 请求URL：
```
<baseUrl>/admins/register
```

#### 请求方式：
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|user_name|Y   |String | 注册用户名 |
|password|Y   |String | 用户密码   |

#### 请求示例：
```
POST {{baseUrl}}/register
Content-Type: application/json

{
  "username": "user1",
  "password": "123456"
}
```

#### 返回示例：

```json
201 Created
```
---

### 管理员登录
#### 请求URL：
```
<baseUrl>/admins/login
```

#### 请求方式：
```
POST
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|user_name|Y   |String | 注册用户名 |
|password|Y   |String | 用户密码   |

#### 请求示例：
```
POST {{baseUrl}}/register
Content-Type: application/json

{
  "username": "user1",
  "password": "123456"
}
```

#### 返回示例：

```json
200 OK
```
---

### 管理员信息变更
#### 请求URL：
```
<baseUrl>/admins/:id
```

#### 请求方式：
```
PUT
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|user_name    |Y   |String     | 注册用户名 |
|password     |N   |String     | 用户密码   |
|register_date|N   |ISO8601Date| 注册时间   |
|city         |N   |String     | 注册城市   |

#### 请求示例：
```
PUT {{baseUrl}}/register
Content-Type: application/json

{
  "username": "user1",
  "password": "123456"
}
```

#### 返回示例：

```json
200 OK
```
---

### 获取管理员列表

#### 请求URL：
```
<baseUrl>/admins
```

#### 请求方式：
```
GET
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|limit |N    |非负整数 | 获取数据数量，默认 20 |
|offset|N    |非负整数 | 跳过数据条数 默认 0 |

#### 请求示例：
```
GET {{baseUrl}}/admins?offset=0&limit=1
```

#### 返回示例：

```json
{
  "metadata": {
    "Total": 60,
    "Limit": 1,
    "LimitOffset": 0,
    "ReturnedRows": 1
  },
  "data": [
    {
      "privilege": 1,
      "_id": "5e9bd7dceddc242a34db862d",
      "user_name": "刘梓宇",
      "register_date": "2020-03-02T00:00:00.000Z",
      "city": "广州",
      "__v": 0
    }
  ]
}
```
---
### 删除管理员

#### 请求URL：
```
<baseUrl>/admins/:id
```


#### 请求方式：
```
DELETE
```

#### 参数类型：param

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|id    |Y       |objectID | 管理员id |

#### 请求示例：
```
DELETE {{baseUrl}}/admins/5e9bd7dceddc242a34db8631
```
#### 返回示例：

```
204 No Content
```

---
### 获取商家列表

#### 请求URL：
```
<baseUrl>/v1/merchants
```

#### 请求方式：
```
GET
```

#### 参数类型：query

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|limit |N    |非负整数 | 获取数据数量，默认 20 |
|offset|N    |非负整数 | 跳过数据条数 默认 0 |

#### 请求示例：
```
GET {{baseUrl}}/v1/merchants?offset=0&limit=1
```
#### 返回示例：

```json
{
  "metadata": {
    "Total": 55,
    "Limit": 1,
    "LimitOffset": 0,
    "ReturnedRows": 1
  },
  "data": [
    {
      "_id": "5e9bd7dceddc242a34db8632",
      "shop_name": "同福客栈",
      "register_date": "2020-03-04T00:00:00.000Z",
      "address": "浦东南路星空广场B1层248号",
      "phone": "13781272526",
      "introduction": "“同福客栈”是电视剧《武林外传》中的客栈名称，是本电视剧故事发生的主要地点。",
      "__v": 0
    }
  ]
}
```

---
### 获取商家信息

#### 请求URL：
```
<baseUrl>/v1/merchants/:id
```

#### 请求方式：
```
GET
```

#### 参数类型：param

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|id |Y   |objectID | 商家id |


#### 请求示例：
```
GET {{baseUrl}}/v1/merchants/5e9bd936f0161441ac9da486
```
#### 返回示例：

```json
{
  "data": {
    "_id": "5e9bd936f0161441ac9da486",
    "shop_name": "同福客栈",
    "register_date": "2018-04-18T05:52:39.000Z",
    "address": "西湖路万达广场B1层435号",
    "phone": "18725451286",
    "introduction": "同福客栈是电视剧《武林外传》中的客栈名称，是本电视剧故事发生的主要地点。",
    "__v": 0
  }
}
```

---
### 删除商家

#### 请求URL：
```
<baseUrl>/v1/merchants/:id
```

#### 请求方式：
```
DELETE
```

#### 参数类型：param

|参数|是否必选|类型|说明|
|:-----|:-------:|:-----|:-----|
|id    |Y       |objectID | 商家id |

#### 请求示例：
```
DELETE {{baseUrl}}/v1/merchants/5e9bd936f0161441ac9da486
```
#### 返回示例：

```
204 No Content
```
---
### 新增商家


#### 请求URL：
```
<baseUrl>/v1/merchants
```

#### 请求方式：
```
POST
```

#### 参数类型：body

|参数|是否必选|类型|说明|
|:-----|:------:|:-----|:-----|
|shop_name     |Y |String      | 商家名称 |
|register_date |Y |ISO8601Date | 注册日期 |
|address       |Y |String      | 商家地址|
|phone         |Y |String      | 联系方式 |
|introduction  |N |String      | 商家简介 |

#### 请求示例：
```
POST {{baseUrl}}/v1/merchants
Content-Type: application/json

{
    "shop_name":"同福客栈",
    "register_date":"2020-04-18T13:52:39",
    "address":"西湖路万达广场B1层436号",
    "phone":"18446905856",
    "introduction":"同福客栈是电视剧《武林外传》中的客栈名称，是本电视剧故事发生的主要地点。"
} 
```
#### 返回示例：
```
201 Created
```
---
### 更新商家


#### 请求URL：
```
<baseUrl>/v1/merchants/:id
```

#### 请求方式：
```
PATCH
```

#### 参数类型
参数类型：param
|参数|是否必选|类型|说明|
|:-----|:------:|:-----|:-----|
|id    |Y |objectID    | 商家id |

参数类型：body

|参数|是否必选|类型|说明|
|:-----|:------:|:-----|:-----|
|shop_name     |N |String      | 商家名称 |
|register_date |N |ISO8601Date | 注册日期 |
|address       |N |String      | 商家地址|
|phone         |N |String      | 联系方式 |
|introduction  |N |String      | 商家简介 |

#### 请求示例：
```
PATCH  {{baseUrl}}/v1/merchants/5e9c00b934735409240ca51a
Content-Type: application/json

{
    "address":"西湖路万达广场B1层436号",
    "phone":"18725451268"
} 
```
#### 返回示例：
```
200 OK
```
---

