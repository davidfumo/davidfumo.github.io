/*
  Jquery Validation using jqBootstrapValidation
   example is taken from jqBootstrapValidation docs 
  */
$(function () {

  $("input,textarea").jqBootstrapValidation(
    {
      preventSubmit: true,
      submitError: function ($form, event, errors) {
        // something to have when submit produces an error ?
        // Not decided if I need it yet
      },
      submitSuccess: function ($form, event) {
        event.preventDefault(); // prevent default submit behaviour
        // get values from FORM
        var name = $("input#name").val();
        var email = $("input#email").val();
        var message = $("textarea#message").val();
        var subject = $("input#subject").val();
        var firstName = name; // For Success/Failure Message
        // Check for white space in name for Success/Fail message
        if (firstName.indexOf(' ') >= 0) {
          firstName = name.split(' ').slice(0, -1).join(' ');
        }

        $('.submit-btn').prop('disabled', true); 

        var template_params = {
          "reply_to": email,
          "from_name": name,
          "message_html": message,
          "subject": subject,
        }
        
        var service_id = "default_service";
        var template_id = "template_VGv2ENEZ";
        emailjs.send(service_id, template_id, template_params)
          .then(
            function() {
                // success
                $('#success').html("<div class='alert alert-success'>");
                $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                  .append("</button>");
                $('#success > .alert-success')
                  .append("<strong>Sua mensagem foi enviada. </strong>");
                $('#success > .alert-success')
                  .append('</div>');

                //clear all fields
                $('#contactForm').trigger("reset");
                $('.submit-btn').prop('disabled', false); 
            }, function(err) {
                   // Fail message
                  $('#success').html("<div class='alert alert-danger'>");
                  $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                  $('#success > .alert-danger').append("<strong>Desculpa " + firstName + " parece que o meu servidor de e-mail não está respondendo...</strong>Tente novament ou pode me mandar um e-mail diretamente para <a href='mailto:info@mozafleet.com?Subject=Message_Me from myprogrammingblog.com'>info@mozafleet.com</a> ? Desculpe pela inconveniência!");
                  $('#success > .alert-danger').append('</div>');
                  //clear all fields
                  $('#contactForm').trigger("reset");
                  $('.submit-btn').prop('disabled', false); 
            }
          );
        
        // $.ajax({
        //   url: "contact/contact_me.php",
        //   type: "POST",
        //   data: { name: name, email: email, message: message },
        //   cache: false,
        //   success: function () {
        //     // Success message
        //     $('#success').html("<div class='alert alert-success'>");
        //     $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        //       .append("</button>");
        //     $('#success > .alert-success')
        //       .append("<strong>Sua mensagem foi enviada. </strong>");
        //     $('#success > .alert-success')
        //       .append('</div>');

        //     //clear all fields
        //     $('#contactForm').trigger("reset");
        //   },
        //   error: function () {
        //     // Fail message
        //     $('#success').html("<div class='alert alert-danger'>");
        //     $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        //       .append("</button>");
        //     $('#success > .alert-danger').append("<strong>Desculpa " + firstName + " parece que o meu servidor de e-mail não está respondendo...</strong> Poderia por favor me mandar um e-mail diretamente para <a href='mailto:info@mundoautomovel.co.mz?Subject=Message_Me from myprogrammingblog.com'>info@mundoautomovel.co.mz</a> ? Desculpe pela inconveniência!");
        //     $('#success > .alert-danger').append('</div>');
        //     //clear all fields
        //     $('#contactForm').trigger("reset");
        //   },
        // })
      },
      filter: function () {
        return $(this).is(":visible");
      },
    });

  $("a[data-toggle=\"tab\"]").click(function (e) {
    e.preventDefault();
    $(this).tab("show");
  });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function () {
  $('#success').html('');
});
