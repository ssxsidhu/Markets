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

 //validation
  $("#username").bind('blur', function(event) {
        var found= false;
        var value = $("#username").val();
        for(var i =0;i<all_users.length;i++){
            var user = all_users[i];
            if(user["username"]==value){
                found = true;
            }
        }
        var name = document.getElementById("username");
        if(value==""){
            name.setCustomValidity("Please enter a eamil");
            $(".username").text("Please enter a email");
        }else{
            if(found){ 
                name.setCustomValidity("The user has exits");
                $(".username").text("The user has exits");
            }else{
                name.setCustomValidity("");
            }
        }
        
    });

    $("#password2").on('change', function(event) {
        var value2 = $("#password2").val();
        var value1 = $("#password").val();
  
        var password2 = document.getElementById("password2");
        if(value2==""){
            password2.setCustomValidity("Please re-enter your password");
            $(".password2").text("Please re-enter your password");
        }else{
            if(value1 != value2){ 
                password2.setCustomValidity("Password does not match");
                $(".password2").text("Password does not match");
            }else{
                password2.setCustomValidity("");
            }
        }
        
    });

    $("#password").bind('blur', function(event) {
        var value1 = $("#password").val();
        var password = document.getElementById("password");
        $("#password2").val("");
        if(value1==""){
            password.setCustomValidity("Please enter your password");
            $(".password").text("Please enter your password");
        }else{
            if(value1.length<8){ 
                password.setCustomValidity("Password does not match");
                $(".password").text("At least 8 characters");
            }else{
                password.setCustomValidity("");
            }
        }
        
    });



    //submit form
    $("form").submit(function(e){
        var username = $("#username").val();
        var password = $("#password").val();
        var form = $("form");
        if($(form)[0].checkValidity() === true){
            client.query(
                q.Create(
                q.Collection('Users'),
                { data: { username:username,password:password } },
                )
            )
            .then(function(ret) {
                console.log(ret);
                var ref = ret["ref"]["value"]["id"];
                //auto login
                localStorage.setItem("username",username);
                localStorage.setItem("userId",ref);
                 window.location="myprofile.html";
            });
        }
        
        return false;
    });

   
});

