// // function payment(){
// //     location.replace("myApplications.html")
// // }

// // Example starter JavaScript for disabling form submissions if there are invalid fields
// (function () {
//   'use strict'

//   // Fetch all the forms we want to apply custom Bootstrap validation styles to
//   var forms = document.querySelectorAll('.needs-validation')

//   // Loop over them and prevent submission
//   Array.prototype.slice.call(forms).forEach(function (form) {
//       form.addEventListener('submit', function (event) {
//         if (!form.checkValidity()) {
//           event.preventDefault()
//           event.stopPropagation()
//         }
//         $('#myForm').on('submit', function(event){
//           event.preventDefault();
//           $('#myModal').modal('show');
          
//         });
//         form.classList.add('was-validated')
//       }, false)
//     })
// })()


// // function payment(){
// //     location.replace("myApplications.html")
// // }

// // Example starter JavaScript for disabling form submissions if there are invalid fields
// (function () {
//   'use strict'

//   // Fetch all the forms we want to apply custom Bootstrap validation styles to
//   var forms = document.querySelectorAll('.needs-validation')

//   // Loop over them and prevent submission
//   Array.prototype.slice.call(forms).forEach(function (form) {
//       form.addEventListener('submit', function (event) {
//         if (!form.checkValidity()) {
//           event.preventDefault()
//           event.stopPropagation()
//         }
//         $('#myForm').on('submit', function(event){
//           event.preventDefault();
//           $('#myModal').modal('show');
          
//         });
//         form.classList.add('was-validated')
//       }, false)
//     })
// })()

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


