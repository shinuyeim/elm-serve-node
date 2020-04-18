# node-elm 接口文档
```
baseUrl: http://localhost:3000
```

---
## 目录：
[获取管理员列表](#获取管理员列表)<br/>
[获取商家列表](#获取商家列表)<br/>

---
## 接口列表：

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
[http://localhost:3000/admin/list?offset=0&limit=1](http://localhost:3000/admin/list?offset=5&limit=1)

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
[http://localhost:3000/merchant/all?offset=0&limit=20](http://localhost:3000/merchant/all?offset=0&limit=1)


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



