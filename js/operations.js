$('body').on('click','.flex-row',function(){
    if($('.flex-row').hasClass('open'))
        $('.flex-row.open').toggleClass('open');
    $(this).toggleClass('open');
    })
    window.onload = function() {
        if(window.location.href.includes('index.html')){            
            $('.navigation-bar').append($('<span class="heading-text">').text("All events"))
        }
        else if(window.location.href.includes('myApplications.html')){
            $('.navigation-bar').append($('<span class="heading-text" style="right:1%;">').text("My Applications"))
        }
        else if(window.location.href.includes('mySchedule.html')){
            $('.navigation-bar').append($('<span class="heading-text" style="right:4%;">').text("My Schedule"))
        }
    }