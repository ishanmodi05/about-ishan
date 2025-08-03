(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner(0);

  // Initiate the wowjs
  new WOW().init();

  // testimonial carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    items: 1,
    smartSpeed: 1500,
    dots: true,
    dotsData: true,
    loop: true,
    margin: 25,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 5,
    time: 2000,
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbxBXJE2JWPy500nloAAOc8mWPFXMwH_hlrHDcHZockGYGcl9BBP5OK3MVB5ZMtLQBM-/exec";

  $("#contactForm").on("submit", function (e) {
    e.preventDefault();

    const $btn = $("#submitBtn");
    const originalText = $btn.html();

    // Disable button and show loading text/spinner
    $btn
      .prop("disabled", true)
      .html(
        '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...'
      );

    const formData = {
      name: $("#name").val(),
      email: $("#email").val(),
      phone: $("#phone").val(),
      project: $("#project").val(),
      subject: $("#subject").val(),
      message: $("#message").val(),
    };

    $.ajax({
      url: scriptURL,
      type: "POST",
      data: formData,
      success: function (response) {
        alert(
          "Success! Your message has been sent. I’ll get back to you shortly."
        );
        $("#contactForm")[0].reset();
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      },
      complete: function () {
        // Re-enable button and restore text
        $btn.prop("disabled", false).html(originalText);
      }
    });
  });
})(jQuery);
