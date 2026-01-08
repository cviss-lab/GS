document.addEventListener('DOMContentLoaded', function() {
  // 确保 jQuery 存在
  if (typeof jQuery !== 'undefined') {
    var $ = jQuery;
    
    $('.custom-tabs li:first-child a').addClass('active');
    $('.tab-content-item:first').addClass('active');
    
    $('.custom-tabs a').on('click', function(e) {
      e.preventDefault();
      var tab_id = $(this).attr('href');
      $('.custom-tabs a').removeClass('active');
      $('.tab-content-item').removeClass('active');
      $(this).addClass('active');
      $(tab_id).addClass('active');
    });
  }
});