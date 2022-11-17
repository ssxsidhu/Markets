// const nameOfMonth=["","Jan", "Feb", "Mar" ,"Apr", "May", "Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// function generateView(ref,date, month,year,start,end,pic,name,id,location,description,username,found=false,appliable=true,status='Pending'){

//     return`      <div class="card-container" id="event_`+id+`">
//     <input type="hidden" id ="ref_`+id+`" value ="`+ref+`">
//     <div class="row border">
//         <div class="col-md-6  d-flex" style="padding-left: 0px; width: 35%">
//             <div class="photo-container">
//                 <div class="date">
//                     <div class="day">`+date+`</div>
//                     <div class="month">`+nameOfMonth[month]+`</div>
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
//                     <div class="event-date">
//                         <span class="event-year">`+year+`</span> - <span class="event-month">`+nameOfMonth[month]+`</span> - <span class="event-day">`+date+`</span>
//                     </div>
//                     <div class="event-time">
//                      <span class="event-start">`+start+`</span> - <span class="event-end">`+end+`</span>
//                     </div>
//                     <div class="event-location">
//                         `+location+`
//                     </div>
//                     <div>
//                     `+isFound(found)+`
//                     `+isStatus(appliable,status,id,year,month,date)+`
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


//For handling the month names
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//for generating list view
var flag;
function generateView(ref,date,month,year,start,end,pic,name,id,location,description,username,found=false,appliable=true,status='Pending'){
  className='card flex-row';
  if(id == 1 && !flag && appliable){
    className='card flex-row open';
    flag=true;
  }
  imgClass="eventPhoto-no-descr"
  if(description.length > 375){
    imgClass="eventPhoto"
  }
  return `
    <div class='list flex-column' id="event_`+id+`">
    <input type="hidden" id ="ref_`+id+`" value ="`+ref+`">

    <div class='`+className+`'>
        <img src='`+pic+`' class=`+imgClass+`>
        <div class='flex-column info'>
          <div class='title'>`+name+`</div>
          <div class='location'>`+location+`</div>
          `+isFound(found)+isStatus(appliable,status,id,year,month,date)+`
          <div class='hidden bottom summary'>
          `+description+`
          </div>
        </div>
        <div class='flex-column group'>
          <div class='flex-column date'>
            <div class="time">8:00 - 20:00</div>
            <div class="day">`+date+`</div>
            <div class="month">`+monthNames[month-1]+`</div>
            <div class="year">`+year+`</div>
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
        return `<p class="success-text">You have applied</p>`;
    }
    return ``;
}
function generateMenu(username){
    return`
    <li id="my-app-option">
        <a href="myApplications.html">
            <i class="fa fa-file-text fa-2x"></i>
            <span id="my-app-text">My Applications</span>
        </a>
      </li>
      <li id="profile-option">
        <a href="myProfile.html">
            <i class="fa fa-user fa-2x"></i>
            <span id="profile-text">Profile</span>
        </a>
      </li>
      <li id="logout-option" onclick="logout()">
        <a href="#" >
            <i class="fa fa-sign-in fa-2x"></i>
            <span id="logout-text">Log out</span>
       </a> 
       </li>`;
}

function isStatus(appliable,status,id,year,month,date){
    if(!appliable){
        if(status =="Pending" || status == "Cancel" || status =="Rejected"){
            return `<div class="btn status pcr">`+status+`</div>`;
        }else if (status == "Approved"){
            return `<div class="status"><div class="btn approved">`+status+`</div><button class="btn btn-sm btn-primary btn_pay_now" id="pay_`+id+`">Pay Now</button></div>`;
        }else if (status == "Accepted"){
            const today = new Date();
            if (today.getFullYear() <= year &&
                today.getMonth() <= month &&
                today.getDate() < date) {
                    return `<div class="status"><div class="btn approved">`+status+`</div><button class="btn btn-sm btn-primary btn_cancel_event" id="cancel_`+id+`">Cancel</button></div>`;
              }

              return `<div>Status: `+status+`</div>`;
        }

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
          <form id="form`+id+`" class="needs-validation"  novalidate>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault`+id+`">
                <label class="form-check-label" for="flexCheckDefault`+id+`">
                    I have read the terms and condition
                </label>
            </div>
           
        </form>
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
    const monthsShort = {
        Jan: '01',
        Feb: '02',
        Mar: '03',
        Apr: '04',
        May: '05',
        Jun: '06',
        Jul: '07',
        Aug: '08',
        Sep: '09',
        Oct: '10',
        Nov: '11',
        Dec: '12',
      };
    var date =$("#event_"+id+" .day").text();
    var month =$("#event_"+id+" .month").text();
    var year =$("#event_"+id+" .event-year").text();
    var start =$("#event_"+id+" .event-start").text();
    var end =$("#event_"+id+" .event-end").text();
    var location =$("#event_"+id+" .event-location").text();
    var description =$("#event_"+id+" .description").text();
    var name=$("#event_"+id+" .event-name").text();
    var pic = $("#event_"+id+" img").attr("src");
    var status = "Approved";
    return {"id":id,"date":date,"month":monthsShort[month],"year":year,"start":start,"end":end,"location":location,"description":description,"pic":pic,"name":name,"status":status};

}

function logout(){
    localStorage.clear();
    window.location.reload();
}

(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
          var id =$(this).attr("id");
          if(id=="myForm"){
            event.preventDefault();
            $('#myModal').modal('show');
          }

    
          form.classList.add('was-validated')
        }, false)
      })
  })()