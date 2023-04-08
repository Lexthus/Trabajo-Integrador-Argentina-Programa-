$(document).ready(function() {
  var formProceso = $("#form-proceso");
  var totalSteps = $("fieldset").length;
  var currentStep = 1;

  setProgressBar(currentStep);

  // Ocultar todos los fieldsets menos el primero
  $("fieldset").not(":first").hide();

  $(".next").click(function() {
    var $activeFieldset = $(this).closest("fieldset");
    $activeFieldset.hide();
    $activeFieldset.next().show();
    setProgressBar(++currentStep);
  });

  $(".prev").click(function() {
    var $activeFieldset = $(this).closest("fieldset");
    $activeFieldset.hide();
    $activeFieldset.prev().show();
    setProgressBar(--currentStep);
  });

  function setProgressBar(currentStep) {
    var percent = parseFloat(100 / totalSteps) * currentStep;
    percent = percent.toFixed();
    $(".progress-bar").css("width", percent + "%");
  }

  $.ajax({
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "GET",
    success: function(data) {
      console.log(data);
      $("#resultados").html("");
      for (var i = 0; i < data.length; i++) {
        var post = data[i];
        var html = "<div>";
        html += "<h3>" + post.title + "</h3>";
        html += "<p>" + post.body + "</p>";
        html += "</div>";
        $("#resultados").append(html);
      }
    },
    error: function() {
      alert("Error al consumir la API");
    }
  });

  $('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if( target.length ) {
      event.preventDefault();
      $('html, body').stop().animate({
        scrollTop: target.offset().top
      }, 1000);
    }
  });
});
