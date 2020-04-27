# elm-server RESTful API

## 设计指南

- URL 定位资源，method 定义动作
- 使用名词复数形式来描述资源
- 不要嵌套资源
- 在响应中返回错误详情

```
GET：用于检索资源。
POST：用于创建资源。
PUT：用于替换资源或集合。
PATCH：用于通过部分JSON数据更新资源。
DELETE：用于删除资源。
```

参考 [GitHub REST API v3](https://developer.github.com/v3/)

---

## 接口目录：

[用户登录](#用户登录)</br>
[更新用户信息](#更新用户信息)</br>

[注册管理员](#注册管理员)</br>
[获取管理员信息](#获取管理员信息)<br>
[管理员信息更新](#更新管理员信息)</br>
[获取管理员列表](#获取管理员列表)<br/>
[删除管理员](#删除管理员)</br>

[注册商家](#注册商家)</br>
[更新商家](#更新商家)</br>
[获取商家列表](#获取商家列表)</br>
[获取商家信息](#获取商家信息)</br>
[删除商家](#删除商家)</br>

---

## 接口：

### 公共变量

```
baseUrl: http://localhost:3000/api
authorization = Authorization: Bearer <token>
```

## 用户

### 用户登录

#### 请求 URL：

```
<baseUrl>/login
```

#### 请求方式：

```
POST
```

#### 参数类型：query

| 参数      | 是否必选 | 类型   | 说明       |
| :-------- | :------: | :----- | :--------- |
| user_name |   Y      | String | 注册用户名 |
| password  |   Y      | String | 用户密码   |

#### 请求示例：

```
POST {{baseUrl}}/login
Content-Type: application/json

{
  "user_name": "user2",
  "password": "123456"
}
```

#### 返回示例：

```
200 OK

<token>
```

> `401 Unauthorized` 未认证，用户没有有效身份信息。</br> `403 Forbidden` 未授权，用户身份有效，但是权限不够。

---

### 更新用户信息

#### 请求 URL：

```
<baseUrl>/users/:id
```

#### 请求方式：

```
PUT
```

#### 参数类型：query

| 参数         | 是否必选 | 类型   | 说明       |
| :----------- | :------: | :----- | :--------- |
| password     |   Y      | String | 用户密码   |
| new_password |   Y      | String | 用户新密码 |

#### 请求示例：

```
PUT {{baseUrl}}/users/5ea44f0a4795991a34a80ba6
{{authorization}}
Content-Type: application/json

{
  "password":"12345678",
  "new_password":"123456"
}
```

#### 返回示例：

```
200 OK

<token>
```

---

## 管理员

### 注册管理员

#### 请求 URL：

```
<baseUrl>/register/admin
```

#### 请求方式：

```
POST
```

#### 参数类型：body

| 参数      | 是否必选 | 类型   | 说明       |
| :-------- | :------: | :----- | :--------- |
| user_name |   Y      | String | 注册用户名 |
| password  |   Y      | String | 用户密码   |

#### 请求示例：

```
POST {{baseUrl}}/register/admin
Content-Type: application/json

{
  "user_name": "user3",
  "password": "12345678"
}
```

#### 返回示例：

```
201 Created
```

---

### 获取管理员信息

#### 请求 URL：

```
<baseUrl>/admins/:id
```

#### 请求方式：

```
GET
```

#### 参数类型：param

| 参数 | 是否必选 | 类型   | 说明      |
| :--- | :------: | :----- | :-------- |
| id   |   Y      | String | 管理员 ID |

#### 请求示例：

```
GET {{baseUrl}}/admins/:id
{{authorization}}
```

#### 返回示例：

```json
{
  "_id": "5ea44e83ed9ee81cf4895b0f",
  "name": "马云",
  "privilege": 0,
  "city": "上海",
  "user_name": "user1",
  "register_date": "2020-04-25T14:51:09.724Z"
}
```

---

### 更新管理员信息

#### 请求 URL：

```
<baseUrl>/admins/:id
```

#### 请求方式：

```
PUT
```

#### 参数类型：body

| 参数 | 是否必选 | 类型   | 说明     |
| :--- | :------: | :----- | :------- |
| name |   N      | String | 呢称     |
| city |   N      | String | 注册城市 |

#### 请求示例：

```
PUT {{baseUrl}}/admins/5ea44f0a4795991a34a80ca7
{{authorization}}
Content-Type: application/json

{
  "name":"马云",
  "city":"上海"
}
```

#### 返回示例：

```json
200 OK
```

---

### 获取管理员列表

#### 请求 URL：

```
<baseUrl>/admins
```

#### 请求方式：

```
GET
```

#### 参数类型：query

| 参数 | 是否必选 | 类型 | 说明 |
| :----- | :------: | :---- |：---|
| limit | N   | 非负整数 | 获取数据数量，默认 20 |
| offset | N  | 非负整数 | 跳过数据条数 默认 0 |

#### 请求示例：

```
GET {{baseUrl}}/admins?offset=0&limit=1
{{authorization}}
```

#### 返回示例：

```json
{
  "metadata": {
    "Total": 3,
    "Limit": 1,
    "LimitOffset": 0,
    "ReturnedRows": 1
  },
  "data": [
    {
      "privilege": 0,
      "_id": "5ea44e83ed9ee81cf4895b0f",
      "__v": 0,
      "city": "上海",
      "name": "马云"
    }
  ]
}
```

---

### 删除管理员

#### 请求 URL：

```
<baseUrl>/admins/:id
```

#### 请求方式：

```
DELETE
```

#### 参数类型：param

| 参数   | 是否必选 | 类型     | 说明      |
| :----- | :------: | :------- | :-------- |
| id     | Y        | objectID | 管理员 id |

#### 请求示例：

```
DELETE {{baseUrl}}/admins/5e9bd7dceddc242a34db8631
{{authorization}}
```

#### 返回示例：

```
204 No Content
```

---

## 商家

### 注册商家

#### 请求 URL：

```
<baseUrl>/register/merchant
```

#### 请求方式：

```
POST
```

#### 参数类型：body

| 参数          | 是否必选 | 类型   | 说明     |
| :------------ | :------: | :----- | :------- |
| user_name     |    Y     | String | 用户名称 |
| password      |    Y     | String | 用户密码 |

#### 请求示例：

```
POST {{baseUrl}}/register/merchant
Content-Type: application/json

{
   "user_name": "user7",
   "password": "123456789"
}
```

#### 返回示例：

```
201 Created
```

---

### 更新商家

#### 请求 URL：

```
<baseUrl>/merchants/:id
```

#### 请求方式：

```
PUT
```

#### 参数类型

参数类型：param
|参数|是否必选|类型|说明|
|:-----|:------:|:-----|:-----|
|id    |Y |objectID | 商家 id |

参数类型：body

| 参数               | 是否必选 | 类型   | 说明       |
| :----------------- | :------: | :----- | :--------- |
| name               |    N     | String | 商家名称   |
| phone              |    N     | String | 联系方式   |
| introduction       |    N     | String | 商家简介   |
| address            |    N     | String | 商家地址   |
| delivery_cost      |    N     | String | 配送价     |
| min_delivery_price |    N     | String | 最低起送价 |

#### 请求示例：

```
PUT  {{baseUrl}}/merchants/5ea6e4a260e3ac01005f6b41
{{authorization}}
Content-Type: application/json

{
  "name": "盒马",
  "phone": "18514965823",
  "introduction": "盒马是阿里巴巴集团旗下，以数据和技术驱动的新零售平台。盒马希望为消费者打造社区化的一站式新零售体验中心，用科技和人情味带给人们“鲜美生活”",
  "address": "张杨路3611号金桥国际商业广场1座B1层",
  "delivery_cost": 5,
  "min_delivery_price": 20
}
```

#### 返回示例：

```
200 OK
```

---

### 获取商家列表

#### 请求 URL：

```
<baseUrl>/merchants
```

#### 请求方式：

```
GET
```

#### 参数类型：query

| 参数   | 是否必选 | 类型     | 说明                  |
| :----- | :------: | :------- | :-------------------- |
| limit  |  N       | 非负整数 | 获取数据数量，默认 20 |
| offset |  N       | 非负整数 | 跳过数据条数 默认 0   |

#### 请求示例：

```
GET {{baseUrl}}/merchants?offset=0&limit=1
{{authorization}}
```

#### 返回示例：

```json
{
  "metadata": {
    "Total": 1,
    "Limit": 1,
    "LimitOffset": 0,
    "ReturnedRows": 1
  },
  "data": [
    {
      "delivery_cost": 5,
      "min_delivery_price": 20,
      "_id": "5ea6e57c60e3ac01005f6b43",
      "user": "5ea6e57c60e3ac01005f6b42",
      "__v": 0,
      "address": "张杨路3611号金桥国际商业广场1座B1层",
      "introduction": "盒马是阿里巴巴集团旗下，以数据和技术驱动的新零售平台。盒马希望为消费者打造社区化的一站式新零售体验中心，用科技和人情味带给人们“鲜美生活”",
      "name": "盒马",
      "phone": "18514965823"
    }
  ]
}
```

---

### 获取商家信息

#### 请求 URL：

```
<baseUrl>/merchants/:id
```

#### 请求方式：

```
GET
```

#### 参数类型：param

| 参数 | 是否必选 | 类型     | 说明    |
| :--- | :------: | :------- | :------ |
| id   |   Y      | objectID | 商家 id |

#### 请求示例：

```
GET {{baseUrl}}/merchants/5e9bd936f0161441ac9da486
{{authorization}}
```

#### 返回示例：

```json
{
  "_id": "5ea6e57c60e3ac01005f6b43",
  "name": "盒马",
  "address": "张杨路3611号金桥国际商业广场1座B1层",
  "phone": "18514965823",
  "introduction": "盒马是阿里巴巴集团旗下，以数据和技术驱动的新零售平台。盒马希望为消费者打造社区化的一站式新零售体验中心，用科技和人情味带给人们“鲜美生活”",
  "delivery_cost": 5,
  "min_delivery_price": 20,
  "user_name": "user7",
  "register_date": "2020-04-27T13:56:11.692Z"
}
```

---

### 删除商家

#### 请求 URL：

```
<baseUrl>/merchants/:id
```

#### 请求方式：

```
DELETE
```

#### 参数类型：param

| 参数   | 是否必选 | 类型     | 说明    |
| :----- | :------: | :------- | :------ |
| id     | Y        | objectID | 商家 id |

#### 请求示例：

```
DELETE {{baseUrl}}/merchants/5e9bd936f0161441ac9da486
{{authorization}}
```

#### 返回示例：

```
204 No Content
```

---
