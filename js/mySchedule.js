$(document).ready(function () {
 
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      initialDate: today,
      editable: true,
      navLinks: true, // can click day/week names to navigate views
      dayMaxEvents: true, // allow "more" link when too many events
      eventClick: function(info) {
        info.jsEvent.preventDefault(); // don't let the browser navigate
    
        if (info.event.url) {
         $(info.event.url).modal("show");
        }
      }

      

    });
    calendar.render();
    var username = localStorage.getItem('username');
    var all_events=[];
    if(username!=null){
    //set up connection
    $(".menu").html(generateMenu(username));//set up user menu
    var faunadb = window.faunadb
    var q = faunadb.query
    var client = new faunadb.Client({
        secret: 'fnAE0WnTguAATXwpxfX-ihF-aiYRMw8FJ9I_0nxl',
        // Adjust the endpoint if you are using Region Groups
        endpoint: 'https://db.us.fauna.com',
    });
    client.query([
        q.Map(
            q.Paginate(q.Documents(q.Collection('User_Event'))),
            q.Lambda(x => q.Get(x))
          )
      
      ]).then(function (res) { 
        console.log('Result:', res);
        var length =res[0]["data"].length;
        if (length >0){
            for(var i=0;i<res[0]["data"].length;i++){
                var record =res[0]["data"][i]["data"];
         
                if(record["username"]==username){
                    var data =record["event"];
                    if(data["status"] == "Accepted"){
                        calendar.addEvent(eventCalendar(data));
                        $("#event_modal").append(generateDetailView(data));
                    }
                    
                }
            }
        }
    }).catch(function (err) { console.log('Error:', err) });
    }

   
});

function eventCalendar(event){
    var obj ={
        "title":event["name"].trim(),
        "start":(event["year"]+"-"+event["month"]+"-"+event["date"]+"T"+event["start"]).trim(),
        "end":(event["year"]+"-"+event["month"]+"-"+event["date"]+"T"+event["end"]).trim(),
        "url":"#event"+event["id"]
    };
    return obj;
}

function generateDetailView(event){
    return `<div class="modal fade" id="event`+event["id"]+`" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="eventLabel`+event["id"]+`" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="eventLabel`+event["id"]+`">`+event["name"]+`</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
                <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                <div class="col-md-4">
                    <img src="`+event["pic"]+`" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <h5 class="card-title">`+event["year"]+"-"+ nameOfMonth[event["month"]]+"-"+event["date"]+`</h5>
                    <p class="card-text"><small class="text-muted">`+"Time: "+event["start"]+" - "+event["end"]+`</small></p>
                    <p class="card-text">`+event["location"]+`</p>
       
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>`;
}



