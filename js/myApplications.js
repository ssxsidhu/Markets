
$(document).ready(function () {


    var username = localStorage.getItem('username');
    if(username!=null){
    //set up connection
    var faunadb = window.faunadb
    var q = faunadb.query
    var client = new faunadb.Client({
        secret: 'fnAE0WnTguAATXwpxfX-ihF-aiYRMw8FJ9I_0nxl',
        // Adjust the endpoint if you are using Region Groups
        endpoint: 'https://db.us.fauna.com',
    })
    client.query([
        q.Map(
            q.Paginate(q.Documents(q.Collection('User_Event'))),
            q.Lambda(x => q.Get(x))
          )
      
      ]).then(function (res) { 
        console.log('Result:', res);
        var length =res[0]["data"].length;
        if (length <=0){
            $(".events").html("<h5>You haven't any applications yet</h5><a class='card-link' href ='index.html'>View Events</a>")
        }else{
            for(var i=0;i<res[0]["data"].length;i++){
                var record =res[0]["data"][i]["data"];
                console.log(data);
                if(record["username"]==username){
                    var data =record["event"];
                    $(".events").append(generateView(data["day"],data["month"],data["pic"],data["name"],data["id"],data["location"],data["description"],username,false,false,data["status"]));
                }
            }
        }
    })
    .catch(function (err) { console.log('Error:', err) });

}

});

