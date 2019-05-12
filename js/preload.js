$(function(){
    var nowpage=location.href.split("/");
    if(nowpage[4].indexOf("wish")==0){
        $("#hope_page").hide();
        console.log("wish page");
    }
    if(nowpage[4].indexOf("help")==0){
        $(".major").hide();
        $("#selected").hide();
        console.log("help page");
    }
    if(nowpage[4].indexOf("index")==0){
        $("#index").hide();
        console.log("index page");
    }
    var imgdownload = new createjs.LoadQueue(true);
    function handleComplete(){
        var src=$("#rotate").attr("src");
        src=src.replace("img/rotate/","");
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
        "img/smallback.jpg",
        "img/background.png",
        "img/elfborder.png",//index.html
        "img/ballborder.png",
        "img/title.png",
        "img/wish.png",
        "img/help.png",
        "img/mine.png",
        "img/rule.png",
        "img/49.png",
        "img/41.png",
        "img/21.png",
        "img/bigelfboder.png",
        // "img/middle.png",//wsih.html
        "img/next.png",
        "img/again.png",
        "img/gohelp.png",
        "img/change.png",
        "img/wagada.png",
        "img/cancel.png",//new
        "img/back.png",
        "img/return.png",
        "img/welcome.png",
        "img/cunstom.png",
        "img/21.png",//rotate
        "img/rotate/1.png",
        "img/rotate/2.png",
        "img/rotate/3.png",
        "img/rotate/4.png",
        "img/rotate/5.png",
        "img/rotate/6.png",
        "img/rotate/7.png",
        "img/rotate/8.png",
        "img/rotate/9.png",
        "img/rotate/10.png",
        "img/rotate/11.png",
        "img/rotate/12.png",
        "img/rotate/13.png",
        "img/rotate/14.png",
        "img/rotate/15.png",
        "img/rotate/16.png",
        "img/rotate/17.png",
        "img/rotate/18.png",
        "img/rotate/19.png",
        "img/rotate/20.png",
        "img/rotate/21.png",
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
            var src="img/rotate/"+str+".png";
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
            var nowpage=location.href.split("/");
            
            if(nowpage[4].indexOf("wish")==0){
            $("#hope_page").fadeIn(2000);}
            if(nowpage[4].indexOf("help")==0){
                $("#help_page").fadeIn(2000);
                $(".major").fadeIn(2500);
                $("#selected").fadeIn(2500);
            }
            if(nowpage[4].indexOf("index")==0){
                $("#index").show();
                console.log("index page");
            }
        },1000)
    }

})