
function sideCollapse(){
    $('#sidebar').removeClass('active');
    $('.overlay').removeClass('active');
}
function sideExpand(){
    $('#sidebar').addClass('active');
    $('.overlay').addClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
}

function loadLogin(){
}   
$(document).ready(function (e) {
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });
    $('#dismiss, .overlay').on('click', sideCollapse);
    $('#sidebarCollapse').on('click', sideExpand);
    $("#signinbtn").on('click',function(){
        $( "#signinbody" ).load( "/signin", function() {
            $("#sidebar",this).remove();
            $("#topnav",this).remove();
            // alert( "Load was performed." );
        });
    });
});