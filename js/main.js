$(document).ready(function () {
  // GET STARTED BUTTON STARTS
  $("#get-started").click(function () {
    $(".step-0").addClass("valid");
    $(".btn-next").prop("disabled", false);
    // Fade out the "nav-logo" first
    $(".nav-logo").fadeOut(400, function () {
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
  });

  // GET STARTED BUTTON ENDS

  // FILE UPLOAD STARTS
  let fileUploadValid = false;
  let isGetScaleEmpty = false;
  $("#fileUpload").on("change", function () {
    const $fileList = $("#file-list");
    const fileUploadErr = $("#fileUploadLabel");
    fileUploadErr.css("color", "#fff");
    fileUploadValid = false;
    $fileList.empty(); // Clear the file list

    const $input = $(this);

    if (this.files.length === 0) {
      fileUploadErr.text("No files selected.");
      return;
    }

    const maxSize = 2 * 1024 * 1024; // 2MB

    const $ul = $("<ul>");
    let isAllValid = true;

    $.each(this.files, function (i, file) {
      // Check the file size of each selected file
      if (file.size > maxSize) {
        fileUploadErr.text(
          `Invalid file size for ${file.name}. Please select a file less than or equal to 2MB.`
        );
        fileUploadErr.css("color", "#b21b20");
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
        fileUploadErr.text(`Invalid File Type for ${file.name}.`);
        fileUploadErr.css("color", "#b21b20");
        isAllValid = false;
        return false;
      } else {
        if (isAllValid) {
          fileUploadErr.text(`${file.name}`);
          fileUploadErr.css("color", "#fff");
          isAnyInputEmpty = true;
          fileUploadValid = true;
        }
      }
    });
  });

  // FILE UPLOAD ENDS

  let isgetScalesChecked = false;
  let isgetBrandChecked = false;

  $('input[name="getScale"]').on("change", function () {
    isgetScalesChecked = true;
  });

  $('input[name="getBrand"]').on("change", function () {
    isgetBrandChecked = true;
  });

  // BUTTON NEXT STARTS

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
    const firstName = firstNameElement.val();
    const welcomeMessage = $("#welcomeMessage");
    const getEcsMessage = $("#getEcsMessage");
    const getNumMessage = $("#getNumMessage");
    const getPaymentMessage = $("#getPayment");
    const userEmailElement = $("#eMail");
    const userEmail = userEmailElement.val();
    let isAnyInputEmpty = false; // Variable to track if any input is empty
    const inputValues = [];
    const inputElements = currentSection.find(".get-input");
    const $fieldError = currentSection.find(".input-field-error");

    // MESSAGES
    if (firstName !== "") {
      welcomeMessage.text(
        `YESSIR! Great to have you here, ${firstName}. What email can we reach you on?`
      );
      getEcsMessage.text(
        `${firstName}, be honest… what do you think is (or will be) the #1 biggest obstacle holding you back from acceptance into your Dream University above?`
      );
      getNumMessage.text(` Almost there, , just 4 more questions.`);
      getPaymentMessage.text(
        ` Alright, ${firstName} this is it - you’re at the last question.`
      );
    }

    if (userEmail !== "") {
      $("#yEmail").val(userEmail);
    }

    inputElements.each(function (e) {
      const $this = $(this);
      const inputValue = $(this).val();
      const inputType = $(this).prop("type");
      const inputID = $(this).prop("id");
      let inputName = $(this).prop("name");
      inputValues.push(inputValue);
      console.log(inputName);

      //console.log(getScales);
      if (inputType === "text") {
        console.log("input is text");
        if (inputID === "birthDate") {
          const today = new Date();
          const birthDate = $("#birthDate").val();
          const inputDate = new Date(birthDate);
          const birthDateErrElement = $("#birthDateErr");
          const gradYear = $("#gradYear").val();
          if (birthDate !== "" && gradYear !== "") {
            const ageDifference = today.getFullYear() - inputDate.getFullYear();
            // Check if the input is a valid date
            if (isNaN(inputDate.getTime())) {
              isAnyInputEmpty = true;
            } else if (inputDate > today) {
              isAnyInputEmpty = true;
            } else if (ageDifference < 5) {
              // Check if the user is less than 12 years old
              // birthDateErrElement.text("You are too young.");
            } else if (isNaN(gradYear) || gradYear < new Date().getFullYear()) {
              isAnyInputEmpty = true;
            }
          } else {
            isAnyInputEmpty = true;
            // birthDateErrElement.text("This field is required.");
          }
        } else {
          if (inputValue.length <= 1) {
            isAnyInputEmpty = true;
            //alert("Please enter a valid email.");
          }
        }
      } else if (inputType === "email") {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(inputValue)) {
          isAnyInputEmpty = true;
          //$fieldError.text("Please enter a valid email.");
        }
      } else if (inputID === "questionEc1") {
        const questionEc1 = $("#questionEc1").val();
        //const questionEc1ErrElement = $("#questionEc1Err");
        if (questionEc1 === "") {
          isAnyInputEmpty = true;
          questionEc1ErrElement.text("This field is required.");
        }
      } else if (inputID === "questionEc2") {
        const questionEc2 = $("#questionEc2").val();
        //const questionEc2ErrElement = $("#questionEc2Err");
        if (questionEc2 === "") {
          isAnyInputEmpty = true;

          questionEc2ErrElement.text("This field is required.");
        }
      } else if (inputID === "questionEc3") {
        const questionEc3 = $("#questionEc3").val();
        //const questionEc3ErrElement = $("#questionEc3Err");
        if (questionEc3 === "") {
          isAnyInputEmpty = true;
        }
      } else if (inputID === "fileUpload") {
        const fileUpload = $("#fileUpload").val();

        if (fileUpload === "") {
          isAnyInputEmpty = true;
        } else if (!fileUploadValid) {
          isAnyInputEmpty = true;
        }
      } else if ((inputName = "getScale")) {
        //isAnyInputEmpty = false;
        //console.log("oh yeah");
      } else {
        isAnyInputEmpty = true;
        //alert("asdkhasdk");
        return false;
      }
    });

    if (!isAnyInputEmpty) {
      $(".btn-prev").removeClass("disabled");
      $fieldError.text("");
      currentSection.fadeOut(400, function () {
        nextSection.fadeIn(400);
      });

      $(".btn-next").fadeOut(300, function () {
        if (nextStepNum === 14) {
          $(this).fadeOut(400, function () {
            $(".btn-submit").fadeIn(400);
            $(".btn-next").fadeOut(400);
          });
        } else {
          $(".btn-next").fadeIn(600);
          //$(".btn-next").prop("disabled", true);
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
    }
  });

  // BUTTON NEXT ENDS

  // BUTTON PREVIOUS STARTS

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

    if (currentStepNum === 14) {
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

  // BUTTON PREVIOUS ENDS

  // BUTTON GRIZZLY FORM STARTS

  $("#grizzlyForm").on("keypress", function (e) {
    if (e.which === 13) {
      e.preventDefault();
    }
  });
  $("#grizzlyForm").submit(function (event) {
    // Prevent the form from submitting by default
    event.preventDefault();

    const yEmail = $("#yEmail").val();
    const yFirstName = $("#yFirstName").val();
    const yLastName = $("#yLastName").val();
    const yPhoneNumber = $("#yPhoneNumber").val(); // Corrected the selector

    if (
      yEmail === "" ||
      yFirstName === "" ||
      yLastName === "" ||
      yPhoneNumber === ""
    ) {
    } else {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

      if (!emailPattern.test(yEmail)) {
        //alert("Please enter a valid email.");
      } else if (yFirstName.length <= 1) {
        //alert("Please enter a valid full name.");
      } else if (yLastName.length <= 1) {
        //alert("Please enter a valid parent's full name.");
      } else if (!phoneNumberPattern.test(yPhoneNumber)) {
        //alert("Please enter valid phone number.");
      } else {
        //==============POST METHOD HERE==================
        /*(function getSelectedRadioValue(radioNodeList) {
          for (const radio of radioNodeList) {
            if (radio.checked) {
              return radio.value;
            }
          }
          return null; // Return null if no radio button is selected
        }

        const formData = new FormData();
        formData.append("firstName", $("#firstName").val());
        formData.append("email", $("#eMail").val());
        formData.append("birthDate", $("#birthDate").val());
        formData.append("gradYear", $("#gradYear").val());
        formData.append("dreamUni", $("#dreamUni").val());
        formData.append("ec1", $("#questionEc1").val());
        formData.append("ec2", $("#questionEc2").val());
        formData.append("ec3", $("#questionEc3").val());
        formData.append("yourOpinion", $("#yourOpinion").val());
        formData.append("academyQuestion", $("#academyQuestion").val());
        formData.append("yFirstName", $("#yFirstName").val());
        formData.append("yLastName", $("#yLastName").val());
        formData.append("yEmail", $("#yEmail").val());
        formData.append("yPhoneNumber", $("#yPhoneNumber").val());

        // Append radio button values to the form data
        formData.append(
          "getScale",
          getSelectedRadioValue($("[name='getScale']"))
        );
        formData.append(
          "getInterview",
          getSelectedRadioValue($("[name='getInterview']"))
        );
        formData.append(
          "getBrand",
          getSelectedRadioValue($("[name='getBrand']"))
        );
        formData.append(
          "getPayment",
          getSelectedRadioValue($("[name='getPayment']"))
        );

        // Append file if it's selected
        formData.append("fileUpload", $("#fileUpload")[0].files[0]);

        // Make the AJAX POST request
        $.ajax({
          type: "POST",
          url: "your-server-endpoint-url",
          data: formData,
          processData: false,
          contentType: false,
          success: function (response) {
            // Request was successful
            console.log(response);
          },
          error: function (xhr, status, error) {
            // Request failed
            console.error(status + ": " + error);
          },
        });*/
      }
    }
  });

  // BUTTON GRIZZLY FORM ENDS

  // BUTTON GRIZZLY PARENT FORM STARTS

  $("#grizzlyParentForm").submit(function (event) {
    event.preventDefault();

    const yParentFirstName = $("#yParentFirstName").val();
    const yParentLastName = $("#yParentLastName").val();
    const yParentPhoneNumber = $("#yParentPhoneNumber").val();
    const yParentEmail = $("#yParentEmail").val();

    if (
      yParentFirstName === "" ||
      yParentLastName === "" ||
      yParentPhoneNumber === "" ||
      yParentEmail === ""
    ) {
    } else {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

      if (!emailPattern.test(yParentEmail)) {
        //alert("Please enter a valid email.");
      } else if (yParentFirstName.length <= 1) {
        //alert("Please enter a valid full name.");
      } else if (yParentLastName.length <= 1) {
        //alert("Please enter a valid parent's full name.");
      } else if (!phoneNumberPattern.test(yParentPhoneNumber)) {
        //alert("Please enter valid phone number.");
      } else {
        $(".get-details").fadeOut(400);
        $(".btn-submit").fadeOut(400);
        $(".get-verification").fadeIn(800);
        $(".nav-logo").fadeOut(400, function () {
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
        // Start the countdown timer when the form is submitted
        let count = 1;
        const timerInterval = setInterval(() => {
          countdown(count);
          count++;

          if (count > 100) {
            // Stop the timer when count exceeds 100
            clearInterval(timerInterval);
          }
        }, 50);
      }
    }
  });
  // BUTTON GRIZZLY PARENT FORM ENDS

  // TIMER PERCENTAGE STARTS
  function countdown(count) {
    const realTimeCountElement = document.getElementById("submissionPercent");

    if (count <= 100) {
      // Update the real-time count element
      realTimeCountElement.textContent = `${count}%`;
    } else {
      // Stop the timer when count exceeds 100
      clearInterval(timerInterval);
    }
  }

  // TIMER PERCENTAGE ENDS
});
