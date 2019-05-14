$(function () {
    //变换页面 和传递数据
    // $(".page").hide();
    // $("#index").show();//主页
    var clicktime=0;
    var click=0;
    var user,tel,wechat,msg;
    var elfs=new Array();//path elf
    var elf;
    var ball;    
    var collection;//什么都往里面存 没问题的（
    var wishText;//愿望文本公用存储
    var wishes;//愿望ID公用存储
    var wisher_id;
    var sql=new Array();
    var res;
    // allhide();
    // $("#index").show();
    $("#img41").click(function(){
        $("#loading").remove();
        $("#index").show();
    })
    $("#top").show();
    $(".btn2").show();
    $(".btn1").show();
    $(".main_contain").show();
    var nowpage=location.href.split("/");
    if(nowpage[4].indexOf("wish")==0){
        console.log("wish page");
    }
    if(nowpage[4].indexOf("help")==0){
        console.log("help page");
    }
    if(nowpage[4].indexOf("major")==0){
        get_all();
        console.log("index page");
    }
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
        show_rule();
    })
    $("#pika").click(function(){
        show_rule();
    })//点击规则
    $(".return").click(function(){
        window.location.href="major.html";
    })//点击返回主页（规则页）return.png
    $("img#back").click(function(){
        console.log(location.href);
        if(location.href.split("/")[4].indexOf("help")==0||location.href.split("/")[4].indexOf("wish")==0){
            //现在是助愿页/许愿
            window.history.back();
        }else{
            console.log("返回了");
            $("#elfs").hide();
            $("#balls").hide();
            $("#top").show();
            $(".main_contain").show();
        }
    })
    $("#btn1").click(function(){
        $(".main_contain").hide();
        $("#top").hide();
        show1("#elfs");
        $("#back").show();
        $("h1").text("你的精灵("+elf+")");
    })//查看精灵
    $("#btn2").click(function(){
        $(".main_contain").hide();
        $("#top").hide();
        show1("#balls");
        $("#back").show();
        $("h1").text("你的精灵球("+ball+")");
    })//查看精灵球
    $("#help").click(function(){
        // allhide();
        // $(".main_contain").hide();
        window.location.href="help.html";
        console.log("into help");
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
        show1("#info");
        $("#selected").hide();
    })//助愿页信息的确认按钮
    $("#ok2").click(function(){
        allhide();
        $("#help_page").show();
        show1(".success")
        $("#back").show();
        show_elf();
        console.log("画elf图！")
    })//助愿的确认s按钮
    $("#change").click(function(){
        $('.helpbox').remove();
        var collection=$.ajax(prepare(4));
        var result=translate(4,collection);
        for(var i=0;i<=result.length;i++){
            wishes[i]=result[i].id;
            wishText[i]=result[i].wish_content;
            wisher_id[i]=result[i].wisher_id;
            bindwishes(wish[i],wishText[i],wisher_id[i]);
        }
        $("#others").append("<div class='helpbox' id='help1'>"+wishText[0]+"</div>");
        $("#others").append("<div class='helpbox' id='help2'>"+wishText[1]+"</div>");
        $("#others").append("<div class='helpbox' id='help3'>"+wishText[2]+"</div>");
        $("#help1").attr("wishid",wishes[0]);
        $("#help2").attr("wishid",wishes[1]);
        $("#help2").attr("wishid",wishes[2]);
    })//换一批
    // $(".helpbox").click(function (){
    //     alert(this.innerText)
    //     wishText=this.innerText;
    // })//确认帮助愿望
    $("#mine").click(function(){
        //显示 我的愿望清单  yourwish
        allhide();
        $("#back").show();
        $(".main_contain").hide();
        show1("#yourwish");
    });
    //wish.html 许愿页
    $("#next").click(function(){
        if(clicktime==666){//custom
            if(check(wishText)){
                console.log("许愿："+wishText);
                var pack_wish=JSON.stringify({
                    'wish_content':wishText
                })
                $.ajax(prepare(1,pack_wish));
                console.log("愿望发送给后台了！");
                allhide();//包含hope page
                $(".show").hide();
                $("#hope_page").show();
                $("#sign_page").show();
                console.log("into form_page");
                hash="#Next,fill-in-the-box";    
            }else{
                console.log(clicktime);
                $("#attention0").text("有问题！");
                console.log(check(wishText));
            }
        }
        wishText=$("#wishtext").text();//预定义
        console.log("许愿："+wishText);
        var pack_wish=JSON.stringify({
            'wish_content':wishText
        })
        $.ajax(prepare(1,pack_wish));
        console.log("愿望发送给后台了！");
        allhide();//包含hope page
        $(".show").hide();
        $("#hope_page").show();
        $("#sign_page").show();
        console.log("into form_page");
        hash="#Next,fill-in-the-box";    
        console.log(wishText);
        // location.hash=hash;
    })//点击下一步填写信息
    $("#name").bind('input propertychange', function () {

    });
    $("#tel").bind('input propertychange', function () {
    })
    $("#wechat").bind('input propertychange', function () {
    })
    function prevent(){
        $("#ok").attr("disabled","disabled");
        $("#ok").mousemove(function(e){
            if(e.offsetX>=0&&e.offsetY>=0){
                $("#vxalert").text("你还没输信息");
                $("#vxalert").show();
                setTimeout(() => {
                    $("#vxalert").hide();
                }, 1000);
            }
        })
        var vx=$("#wechat").val();
    }
    function name_check(){
        var name=$("#name").val();
        if(!check(name)){
            $("#namealert").show();
        };
    }
    function tel_check(){
        var tel=$("#wechat").val();
        if(!check(tel)){
            $("#telalert").show();
        };
    }
    function vx_check(){
        var name=$("#wechat").val();
        if(!check(name)){
            $("#vxalert").show();
        };
    }

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
        show1(".success");
    })
    $("#again").click(function(){
        $(".success").hide();
        $("#back").show();
        $(".show").show();
    })//再次许愿
    $("#return").click(function(){
       window.history.back();//返回按钮
    })//失败的返回按钮 我是说 这个按钮失败了
    //隐藏
    function allhide(){
        $(".page").hide();
        $(".btn1").hide();
        $(".btn2").hide();
        // $(".main_contain").hide();
        $(".success").hide();
        $("#selected").hide();
        $("#back").hide();
        $(".return").hide();
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
        var url="js/errmsg.json";
        // var url="http://182.254.161.178/test/laravel/public/"+request[num];
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
                console.log("success!");
                console.log(collection);
                res=translate(num,collection);
                console.log(res);
            },
            "fail":function(){
                console.log("不知什么原因失败了哭");
            },
            "error":function(response){
                console.log(response.statusText);
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
                    console.log(collection);
                    res=translate(num,collection);
                    console.log(res);
                        },
                  "fail":function(){
                      if(data.errcode==456){
                          console.log("未授权");
                          location.href="之后会给我们的"+"#BBT微信后台#/Home/Index/index?state="+location.href;
                      }
                      console.log("不知什么原因失败了哭");
                    },
                  "error":function(response){
                      console.log(response.statusText);
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
        $.ajax(settings);
        // res=translate(8,collection);
        elfs=res.path_array;
        elf=res.fairy_num;
        console.log("请求精灵列表");
        settings=prepare(7);
        console.log("请求精灵ball列表");
        $.ajax(settings);
        // res=translate(7,collection);
        ball=res.total_ball;
        $(".span1").text(elf);
        $(".span2").text(ball);
        return elf,elfs,ball;
    }
    //许愿页的换愿望
    $(".getpic").mousemove(function(e){
        console.log(e.clientY+"~~~~~~"+e.clientX);
        var nowX=e.clientX;//217 88
        var nowY=e.clientY;//420 288

    })
    function show_elf(id){
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        //暂时写死
        var Img = new Image();
        var src=elfs[id];
        src="img/fairy2.png";
        Img.src = src;
        console.log("drawelf"+src);
        Img.onload=function(){
            console.log("开始画了")
            ctx.drawImage(Img,0,0,200,200);
            ctx.shadowColor = "white";
            ctx.shadowBlur = 0;
            ctx.save();
            var usecache=1;
            // ctx.closePath();
            // var bling=setInterval(() => {
            //     if(shadownum==1){
            //         ctx.shadowColor = "white";
            //         ctx.shadowBlur=0;
            //         shadownum=0;
            //     }else{
            //         ctx.shadowColor = "white";
            //         ctx.shadowBlur = 15;
            //     }
            // }, 200);
            setTimeout(function(){
                // clearInterval(bling);
                ctx.clip();
                console.log("清除画板");
            },1000*4);
            }
        function canvas_cache(ctx){
            // var ctx0 = document.createElement("canvas");
            // ctx0 = canvas.getContext("2d");
            // ctx0.width= ctx.width;
            // ctx0.height =ctx.height;
            // console.log("开始画了_cache")
            // ctx0.drawImage(Img,0,0,200,200);
            // ctx0.save();
        }
    }
    $("#middle").click(function(){
        //发送请求换愿望
        console.log("第"+click+"次愿望");
        click=click+1;
        if(click<=5){
        var setting=prepare(0);
        $.ajax(setting);
        // res=translate(0,collection);
        console.log(res);
        $("#wishtext").text(res.errmsg);
    }
        if(click==5){
            $("#middle").attr("disabled","disabled");
            $("#attention0").text("不可以频繁更换愿望哦")
            setTimeout(() => {
            $("#middle").removeAttr("disabled");
            $("#attention0").text("");
            click=0;
        }, 5000);
        }
})

    //许愿页定制
    $("#custom").click(function(){
            $("#wishtext").hide();
            $("#customtext").show();
            $("#custom").hide();
            $("#cancel").show();
            clicktime=666;
        })
    $("#cancel").click(function(){
        $("#wishtext").show();
        $("#customtext").hide();
        $("#cancel").hide();
        $("#custom").show();
        clicktime=0;
})
    //测试定位
    $("#help1").click(function(e){
        console.log(e.clientY+"~~~~~~"+e.offsetX);
        var guiY=Number(e.clientY-40);
        $(".select").css({
            'top':guiY
        })
        wishText=$("#help1").innerHTML;
        num=$("#help1").attr("wishid");
        choose(num);
    })
    $("#help2").click(function(e){
        console.log(e.clientY+"~~~~~~"+e.offsetX);
        var guiY=Number(e.clientY-40);
        $(".select").css({
            'top':guiY
        })
        wishText=$("#help2").innerHTML;
        num=$("#help2").attr("wishid");
        choose(num);
    })
    $("#help3").click(function(e){
        console.log(e.clientY+"~~~~~~"+e.offsetX);
        var guiY=Number(e.clientY-40);
        $(".select").css({
            'top':guiY
        })
        wishText=$("#help3").innerHTML;
        num=$("#help3").attr("wishid");
        choose(num);
    })

    //适配focus
    $("input").focus(function(){
        console.log("hey");//改了值才调用
    })
    //点击精灵球 随机获取精灵 球-1
    function ball_dele(){
        $(".ballcontain").click(function(){
            //这里是那个动画
            $(this).remove();
            $.ajax(prepare(11)).done(function(){
                console.log("OK,你打开了一个精灵球");
                console.log("状态："+pack.errcode);
                //弹窗 没有空的精灵球了
            })
        })
    }
    function show_rule(){
        allhide();
        $(".main_contain").hide();
        $("#back").hide();
        $("#back_index").show();
        show1("#rule_page");
        document.getElementById("style1").href="css/index.css";
        console.log("into rule_page");
    }
    function translate(num,collection){
        var result=new Array();
        if(collection==undefined||collection==""||collection==null){
            console.log("收不到！");
            console.log(collection);
            result.push("Nothing at all");
            return result[0];
        }
        console.log("收到了！开始转换---dididi");
        switch (num) {
                case 2:
                result['name'].push(collection.name);
                result['telephon'].push(collection.telephone);
                result['weixin'].push(collection.weixin);
                break;
                case 4:
                result.push(collection[0]);//result[i].id/wish_content/wisher_id
                result.push(collection[1]);
                result.push(collection[3]);
                result.push(collection[4]);
                break;
                case 5:
                result.push(collection[0].id);
                // result.push(collection[0].user_id);
                result.push(collection[0].telephone);
                result.push(collection[0].weixin);
                case 7:
                result['total_ball'].push(collection.total_ball); 
                break;
                case 8:
                result['path_array'].push(collection.path_array);
                result['fairy_num'].push(collection.fairy_num);
                break; 
                case 9:
                result['errmsg'].push(collection.errmsg);
                //追加一个精灵路径
                break;
                case 10:
                for(var i=0;i++;i<=collection.length){
                    result.push(collection[i]);
                }
                case 0://0 1 3 6
                result['errmsg'].push(collection.errmsg);      
                break;        
                case 1://0 1 3 6
                result['errmsg'].push(collection.errmsg);      
                break;        
                case 3://0 1 3 6
                result['errmsg'].push(collection.errmsg);      
                break;        
                case 6://0 1 3 6
                result['errmsg'].push(collection.errmsg);      
                break;        
            }
        console.log(collection);
        console.log(result);
        return result;
        }
    function show1(str){
        $(str).show();
        $(str).css({
            "display": "flex",
            "flex-direction": "column",
            "align-items": "center"
        });
    }
    function choose(num){
        var pack=JSON.stringify({
            "wisher_id":num
        })
        $.ajax(prepare(5,pack));
        // var res=translate(5,collection);
        // $(".info#name").text(res[[]])
        console.log(res);
    }
    function bindwishes(a,b,c,){
        sql[a]=[{
            wish_content:b,
            wisher_id:c
        }];
    }
})
