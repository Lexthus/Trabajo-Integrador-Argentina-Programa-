$(document).ready(function () {
  var formProceso = $("#form-proceso");
  var totalSteps = $("fieldset").length;
  var currentStep = 1;

  setProgressBar(currentStep);

  // Ocultar todos los fieldsets menos el primero
  $("fieldset").not(":first").hide();

  // Botones de retroceso y siguiente en los pasos 2 y 3
  $(".next-btn").click(function () {
    var $activeFieldset = $(this).closest("fieldset");
    $activeFieldset.hide();
    $activeFieldset.next().show();
    setProgressBar(++currentStep);
    if (currentStep == 2 || currentStep == 3) {
      $activeFieldset.find(".prev-btn").show();
    }
    if (currentStep == 1) {
      $activeFieldset.find(".prev-btn").hide();
    }
  });

  $(".prev-btn").click(function () {
    var $activeFieldset = $(this).closest("fieldset");
    $activeFieldset.hide();
    $activeFieldset.prev().show();
    setProgressBar(--currentStep);
    if (currentStep == 1) {
      $activeFieldset.find(".prev-btn").hide();
    }
  });

  // Ocultar el botón de retroceso en el primer paso
  $("#step-1 .prev-btn").hide();

  // Mostrar el botón de retroceso en el paso 3
  $("#step-3 .prev-btn").show();

  function setProgressBar(currentStep) {
    var percent = parseFloat(100 / totalSteps) * currentStep;
    percent = percent.toFixed();
    $(".progress-bar").css("width", percent + "%");
    if (currentStep == 3) {
      $("#step-3").addClass("hidden");
    }
  } 

  // Función para mostrar el resumen
  function mostrarResumen() {
    var resumen = "";
    resumen += "<p>Nombre: " + $("#nombre").val() + "</p>";
    resumen += "<p>Email: " + $("#email").val() + "</p>";
    resumen += "<p>Teléfono: " + $("#telefono").val() + "</p>";
    resumen += "<p>Comentarios: " + $("#comentarios").val() + "</p>";
    $("#pedido-resumen").html(resumen);
    $("#resumen").show();
    
    // Ocultar el botón de "Siguiente" en el último paso
    $("#next-btn").hide();
  }

  $("#form-proceso").submit(function (event) {
    event.preventDefault();

    // Simulación de envío del formulario
    alert('Formulario enviado correctamente');

    $('a[href^="#"]').on('click', function (event) {
      var target = $(this.getAttribute('href'));
      if (target.length) {
        event.preventDefault();
        $('html, body').stop().animate({
          scrollTop: target.offset().top
        }, 1000);
      }
    });
  });

  $("#next-btn").click(function () {
    mostrarResumen();
    setProgressBar(++currentStep);

    $("#step-3").hide();

    $("#btn-finalizar").click(function () {
      alert('Proceso finalizado correctamente');
    });
  });
});
