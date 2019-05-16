$(function () {
    //变换页面 和传递数据
    // $(".page").hide();
    // $("#index").show();//主页
    var clicktime=0;
    var click=0;
    var user,tel,wechat;
    var elfs=new Array();//path elf
    var elf;
    var ball;    
    var wishText;//愿望文本公用存储
    var wishes=new Array();//愿望ID公用存储
    var wisher_id=new Array();
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
    var nowpage=window.location.pathname.match(/(\w+.html)$/) [0];
    if(nowpage.indexOf("wish")==0){
        console.log("wish page");
    }
    if(nowpage.indexOf("help")==0){
        get_help_wishes();
        console.log("help page");
    }
    if(nowpage.indexOf("major")==0){
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
        $("#rule_page").hide();
        goback();
    })//点击返回主页（规则页）return.png
    function goback(){
        var nowpage=window.location.pathname.match(/(\w+.html)$/) [0];
        if(nowpage.indexOf("help")==0||nowpage.indexOf("wish")==0){
            //现在是助愿页/许愿
            window.history.back();
        }else{
            console.log("返回了");
            $("#elfs").hide();
            $("#balls").hide();
            $("#yourwish").hide();
            $("#top").show();
            $("#btn1").show();
            $("#btn2").show();
            $(".main_contain").show();
        }
    }
    $("img#back").click(function(){
        goback();
    })
    $("#btn1").click(function(){
        $(".main_contain").hide();
        $("#top").hide();
        show1("#elfs");
        $("#back").show();
        elf=sessionStorage.getItem('elf_num');
        //path elfs[i]
        $("h1").text("你的精灵("+elf+")");
        for(var i=0;i<elf;i++){
            console.log(elf);
            $(".elfcontain1").append("<div class='elf'><img id='elf"+i
            +"' src='img/bigelfboder.png'>"
            +"<img class='elfpic' src='img/fairy2.png'></div>");
        }
    })//查看精灵
    $("#btn2").click(function(){
        $(".main_contain").hide();
        $("#top").hide();
        show1("#balls");
        $("#back").show();
        $("h1").text("你的精灵球("+ball+")");
        ball=sessionStorage.getItem('ball_num');
        if(ball==0){
            return;
        }
        for(var i=0;i<ball;i++){
            $("#ball99").append("<div class='ball'><img id='ball"+i
            +"' src='img/bigelfboder.png'>"
            +"<img class='ballpic' src='img/explode/1.png'></div>");
            // +"<img class='elfpic' src='img/fairy2.png'></div>");
        }

    })//查看精灵球
    $("#help").click(function(){
        // allhide();
        // $(".main_contain").hide();
        window.location.href="help.html";
        console.log("into help");
    })//助愿页
    $("#selected").click(function(id,wisher_id){
        var id=sessionStorage.getItem('id');
        choose(id);
        var data=JSON.stringify({
            "wisher_id":wisher_id
        });
        var settings=prepare(4,data);
        $.ajax(settings).done(function(data){
            $("#name").text("昵称："+String(data.name));
            $("#tel").text("手机："+String(data.telephone));
            $("#wechat").text("微信："+String(data.weixin));
        });//获取信息
        allhide();
        $("#help_page").show();
        $("#change").hide();
        $("#others").hide();
        show1("#info");
        $("#selected").hide();
    })
    //助愿页信息的确认按钮
    $("#ok2").click(function(){
        goback();
        // allhide();
        // $("#help_page").show();
        // show1(".success")
        // $("#back").show();
        // show_elf();
        // console.log("画elf图！")
    })//助愿的确认s按钮
    $("#change").bind("click", function () {
        $("#change").attr("disabled","disabled");
        get_help_wishes();
        setTimeout(() => {
            console.log("换一批 解除");
            $("#change").removeAttr("disabled")
        }, 300);
    })//换一批
    function get_help_wishes(){
        var wishText=new Array();
        $.ajax(prepare(3)).done(function(data){
            console.log(data);
            for(var i=0;i<2;i++){
                wishes[i]=data[i].id;
                wishText[i]=data[i].wish_content;
                wisher_id[i]=data[i].wisher_id;//愿望id 愿望文本 许愿人
                var str1='help'+(i+1);
                var str2='id:'+wishes[i]+"/"+"wisher:"+wisher_id[i];
                sessionStorage.setItem(str1,str2);
            }
            $('.helpbox').remove();
            $("#others").append("<div class='helpbox' id='help"+wisher_id[0]+"'>"+wishText[0]+"</div>");
            $("#others").append("<div class='helpbox' id='help"+wisher_id[1]+"'>"+wishText[1]+"</div>");
            $("#others").append("<div class='helpbox' id='help"+wisher_id[2]+"'>"+wishText[2]+"</div>");
            });
    }
    $("#mine").click(function(){
        //显示 我的愿望清单  yourwish
        allhide();
        $("#back").show();
        $(".main_contain").hide();
        $.ajax(prepare(9)).done(function(data){
            if(data[0]!=undefined||data[0]!=null){
                $(".nowish").remove();
                $(".dream").show();
                for(var i=0;i<data.length;i++){
                    console.log(i);
                    if(data[i].wish_content==undefined){
                        console.log(data);
                    }else{
                    $(".dream").append("<div class='mine'><div class='helpbox'>"
                    +String(data[i].wish_content)+"</div><span id='done'>"
                    +String(data[i].situation)+"</span></div>");
                }
            }}
        })
        show1("#yourwish");
    });
    //wish.html 许愿页
    $("#next").click(function(){
        setTimeout(() => {
            $("#next").attr("disabled","disabled");
            $("#attention0").text("请稍候……");
            $("attention0").show();
        }, 1800);
        var open=setInterval(() => {
            $("attention0").show();
            $("#next").removeAttr("disabled");
        }, 5000);
        if(clicktime==666){//自定义愿望
            clearInterval(open);
            wishText=$("#customtext").val();
            if(/^\s*$/.test(wishText)==false){//自定义文本不为空
                console.log(clicktime+"许愿："+wishText);
                var pack_wish=JSON.stringify({
                    'wish_content':wishText
                })
                $.ajax(prepare(1,pack_wish)).done(function(data){
                    if(data.errcode==0){//允许填写信息
                        console.log("愿望发送给后台了！");
                        allhide();//包含hope page
                        $(".show").hide();
                        $("#name").val(data.name);
                        $("#tel").val(data.telephone);
                        $("#wechat").val(data.weixin);
                        $("#hope_page").show();
                        $("#sign_page").show();
                        console.log("into form_page");
                    }else if(data.errcode==1|data.errcode==2){
                    $("#attention0").text(data.errmsg);
                    }});
            }else{
                $("#next").attr("disabled","disabled");
                $("#attention0").text("许个愿吧~");
                setTimeout(() => {
                    $("#attention0").hide();
                    $("#next").removeAttr("disabled");
                }, 1000);
            }
        }else if(clicktime==0){
        console.log(clicktime);//预定义
        wishText=$("#wishtext").text();
        console.log("许愿："+wishText);
        var pack_wish=JSON.stringify({
            'wish_content':wishText
        })
        $.ajax(prepare(1,pack_wish)).done(function(data){
            if(data.errcode==0){
                console.log("愿望发送给后台了！");
                allhide();//包含hope page
                $(".show").hide();
                $("#name").val(data.name);
                $("#tel").val(data.telephone);
                $("#wechat").val(data.weixin);
                $("#hope_page").show();
                $("#sign_page").show();
                console.log("into form_page");
                console.log(wishText);
            }else if(data.errcode==1|data.errcode==2){
            $("#attention0").text(data.errmsg);
        }
        });
    }else{
        $("#next").attr("disabled","disabled");
        $("#attention0").text("出了点小差错TAT");
        setTimeout(() => {
            $("#attention0").hide();
            $("#next").removeAttr("disabled");
        }, 1000);
}   // location.hash=hash;
    })//点击下一步填写信息
    $("#name").bind('input propertychange', function () {
        prevent();
        name_check();
    });
    $("#tel").bind('input propertychange', function () {
        prevent();
        tel_check();
    })
    $("#wechat").bind('input propertychange', function () {
        prevent();
        vx_check();
    })
    if(name_check()==true&&tel_check()==true&&vx_check()==true){
        $("#ok").removeAttr("disabled");
    }
    function prevent(){
        $("#ok").attr("disabled","disabled");
        $("#ok").mousemove(function(e){
            if(e.offsetX>=0&&e.offsetY>=0){
                $("#vxalert").text("你还没输信息");
                $("#vxalert").show();
                setTimeout(() => {
                    $("#vxalert").hide();
                    $("#vxalert").text("请输入微信");
                }, 1000);
            }
        });
        if(name_check()==true&&tel_check()==true&&vx_check()==true){
            $("#ok").removeAttr("disabled");
            // console.log(vx_check());
            // console.log("tel"+check(tel));
        }

    }
    function name_check(){
        var name=$("#name").val();
        setTimeout(() => {
            $("#namealert").hide();
        }, 1800);
        if(/^\s*$/.test(name)==true){
            $("#namealert").show();
            $("#ok").attr("disabled","disabled");
            return false;
        }else{
            return true;
        }
    }
    function tel_check(){
        var tel=$("#tel").val();
        setTimeout(() => {
            $("#telalert").hide();
        }, 1800);
        if(/^\s*$/.test(tel)==false&&checkPhone(tel)==true){
            return true;
        }else{
            $("#telalert").show();
            $("#ok").attr("disabled","disabled");
            return false;
        }
        function checkPhone(num){ 
            if(num==undefined){
                return;
            }
            if(num.length!=11){
                return false;
            }else if(/^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/.test(num)==false){
                return false;
            }else{
                return true;
            }
        }
    }
    function vx_check(){
        var vx=$("#wechat").val();
        setTimeout(() => {
            $("#vxalert").hide();
        }, 1800);
        if(/^\s*$/.test(vx)==false&&vx.length<=20){
            return true;
        }else{
            $("#vxalert").show();
            $("#ok").attr("disabled","disabled");
            return false;
        }
    }

    $("#ok").click(function(){//填写完毕 提交信息
        prevent();
        user=$("#name").val();
        tel=$("#tel").val();
        wechat=$("#wechat").val();
        var pack=JSON.stringify({
            'name':user,
       'telephone':tel,
       'weixin':wechat,
        })
        $.ajax(prepare(2,pack)).done(function(data){
            if(data.errcode==0||data.errcode==1){
                $("#sign_page").hide();
                show1(".success");
            }else{
                $("#vxalert").text(data.errmsg);
                $("#vxalert").show();
                setTimeout(() => {
                    $("#vxalert").hide();
                }, 1800);        
            }
        });
    })
    $("#again").click(function(){
        $(".success").hide();
        $("#back").show();
        $(".show").show();
    })//再次许愿
    $("#return").click(function(){
       window.history.back();//返回按钮
    })
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
        request[1]="save_wish";//post
        request[2]="commit_info";//post
        request[3]="help_wish";
        request[4]="after_help_show_info";//post
        request[5]="commit_help";//post
        request[6]="ball_list";
        request[7]="fairy_list";
        request[8]="open_ball";
        request[9]="my_wishes";
        request[10]="my_help";
        //var url="js/errmsg.json";
        var method="GET";
        if(num==1||num==2||num==4||num==5){
            method="POST";
            console.log("change method"+method);
        }
        if(num!=3&&num!=9){
            url="js/test.json"
        }else if(num==5||num==1){
            url="js/5.json"
        }
          var url="/"+request[num];
        if(some!=""||some!=undefined){
        var settings={
            "url":url,
            "method":method,
            "data":some,
            "headers": {
                "Content-Type": "application/json",
                "cache-control": "no-cache"
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

    //获得精灵精灵球
    function get_all(){
        //获取已有的精灵/精灵球
        settings=prepare(7);
        $.ajax(settings).done(function(data){
            console.log("请求精灵列表");
            var res=translate(7,data);
            elfs=res.path_array;
            elf=res.fairy_num;    
            $(".span1").text(elf);
            sessionStorage.setItem("elf_num",elf);
        });
        settings=prepare(6);
        console.log("请求精灵ball列表");
        $.ajax(settings).done(function(data){
            var res=translate(6,data);
            ball=res.now_total_ball;
            $(".span2").text(ball);
            sessionStorage.setItem("ball_num",ball);
        });
    }
    //成功页画精灵
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
            setTimeout(function(){
                ctx.clip();
                console.log("清除画板");
            },1000*4);
            }
    }
    $("#middle").click(function(){
        //发送请求换愿望
        console.log("第"+click+"次愿望");
        click=click+1;
        if(click<=5){
        var setting=prepare(0);
        $.ajax(setting).done(function(data){
            console.log(data);
            $("#wishtext").text(data.errmsg);
        });
    }
        if(click==5){
            $("#middle").attr("disabled","disabled");
            $("#attention0").text("不可以频繁更换愿望哦")
            setTimeout(() => {
            $("#middle").removeAttr("disabled");
            $("#attention0").text("");
            click=0;
        }, 3000);
        }
})
    //许愿页定制
    $("#custom").click(function(){
        $("#attention0").show();
        $("#wishtext").hide();
        $("#customtext").show();
        $("#custom").hide();
        $("#cancel").show();
        clicktime=666;
        })
    $("#cancel").click(function(){
        $("#attention0").hide();
        $("#wishtext").show();
        $("#customtext").hide();
        $("#cancel").hide();
        $("#custom").show();
        $("#next").removeAttr("disabled");
        setTimeout(() => {
            $("#attention0").show();
        }, 1000);
        clicktime=0;
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
    var collection=new Object();//什么都往里面存 没问题的（
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
                case 6:
                result['now_total_ball']=collection.now_total_ball; 
                break;
                case 7:
                result['path_array']=collection.path_array;
                result['fairy_num']=collection.fairy_num;
                break; 
                case 9:
                result['errmsg']=collection.errmsg;
                //追加一个精灵路径
                break;
                case 0://0 1 3 6
                result['errmsg']=collection.errmsg;   
                break;        
            }
        return result;
        }
    function show1(str){
        console.log(str+"<====flex");
        $(str).show();
        $(str).css({
            "display": "flex",
            "flex-direction": "column",
            "align-items": "center"
        });
    }
    function choose(id){
        var pack=JSON.stringify({
            "id":id
        })
        $.ajax(prepare(5,pack)).done(function(data){
            if(data.errcode==0){
                $("#selected").removeAttr("disabled");
            }else{
                console.log(data.errmsg);
                $("#selected").removeAttr("disabled");//有弹窗以后删掉
            }
        });
    }
    $("#others").delegate("div", "click", function () {
        var id=$(this).attr("id");
        sessionStorage.setItem('id',id);
        $("#selected").removeAttr("disabled");
    });
})
