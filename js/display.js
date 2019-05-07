$(function () {
    //变换页面 和传递数据
    // $(".page").hide();
    // $("#index").show();//主页
    url=location.href.split("#")[0];
    location.hash="";
    var clicktime=0;
    var hash=location.hash;
    var user,tel,wechat,msg;
    var elfs=new Array();
    var elf;
    var balls=new Array();
    var ball;    
    var collection;
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
    })
    $("#btn2").click(function(){
        allhide();
        $(".main_contain").hide();
        $("#balls").show();
        $("#back").show();
        $("h1").text("你的精灵球("+ball+")");
    })
    $("#help").click(function(){
        //助愿页
        allhide();
        $(".main_contain").hide();
        $("#help_page").show();
        $("#selected").show();
    })
    $("#selected").click(function(){
        var wishes=new Array();
        for(var i=0;i<$('li').length;i++){
            $('li')[i].click(function(){
                console.log(this);
                console.log(i);
                wishes.push($('li')[i]);
                console.log(wishes);
            });
        }
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
    })
    $("#ok2").click(function(){
        allhide();
        $("#help_page").show();
        $(".success").show();
        $("#back").show();
    })
    $("#change").click(function(){
        $('.helpbox').remove();
        $("#others").append("<div class='helpbox'>"+"反正我咸鱼一条"+"</div>");
        $("#others").append("<div class='helpbox'>"+"梦想还是要有的"+"</div>");
        $("#others").append("<div class='helpbox'>"+"该睡觉了"+"</div>");
    })
    // $(".helpbox").click(function (){
    // }
    // )
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
        var pack=JSON.stringify({
            'name':user,
       'telephone':tel,
       'weixin':wechat,
        })
        }
        prepare(3,pack);
        // $.ajax(settings);
        $("#sign_page").hide();
        $(".success").fadeIn(1200);

    })
    $("#again").click(function(){
        $(".success").hide();
        $("#back").fadeIn(500);
        $(".show").fadeIn(500);
    })

    $(".return").click(function(){
        history.back();//返回按钮
    })

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
        var url="182.254.161.178/"+request[num];
        if(some!=""||some!=undefined){
        var settings={
            "url":url,
            "method":"POST",
            "data":some,
            "headers": {
                "Content-Type": "application/json",
                "Connection": "keep-alive",
                "cache-control": "no-cache"
              },
        };
        }else{
            var settings={
                "url":url,
                "method":"POST",
                "headers": {
                    "Content-Type": "application/json",
                    "Connection": "keep-alive",
                    "cache-control": "no-cache"
                  },
            };    
        }
        return settings; 
    }
    //check
    function check(str){
        
    }
    //
    //getinfo
    function get_all(){
        //获取已有的精灵/精灵球
        settings=prepare(8);
        // $.ajax(settings);
        settings=prepare(7);
        // $.ajax(settings);
        elf=18;
        ball=1;
        $(".span1").text(elf);
        $(".span2").text(ball);
        // console.log(elfs);
        // console.log(elf);
        // console.log(balls);
        // console.log(ball);
        return elf,elfs,balls,ball;
    }
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
    $("#custom").click(function(){
        $("#wishtext").hide();
        $("#customtext").show();
    })
    $("#top").mousemove(function(e){
        // console.log(e.pageY+"~~~~~~"+e.pageX);
    })
})