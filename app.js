$(document).ready(function () {
  var formProceso = $("#form-proceso");
  var totalSteps = $("fieldset").length;
  var currentStep = 1;

  setProgressBar(currentStep);

  // Ocultar todos los fieldsets menos el primero
  $("fieldset").not(":first").hide();

  // Botones de retroceso en los pasos 2 y 3
  $(".next").click(function () {
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

  $(".prev").click(function () {
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
  }

  $("#form-proceso").submit(function (event) {
    event.preventDefault();

    // Obtener los datos del formulario

    var nombre = $("input[name='nombre']").val();
    var correo = $("input[name='correo']").val();
    var direccion = $("input[name='direccion']").val();
    var producto = $("input[name='producto']:checked").val();
    var cantidad = $("input[name='cantidad']:checked")
      .map(function () {
        return $(this).val();
      })
      .get();
    var instructions = $("textarea[name='instructions']").val();

    // Mostrar resumen del pedido

    $("#pedido-resumen").html("<h2>Resumen de tu pedido</h2>");
    $("#pedido-resumen").append("<p><strong>Nombre:</strong> " + nombre + "</p>");
    $("#pedido-resumen").append("<p><strong>Correo:</strong> " + correo + "</p>");
    $("#pedido-resumen").append("<p><strong>Dirección:</strong> " + direccion + "</p>");
    $("#pedido-resumen").append("<p><strong>Producto:</strong> " + producto + "</p>");
    $("#pedido-resumen").append("<p><strong>Cantidad:</strong> " + cantidad + "</p>");

    // Enviar formulario

    $.ajax({
      url: "https://jsonplaceholder.typicode.com/posts",
      method: "GET",
      success: function (data) {
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
      error: function () {
        alert("Error al consumir la API");
      }
    });

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
})