get_user

{
  'errcode',
  user:{

  },
}

### 第1个 request(get) get_pre_wishes.php

* 获取事先既定愿望

* 无需前端发送数据

* 后台传输数据有
* 数据直接.errmsg .request获取

  ```php
  $array_random=[
      'errmsg'=>$random_wish,//这个为传输给前端的愿望内容，每次一条
      'request'=>$request_times,//方便后台调试，检查错误，前端无需获取
      'get_id'=>$get_id//方便后台调试，前端无需获取
  ]
  `
### 第2个request :save_wish.php

* 储存用户许下的愿望，无论是选择我们设定好的还是自定义的，保存许愿都用同一个

* 需要前端发送许愿内容

  ```javascript
  [
      'wish_content':许愿的具体内容
  ]
  ```

* 后台将返回三种状态

*。直接.errcode  .errmsg 都是简单.获取

  ```php
  $warn=[
      'errcode'=>$errcode,//value分别为0，1,2
      'errmsg'=>$errmsg //value与errcode相对应为 "success！"，"今天许愿次数已满，请明天再来"，"输入的内容不能为空"
       'name'=>$name, //这三个信息用于提交愿往后展示许愿人信息，助于修改或填写
       'telephone'=>$telephone,
       'weinxin'=>$weinxin
  ]
  ```





### 第3个request：commit_info.php

* 个人信息修改或默认后提交

* 需前端发送的数据有

  ```javascript
  {
       'name':xxx,
       'telephone':xxx,
       'weixin':xxx
  }
  ```

* 后台传的数据为
* 直接.获取

  ```php
  [
      'errcode'=>xx,//三种状态0,1,2
      'errmsg'=>xxx//对应的信息为"修改成功","添加信息成功"，"信息不能为空"
  ]
  ```

  

### 第4个request(get):help_wish.php

* 我要助愿，浏览愿望

* 无需前端发送数据

* 后台将随机传送愿望，一次3条,**response**显示为

  ```
  [{"id":1,"wish_content":"xxxx"},{"id":2,"wish_content":"xxxx"},{"id":3,"wish_content":"xxxx"}，{相同}]
  ```

* 这里只展示了一部分参数，前台根据需要选择，但是一定要记好每条愿望的**id**,后面确定助愿时需要前端返回这两个数据

  
### 第5个request：after_help_show_info.php

* 点击查看愿望对应的许愿人的信息

* 需要前端传对应愿望的id

  ```javascript
  {
      "id":xxx   
  }
  ```


* 后台返回对应的用户信息,**response**显示为

  ```php
  [{"id":XX,"telephone":XXX,"weixin":XXXX，"name":xxx}]
  ```



### 第6个request: commit_help.php

* 确认祝愿

* 前端需传回愿望的id

  ```javascript
  {
      "id":xxx
  }
  ```

* 后台进行处理后，返回三种状态
* 简单.获取
  ```php
  {
      'errcode'=>XXX,//0，1，2
      'errmsg'=>XXX//对应"领取成功，恭喜你获得了一只精灵球，快去打开看看吧"，"今天祝愿次数已满，请明天再来"，"请试试其它愿望(与他人助愿冲突)"
  }
  ```



### 第7个request(get)：ball_list.php

* 查看精灵球

* 前端不需要传数据

* 后台返回
* 直接.获取

  ```php
  [
      'now_total_ball'=>xxx//前端需要展示的精灵球的个数，用这个，total_ball的那个不用
  ]
  ```



### 第8个request(get):fairy_list.php

* 查看精灵

* 前端不需要传数据

* 后台返回
* response 为


  ```php
 {"path_array":["img\/fairy\/1.png","img\/fairy\/8.png"],"fairy_num":"2"}
  ```

  

### 第9个request(get)：open_ball.php

* 点击精灵球孵化精灵

* 前端不需要发送数据

* 后台进行操作后返回
* 直接 .获取
  ```php
  [
      'errcode'=>xxx,//value:0,235
      'errmsg'=>xxx,//value:"已经没有空的精灵球了"，"孵化成功"
     
      'fairy_path'=>xxx//精灵图片路径，只有一条
  ]
  response 为
  {"errcode":0,"errmsg":"\u5b75\u5316\u6210\u529f","fairy_path":"img\/fairy\/2.png"}
  ```

  

### 第10个request(get):my_wishes.php

* 查看我的愿望（包括许愿加助愿）

* 前端不需要发送数据

* 后台返回愿望数组，**response**的显示为

  ```php
  [{"id":28,"wish_content":"dsfdf","situation":"已领取"},{"id":29,"wish_content":"dsfdfdfdfsdf","situation":"未领取"}，{"id":31,"wish_content":"dsfdfdfdfsdfdfdsfsfdfd","situation":"未领取"},{"id":19,"wish_content":"少付付","situation":"已帮助"},{"id":20,"wish_content":"付付反少时诵诗书所所所所所","situation":"已帮助"},{"id":27,"wish_content":"d","situation":"已帮助"}]

* 前端需储存**id**, 请求after_help_show_info时需要

### 第11个request(get):my_help.php

* 查看我的祝愿

* 前端不需要发送数据

* 后台返回领取的愿望数组，response的显示与第10个的一样

  
