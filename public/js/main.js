$(document).ready(function() {
    $('.admin-toggle').click(function(e) {
        e.preventDefault();

        $('body').toggleClass('show-admin');
    });
});