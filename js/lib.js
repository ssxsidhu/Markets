$(document).ready(function () {
  

  $(".search").on("input", function () {
    var value = $(this).val().toUpperCase();
    var found = false;
    var count = 0;
    var total=0;
    if($(".events .searchResult").length>0){
      $(".events .searchResult").remove();
    }else{
      $(".event").each(function () {
        $(this).show();
      });
    }

    if (value == "" ) {
      $(".event").each(function () {
        $(this).show();
      });

    } else {
      $(".event").each(function () {
        total++;
        var id = $(this).attr("id");
        id = id.replace("event_", "");
        var date = $("#event_" + id + " .day").text().toUpperCase();
        var month = $("#event_" + id + " .month").text().toUpperCase();
        var year = $("#event_" + id + " .year").text().toUpperCase();
        var start = $("#event_" + id + " .start").text().toUpperCase();
        var end = $("#event_" + id + " .end").text().toUpperCase();
        var time = year + " " + month + " " + date + " " + start + " " + end;
        var location = $("#event_" + id + " .location").text().toUpperCase();
        var description = $("#event_" + id + " .summary").text().toUpperCase();
        var name = $("#event_" + id + " .title").text().toUpperCase();
        var status = $("#event_" + id + " .success-text").text().toUpperCase();
        if (description.includes(value) ||name.includes(value) ||location.includes(value) ||time.includes(value) ||status.includes(value)) {
          found = true;
          count++;
          $(this).show();
        } else {
          $(this).hide();
        }

      });

      if(total>0){
      var display = " events are found";
      if (count <= 1) {
        display = " event is found";
        if(count==0){
          $(".events .searchResult").remove();
        }
      }
      $(".events").prepend(`
        <div class="alert alert-success searchResult" role="alert">
          <div class="d-flex justify-content-center">
              <h4 class="m-4">Search: '` + value + `' ` + count + display + `</h4>
              <button class="m-4 btn btn-success btn-sm" onclick="window.location.reload();">Clear Search</button>
            </div>
        </div>`);

    }
  }



  });
});


//For handling the month names
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//for generating list view
var flag;

function generateView(ref, fee, date, month, year, start, end, pic, name, id, location, description, username, found = false, appliable = true, profile = 'false', status = '') {
  className = 'card flex-row';
  if (id == 1 && !flag && appliable) {
    className = 'card flex-row open';
    flag = true;
  }
  return `
    <div class='list flex-column event' id="event_` + id + `">
    <input type="hidden" id ="ref_` + id + `" value ="` + ref + `">

    <div class='` + className + `'>
        <img src='` + pic + `' class='eventPhoto-no-descr'>
        <div class='flex-column info'>
          <div class='title'>` + name + `</div>
          <div class='location'>` + location + `</div>
          ` + isFound(found) + isStatus(appliable,status) + `
          <div class='hidden bottom'>
              <div class="event-time">Time: <span class="start">` + start + `</span> - <span class="end">` + end + `</span></div>
              <div class="event-fee">Table Fee: <span class="fee">` + fee + `</span></div>
             
              <br/><span class="summary">
          ` + description + `</span>
          </div>
        </div>
        <div class='flex-column group'>
          <div class='flex-column date'>
            <div class="day">` + date + `</div>
            <div class="month">` + monthNames[month - 1] + `</div>
            <div class="year">` + year + `</div>
          </div>
          <div class='hidden bottom'>
              ` + isAppliable(appliable, id, username, found, profile) + `
              `+isStatusBtn(status,id, year, month, date)+`
          </div>
        </div>
      </div>
      </div>
    `
}



function isAppliable(appliable, id, username, found, profile) {

  if (!appliable || found) {
    return ``;
  }
  if (username != null && !found && profile == 'true') {
    return `<button class="btn btn-primary simple" data-bs-toggle="modal" data-bs-target="#terms_` + id + `">Apply</button>`;
  }

  if (username == null && !found && (profile == 'false' || profile == null)) {
    return `<button class="btn btn-primary simple" data-bs-toggle="modal" data-bs-target="#loginModal">Apply</button>`;
  }

  if (username != null && !found && profile == 'false') {
    return `<button class="btn btn-primary simple" data-bs-toggle="modal" data-bs-target="#profileModal">Apply</button>`;
  }
}
function isStatusBtn(status,id, year, month, date) {
  var html=``;
  if(status=='Approved'){
    html= `<button class="btn btn-primary simple btn_pay_now" id="pay_`+id+`" >Pay Now</button>`;
  }else if (status == "Accepted"){
      const today = new Date();
      if (today.getFullYear() <= year &&
        today.getMonth() <= month &&
        today.getDate() < date) {
           html= `<button class="btn btn-primary simple btn_cancel_event" id="cancel_` + id + `" >Cancel</button>`;
      }
  }
  return html;
}

function isFound(found) {
  if (found) {
    return `<p class="success-text">You have applied</p>`;
  }
  return ``;
}

function generateMenu(username) {
  return `
    <li>
    <a href="index.html" id="events-option" >
        <i class="fa fa-list fa-2x"></i>
        <span id="events-text">All Events</span>
    </a>
  </li>

    <li>
        <a href="mySchedule.html" id="my-schedule-option">
          <i class="fa fa-calendar fa-2x"></i>
          <span id="my-schedule-text">My Schedule</span>
      </a>
    </li>
    <li>
        <a href="myApplications.html" id="my-app-option">
            <i class="fa fa-file-text fa-2x"></i>
            <span id="my-app-text">My Applications</span>
        </a>
      </li>
      <li>
        <a href="myProfile.html" id="my-profile-option">
            <i class="fa fa-user fa-2x"></i>
            <span id="my-profile-text">My Profile</span>
        </a>
      </li>
      <li onclick="logout()">
        <a href="index.html" id="logout-option">
            <i class="fa fa-sign-in fa-2x"></i>
            <span id="logout-text">Log out</span>
       </a> 
       </li>`;
}

function isStatus(appliable,status) {
  if (!appliable) {
      return `<div class="status"><div class="dot `+status+`-dot"></div><div class="success-text `+status+`-text">` + status + `</div></div>`;
  }

  return ``;
}

function generateTermsModal(name, id, terms, username) {
  return `<div class="modal fade" id="terms_` + id + `" tabindex="-1" aria-labelledby="terms_Label` + id + `" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title" id="terms_Label` + id + `">` + name + ` Terms and Conditions</h6>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          ` + terms + `
          <form id="form` + id + `" class="needs-validation"  novalidate>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault` + id + `" required>
                <label class="form-check-label" for="flexCheckDefault` + id + `">
                    I have read the terms and condition
                </label>
            </div>
           
        </form>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-success btn_terms" id="btn_terms_` + id + `">Submit</button>
        </div>
      </div>
    </div>
  </div>`;

}

function getEventById(id) {
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
  var fee = $("#event_" + id + " .fee").text();
  var date = $("#event_" + id + " .day").text();
  var month = $("#event_" + id + " .month").text();
  var year = $("#event_" + id + " .year").text();
  var start = $("#event_" + id + " .start").text();
  var end = $("#event_" + id + " .end").text();
  var location = $("#event_" + id + " .location").text();
  var description = $("#event_" + id + " .summary").text();
  var name = $("#event_" + id + " .title").text();
  var pic = $("#event_" + id + " img").attr("src");
  var status = "Approved";
  return {
    "id": id,
    "fee": fee,
    "date": date,
    "month": monthsShort[month],
    "year": year,
    "start": start,
    "end": end,
    "location": location,
    "description": description,
    "pic": pic,
    "name": name,
    "status": status
  };

}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
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
          event.preventDefault();
          event.stopPropagation();
        }else{
          var id = $(this).attr("id");
          if (id == "myForm") {
            event.preventDefault();
            event.stopPropagation();
          }
          
        }
      
        


        form.classList.add('was-validated')
      }, false)
    })
})()