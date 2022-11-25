
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


