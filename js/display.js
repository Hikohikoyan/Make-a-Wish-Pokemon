$(function () {
    //变换页面 和传递数据
    // $(".page").hide();
    // $("#index").show();//主页
    url=location.href.split("#")[0];
    location.hash="";
    var clicktime=0;
    var hash=location.hash;
    var user,tel,wechat,msg;
    var elfs=new Array();//path elf
    var elf;
    var balls=new Array();
    var ball;    
    var collection;//什么都往里面存 没问题的（
    var wishText;//愿望文本公用存储
    var wishes;//愿望ID公用存储
    $("#top").show();
    $(".btn2").show();
    $(".btn1").show();
    $(".main_contain").show();
    get_all();
    //主页按钮
    $("#wish").click(function(){
        // allhide();
        $("#hope_page").show();
        $(".show").show();
        $(".form").hide();
        document.getElementById("style1").href="css/wish.css";
        console.log("into hope_page");
        hash="#Now,make-a-wish!";
        window.location.href="wish.html";
    })//点击许愿
    $("#rule").click(function(){
        allhide();
        $(".main_contain").hide();
        $("#back").show();
        $("#rule_page").show();
        document.getElementById("style1").href="css/index.css";
        console.log("into rule_page");
        hash="#rules";
        location.hash=hash;
        history.pushState("","Rule",location.href);
    })//点击规则
    $("#back").click(function(){
        window.location.href="index.html";
    })//点击返回主页（规则页）
    $("#btn1").click(function(){
        allhide();
        $(".main_contain").hide();
        $("#elfs").show();
        $("#back").show();
        $("h1").text("你的精灵("+elf+")");
    })//查看精灵
    $("#btn2").click(function(){
        allhide();
        $(".main_contain").hide();
        $("#balls").show();
        $("#back").show();
        $("h1").text("你的精灵球("+ball+")");
    })//查看精灵球
    $("#help").click(function(){
        allhide();
        $(".main_contain").hide();
        $("#help_page").show();
        $("#selected").show();
    })//助愿页
    $("#selected").click(function(){
        var data=JSON.stringify({
            "wisher_id":wishes
        });
        var settings=prepare(5,data);
        $.ajax(settings).done(function(){
            $("#name").text("姓名：成功先生");
            $("#tel").text("手机：200 200");
            $("#wechat").text("微信：总之是好了");
        });//获取信息
        allhide();
        $("#help_page").show();
        $("#change").hide();
        $("#others").hide();
        $("#info").show();
        $("#selected").hide();
    })//助愿页信息的确认按钮
    $("#ok2").click(function(){
        allhide();
        $("#help_page").show();
        $(".success").show();
        $("#back").show();
    })//助愿的确认按钮
    $("#change").click(function(){
        $('.helpbox').remove();

        $("#others").append("<div class='helpbox'>"+"反正我咸鱼一条"+"</div>");
        $("#others").append("<div class='helpbox'>"+"梦想还是要有的"+"</div>");
        $("#others").append("<div class='helpbox'>"+"该睡觉了"+"</div>");
    })//换一批
    $(".helpbox").click(function (){
        alert(this.innerText)
        wishText=this.innerText;
    })//确认帮助愿望
    $("#mine").click(function(){
        //显示 我的愿望清单  yourwish
        allhide();
        $("#back").show();
        $(".main_contain").hide();
        $("#yourwish").fadeIn(100);
    });
    //wish.html 许愿页
    $("#next").click(function(){
        clicktime=clicktime+1;
        console.log(clicktime);
        allhide();//包含hope page
        $(".show").hide();
        $("#hope_page").show();
        if(clicktime==1){
        $("#sign_page").show();
        console.log("into form_page");
        hash="#Next,fill-in-the-box";
        location.hash=hash;
        history.pushState("","Next",location.href);
        }else if(clicktime==5){
            //不能太贪心的提示
            console.log("不能太贪心了");
        }
        else{
            $(".success").fadeIn(1200);
        }
    })//点击下一步填写信息
    $("#ok").click(function(){//填写完毕 提交信息
        user=$("#name").val();
        tel=$("#tel").val();
        wechat=$("#wechat").val();
        msg=$("#wish").val();
        if(check(msg)){
        var pack=JSON.stringify({
            'name':user,
       'telephone':tel,
       'weixin':wechat,
        })
        }else{
            //发送记录愿望请求
            var pack2=JSON.stringify({
                "wish_text":$("#wishtext").text()
            })
            $.ajax(prepare(1,pack2));
        var pack=JSON.stringify({
            'name':user,
       'telephone':tel,
       'weixin':wechat,
        })
        }
        $.ajax(prepare(3,pack));
        $("#sign_page").hide();
        $(".success").fadeIn(1200);

    })
    $("#again").click(function(){
        $(".success").hide();
        $("#back").fadeIn(500);
        $(".show").fadeIn(500);
    })//再次许愿
    $(".return").click(function(){
        history.back();//返回按钮
    })//失败的返回按钮 我是说 这个按钮失败了
    //隐藏
    function allhide(){
        $(".page").hide();
        $(".btn1").hide();
        $(".btn2").hide();
        // $(".main_contain").hide();
        $(".success").hide();
        $("#back").hide();
        $("#expode.page").hide();
    }
    //请求
    function prepare(num,some){
        var request=new Array();
        request[0]="get_pre_wishes";
        request[1]="save_wish";
        request[2]="show_info";
        request[3]="commit_info";
        request[4]="help_wish";
        request[5]="after_help_show_info";
        request[6]="commit_help";
        request[7]="ball_list";
        request[8]="fairy_list";
        request[9]="open_ball";
        request[10]="my_wishes";
        request[11]="my_help";
        var url="/"+request[num];
        if(some!=""||some!=undefined){
        var settings={
            "url":url,
            "method":"POST",
            "data":some,
            "headers": {
                "Content-Type": "application/json",
                "cache-control": "no-cache"
              },
              "success":function(data){
                collection=data;
            },
            "fail":function(){
                console.log("不知什么原因失败了哭");
            },
            "error":function(response){
                console.log(response);
            }

        };
        }else{
            var settings={
                "url":url,
                "method":"POST",
                "headers": {
                    "Content-Type": "application/json",
                    "cache-control": "no-cache"
                  },
                  "success":function(data){
                      collection=data;
                  },
                  "fail":function(){
                      console.log("不知什么原因失败了哭");
                  },
                  "error":function(response){
                      console.log(response);
                  }
            };    
        }
        return settings; 
    }
    //check
    function check(str){
        function isBlank(str) {
            return (!str || /^\s*$/.test(str));
        }
        function check_uni(str) {
            var patt_illegal = new RegExp(/[\#\$\%\^\&\*{\}\:\\L\<\>\?}\'\"\\\/\b\f\n\r\t]/g);
            return patt_illegal.test(str);
        }
        if(isBlank(str)||check_uni(str)){
            return false;
        }else{
            return true;
        }
    }
    //
    //getinfo
    function get_all(){
        //获取已有的精灵/精灵球
        settings=prepare(8);
        $.ajax(settings).done(function(data){
            elf=data.fairy_num;
            for(var i=0;i<=data.fairy_path.length;i++){
                elfs.push(data.fairy_path[i]);
            }
        });
        console.log("请求精灵列表");
        settings=prepare(7);
        console.log("请求精灵ball列表");
        $.ajax(settings).done(function(data){
            ball=data.total_ball;
        });
        console.log(elfs);
        console.log(elf);
        console.log(ball);
        $(".span1").text(elf);
        $(".span2").text(ball);
        return elf,elfs,ball;
    }
    //许愿页的换愿望
    $(".show").mousemove(function(e){
        // console.log(e.clientY+"~~~~~~"+e.clientX);
        var nowX=e.clientX;
        var nowY=e.clientY;
        if(nowX>=160&&nowX<=210&&nowY>=60&&nowY<=120){
            $("#wishtext").text("就是点那换愿望");
            $("#customtext").hide();
            $("#wishtext").show();
        }else if(nowX>=68&&nowX<=303&&nowY>=160&&nowY<=344){
            console.log("Writing!OR NOTHING");
        }else{
            $("#customtext").hide();
            $("#wishtext").show();
            }
    })
    //许愿页定制
    $("#custom").click(function(){
        $("#wishtext").hide();
        $("#customtext").show();
    })
    //测试定位
    $("#top").mousemove(function(e){
        // console.log(e.pageY+"~~~~~~"+e.pageX);
    })
    //适配focus
    $("input").focus(function(){
        console.log("hey");//改了值才调用
    })
    //点击精灵球 随机获取精灵 球-1
    function ball_dele(){
        $(".ballcontain").click(function(){
        })
    }
})