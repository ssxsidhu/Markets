





$(document).ready(function () {
 

    var all_users=[];
    var faunadb = window.faunadb;
    var q = faunadb.query;
    var client = new faunadb.Client({
        secret: 'fnAE0WnTguAATXwpxfX-ihF-aiYRMw8FJ9I_0nxl',
        // Adjust the endpoint if you are using Region Groups
        endpoint: 'https://db.us.fauna.com',
    })
    client.query([
        q.Map(
            q.Paginate(q.Documents(q.Collection('Users'))),
            q.Lambda(x => q.Get(x))
          )
      ]).then(function (res) { 
        console.log('Result:', res);
       
        for(var i=0;i<res[0]["data"].length;i++){
           var data =res[0]["data"][i]["data"];
           all_users.push(data);
        }
    })
    .catch(function (err) { console.log('Error:', err) });

    $("form").submit(function(e){
        var match = false;
        var username = $("#username").val();
        var password = $("#password").val();
        var form = $("form");
        if($(form)[0].checkValidity() === true){
            for(var i =0;i<all_users.length;i++){
                var user = all_users[i];
                if(user["username"]==username){
                    if(user["password"]==password){
                        match=true;
                        localStorage.setItem('username', username);
                        window.location.href="index.html";
                    }
                }
            }
        }
        return false;
    });

   
});


