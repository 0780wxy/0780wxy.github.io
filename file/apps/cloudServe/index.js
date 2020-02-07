var tops = os.size*8,
    lefts = os.size*11;
tops = document.body.clientHeight - tops;
lefts = document.body.clientWidth - lefts;
tops = tops*0.5;
lefts = lefts*0.5;
os.addWindow({
  "body":"/apps/cloudServe/ui.htm",
  "name":" ",
  "icon":"/apps/cloudServe/icon.svg",
  "app" : "cloudServe",
  "height" : os.size*8,
  "width" : os.size*11,
  "top" : tops,
  "left" : lefts
});
$("."+os.hotWindow+" .conBar .max").hide();
$("."+os.hotWindow+" .Csize").hide();
$("."+os.hotWindow+" .icon").html("");
$("."+os.hotWindow+" .text").css("overflow-y","hidden");
$("."+os.hotWindow+" .text").css("overflow-x","hidden");
$("."+os.hotWindow+" .conBar").css({
  "width" : os.size*1.5
});
