$(document).ready(function () {
  var formProceso = $("#form-proceso");
  var totalSteps = $("fieldset").length;
  var currentStep = 1;

  setProgressBar(currentStep);

  // Ocultar todos los fieldsets menos el primero
  $("fieldset").not(":first").hide();

  $(".next").click(function () {
    var $activeFieldset = $(this).closest("fieldset");
    $activeFieldset.hide();
    $activeFieldset.next().show();
    setProgressBar(++currentStep);
  });

  $(".prev").click(function () {
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
      method: "POST",
      data: $(this).serialize(),
      success: function (data) {
        console.log(data);
        alert("Pedido enviado con éxito!");
        $("#pedido-resumen").show(); // Mostrar el resumen del pedido después de la alerta
      },
      error: function () {
        alert("Error al enviar el pedido");
      }
    });
  });

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