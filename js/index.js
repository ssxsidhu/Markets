
$(document).ready(function () {


    // readTextFile("db/test.json", function(text){
    //     var data = JSON.parse(text);
    //     console.log(data);
    // });
    //set up connection
    // var faunadb = window.faunadb
    // var q = faunadb.query
    // var client = new faunadb.Client({
    //     secret: 'fnAE0WnTguAATXwpxfX-ihF-aiYRMw8FJ9I_0nxl',
    //     // Adjust the endpoint if you are using Region Groups
    //     endpoint: 'https://db.us.fauna.com',
    // })
    // client.query([
    //     q.Map(
    //         q.Paginate(q.Documents(q.Collection('Events'))),
    //         q.Lambda(x => q.Get(x))
    //       )
      
    //   ])
    // .then(function (res) { 
    //     console.log('Result:', res);
      
    //     for(var i=0;i<res[0]["data"].length;i++){
    //         var data =res[0]["data"][i]["data"];
    //         console.log(data);
    //          $(".events").append(generateView(data["date"],data["month"],data["pic"],data["name"],data["id"],data["description"]));
    //     }
    // })
    // .catch(function (err) { console.log('Error:', err) })

   

});

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}



function generateView(date, month,pic,name,id,description){
    return`      <div class="card-container">
    <div class="row border">
        <div class="col-md-6  d-flex justify-content-start ">
            <div class="photo-container">
                <div class="date">
                    <div class="day">`+date+`</div>
                    <div class="month">`+month+`</div>
                </div>
            </div>
            <img src="img/`+pic+`" class="rounded-0" alt="...">
    
        </div>
  
        <div class="col-md-6">
            <div class="info-container d-flex justify-content-between">
                <div class ="event-content">
                    <div class="event-name">
                        Event `+name+`
                    </div>
                    <div class="event-location">
                        De-stress before finals with puppies!
                    </div>
                </div>
                <a class="card-link float-right"> Apply as a vendor </a>
               
            </a>
                <a class="card-link float-right" data-bs-toggle="collapse" href="#collapseExample`+id+`"
                    aria-expanded="false" aria-controls="collapseExample`+id+`">
                    <i class="fa fa-angle-down fa-2x" aria-hidden="true"></i>
                </a>
            </div>
        </div>

    </div>
    <div class="row border">
        <div class="collapse" id="collapseExample`+id+`">
            <div class="card-body">
                `+description+`
            </div>
        </div>
    </div>
</div>`;

}