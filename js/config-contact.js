

(function ($) {
    // USE STRICT
    "use strict";

    $(document).ready(function () {

        var contactForm = $('#contact-form');

        contactForm.validator();

        contactForm.on('submit', function (e) {
            // if the validator does not prevent form submit
            if (!e.isDefaultPrevented()) {
                var url = "includes/contact-form.html";

                // POST values in the background the the script URL
                $.ajax({
                    type: "POST",
                    url: url,
                    data: $(this).serialize(),
                    success: function (data)
                    {
                        // data = JSON object that contact.php returns
                        var result = JSON.parse(data);
                        console.log(result);

                        // we recieve the type of the message: success x danger and apply it to the
                        var messageAlert = 'alert-' + result.type;
                        var messageText = result.message;

                        // let's compose Bootstrap alert box HTML
                        var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';

                        // If we have messageAlert and messageText
                        if (messageAlert && messageText) {
                            // inject the alert to .messages div in our form
                            $('.messages').html(alertBox);
                            // empty the form
                            contactForm[0].reset();
                        }
                    }
                });
                return false;
            }
        });

    });

})(jQuery);