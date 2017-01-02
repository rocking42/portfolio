$(document).ready(function() {
  $("h1").on("click", function() {
    $("div.center").fadeOut();
    $("html").css({"background": "black",
                    "display" : "relative"});
    // $(".hidden").show();
    var list = $("li");
    var wait = 400;
    for (var i = 0; i < list.length; i++) {
      list.eq(i).delay(wait).fadeIn();
      wait += 400;
    }
  });

  // Show projects
  $(".list02").on("click", function() {
    $(".heading").fadeIn();
    var project = $(".project");
    var wait = 300;
    for (var i = 0; i < project.length; i++) {
      project.eq(i).delay(wait).fadeIn();
      wait += 400;
    }
    //$(".project").fadeIn()
  });
});
