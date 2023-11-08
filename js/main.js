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

    $("#file-upload").on("change", function () {
      const $fileList = $("#file-list");
      $fileList.empty(); // Clear the file list

      const $input = $(this);

      if (this.files.length === 0) {
        $fileList.text("No files selected.");
        return;
      }

      const maxSize = 2 * 1024 * 1024; // 2MB

      const $ul = $("<ul>");
      let isAllValid = true;

      $.each(this.files, function (i, file) {
        // Check the file size of each selected file
        if (file.size > maxSize) {
          alert(
            "Invalid file size for " +
              file.name +
              ". Please select a file less than or equal to 2MB."
          );
          isAllValid = false;
          return false; // Exit the loop if a file is invalid
        }

        // Getting the file extension (e.g., .jpg, .png, etc.)
        const extension = file.name.substr(file.name.lastIndexOf("."));

        // Define allowed file types
        const allowedExtensionsRegx = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

        // Testing extension with regular expression
        const isAllowed = allowedExtensionsRegx.test(extension);

        if (!isAllowed) {
          alert("Invalid File Type for " + file.name);
          isAllValid = false;
          return false; // Exit the loop if a file is invalid
        }

        // Create a list item for each valid file
        const $li = $("<li>").text(file.name);
        $ul.append($li);
      });

      if (isAllValid) {
        $fileList.append($ul);
        // Your file upload logic goes here...
      } else {
        $fileList.text("Some files are invalid.");
      }
    });
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
    const firstNameElement = $("#firstName");
    const welcomeMessage = $("#welcomeMessage");
    const getEcsMessage = $("#getEcsMessage");
    const getNumMessage = $("#getNumMessage");
    const firstName = firstNameElement.val();

    //const currentInput = currentSection.find(".get-input").val();

    const inputValues = [];
    const inputElements = currentSection.find(".get-input");
    const $fieldError = currentSection.find(".field-error");
    let isAnyInputEmpty = false; // Variable to track if any input is empty

    // MESSAGES
    if (firstName !== "") {
      welcomeMessage.text(
        `YESSIR! Great to have you here, ${firstName}. What email can we reach you on?`
      );
      getEcsMessage.text(
        `${firstName}, be honest… what do you think is (or will be) the #1 biggest obstacle holding you back from acceptance into your Dream University above?`
      );
      getNumMessage.text(` Almost there, ${firstName}, just 4 more questions.`);
    }

    inputElements.each(function () {
      const $this = $(this);
      const inputValue = $(this).val();
      const inputType = $(this).prop("type");
      inputValues.push(inputValue);

      //console.log(inputType);

      if (inputType === "text") {
        if (inputValue.length <= 1) {
          isAnyInputEmpty = true;
          $fieldError.text("This field is required.");
        }
      } else if (inputType === "email") {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(inputValue)) {
          isAnyInputEmpty = true;
          $fieldError.text("Please enter a valid email.");
        }
      } else if (inputValue === "") {
        isAnyInputEmpty = true;
        $fieldError.text("This field is required.");
      }
    });

    if (!isAnyInputEmpty) {
      $(".btn-prev").removeClass("disabled");
      $fieldError.text("");
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
    } else {
      console.log("Please provide full details");
    }
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
