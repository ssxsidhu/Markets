$('body').on('click','.flex-row',function(){
    if($('.flex-row').hasClass('open'))
        $('.flex-row.open').toggleClass('open');
    $(this).toggleClass('open');
    });

