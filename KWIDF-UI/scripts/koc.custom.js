// JavaScript Document
//jquery-split-resize-floating-sidebar
var min = 100;
var max = 350;
var mainmin = 200;

(function () {
    //alert('myself');
})();

$('#split-bar').mousedown(function (e) {
    e.preventDefault();
    $(document).mousemove(function (e) {
        e.preventDefault();
        var x = e.pageX - $('#sidebar').offset().left;
        if (x > min && x < max && e.pageX < ($(window).width() - mainmin)) {  
          $('#sidebar').css("width", x);
          $('#main').css("margin-left", x);
        }
    })
});
$(document).mouseup(function (e) {
    $(document).unbind('mousemove');
});