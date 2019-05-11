$(function(){
    var imgdownload = new createjs.LoadQueue(true);
    imgdownload.on("fileload", handleFileLoad, this);
    imgdownload.on("complete", handleComplete, this);
    imgdownload.LoadFileManifest([
        "img/elfborder.png",//index.html
        "img/ballborder.png",
        "img/title.png",
        "img/wish.png",
        "img/help.png",
        "img/mine.png",
        "img/rule.png",
        "img/49.png",
        "img/21.png",
        "img/bigelfboder.png",
        "img/middle.png",//wsih.html
        "img/next.svg",
        "img/again.png",
        "img/gohelp.png",
        "img/换一批.png",
        "img/wagada.png",
        "img/423.png",
        "img/21.png",
    ]);
    var res=imgdownload.load();
    if(!res){
        console.log("imgdownload not ok");
    }
})