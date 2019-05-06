$(function () {
    //变换页面 和传递数据
    // $(".page").hide();
    // $("#index").show();//主页
    url=location.href.split("#")[0];
    location.hash="";
    
    var hash=location.hash;
    var collection;
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
        $("#rule_page").show();
        document.getElementById("style1").href="css/index.css";
        console.log("into rule_page");
        hash="#rules";
        location.hash=hash;
        history.pushState("","Rule",location.href);
    })//点击规则
    $("#btn1").click(function(){
        allhide();
        $("#yourwish").show();
    })
    $("#btn1").click(function(){
        allhide();
        $("#yourwish").show();
    })
    $("#help").click(function(){
        //助愿页
        allhide();
        $(".main_contain").hide();
        $("#help_page").show();
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
        var settings=prepare(5);
        $.ajax(settings,data,)
    })
    $("#mine").click(function(){
        //显示 我的愿望清单  yourwish
        allhide();
        $("#yourwish").fadeIn(100);
    });
    $("#next").click(function(){
        allhide();
        $(".show").hide();
        $("#hope_page").show();
        $("#sign_page").show();
        console.log("into form_page");
        hash="#Next,fill-in-the-box";
        location.hash=hash;
        history.pushState("","Next",location.href);
    })//点击下一步填写信息
    $("#ok").click(function(){//填写完毕 提交信息
        var user=$("#name").val();
        var tel=$("#tel").val();
        var wechat=$("#wechat").val();
        var msg=$("#wish").val();
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
        $.ajax(settings);
        $("#sign_page").animate({opacity:"0.5"},100,function(){
            $("#sign_page").hide();
        });
        $("#get_page").fadeIn(1200);
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
    //getinfo
    function get_all(){
        var elfs=new Array();
        var elf;
        var balls=new Array();
        var ball;    
        //获取已有的精灵/精灵球
        prepare(8);
        $.ajax(settings,function(data){
            elf=data.fairy_num;
            elfs=data.path_array;
        })
        prepare(7);
        $.ajax(settings,function(data){
            ball=data.total_ball;
            balls=data.path_array;//？？好像不太对 
        })
        console.log(elfs);
        console.log(elf);
        console.log(balls);
        console.log(ball);
    }
})