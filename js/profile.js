
$(document).ready(function () {
 
    var username = localStorage.getItem('username');
    var userId = localStorage.getItem('userId');
    $("#username").html(username);

    if(username!=null){
    //set up connection
        $(".menu").html(generateMenu(username));
    }else{
        window.location.href="index.html";
    }
    var all_users=[];
    var faunadb = window.faunadb;
    var q = faunadb.query;
    var client = new faunadb.Client({
        secret: 'fnAE0WnTguAATXwpxfX-ihF-aiYRMw8FJ9I_0nxl',
        // Adjust the endpoint if you are using Region Groups
        endpoint: 'https://db.us.fauna.com',
    })
    client.query([
        q.Get(q.Ref(q.Collection('Users'), userId))
      ]).then(function (res) { 
        console.log('Result:', res);
        var data=res[0]["data"];
        var json = JSON.parse(data["profile"]);
        for(var i=0;i<json.length;i++){
          $("#"+json[i]["name"]).val(json[i]["value"]);
        }
    })
    .catch(function (err) { console.log('Error:', err) });

    console.log(all_users);

    $("form").submit(function(e){
        var profile = $("#profileForm").serializeArray();
        var form = $("form");
        if($(form)[0].checkValidity() === true){
            var ref=localStorage.getItem("userId");
            localStorage.setItem("profile",true);
            client .query(
                q.Update(
                q.Ref(q.Collection('Users'), ref),
                { data: { profile: JSON.stringify(profile)}  },
                )
            ).then(function(ret) { console.log(ret)
                $(".alert").remove();
              $(".container").append(`<div class="alert alert-success" role="alert">
              <div class="d-flex justify-content-center">
               <p class="m-2"> You have save the profile successfully.</p> <a href="index.html" class="btn btn-sm btn-success m-2">Apply for events</a>
                </div>
            </div>`);
           
            
            }).catch(function (err) { 
                console.log('Error:', err);
                $(".alert").remove();
                $(".container").append(`<div class="alert alert-danger" role="alert">
                <div class="d-flex justify-content-center">
                  Something went wrong... Please try again!
                  </div>
              </div>`);
            
            });
        }
 
        
   
   
        return false;
    });

   
});

$(document).ready(function() {
    if(window.location.href.includes('myProfile.html')){
        document.getElementById('my-profile-option').style.color="darkcyan"
        document.getElementById('my-profile-text').style.color="darkcyan"
    }
})