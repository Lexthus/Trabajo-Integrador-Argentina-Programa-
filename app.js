$(documento). Ready(función () {
  var formProceso = $("#form-proceso");
  var totalSteps = $("fieldset"). largura;
  var currentStep = 1;

  setProgressBar(currentStep);

  Ocultar todos los fieldsets menos el primero
  $("fieldset"). not(":first"). esconder();

  Botones de retroceso y siguiente en los pasos 2 y 3
  $(".next-btn"). click(función () {
    var $activeFieldset = $(this). closest("fieldset");
    $activeFieldset. esconder();
    $activeFieldset. siguiente(). mostrar();
    setProgressBar(++currentStep);
    if (currentStep == 2 ||  currentStep == 3) {
      $activeFieldset. find(".prev-btn"). mostrar();
    }
    if (currentStep == 1) {
      $activeFieldset. find(".prev-btn"). esconder();
    }
  });

  $(".prev-btn"). click(función () {
    var $activeFieldset = $(this). closest("fieldset");
    $activeFieldset. esconder();
    $activeFieldset. anterior(). mostrar();
    setProgressBar(--currentStep);
    if (currentStep == 1) {
      $activeFieldset. find(".prev-btn"). esconder();
    }
  });

  Ocultar el botón de retroceso en el primer paso
  $("#step-1 .prev-btn"). esconder();

  Mostrar el botón de retroceso en el paso 3
  $("#step-3 .prev-btn"). mostrar();

  function setProgressBar(currentStep) {
    var percent = parseFloat(100 / totalSteps) * currentStep;
     porcentaje = porcentaje. toFijo();
    $(".progress-bar"). css("width", porcentaje + "%");
    if (currentStep == 3) {
      $("#step-3"). addClass("oculto");
    }
  } 

  Función para mostrar el resumen
  function mostrarResumen() {
    VAR Resumen = "";
    resumen += "<p>Nombre: " + $("#nombre"). val() + "</p>";
    resumen += "<p>Email: " + $("#email"). val() + "</p>";
    resumen += "<p>Teléfono: " + $("#telefono"). val() + "</p>";
    resumen += "<p>Comentarios: " + $("#comentarios"). val() + "</p>";
    $("#pedido-resumen"). html(resumen);
    $("#resumen"). mostrar();
    
    Ocultar el botón de "Siguiente" en el último paso
    $("#next-btn"). esconder();
  }

  $("#form-proceso"). submit(function (evento) {
    evento. preventDefault();

    Simulación de envío del formulario
    alert('Formulario enviado correctamente');

    $('a[href^="#"]'). on('click', function (event) {
      var target = $(esto. getAttribute('href'));
      Si (objetivo. largura) {
        evento. preventDefault();
        $('html, body'). stop(). animar({
          scrollTop: destino. offset(). Arriba
        }, 1000);
      }
    });
  });

  $("#next-btn"). click(función () {
    mostrarResumen();
    setProgressBar(++currentStep);

    $("#step-3"). esconder();

    $("#btn-finalizar"). click(función () {
      alert('Proceso finalizado correctamente');
    });
  });
});
