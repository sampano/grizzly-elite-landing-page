$(document).ready(function () {
  $("#get-started").click(function () {
    $(".step-0").addClass("valid");

    // Fade out the "nav-logo" first
    $(".nav-logo").fadeOut(400, function () {
      // After "nav-logo" is faded out, fade in the "previous-button" and "get-name"
      $(".nav-logo").css({
        margin: "0",
        "text-align": "right",
      });
      $(".previous-button, .nav-logo").fadeIn(400);
    });

    $(".container.get-started").fadeOut(400, function () {
      $(".get-name").fadeIn(400);
    });

    $(".next-button-container").fadeIn(400);
    // Change the background image path of .hero-container
    $(".hero-container").css(
      "background-image",
      "url('./media/img/background_03.png')"
    );
  });

  $(".btn-next").on("click", function () {
    var currentStepNum = $("#checkout-progress").data("current-step");
    var nextStepNum = currentStepNum + 1;
    var currentStep = $(".step.step-" + currentStepNum);
    var nextStep = $(".step.step-" + nextStepNum);
    var progressBar = $("#checkout-progress");
    var currentSection = $("#section" + currentStepNum);
    var nextSection = $("#section" + nextStepNum);
    var prevStepNum = currentStepNum - 1;
    var prevStep = $(".step.step-" + prevStepNum);

    const $firstNameElement = $("#firstName");
    const $welcomeMessage = $("#welcomeMessage");
    const $getEcsMessage = $("#getEcsMessage");
    const firstName = $firstNameElement.val();

    console.log(firstName);
    if (firstName !== "") {
      $welcomeMessage.text(
        `YESSIR! Great to have you here, ${firstName}. What email can we reach you on?`
      );

      $getEcsMessage.text(
        `${firstName}, be honest… what do you think is (or will be) the #1 biggest obstacle holding you back from acceptance into your Dream University above?`
      );
    } else {
      $welcomeMessage.text(
        "YESSIR! Great to have you here, Jhon. What email can we reach you on?"
      );

      $getEcsMessage.text(
        "Jhon, be honest… what do you think is (or will be) the #1 biggest obstacle holding you back from acceptance into your Dream University above?"
      );
    }

    $(".btn-prev").removeClass("disabled");

    currentSection.fadeOut(400, function () {
      nextSection.fadeIn(400);
    });

    $(".btn-next").fadeOut(400, function () {
      if (nextStepNum === 13) {
        $(this).fadeOut(400, function () {
          $(".btn-submit").fadeIn(400);
          $(".btn-next").fadeOut(400);
        });
      } else {
        $(".btn-next").fadeIn(400);
      }
    });

    $(".checkout-progress")
      .removeClass(".step-" + currentStepNum)
      .addClass(".step-" + (currentStepNum + 1));

    currentStep.removeClass("active").addClass("valid");

    prevStep.find(".round-center").removeClass("active");

    currentStep.removeClass("active").addClass("valid");

    currentStep.addClass("active");

    nextStep.addClass("active");

    currentStep.find(".round-center").addClass("active");

    progressBar
      .removeAttr("class")
      .addClass("step-" + nextStepNum)
      .data("current-step", nextStepNum);
  });

  $(".btn-prev").on("click", function () {
    var currentStepNum = $("#checkout-progress").data("current-step");
    var prevStepNum = currentStepNum - 1;
    var newStepNum = currentStepNum - 2;
    var currentStep = $(".step.step-" + currentStepNum);
    var prevStep = $(".step.step-" + prevStepNum);
    var progressBar = $("#checkout-progress");
    var newStep = $(".step.step-" + newStepNum);

    $(".btn-next").removeClass("disabled");
    $("#section" + currentStepNum).toggle();
    $("#section" + prevStepNum).toggle();

    if (currentStepNum === 13) {
      $(".btn-submit").toggle();
      $(".btn-next").toggle();
    }
    if (currentStepNum === 1) {
      $(this).addClass("disabled");

      $(".previous-button").fadeOut(400);

      $(".nav-logo").fadeOut(400, function () {
        if ($(window).width() <= 576) {
          $(".nav-logo").css({
            margin: "0 auto",
            "text-align": "center",
          });
        } else {
          $(".nav-logo").css({
            margin: "0",
            "text-align": "center",
          });
        }

        $(".nav-logo").fadeIn(400);
      });

      $(".next-button-container").fadeOut(400);

      $(".container.get-started").fadeIn(300, function () {
        $(".get-name").fadeOut(300);
      });

      // Change the background image path of .hero-container
      $(".hero-container").css(
        "background-image",
        "url('./media/img/background_04.png')"
      );
      prevStep.addClass("active").removeClass("valid");
      return false;
    }

    if (prevStepNum === 1) {
      $(this).addClass("disabled");
    }

    $(".checkout-progress")
      .removeClass(".step-" + currentStepNum)
      .addClass(".step-" + prevStepNum);

    currentStep.removeClass("active");

    prevStep.find("span").removeClass("opaque");

    prevStep.find(".round-center").removeClass("active");

    prevStep.addClass("active").removeClass("valid");

    newStep.find(".round-center").addClass("active");

    progressBar
      .removeAttr("class")
      .addClass("step-" + prevStepNum)
      .data("current-step", prevStepNum);
  });

  $("button.btn-submit").click(function (e) {
    e.preventDefault();
    $(".get-details").fadeOut(400);
    $(".btn-submit").fadeOut(400);
    $(".get-verification").fadeIn(800);
    $(".nav-logo").fadeOut(400, function () {
      // After "nav-logo" is faded out, fade in the "previous-button" and "get-name"
      $(".nav-logo").fadeIn(400);
      $(".previous-button").css("display", "none");
      $(".timer").css("display", "none");
      $(".nav").css("justify-content", "center");
      $("#checkout-progress").css("display", "none");
      $(".nav-logo").css({
        margin: "0 auto",
        "text-align": "center",
      });
    });
  });
});
