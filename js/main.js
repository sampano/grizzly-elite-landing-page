$(".accordion-content").css("display", "none");

$(document).ready(function () {
  $(".testimonial-container").slick({
    infinite: true,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  $(".accordion-title").click(function () {
    $(".accordion-title").not(this).removeClass("open");
    $(".accordion-title").not(this).next().slideUp(300);
    $(this).toggleClass("open");
    $(this).next().slideToggle(300);
  });

  $(".cover h2, .cover a").hide();

  $(".cover h2, .cover a").fadeIn(1000);

  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $(".cover h2, .cover a").fadeOut(500);
    } else {
      $(".cover h2, .cover a").fadeIn(500);
    }
  });
});

var targetDate = new Date(2023, 10, 1, 11, 0, 0);

function updateCountdown() {
  var now = new Date();
  var timeDifference = targetDate - now;

  var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  var hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  var formattedCountdown =
    days + "d : " + hours + "h : " + minutes + "m : " + seconds + "s";

  $(".countdown").text(formattedCountdown);
}

// Call the function initially
updateCountdown();

// Update the countdown every second
setInterval(updateCountdown, 1000);
