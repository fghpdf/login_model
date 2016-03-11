nodejs登录模板
=============

做这个模板希望以后能减少重复工作的时间，让工作更加高效吧

接下来要详细介绍模板制作中使用的技术和遇到的难题

在总结中提高自己的实力

[我的github](https://github.com/fghpdf)

[从这看更舒服](http://www.jianshu.com/p/c7deec5f68d8)

---

###采用技术

主体逻辑：[express4](http://expressjs.com/)

登录验证：[passport](http://passportjs.org/)

数据库连接和查询：[kenx](http://knexjs.org/) + [bookshelf](http://bookshelfjs.org/)

数据库：mysql

工具：webstorm11

---

###工具调教
这次最大的问题出在这里，工具不会用浪费了很多时间，所以把调教方法记录下来，以备后患
####nodejs环境搭建
在File->Settings->Languages & Frameworks->Javascripts->Libiraries中，需要很多包
右边有一个download，可以下载需要的库，不用说，都安上

![Libiraries](http://upload-images.jianshu.io/upload_images/187240-555654bb8d38618c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![Download](http://upload-images.jianshu.io/upload_images/187240-26ffc2d564be91bf.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这样子，webstorm能少报很多错

其次，快捷键ALT+ENTER能帮助解决问题，很好用

最后，有一些自己的词汇在字典中没有，webstorm有拼写检查，字典中没有的单词会在该词下打破浪线，看的让人很不爽。建议不要关掉拼写检查，右键它，有加入字典的选项，这样更方便些。

---

###passport

passport还是给自己带来了很大的困扰的

一句话，还是理解了最好

一个不错的中文网站：[passport.js学习笔记](http://idlelife.org/archives/808)

上面讲的特别全面，足够排忧解难了


---

###knex

knex是一个集成了Postgres, MySQL, MariaDB,SQLite3, and Oracle这些数据库连接查询的模块

非常好用

下面简单叙述一下mysql相关的使用方法

#####安装
```
npm install knex
```
####连接数据库
```
var knex = require('knex')({ 
    client: 'mysql', //数据库类型
    connection: { 
        host : '127.0.0.1', 
        user : 'your_database_user', //数据库用户名
        password : 'your_database_password', //用户名对应的密码
        database : 'myapp_test' //要使用的数据库名
}});
```
可以加入连接池
```
var knex = require('knex')({ 
    client: 'mysql', //数据库类型
    connection: { 
        host : '127.0.0.1', 
        user : 'your_database_user', //数据库用户名
        password : 'your_database_password', //用户名对应的密码
        database : 'myapp_test' //要使用的数据库名
    }, 
    pool: { 
        min: 0, 
        max: 7 
}});
```
可以加入断线重连的时间
```
var knex = require('knex')({ 
    client: 'pg', 
    connection: {...}, 
    pool: {...}, 
    acquireConnectionTimeout: 10000 
});
```
#####查询

查询非常方便，不用再写sql语句了，下面来看一下吧

**SELECT**
```
knex.select('title', 'author', 'year').from('books')
//等同于
select `title`, `author`, `year` from `books`
```
**as**
```
knex.avg('sum_column1').from(function() { 
    this.sum('column1 as sum_column1').from('t1').groupBy('column1').as('t1')
}).as('ignored_alias')
//等同于
select avg(`sum_column1`) from (select sum(`column1`) as `sum_column1` from `t1` group by `column1`) as `t1`
```
**column**
```
knex.column('title', 'author', 'year').select().from('books')
//等同于
select `title`, `author`, `year` from `books`
```
**where**
```
knex('users').where('id', 1)
//等同于
select * from `users` where `id` = 1

knex('users').where({ 
    first_name: 'Test', 
    last_name: 'User'
}).select('id')
//等同于
select `id` from `users` where `first_name` = 'Test' and `last_name` = 'User'

knex('users').where('votes', '>', 100)
//等同于
select * from `users` where `votes` > 100
```

更多的语法可以去官网上查看


---

###Bookshelf
bookshelf是在knex基础上做数据匹配的，用起来也是很方便

#####安装
```
npm install bookshelf//必须先安装knex
```

直接参考官网的例子吧，能说明一切


---
###学习网站
提供一些不错的学习网站以供参考

[从零开始nodejs系列文章](http://blog.fens.me/series-nodejs/)

[cnode论坛](https://cnodejs.org/)

[基础课程](http://www.hubwiz.com/course/?type=nodes)

[歪果仁写的教程](http://yifeed.com/passportjs-mysql-expressjs-authentication.html)
