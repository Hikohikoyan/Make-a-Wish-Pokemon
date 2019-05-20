$(function(){
    var nowpage=window.location.pathname.match(/(\w+.html)$/) [0];
    let nowtimes=1;

    if(nowpage.indexOf("wish")==0){
        // $("#hope_page").hide();
        console.log("wish page");
    }
    if(nowpage.indexOf("help")==0){
        // $(".major").hide();
        // $("#selected").hide();
        console.log("help page");
    }
    if(nowpage.indexOf("index")==0){
        if(localStorage.getItem("first")==1){
            return;
        }
        dopreload();
        $("#index").hide();
        anime(1);
        console.log("index page");    
    }
    $("img").click(function(event){
        // event.preventDefault();
        return false;
    })
    function dopreload(){
        var imgdownload = new createjs.LoadQueue(true);
        function handleComplete(){
            var src=$("#rotate").attr("src");
            src=src.replace("img/rotate/","");
            src=src.replace(".png","");
            console.log("completed");
            complete();
            console.log(src);
            anime(src);
    
        }
        // imgdownload.on("fileload", handleFileLoad, this);
        imgdownload.on("complete", handleComplete, this);
        imgdownload.loadManifest([
            // "css/index.css",
            "img/iknow.png",
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
            // "img/21.png",
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
            // "img/21.png",//rotate
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
            "img/rotate/21.png",//http://182.254.161.178/laravel/public/
            "img/explode/1.png",
            "img/explode/2.png",
            "img/explode/3.png",
            "img/explode/4.png",
            "img/explode/5.png",
            "img/explode/6.png",
            "img/explode/7.png",
            "img/explode/8.png",
            "img/explode/9.png",
            "img/explode/10.png",
            "img/explode/11.png",
            "img/explode/12.png",
            "img/explode/13.png",
            "img/explode/14.png",
            "img/explode/15.png",
            "img/explode/16.png",
            "img/explode/17.png",
            "img/explode/18.png",
            "img/explode/19.png",
            "img/explode/20.png",
        ]);
    imgdownload.load();
}
    function anime(str){
        var interval=setInterval(function(){
                $("#rotate").css({
                    "animation":" a",
                    "-webkit-animation":"a ",
                    "-moz-animation":"a",
                    "-o-animation": "a",
                });
                if(str<21){
                    str = Number(str)
                        str=str+1;
                }
                var src="img/rotate/"+str+".png";
                $("#rotate").attr("src",src);
            },58);
            setTimeout(function(){
                clearInterval(interval);
                complete();
                $(".outborder").hide();
                var nowpage=window.location.pathname.match(/(\w+.html)$/) [0];
                if(nowpage.indexOf("wish")==0){
                $("#loading").hide();//上一动画
                $("#hope_page").show();}
                if(nowpage.indexOf("help")==0){
                    $("#loading").hide();//上一动画
                    $("#help_page").show();
                    $(".major").show();
                    $("#selected").show();
                }
                if(nowpage.indexOf("index")==0){
                    $(".welcome").css({
                        "display":"flex",
                        "animation": "punch 0.35s",
                        "animation-fill-mode": "forwards"
                    });
                    console.log("index page");
                }
            },1700);
}
    function complete(){
            $("#loadingtext").css({
                "animation":" a",
                "-webkit-animation":"a ",
                "-moz-animation":"a",
                "-o-animation": "a",
});
}
})