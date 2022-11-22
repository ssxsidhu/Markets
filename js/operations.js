$('body').on('click','.flex-row',function(){
    if($('.flex-row').hasClass('open'))
        $('.flex-row.open').toggleClass('open');
    $(this).toggleClass('open');
    });

    $(document).ready(function() {
        $(".features").css({
          'min-width': ($(".container").width() + 'px')
        });

        console.log(window.location.href)

        if(window.location.href.includes('myApplications.html')){
            document.getElementById('my-app-option').style.color="darkcyan"
            document.getElementById('my-app-text').style.color="darkcyan"
        }
        else if(window.location.href.includes('mySchedule.html')){
            document.getElementById('my-schedule-option').style.color="darkcyan"
            document.getElementById('my-schedule-text').style.color="darkcyan"
        }
        else{
            document.getElementById('events-option').style.color="darkcyan"
            document.getElementById('events-text').style.color="darkcyan"
        }

      });