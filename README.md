### theme

nuxtjs nextjs nestjs 能做SRR也能做server

nuxtjs 是Vue的SRR框架

nextjs 是React的SRR框架

nestjs 是node服务器框架

nestjs是mvc框架，而nuxtjs和nextjs是spa框架，
所以nestjs是后端框架，而nuxtjs和nextjs是前端框架

### $schema

为json文件添加schema，可以验证json文件的格式是否正确，提供代码提示等功能

### 安装nestjs

````sh
npm install -g @nestjs/cli
```sh

### nest g --help

    | name          │ alias       │ description                                  │
    │ application   │ application │ Generate a new application workspace         │
    │ class         │ cl          │ Generate a new class                         │
    │ configuration │ config      │ Generate a CLI configuration file            │
    │ controller    │ co          │ Generate a controller declaration            │
    │ decorator     │ d           │ Generate a custom decorator                  │
    │ filter        │ f           │ Generate a filter declaration                │
    │ gateway       │ ga          │ Generate a gateway declaration               │
    │ guard         │ gu          │ Generate a guard declaration                 │
    │ interceptor   │ itc         │ Generate an interceptor declaration          │
    │ interface     │ itf         │ Generate an interface                        │
    │ library       │ lib         │ Generate a new library within a monorepo     │
    │ middleware    │ mi          │ Generate a middleware declaration            │
    │ module        │ mo          │ Generate a module declaration                │
    │ pipe          │ pi          │ Generate a pipe declaration                  │
    │ provider      │ pr          │ Generate a provider declaration              │
    │ resolver      │ r           │ Generate a GraphQL resolver declaration      │
    │ resource      │ res         │ Generate a new CRUD resource                 │
    │ service       │ s           │ Generate a service declaration               │
    │ sub-app       │ app         │ Generate a new application within a monorepo

### nest项目结构

````

    │
    │ nest-cli.json
    │ package.json
    │ README.md
    │ src
    │ │ app
    │ │ │ app.controller.spec.ts
    │ │ │ app.controller.ts //控制器层
    │ │ │ app.module.ts //模块层
    │ │ │ app.service.spec.ts //单元测试
    │ │ │ app.service.ts //服务层
    │ │ │ main.ts //入口文件
    │ │ │ user
    │ │ │ │ dto //对象管理层 用来做验证比如名字是不是必填的
    │ │ │ │ entities //实体层 创建数据表的,用来做数据库映射
    │ │ │ │user.controller.spec.ts
    │ │ │ |user.controller.ts
    │ │ │ |user.module.ts
    │ │ │ |user.service.spec.ts
    │ │ │ |user.service.ts

````

### 安装prisma

```sh
npm i prisma --save-dev
````

初始化prisma

```sh
npx prisma init
```

成功后多出一个prisma文件夹和.env文件

### 数据库迁移

```sh
npx prisma migrate dev --name init
```

### 创建一个prisma service

```sh
nest g s prisma
```
