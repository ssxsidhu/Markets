let old = $('.card').get(0);
console.log(old)
$('.card').click(function(){
  if(old!=null && $(old).hasClass('open'))
    $(old).toggleClass('open');
   $(this).toggleClass('open');
   old = this;

})
