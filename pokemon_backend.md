### 第1个 request get_pre_wishes.php

* 获取事先既定愿望

* 无需前端发送数据

* 后台传输数据有

  ```php
  $array_random=[
      'errmsg'=>$random_wish,//这个为传输给前端的愿望内容，每次一条
      'request'=>$request_times,//方便后台调试，检查错误，前端无需获取
      'get_id'=>$get_id//方便后台调试，前端无需获取
  ]
  ```

### 第2个request :save_wish.php

* 储存用户许下的愿望，无论是选择我们设定好的还是自定义的，保存许愿都用同一个

* 需要前端发送许愿内容

  ```javascript
  [
      'wish_content':许愿的具体内容
  ]
  ```

* 后台将返回三种状态

  ```php
  $warn=[
      'errcode'=>$errcode,//value分别为0，1,2
      'errmsg'=>$errmsg //value与errcode相对应为 "success！"，"今天许愿次数已满，请明天再来"，"输入的内容不能为空"
  ]
  ```

### 第3个request: show_info.php

* 填写或修改个人信息

* 无需前端发送数据

* 后台将返回

  ```php
  $info_array[
      'name'=>$name, 
      'telephone'=>$telephone,
      'weinxin'=>$weinxin
  ]
  ```

### 第4个request：commit_info.php

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

  ```php
  [
      'errcode'=>xx,//三种状态0,1,2
      'errmsg'=>xxx//对应的信息为"修改成功","添加信息成功"，"信息不能为空"
  ]
  ```

  

### 第5个request:help_wish.php

* 我要助愿，浏览愿望

* 无需前端发送数据

* 后台将随机传送愿望，一次4条,response显示为

  ```
  [{"id":1,"wish_content":"xxxx","wisher_id":"xxx"},{"id":2,"wish_content":"xxxx","wisher_id":"xxx"},{"id":3,"wish_content":"xxxx","wisher_id":"xxx"}，{相同}]
  ```

* 这里只展示了一部分参数，前台根据需要选择，但是一定要记好每条愿望的id,和wisher_id,后面确定助愿时需要前端返回这两个数据

  
### 第6个request：after_help_show_info.php

* 点击查看愿望对应的许愿人的信息

* 需要前端传对应愿望的wisher_id

  ```javascript
  {
      "wisher_id":xxx   
  }
  ```


* 后台返回对应的用户信息,response显示为

  ```php
  [{"id":XX,"user_id":"XXX","telephone":XXX,"weixin":XXXX}]
  ```



### 第7个request: commit_help.php

* 确认祝愿

* 前端需传回愿望的id

  ```javascript
  {
      "id":xxx
  }
  ```

* 后台进行处理后，返回三种状态

  ```php
  {
      'errcode'=>XXX,//0，1，2
      'errmsg'=>XXX//对应"领取成功"，"今天祝愿次数已满，请明天再来"，"请试试其它愿望(与他人助愿冲突)"
  }
  ```



### 第8个request：ball_list.php

* 查看精灵球

* 前端不需要传数据

* 后台返回

  ```php
  [
      "total_ball"=>xxx,//获得的精灵球个数
      "tatoal_had_fetched"=>XXX,//已打开的精灵球个数
      "ball_path"=>xxx//图片路径，所有的精灵球都是一样的
  ]
  ```



### 第9个request:fairy_list.php

* 查看精灵

* 前端不需要传数据

* 后台返回

  ```php
  [
      'path_array'=>xxxx,//需要展示的所有精灵的 图片路径的数组
      'fairy_num'=>xxx //精灵个数
  ]
  ```

  

### 第10个request：open_ball.php

* 点击精灵球孵化精灵

* 前端不需要发送数据

* 后台进行操作后返回

  ```php
  [
      'errcode'=>xxx,//value:0,235
      'errmsg'=>xxx,//value:"已经没有空的精灵球了"，"孵化成功"
      'detailed_msg'=>xxx // 后台调试时可以查看，前端不用理会
  ]
  ```

  

### 第11个request:my_wishes.php

* 查看我的许愿

* 前端不需要发送数据

* 后台返回愿望数组，response的显示为(前端根据需要，选取wish_content展示即可)

  ```php
  [{"id":x,"wish_content":"xxxxxx","wisher_id":"xxx","helper_id":"xxxx","situation":"xxxx","helper_open":"xxx","ball_path":"NULL","fairy_path":"NULL","time":"xxxx"},{"id":x,"wish_content":"xxxxxx","wisher_id":"xxx","helper_id":"xxxx","situation":"xxxx","helper_open":"xxx","ball_path":"NULL","fairy_path":"NULL","time":"xxxx"},....,...]
  ```

  

### 第12个request:my_help.php

* 查看我的祝愿

* 前端不需要发送数据

* 后台返回领取的愿望数组，response的显示与第11个的一样

  