$(function(){
    if(location.href.indexOf("wish")!=0){
        $("#hope_page").hide();
        console.log("wish page");
    }
    if(location.href.indexOf("help")!=0){
        $(".major").hide();
        console.log("help page");
    }
    if(location.href.indexOf("index")!=0){
        $("#index").hide();
        console.log("index page");
    }
    var imgdownload = new createjs.LoadQueue(true);
    function handleComplete(){
        var src=$("#rotate").attr("src");
        src=src.replace("http://182.254.161.178/test/laravel/public/img/rotate/","");
        src=src.replace(".png","");
        console.log("completed");
        console.log(src);
        anime(src);
    }
    // imgdownload.on("fileload", handleFileLoad, this);
    imgdownload.on("complete", handleComplete, this);
    // console.log(imgdownload);
    // console.log(imgdownload.loadManifest);
    imgdownload.loadManifest([
        "http://182.254.161.178/test/laravel/public/img/smallback.jpg",
        "http://182.254.161.178/test/laravel/public/img/background.png",
        "http://182.254.161.178/test/laravel/public/img/elfborder.png",//index.html
        "http://182.254.161.178/test/laravel/public/img/ballborder.png",
        "http://182.254.161.178/test/laravel/public/img/title.png",
        "http://182.254.161.178/test/laravel/public/img/wish.png",
        "http://182.254.161.178/test/laravel/public/img/help.png",
        "http://182.254.161.178/test/laravel/public/img/mine.png",
        "http://182.254.161.178/test/laravel/public/img/rule.png",
        "http://182.254.161.178/test/laravel/public/img/49.png",
        "http://182.254.161.178/test/laravel/public/img/41.png",
        "http://182.254.161.178/test/laravel/public/img/21.png",
        "http://182.254.161.178/test/laravel/public/img/bigelfboder.png",
        "http://182.254.161.178/test/laravel/public/img/middle.png",//wsih.html
        "http://182.254.161.178/test/laravel/public/img/next.png",
        "http://182.254.161.178/test/laravel/public/img/again.png",
        "http://182.254.161.178/test/laravel/public/img/gohelp.png",
        "http://182.254.161.178/test/laravel/public/img/change.png",
        "http://182.254.161.178/test/laravel/public/img/wagada.png",
        "http://182.254.161.178/test/laravel/public/img/cancel.png",//new
        "http://182.254.161.178/test/laravel/public/img/back.png",
        "http://182.254.161.178/test/laravel/public/img/return.png",
        "http://182.254.161.178/test/laravel/public/img/welcome.png",
        // "img/423.png",
        "http://182.254.161.178/test/laravel/public/img/21.png",//rotate
        "http://182.254.161.178/test/laravel/public/img/rotate/1.png",
        "http://182.254.161.178/test/laravel/public/img/rotate/2.png",
        "http://182.254.161.178/test/laravel/public/img/rotate/3.png",
        "http://182.254.161.178/test/laravel/public/img/rotate/4.png",
        "http://182.254.161.178/test/laravel/public/img/rotate/5.png",
        "http://182.254.161.178/test/laravel/public/img/rotate/6.png",
        "http://182.254.161.178/test/laravel/public/img/rotate/7.png",
        "http://182.254.161.178/test/laravel/public/img/rotate/8.png",
        "http://182.254.161.178/test/laravel/public/img/rotate/9.png",
        "http://182.254.161.178/test/laravel/public/img/rotate/10.png",
        "http://182.254.161.178/test/laravel/public/img/rotate/11.png",
        "http://182.254.161.178/test/laravel/public/img/rotate/12.png",
        "http://182.254.161.178/test/laravel/public/img/rotate/13.png",
        "http://182.254.161.178/test/laravel/public/img/rotate/14.png",
        "http://182.254.161.178/test/laravel/public/img/rotate/15.png",
        "http://182.254.161.178/test/laravel/public/img/rotate/16.png",
        "http://182.254.161.178/test/laravel/public/img/rotate/17.png",
        "http://182.254.161.178/test/laravel/public/img/rotate/18.png",
        "http://182.254.161.178/test/laravel/public/img/rotate/19.png",
        "http://182.254.161.178/test/laravel/public/img/rotate/20.png",
        "http://182.254.161.178/test/laravel/public/img/rotate/21.png",
    ]);
    imgdownload.load();
    // console.log(res);
    // if(!res){
    //     console.log("imgdownload not ok");
    // }else{
    // }

    function anime(str){
        var interval=setInterval(function(){
            $("#rotate").css({
                // "height":"118px",
                // "width":"100%",
                "transform":"scale(0.8)",
                "animation":" a",
                "margin-left": "-32.8px",
                "-webkit-animation":"a ",
                "-moz-animation":"a",
                "-o-animation": "a",
            });
            // console.log("changesrc:"+str);
            if(str!=21){
                str = Number(str)
                //for(var i=str;i<21;i++){
                    // console.log(str)
                    str=str+1;
                    // console.log(str)
                //}
            }
            var src="http://182.254.161.178/test/img/rotate/"+str+".png";
            $("#rotate").attr("src",src);
        },70);
        setTimeout(function(){
            clearInterval(interval);
            $("#loadingtext").text("Completed!");
            $(".outborder").children()[2].remove();
            $("#loadingtext").css({
                "animation":" a",
                // "margin-left": "-12.8px",
                "-webkit-animation":"a ",
                "-moz-animation":"a",
                "-o-animation": "a",
            });
            $("#loading").fadeOut(400);//上一动画
            if(location.href.indexOf("wish")!=0){
            $("#hope_page").fadeIn(2000);}
            if(location.href.indexOf("help")!=0){
                $("#help_page").fadeIn(2000);
                $(".major").fadeIn(2500);
            }
            if(location.href.indexOf("index")!=0){
                $("#index").show();
                console.log("index page");
            }        
        },1000)
    }

})