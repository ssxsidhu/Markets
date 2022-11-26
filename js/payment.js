
function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

$('#validationCustomUsername').on('keypress change', function() {
    $(this).val(function(index, value) {
      return value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
    });
  });

  function isValidDate(){

    var today, someday;
    var exMonth=document.getElementById('selectedMonth');
    console.log('MONTH:', exMonth.value);
    var exYear=document.getElementById('selectedYear');
    console.log('YEAR:', exYear.value);

    today = new Date();
    someday = new Date();
    someday.setFullYear(exYear.value, exMonth.value - 1, someday.getDate());

    if (someday < today) {
      document.getElementById("errmsg").innerHTML = "Please select a valid expiry date";
      return false;
    } else {
      document.getElementById("errmsg").innerHTML = "";
      return true;
    }

    // document.getElementById("errmsg") = "You selected: " + x;
    // today = new Date();
    // someday = new Date();
    // someday.setFullYear(exYear, exMonth, 1);
    
    // if (someday < today) {
    //   alert("The expiry date is before today's date. Please select a valid expiry date");
    //   return false;
    // }
  
  }
