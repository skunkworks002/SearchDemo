$(document).ready(function(){
	$(".advance-btn").click(function(){
      $("#advance-search-container").slideToggle();
    });
	$(window).scroll(function () {
            if ($(this).scrollTop() > 50) {
                $('#back-to-top').fadeIn();
            } else {
                $('#back-to-top').fadeOut();
            }
        });
        // scroll body to 0px on click
        $('#back-to-top').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 1000);
            return false;
        });

});
