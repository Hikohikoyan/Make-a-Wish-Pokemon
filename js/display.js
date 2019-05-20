$(function () {
            //变换页面 和传递数据
            var clicktime = 0; //禁止频繁点球
            var click = 0;
            var user, tel, wechat;
            var elfs = new Array(); //path elf
            var elf; //路径
            var ball;
            var wishText; //愿望文本公用存储
            var wishes = new Array(); //愿望ID公用存储
            var wisher_id = new Array();
            // $('html').css({
            //     'height':$(document).height(),
            //     'width':$(document).width()
            // })
            document.body.addEventListener('touchmove', function (e) {
                e.preventDefault();
            }, {
                passive: false
            })
            $("#img41").click(function () { //开头的GO
                $("#loading").remove();
                $("#index").show();
                if(get_you()==false){
                    $("#rule").click();
                }
            })
            $("#top").show(); //allhide把这个也隐藏了 但是没写class class隐藏后也绑定不到就分开用id了 优先级待优化
            $(".btn2").show();
            $(".btn1").show(); //到此 top两个显示按钮
            $(".main_contain").show(); //主页
            var nowpage = window.location.pathname.match(/(\w+.html)$/)[0];
            if (nowpage.indexOf("wish") == 0) {
                var setting = prepare(0);
                var ajax = $.ajax(setting);
                ajax.done(function (data) {
                    if (typeof (data) === "undefined" || typeof (data.errmsg.pre_wishes) === "undefined") {
                        allatt("网络好像出了点问题，稍后再来尝试叭");
                        return;
                    }
                    $("#wishtext").text(data.errmsg.pre_wishes);
                }); //愿望页面时先请求预定义愿望
                ajax.fail(function (textStatus) {
                    allatt(String(textStatus));
                });
                get_you();
                show1("#hope_page"); //以flex style显示
                console.log("wish page");
            }
            if (nowpage.indexOf("help") == 0) {
                get_help_wishes();
                show1("#help_page"); //以flex style显示
                console.log("help page");
            }
            if (nowpage.indexOf("index") == 0) {
                get_all(); //获取精灵 精灵球 数量 sessionstorage
                console.log("index page");
            }
            //主页按钮
            $("#wish").click(function () {
                // allhide();
                // $("#hope_page").show();
                // $(".show").show();
                // $(".form").hide();
                document.getElementById("style1").href = "css/wish.css";
                console.log("into hope_page");
                hash = "#Now,make-a-wish!";
                window.location.href = "wish.html";
            }) //点击许愿
            $("#rule").click(function () {
                show_rule();
            })
            $("#pika").click(function () {
                show_rule();
            }) //点击规则
            $(".return").click(function () {
                $("#rule_page").hide();
                goback();
            }) //点击返回主页（规则页）return.png
            function goback() {
                var nowpage = window.location.pathname.match(/(\w+.html)$/)[0];
                if (nowpage.indexOf("wish") == 0) {
                    //现在是助愿页/许愿
                    window.history.back();
                } else if (nowpage.indexOf("help") == 0) {
                    window.location.href = "index.html"
                } else {
                    console.log("返回了");
                    get_all();
                    $("#elfs").hide();
                    $("#balls").hide();
                    $("#yourwish").hide();
                    $("#expode_page").hide();
                    $("#top").show();
                    $("#btn1").show();
                    $("#btn2").show();
                    $(".main_contain").show();
                }
            }
            $(".back").click(function () {
                goback();
            })
            $("#btn1").click(function () {
                $(".main_contain").hide();
                $("#top").hide();
                show1("#elfs");
                $("#back").show();
                elf = sessionStorage.getItem('elf_num');
                //path elfs[i]
                if (elf === undefined || elf === null) {
                    elf = 0;
                }
                $("h1").text("你的精灵(" + elf + ")");
                $(".elfcontain1").empty();
                for (var i = 0; i < elf; i++) {
                    var str = "elf" + i;
                    var src = sessionStorage.getItem(str);
                    $(".elfcontain1").append("<div class='elf'><img class='elfff' id='elf" + i +
                        "' src='img/bigelfboder.png'>" +
                        "<img class='elfpic' src=" + src + "></div>");
                }
            }) //查看精灵
            $("#btn2").click(function () {
                $("#balls").css({
                    "animation": "a 1s",
                    "-webkit-animation": "a 1s",
                })
                $(".main_contain").hide();
                $("#top").hide();
                show1("#balls");
                $("#back").show();
                ball = sessionStorage.getItem('ball_num');
                if (ball === undefined || ball === null) {
                    ball = 0;
                }
                $("h1").text("你的精灵球(" + ball + ")");
                $("#ball99").empty();
                if (ball == 0) {
                    return;
                }
                for (var i = 0; i < ball; i++) {
                    $("#ball99").append("<div class='ball'><img id='ball" + i +
                        "' class='ballpic' src='img/explode/1.png'>" +
                        "</div>");
                    // +"<img class='ballpic' src='img/explode/1.png'></div>");
                }

            }) //查看精灵球
            $("#help").click(function () {
                // allhide();
                // $(".main_contain").hide();
                window.location.href = "help.html";
                console.log("into help");
            }) //助愿页
            $("#selected").click(function () {
                var id = sessionStorage.getItem('chooseid');//help1
                // id=Number(id.replace("help",""));
                id=sessionStorage.getItem(id);
                var result=choose(id);
                console.log(result);
                if(result==true){
                var data = JSON.stringify({
                    "id": id
                });
                var settings = prepare(4, data);
                var ajax = $.ajax(settings);
                ajax.done(function (data) {
                    $("#name").text("昵称：" + String(data.name));
                    $("#tel").text("手机：" + String(data.telephone));
                    $("#wechat").text("微信：" + String(data.weixin));
                }); //获取信息
                ajax.fail(function (textStatus) {
                    allatt(String(textStatus));
                });
                allhide();
                $("#change").hide();
                $("#others").hide();
                $("#help_page").hide();
                show1("#info");
                $("#selected").hide();
            }else{
                allatt(result);
            }})
            //助愿页信息的确认按钮
            $("#ok2").click(function () {
                goback();
            }) //助愿的确认s按钮
            $("#change").bind("click", function () {
                $("#change").attr("disabled", "disabled");
                get_help_wishes();
                $(".select").hide();
                setTimeout(() => {
                    console.log("换一批 解除");
                    $("#change").removeAttr("disabled")
                }, 300);
            }) //换一批
            function get_help_wishes() {
                var wishText = new Array();
                var ajax = $.ajax(prepare(3));
                ajax.done(function (data) {
                    console.log(data);
                    $('.helpbox').remove();
                    for (var i = 0; i <data.length; i++) {
                        if(data.length==0){
                            allatt("暂时还没有愿望,请稍后再来叭");
                            return;
                        }
                        wishes[i] = data[i].id;
                        wishText[i] = data[i].wish_content;
                        // wisher_id[i]=data[i].wisher_id;//愿望id 愿望文本 许愿人
                        var str1 = 'help' + (i + 1);
                        var str2 = wishes[i];
                        sessionStorage.setItem(str1, str2);
                        $("#others").append("<div class='helpbox' id='"+str1+"'>" + wishText[i] + "</div>");
                    }
                });
                ajax.fail(function (textStatus) {
                    allatt(String(textStatus));
                });
            }
            $("#mine").click(function () {
                //显示 我的愿望清单  yourwish
                allhide();
                $("#back").show();
                $(".main_contain").hide();
                $(".help_attention_index").append("<br>");
                allatt("黄框表示已许下的愿望，蓝框表示选择帮助的，点击可查看TA的资料哦~");
                $.ajax(prepare(9)).done(function (data) {
                    if (data[0] != "undefined" || data[0] != null) {
                        $(".nowish").remove();
                        $(".dream").empty();
                        $(".dream").show();
                        for (var i = 0; i < data.length; i++) {
                            console.log(i);
                            if (data[i].wish_content === undefined) {
                                console.log(data);
                                return;
                            } else {
                                if(data[i].situation=="已帮助"){
                                    $(".dream").append("<div class='mine'><div class='helpbox_help' id='"+data[i].id+"'><p class='minewishes'>" +
                                    String(data[i].wish_content) + "</p></div><span id='done1'>" +
                                    String("点击查看") + "</span></div>");
                                    bindclick("#"+data[i].id);
                                }else{
                                    $(".dream").append("<div class='mine'><div class='helpbox'><p class='minewishes'>" +
                                    String(data[i].wish_content) + "</p></div><span id='done'>" +
                                    String(data[i].situation) + "</span></div>");
                                }
                            }
                        }
                    }
                })
                show1("#yourwish");
            });

            //wish.html 许愿页
            $("#next").click(function () {
                allhide(); //包含hope page
                $(".show").hide();
                $("#hope_page").show();
                show1("#sign_page");
                if(get_you()==false){
                    allatt("提示：信息一经填写就不可修改哦，请勿填错~");
                }
                console.log("into form_page");
            }) //点击下一步填写信息
            $("#name").bind('input propertychange', function () {
                prevent();
                name_check();
            });
            $("#tel").bind('input propertychange', function () {
                if($("#tel").val().length>=3){
                    tel_check();
                }
            })
            $("#wechat").bind('input propertychange', function () {
                if ($("#wechat").focus()) {
                    prevent();
                }
                vx_check();
            })
            if (name_check() == true && tel_check() == true && vx_check() == true) {
                $("#ok").removeAttr("disabled");
            }
            $(".close").click(function () {
                // $(".help_attention").empty();
                // $(".help_attention_index").empty();
                $(".att").remove();
                $(".help_attention_index").append("<p class='att'></p>");
                $(".help_attention").append("<p class='att'></p>");
                $(".help_attention_2").append("<p class='att'></p>");
                $(".help_attention").hide();
                $(".help_attention_2").hide();
                $(".help_attention_index").hide();
            })
            function prevent() {
                if (name_check() == true && tel_check() == true && vx_check() == true) {
                    $("#ok").removeAttr("disabled");
                }
            }

            function name_check() {
                var name = $("#name").val();
                if (/^\s*$/.test(name) == true && name != "") {
                    $("#namealert").text("请输入昵称");
                    // $("#ok").attr("disabled","disabled");
                    return false;
                } else {
                    $("#namealert").text("");
                    return true;
                }
            }

            function tel_check() {
                var tel = $("#tel").val();
                if(tel==undefined){
                    return false;
                }
                if (/^\s*$/.test(tel) == false && checkPhone(tel) == true) {
                    $("#telalert").text("");
                    return true;
                } else {
                    if(tel.length>=4){
                    $("#telalert").text("请输入手机号");}
                    // $("#ok").attr("disabled","disabled");
                    return false;
                }

                function checkPhone(num) {
                    if (num === undefined) {
                        return;
                    }
                    if (num.length != 11) {
                        return false;
                    } else if (/^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/.test(num) == false) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }

            function vx_check() {
                var vx = $("#wechat").val();
                if (/^\s*$/.test(vx) == false && vx.length <= 20) {
                    $("#vxalert").text("");
                    return true;
                } else {
                    $("#vxalert").text("请输入微信号");
                    // $("#ok").attr("disabled","disabled");
                    return false;
                }
            }
            function get_you(){
                var setting=prepare(11);
                var result;
                $.ajax(setting).done(function(data){
                    if (data.errcode==0) {
                        if(data.user==undefined){
                            result=false;
                            return;
                        }
                        str="name:"+data.user.name+"/"+"tel:"+data.user.telephone+"/"+"wechat:"+data.user.weixin;
                        sessionStorage.setItem("you",str);
                        var nowpage = window.location.pathname.match(/(\w+.html)$/)[0];
                        if(nowpage.indexOf("wish")==0){
                            console.log("get you");
                            var you=sessionStorage.getItem("you");
                            you=you.split("/");
                            var name=you[0].replace("name:","");
                            var tel=you[1].replace("tel:","");
                            var weixin=you[2].replace("wechat:","");
                            $("#name").val(name);
                            $("#tel").val(tel);
                            $("#wechat").val(weixin);
                            change_white("#name");
                            change_white("#tel");
                            change_white("#wechat");    
                        }
                        result=true;
                        return;
                    }else{
                        result=false;
                    }
                })
                return result;
            }
            $("#ok").click(function () { //填写完毕 提交信息
                    hoping();
                })
                function commit_wish(info){
                    var commit_info = $.ajax(prepare(2, info));
                    commit_info.done(function (data) {
                            if (data.errcode == 0 || data.errcode == 1) {
                                if (clicktime == 666) { //自定义愿望
                                    var wishText = $("#customtext").val();
                                    if (/^\s*$/.test(wishText) == false) { //自定义文本不为空
                                        console.log(clicktime + "许愿：" + wishText);
                                        var pack_wish = JSON.stringify({
                                            'wish_content': wishText
                                        })
                                        $.ajax(prepare(1, pack_wish)).done(function (data) {
                                            if (data.errcode == 0) {
                                                console.log("请求成功 提交愿望");
                                                // $("#name").val(data.name);
                                                // $("#tel").val(data.telephone);
                                                // $("#wechat").val(data.weixin);
                                            } else if (data.errcode == 1 | data.errcode == 2 || typeof (data.errcode) === "undefined") {
                                                allatt(data.errmsg);
                                            }
                                        });
                                    } else {
                                        $("#next").attr("disabled", "disabled");
                                        $("#attention0").text("许个愿吧~");
                                    }
                                } else if (clicktime == 0) {
                                    console.log("预定义"); //预定义
                                    var wishText = $("#wishtext").text();
                                    console.log("许愿：" + wishText);
                                    var pack_wish = JSON.stringify({
                                        'wish_content': wishText
                                    })
                                    $.ajax(prepare(1, pack_wish)).done(function (data) {
                                        if (data.errcode == 0) {
                                            console.log("愿望发送给后台了！");
                                            $("#hope_page").hide();
                                            console.log("into success");
                                            show1(".success");
                                        } else if (data.errcode == 1 | data.errcode == 2) {
                                            allatt(data.errmsg);
                                            return;
                                        } else if (typeof (data) === "undefined" || typeof (data.errmsg) === "undefined") {
                                            allatt("网络好像出了点问题，稍后再来尝试叭");
                                            return;
                                        }
                                    });
                                } else {
                                    $("#vxalert").text(data.errmsg);
                                };
                            }; 
                            ajax.fail(function (textStatus) {
                            console.log(textStatus);
                            allatt("网络好像出了点问题，稍后再来尝试叭");
                        })
                    });
                }
                function hoping(){
                    var result=get_you();//先看有没有这个人 返回true 有人 可以调用session
                    if(result!=true){
                        $("#name").removeAttr("readonly");
                        $("#tel").removeAttr("readonly");
                        $("#wechat").removeAttr("readonly");
                        user = $("#name").val();
                        tel = $("#tel").val();
                        wechat = $("#wechat").val();
                        var info = JSON.stringify({
                            'name': user,
                            'telephone': tel,
                            'weixin': wechat,
                        })
                        if (name_check() != true||user=="") {
                            $("#name").focus();
                            $("#namealert").text("请输入正确信息！");
                            return;
                        }
                        if (tel_check() != true) {
                            $("#tel").focus();
                            $("#telalert").text("请输入正确信息！");
                            return;
                        }
                        if (vx_check() != true) {
                            $("#wechat").focus();
                            $("#vxalert").text("请输入正确信息！");
                            return;
                        }
                        commit_wish(info);
                    }else{
                        //从sessionstorage里拿 
                        var info=sessionStorage.getItem("you");
                        commit_wish(info);
                    }
                }

                function change_white(str) {
                        $(str).css({
                            "background-color": "unset",
                            "color": "white"
                        })
                        $(str).attr("readonly","readonly");
                        return;
                }
                $("#again").click(function () {
                    $(".success").hide();
                    show1("#hope_page");
                    $("#back").show();
                    $(".show").show();
                }) //再次许愿
                $("#return").click(function () {
                    window.history.back(); //返回按钮
                })
                function allatt(errmsg) {
                    if(errmsg=="提示："){
                        $(".att").text(errmsg);
                        $(".help_attention_2").show();
                        $(".help_attention_index").show();
                        $(".help_attention").show();
                        $(".return").show();
                        return;    
                    }
                    if(errmsg==" "){
                        $(".help_attention_2").show();
                        $(".help_attention_index").show();
                        $(".help_attention").show();
                        $(".return").show();
                        return;    
                    }
                    $(".att").text(errmsg);
                    $(".help_attention_2").show();
                    $(".help_attention_index").show();
                    $(".help_attention").show();
                    $(".return").show();
                }
                //隐藏
                function allhide() {
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
                function prepare(num, some) {
                    var request = new Array();
                    request[0] = "get_pre_wishes";
                    request[1] = "save_wish"; //post
                    request[2] = "commit_info"; //post
                    request[3] = "help_wish";
                    request[4] = "after_help_show_info"; //post
                    request[5] = "commit_help"; //post
                    request[6] = "ball_list";
                    request[7] = "fairy_list";
                    request[8] = "open_ball";
                    request[9] = "my_wishes";
                    request[10] = "my_help";
                    request[11] = "get_user";
                    var method = "GET";
                    if (num == 1 || num == 2 || num == 4 || num == 5) {
                            method = "POST";
                            console.log("change method" + method);
                    }
                    var async=true;
                    if(num==5){
                        async=false;
                    }
                    var url = " api/" + request[num];
                    if (some != "" || some != undefined) {
                        var settings = {
                            "url": url,
                            "method": method,
                            "data": some,
                            "headers": {
                                "Content-Type": "application/json",
                                "cache-control": "no-cache"
                            },
                            "async":async,
                            "statusCode": {
                                404: function () {
                                    allatt("网络好像出了点问题，稍后再来尝试叭");
                                },
                                500: function () {
                                    allatt("网络好像出了点问题，稍后再来尝试叭");
                                },
                                402: function () {
                                    allatt("网络好像出了点问题，稍后再来尝试叭");
                                },
                                419:function () {
                                    window.location.href="https://hemc.100steps.net/2018/fireman/auth.php?redirect=https://hemc.100steps.net/2019/wish-pokemon-test/api/Check_login&state=gsudndu13Sd";
                                }
                            },

                        };
                    } else {
                        var settings = {
                            "url": url,
                            "method": method,
                            "headers": {
                                "Content-Type": "application/json",
                                "cache-control": "no-cache"
                            },
                            "statusCode": {
                                404: function () {
                                    allatt("网络好像出了点问题，稍后再来尝试叭");
                                },
                                500: function () {
                                    allatt("网络好像出了点问题，稍后再来尝试叭");
                                },
                                402: function () {
                                    allatt("网络好像出了点问题，稍后再来尝试叭");
                                },
                                419:function (){
                                    window.location.href="https://hemc.100steps.net/2018/fireman/auth.php?redirect=https://hemc.100steps.net/2019/wish-pokemon-test/api/Check_login&state=gsudndu13Sd";
                                }
                            },
                        };
                    }
                    return settings;
                }

                //获得精灵精灵球
                function get_all() {
                    //获取已有的精灵/精灵球
                    settings = prepare(7);
                    $.ajax(settings).done(function (data) {
                        console.log("请求精灵列表");
                        var res = translate(7, data);
                        elfs = res.path_array;
                        elf = res.fairy_num;
                        $(".span1").text(elf);
                        sessionStorage.setItem("elf_num", elf);
                        for (var i = 0; i < elf; i++) {
                            var str = 'elf' + i;
                            elfs[i] = elfs[i].replace("\"", "");
                            sessionStorage.setItem(str, elfs[i]);
                        }
                    });
                    settings = prepare(6);
                    console.log("请求精灵ball列表");
                    $.ajax(settings).done(function (data) {
                        var res = translate(6, data);
                        ball = res.now_total_ball;
                        $(".span2").text(ball);
                        sessionStorage.setItem("ball_num", ball);
                    });
                }
                //成功页画精灵
                function show_elf() {
                    var canvas = document.getElementById("canvas");
                    var ctx = canvas.getContext("2d");
                    //暂时写死
                    var Img = new Image();
                    var src = sessionStorage.getItem("open_ball");
                    Img.src = src;
                    console.log("drawelf" + src);
                    Img.onload = function () {
                        console.log("开始画了")
                        ctx.drawImage(Img, 0, 0, 200, 200);
                        // ctx.shadowColor = "white";
                        // ctx.shadowBlur = 0;
                        ctx.save();
                        setTimeout(function () {
                            ctx.clip();
                            console.log("清除画板");
                        }, 1000 * 4);
                    }
                }
                $("#middle").click(function () {
                    //发送请求换愿望
                    setTimeout(() => {
                        $("#middle:hover").css({
                            "width": "54.6px",
                            "animation": "a 1.2s linear infinite",
                            "-webkit-animation": "a 1.2s linear infinite",
                            " -webkit-transform-origin": "center",
                            "-moz-animation": "a 1.2s linear infinite",
                            "-o-animation": "a 1.2s linear infinite",
                        })
                    }, 800);
                    console.log("第" + click + "次愿望");
                    click = click + 1;
                    if (click <= 5) {
                        var setting = prepare(0);
                        var ajax = $.ajax(setting);
                        ajax.done(function (data) {
                            // console.log(data);
                            if (data.errmsg.pre_wishes == null || data.errmsg.pre_wishes === undefined) {
                                allatt("网络出错啦，再试一次叭");
                                return;
                            }
                            $("#wishtext").text(data.errmsg.pre_wishes);
                            $("#middle:hover").css({
                                "width": "54.6px",
                                "animation": "rotate2 0.7s linear infinite",
                                "-webkit-animation": "rotate2 0.7s linear infinite",
                                " -webkit-transform-origin": "center",
                                "-moz-animation": "rotate2 0.7s linear infinite",
                                "-o-animation": "rotate2 0.7s linear infinite",
                            })
                        });
                    }
                    if (click == 5) {
                        $("#middle").attr("disabled", "disabled");
                        $("#attention0").text("不可以频繁更换愿望哦")
                        setTimeout(() => {
                            $("#middle").removeAttr("disabled");
                            $("#attention0").text("");
                            click = 0;
                        }, 3000);
                    }
                })
                //许愿页定制
                $("#custom").click(function () {
                    $("#wishtext").hide();
                    $("#customtext").show();
                    $("#custom").hide();
                    $("#cancel").show();
                    clicktime = 666;
                });
                $("#cancel").click(function () {
                    // $("#attention0").hide();
                    $("#wishtext").show();
                    $("#customtext").hide();
                    $("#cancel").hide();
                    $("#custom").show();
                    $("#next").removeAttr("disabled");
                    clicktime = 0;
                })
                $("#ball99").delegate("img.ballpic", "click", function () {
                    $.ajax(prepare(8)).done(function (data) {
                        //存src session|
                        var src = data.fairy_path;
                        src = src.replace("\"", "");
                        sessionStorage.setItem("open_ball", src);
                    })
                    var id = "#" + $(this).attr("id")
                    ball_dele(id);
                    console.log($(this).attr("id"))
                    // alert(id);
                });

                //点击精灵球 随机获取精灵 球-1
                function ball_dele(ballid) {
                    $(ballid).remove();
                    $("#balls").append("<img class='explode_gif' src='img/explode/1.png'>");
                    setTimeout(() => {
                        changepic();
                    }, 200);
                    function changepic() {
                        var str = 1;
                        var bomb = setInterval(function () {
                            if (str < 20) {
                                str = Number(str)
                                str = str + 1;
                            }
                            $(".explode_gif").attr("src", "img/explode/" + str + ".png");
                        }, 60);
                        setTimeout(() => {
                            if (str = 20) {
                                // show_elf();
                                clearInterval(bomb);
                                $(".explode_gif").attr("src", "img/smallback.jpg");
                                $("#balls").css({
                                    "animation": "hide 0.3s",
                                    "-webkit-animation": "hide 0.3s",
                                    "animation-fill-mode": "forwards",
                                    "-webkit-transform-origin": "center",
                                    "animation-timing-function": "linear"
                                })
                                show_elf();
                                $(".explode_gif").remove();
                                $("#balls").hide();
                                show1(".success");
                            }
                        }, 3000);
                    }
                }
                function show_rule() {
                    allhide();
                    $(".main_contain").hide();
                    $("#back").hide();
                    $("#back_index").show();
                    show1("#rule_page");
                    document.getElementById("style1").href = "css/index.css";
                    console.log("into rule_page");
                }
                var collection = new Object(); //什么都往里面存 没问题的（
                function translate(num, collection) {
                    var result = new Array();
                    if (collection === undefined || collection == "" || collection === null) {
                        console.log("收不到！");
                        console.log(collection);
                        result.push("Nothing at all");
                        return result[0];
                    }
                    // console.log("收到了！开始转换---dididi");
                    switch (num) {
                        case 6:
                            result['now_total_ball'] = collection.now_total_ball;
                            break;
                        case 7:
                            result['path_array'] = collection.path_array;
                            result['fairy_num'] = collection.fairy_num;
                            break;
                        case 9:
                            result['errmsg'] = collection.errmsg;
                            //追加一个精灵路径
                            break;
                        case 0: //0 1 3 6
                            result['errmsg'] = collection.errmsg;
                            break;
                    }
                    return result;
                }

                function show1(str) {
                    console.log(str + "<====flex");
                    $(str).show();
                    $(str).css({
                        "display": "flex",
                        "flex-direction": "column",
                        "align-items": "center"
                    });
                }

                function choose(id) {
                    var pack = JSON.stringify({
                        "id": id
                    })
                    var ajax = $.ajax(prepare(5, pack));
                    var check;
                    ajax.done(function (data) {
                        if (data.errcode == 0) {
                            $(".help_attention").hide();
                            $("#selected").removeAttr("disabled");
                            check=true;
                        } else{
                            console.log(data.errmsg);
                            allatt(data.errmsg);
                            $("#selected").removeAttr("disabled"); 
                            check=data.errmsg;
                        }
                    });
                    return check;

                }
                $("#others").delegate("div", "click", function () {
                    $(".select").show();
                    var id = $(this).attr("id");
                    sessionStorage.setItem('chooseid', id);
                    $("#selected").removeAttr("disabled");
                    if (id == "help1") {
                        $(".select").css({
                            "top": "40px"
                        })
                    }
                    if (id == "help2") {
                        $(".select").css({
                            "top": "160px"
                        })
                    }
                    if (id == "help3") {
                        $(".select").css({
                            "top": "278px"
                        })
                    }
                });
                function bindclick(divid){
                    $(divid).bind("click", function () {
                        id=divid.replace("#","");
                        console.log("查看我的第"+divid+"条愿望");
                        sessionStorage.setItem("checkhelp",id);
                        var check=divid.replace("#","");
                        find(check);
                    })
                }
                function find(helpid){
                    var pack=JSON.stringify({
                        "id":helpid
                    });
                    var setting=prepare(4,pack);
                    $.ajax(setting).done(function(data){
                        if(data.name==undefined||data.name==null){
                            // $(".help_attention_index").prepend("<br>");
                            $(".att").text("错误：");
                            $(".help_attention_index").append("<p class='att'>获取不到</p>")
                            $(".help_attention_index").show();
                            $(".help_attention").show();
                            $(".return").show();        
                            return;
                        }
                        $(".att").text("姓名："+data.name);
                        $(".help_attention_index").append("<p class='att' style='top: 120px'>"+"手机："+data.tel+"</p>")
                        $(".help_attention_index").append("<p class='att' style='top: 150px'>"+"微信："+data.tel+"</p>")
                        $(".help_attention_index").show();
                        $(".help_attention").show();
                        $(".return").show();        
                })
                }
            })