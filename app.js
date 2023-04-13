$(documento). Ready(función () {
  var formProceso = $("#form-proceso");
  var totalSteps = $("fieldset"). largura;
  var currentStep = 1;

  setProgressBar(currentStep);

  Ocultar todos los fieldsets menos el primero
  $("fieldset"). not(":first"). esconder();

  $(".next"). click(función () {
    var $activeFieldset = $(this). closest("fieldset");
    $activeFieldset. esconder();
    $activeFieldset. siguiente(). mostrar();
    setProgressBar(++currentStep);
  });

  $(".prev"). click(función () {
    var $activeFieldset = $(this). closest("fieldset");
    $activeFieldset. esconder();
    $activeFieldset. anterior(). mostrar();
    setProgressBar(--currentStep);
  });

  function setProgressBar(currentStep) {
    var percent = parseFloat(100 / totalSteps) * currentStep;
     porcentaje = porcentaje. toFijo();
    $(".progress-bar"). css("width", porcentaje + "%");
  }

  $("#form-proceso"). submit(function (evento) {
    evento. preventDefault();

    Obtener los datos del formulario
    var nombre = $("input[name='nombre']").  Val();
    var correo = $("input[name='correo']").  Val();
    var direccion = $("input[name='direccion']").  Val();
    var producto = $("input[name='producto']:checked").  Val();
    var cantidad = $("input[name=''cantidad]:checked" )
      . map(función () {
        return $(this). Val();
      })
      . Obtener();
    var instructions = $("textarea[name='instructions']").  Val();

    Mostrar resumen del pedido
    $("#pedido-resumen"). html("<h2>Resumen de tu pedido</h2>");
    $("#pedido-resumen"). append("<p><strong>Nombre:</strong> " + nombre + "</p>");
    $("#pedido-resumen"). append("<p><strong>Correo:</strong> " + correo + "</p>");
    $("#pedido-resumen"). append("<p><strong>Dirección:</strong> " + direccion + "</p>");
    $("#pedido-resumen"). append("<p><strong>Producto:</strong> " + producto + "</p>");
    $("#pedido-resumen"). append("<p><strong>Cantidad:</strong> " + cantidad  + "</p>" );

    Enviar formulario
    $. Ajax({
      url: "https://jsonplaceholder.typicode.com/posts",
      método: "POST",
      Datos: $(esto). serializar(),
      Éxito: función (datos) {
        consola. log(datos);
        alert("Pedido enviado con éxito!");
        $("#pedido-resumen"). mostrar();  // Mostrar el resumen del pedido después de la alerta
      },
      Error: función () {
        alert("Error al enviar el pedido");
      }
    });
  });

  $. Ajax({
    url: "https://jsonplaceholder.typicode.com/posts",
    método: "GET",
    Éxito: función (datos) {
      consola. log(datos);
      $("#resultados"). .html("");
      para (var i = 0;  <  datos. longitud;  Yo++) {
        var post = datos[i];
        var html = "<div>";
        html += "<h3>" + post. Título + "</h3>";
        html += "<p>" + post. cuerpo + "</p>";
        html += "</div>";
        $("#resultados"). anexar(html);
      }
    },
    Error: función () {
      alert("Error al consumir la API");
    }
  });

  $('a[href^="#"]'). on('click', function (event) {
    var target = $(esto. getAttribute('href'));
    Si (objetivo. largura) {
      evento. preventDefault();
      $('html, body'). stop(). animar({
        scrollTop: destino. offset(). Arriba
      }, 1000);
    }
  });
  
 
