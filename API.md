# node-elm 接口文档
```
baseUrl: http://localhost:3000
```

---
## 目录：
[获取管理员列表](#获取管理员列表)<br/>
[删除管理员](#删除管理员)</br>

[获取商家列表](#获取商家列表)</br>
[删除商家](#删除商家)</br>
[新增商家](#新增商家)</br>
[更新商家](#更新商家)</br>


---
## 接口：

### 获取管理员列表


#### 请求URL：
```
<baseUrl>/admin/list
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
GET {{baseUrl}}/admin/list?offset=0&limit=1
```

#### 返回示例：

```json
{
    "metadata": {
        "Total": 60,
        "Limit": 1,
        "LimitOffset": 5,
        "ReturnedRows": 1
    },
    "data": [
        {
            "privilege": 1,
            "_id": "5e970516e26a87334c4b0241",
            "user_name": "刘浩杰",
            "password": "59WBLZ>AT7",
            "register_date": "2019-09-09T00:00:00.000Z",
            "city": "深圳",
            "__v": 0
        }
    ]
}
```
---
### 删除管理员

#### 请求URL：
```
<baseUrl>/admin/:id
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
DELETE {{baseUrl}}/admin/5e970515e26a87334c4b0212
```
#### 返回示例：

```json
{
  "status": 0,
  "massage": "Delete sucess."
}
```
---

### 获取商家列表

#### 请求URL：
```
<baseUrl>/merchant/all
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
GET {{baseUrl}}/merchant/all?offset=0&limit=1
```
#### 返回示例：

```json
{
    "requst_metadata": {
        "Total": 1,
        "Limit": 1,
        "LimitOffset": 0,
        "ReturnedRows": 1
    },
    "data": [
        {
            "_id": "5e970516e26a87334c4b0250",
            "shop_name": "同福客栈",
            "register_date": "2018-03-08T00:00:00.000Z",
            "address": "长寿路189弄购物中心456号",
            "__v": 0
        }
    ]
}
```
---
### 删除商家


#### 请求URL：
```
<baseUrl>/merchant/:id
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
DELETE {{baseUrl}}/merchant/5e970516e26a87334c4b0250
```
#### 返回示例：

```json
{
  "status": 0,
  "massage": "Delete sucess."
}
```
---
### 新增商家


#### 请求URL：
```
<baseUrl>/merchant/create
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
POST {{baseUrl}}/merchant/create
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
```json
{
  "status": 0,
  "massage": "Create sucess."
}
```
---
### 更新商家


#### 请求URL：
```
<baseUrl>/merchant/:id
```

#### 请求方式：
```
PUT
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
PUT {{baseUrl}}/merchant/:id
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
```json
{
  "status": 0,
  "massage": "Updata sucess."
}
```
---

