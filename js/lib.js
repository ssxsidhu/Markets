
// function generateView(date, month,pic,name,id,location,description,username,found=false,appliable=true,status='Pending'){
//     return`     
//     <div class="card-container" id="event_`+id+`">
//     <div class="row border">
//         <div class="col-md-6  d-flex" style="padding-left: 0px; width: 35%">
//             <div class="photo-container">
//                 <div class="date">
//                     <div class="day">`+date+`</div>
//                     <div class="month">`+month+`</div>
//                 </div>
//             </div>
//             <img src='`+pic+`'" class="rounded-0" alt="...">
    
//         </div>
  
//         <div class="col-md-6" style="width:65%">
//             <div class="info-container d-flex justify-content-between" style="padding: 20px">
//                 <div class ="event-content" style="width:70%">
//                     <div class="event-name">
//                          `+name+`
//                     </div>
//                     <div class="event-location">
//                         `+location+`
//                     </div>
//                     <div>
//                     `+isFound(found)+`
//                     `+isStatus(appliable,status)+`
//                     </div>
//                 </div>           
//                 `+isAppliable(appliable,id,username,found)+`
//                 <a class="card-link" data-bs-toggle="collapse" href="#collapseExample`+id+`"
//                     aria-expanded="false" aria-controls="collapseExample`+id+`">
//                     <span class="material-symbols-rounded" style="font-size:30px; line-height:2">expand_circle_down</span>
//                 </a>
//             </div>
//         </div>

//     </div>
//     <div class="row">
//         <div class="collapse border" id="collapseExample`+id+`" style="border-color: black!important" >
//             <div class="card-body description" style="padding: 10px">
//                 `+description+`
//             </div>
//         </div>
//     </div>
// </div>`;

// }


function generateView(date,month,image,name,id,location,description,username,found=false,appliable=true,status='Pending'){
    return `
    <div class='list flex-column' id="event_`+id+`">
    <div class='card flex-row'>
        <img src='`+image+`' class='book'>
        <div class='flex-column info'>
          <div class='title'>`+name+`</div>
          <div class='author'>`+location+`</div>
          <div>`+isFound(found)+isStatus(appliable,status)+`</div>
          <div class='hidden bottom summary'>
          `+description+`
          </div>
        </div>
        <div class='flex-column group'>
          <div class='flex-column members'>
            <div class="day">`+date+`</div>
            <div class="month">Nov</div>
          </div>
          <div class='hidden bottom'>
              `+isAppliable(appliable,id,username,found)+`
          </div>
        </div>
      </div>
      </div>
    `
}





function isAppliable(appliable,id,username,found){
    if(!appliable || found){
        return ``;
    }
    if(username!=null && !found){
        return `<button class="btn btn-primary simple" data-bs-toggle="modal" data-bs-target="#terms_`+id+`">Apply</button>`;
    }

    if(!found){
        return `<button class="btn btn-primary simple" data-bs-toggle="modal" data-bs-target="#loginModal">Apply</button>`;
    }
    
}
function isFound(found){
    if(found){
        return `<p class="text-success">You have applied</p>`;
    }
    return ``;
}
function generateMenu(username){
    return`<a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown"
    aria-expanded="false">
    `+username+`
   
</a>
<ul class="dropdown-menu text-small">
    <li><a class="dropdown-item" href="myApplications.html">My Applications</a></li>
    <li><a class="dropdown-item" href="myProfile.html">Profile</a></li>
    <li>
        <hr class="dropdown-divider">
    </li>
    <li><a class="dropdown-item" href="#" onclick="logout();">Sign out</a></li>
</ul>`;
}

function isStatus(appliable,status){
    if(!appliable){
        return `<p>Status:`+status+`</p>`;
    }
    return ``;
}

function generateTermsModal(name ,id,terms,username){
    return `<div class="modal fade" id="terms_`+id+`" tabindex="-1" aria-labelledby="terms_Label`+id+`" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="terms_Label`+id+`">`+name+` Terms and Conditions</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          `+terms+`
          
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary btn_terms" id="btn_terms_`+id+`">Submit</button>
        </div>
      </div>
    </div>
  </div>`;

}

function getEventById(id){
    
    var day =$("#event_"+id+" .day").text();
    var month =$("#event_"+id+" .month").text();
    var location =$("#event_"+id+" .event-location").text();
    var description =$("#event_"+id+" .description").text();
    var name=$("#event_"+id+" .event-name").text();
    var pic = $("#event_"+id+" img").attr("src");
    var status = "Pending";
    return {"id":id,"day":day,"month":month,"location":location,"description":description,"pic":pic,"name":name,"status":status};

}

function logout(){
    localStorage.clear();
    window.location.reload();
}