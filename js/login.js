





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
           var ref = res[0]["data"][i]["ref"]["value"]["id"];
           data["ref"]=ref;
           all_users.push(data);
        }
    })
    .catch(function (err) { console.log('Error:', err) });

    $("input").on("input",function(){
        $(".alert").hide();
    });
    $("form").submit(function(e){
     
        var match = false;
        var username = $("#username").val();
        var password = $("#password").val();
        var vName = document.getElementById("username");
        var vPass = document.getElementById("password");
        var form = $("form");
        if($(form)[0].checkValidity() === true){
            for(var i =0;i<all_users.length;i++){
                var user = all_users[i];
                if(user["username"]==username){
                    if(user["password"]==password){
                        match=true;
                        
                        localStorage.setItem('username', username);
                        localStorage.setItem('userId', user["ref"]);
                        if(user["profile"]){
                            localStorage.setItem('profile',true);
                        }else{
                            localStorage.setItem('profile',false);
                        }
                        window.location.href="index.html";
                    }
                }
            }
        }
        if(!match && username!="" && password!=""){
          $(".alert").show();
        }
        return false;
    });

   
});


