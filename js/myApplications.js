
$(document).ready(function () {


    var username = localStorage.getItem('username');
    if(username!=null){
    //set up connection
    $(".menu").html(generateMenu(username));//set up user menu
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
        var count =0;
        if (length >0){
            for(var i=0;i<res[0]["data"].length;i++){
                var ref = res[0]["data"][i]["ref"]["value"]["id"];
                var record =res[0]["data"][i]["data"];
             
                if(record["username"]==username){
                    var data =record["event"];
                    count++;
                    $(".events").append(generateView(ref,data["date"],data["month"],data["year"],data["start"],data["end"],data["pic"],data["name"],data["id"],data["location"],data["description"],username,false,false,data["status"]));
                }
            }
            if(count<=0){
                $(".events").html("<h5>You haven't any applications yet</h5><a class='card-link' href ='index.html'>View Events</a>")
            }

        }
    })
    .catch(function (err) { console.log('Error:', err) });

    $(document).on('click','.btn_pay',function(){
        
        var ref=localStorage.getItem("id");
        client .query(
            q.Update(
            q.Ref(q.Collection('User_Event'), ref),
            { data: { event:{status: 'Accepted'} } },
            )
        ).then(function(ret) { console.log(ret)
            location.href = "myApplications.html";
          //  localStorage.removeItem("id");
        });
  

        });

    $(document).on('click','.btn_pay_now',function(){
        var id =$(this).attr("id");
        id=id.replace("pay_","ref_");
        var ref =$("#"+id).val();
         localStorage.setItem("id",ref);
        location.replace("payment.html")
});


    $(document).on('click','.btn_cancel_event',function(){
        var id =$(this).attr("id");
        id=id.replace("cancel_","ref_");
        var ref =$("#"+id).val();
        client .query(
            q.Update(
            q.Ref(q.Collection('User_Event'), ref),
            { data: { event:{status: 'Cancel'} } },
            )
        ).then(function(ret) { console.log(ret)
            window.location.reload();
        });


});

}

});

