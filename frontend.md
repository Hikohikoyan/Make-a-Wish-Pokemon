### 前端总结

 sh*t刚刚在保存的时候dele了，按了丢弃，重新再复述一遍了（我复读我自己[简略赶睡觉版]

1. 最大的问题就是一开始想用这个项目作为单页面前端路由的练手，结果其实 这个项目用单页面做的话（也不是不行），就是有一些数据传输的逻辑还有物理键无法监听导致退回上一个锚点时不一定能按理想逻辑实现（也可能swtcl) 而且css和js上会有非常庞大的结构元素堆叠，结构会比较多。

   ```
       var nowpage=window.location.pathname.match(/(\w+.html)$/) [0];
       if(nowpage.indexOf("wish")==0){
           // $("#hope_page").hide();
           console.log("wish page");
       }
       if(nowpage.indexOf("help")==0){
           // $(".major").hide();
           // $("#selected").hide();
           console.log("help page");
       }
       if(nowpage.indexOf("index")==0){ONLY GOD KNOWS}
   ```

2. css 用了很多无效复用的属性，也是因为对position的不够掌握导致思路混乱的。

   ```
       display: grid;
       display: -moz-grid;
       display: -ms-grid;
       grid-template-columns: auto;
       grid-gap: 3.5vh;
       grid-template-rows: 45vh 7.4vh 7.4vh 7.4vh 7.4vh;
       margin-top: 3%;
   ```

   比如这个grid 啊反正就是center失败的话就业margin/padding来负责实现居中，还有很多骚操作暂且不敢放出来了（

   3.preload有很多种实现方式，而偷懒用preload.js就是窝这种辣鸡（

   因为一开始没考虑好重复预加载之类的问题，loading动画也是用的改src的方式（考虑到gif会不会在有些设备上卡顿看上去效果不好之类的（反正就是在知乎上看到了有文章说)),导致后来上线前改的时候简直就是直接新写了一个函数，非常的冗杂。

   ```
   function loading(){
       var imgdownload = new createjs.LoadQueue(true);
       function handleComplete(){
           console.log("completed");
           complete();
           anime(1);
       }
       imgdownload.on("complete", handleComplete, this);
   ```

   4.按钮逻辑上因为后端接口逻辑有变动而页面又是维持原样的，导致改的时候思路混乱，根本就是乱改（然后就能跑了（

   而且有很多很多乱七八糟的复用 大多是赶着上线前狂改的骚操作

   ```
    function hoping(){
    $("#ok").attr("disabled","disabled");
   var result=get_you();//先看有没有这个人 返回true 有人 可以调用session
    if(result!=true){
    if (check() != true) {
    return;
    }
    $("#ok").removeAttr("disabled");
    commit_wish(info);}
    else{
   //从sessionstorage里拿 
   $("#ok").removeAttr("disabled","disabled");
   var info=sessionStorage.getItem("you");
   commit_wish(info)
    };
   $("#ok").click(function () { //填写完毕 提交信息
   hoping();
   })
   function commit_wish(info){
   var commit_info = $.ajax(prepare(2, info));
   $("#ok").attr("disabled","disabled");
   commit_info.done(function (data) {………………………………})}
   ```

   5.唯一幸好一开始做了的就是ajax的setting打包

   ```
   function prepare(num, some) {
   var request = new Array();
   request[0] = "get_pre_wishes";
   request[1] = "save_wish"; //post
   request[2] = "commit_info"; //post
   request[3] = "help_wish";
   request[4] = "after_help_show_info"; //post
   request[5] = "commit_help"; //post
   ……………………
   var method = "GET";
   if (num == 1 || num == 2 || num == 4 || num == 5) {
   method = "POST";
   console.log("change method" + method);
   }
   var async=true;
   if(num==5){
   async=false;
   }
   var url = "api/" + request[num];
   if (some != "" || some != undefined) {
   var settings = {
   "url": url,
   "method": method,
   "data": some,
   "headers": {"Content-Type": "application/json","cache-control": "no-cache"},
   "async":async,
   "statusCode": {
   430: function () {allatt("活动还没开始哦, 敬请期待~");},
   431: function () {allatt("活动已经结束啦, 感谢关注~");},
   404: function () {allatt("网络好像出了点问题，稍后再来尝试叭");},
   419:function () {                            window.location.href="https://hemc.100steps.net/2018/fireman/auth.php?redirect=https://hemc.100steps.net/2019/wish-pokemon/api/Check_login&state=gsudndu13Sd";}},};
   }
   ```

对设计和后端的一些建议就是，因为我是冲着学习ui设计才兼修的前端，所以在对接时会有一些奇怪的想法（，首先是对设计组的同学标注的一些建议。用过一个叫墨刀的工具以后我认为，现在设计组的标注数值（swtcl反正我输进去就是无效的 根本不能用），但是墨刀设计后它有个代码块可以查看对应的position，那个数值就是比较准确的，可以用的。我寻思着应该是ps/xd/ai/skecth之类的软件上模拟iphone大小的px实际像素值和浏览器定义的px是有一些微妙的区别的，虽然都是叫像素但是（反正知乎上也有文章讲过具体的定义）是不太一样的，所以我觉得，如果这样标注的数值没什么用的话，不如给出定位线：对齐线/等分线，这样前端比较一目了然。

后端的话就是，尽可能在架构数据库和接口前先和前端讨论全面一点可能出现的情况，也有可能只是我们这个项目小组出现的问题233，这次是真的有很多情况和问题是因为我们三个部分没有全面地讨论好造成的。