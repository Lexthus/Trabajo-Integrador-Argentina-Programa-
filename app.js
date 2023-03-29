$(document).ready(function () {
  
  // Formulario de proceso
  var formProceso = $("form[name='form-proceso']");
  
  var currentStep = 1;
  var nextStep = 2;
  
  var currentFieldset = $("fieldset[data-step='" + currentStep + "']");
  var nextFieldset = $("fieldset[data-step='" + nextStep + "']");
  
  setProgressBar(currentStep);
  
  $(".next").click(function () {
    currentFieldset = $(this).parent();
    nextFieldset = $(this).parent().next();
  
    currentFieldset.hide();
    nextFieldset.show();
    setProgressBar(++currentStep);
  });
  
  $(".prev").click(function () {
    currentFieldset = $(this).parent();
    prevFieldset = $(this).parent().prev();
  
    currentFieldset.hide();
    prevFieldset.show();
    setProgressBar(--currentStep);
  });
  
  function setProgressBar(currentStep) {
    var percent = parseFloat(100 / 3) * currentStep;
    percent = percent.toFixed();
    $(".progress-bar").css("width", percent + "%");
  }
  
  // Exportar a PDF

  $("#exportar-pdf").click(function () {
    var data = formProceso.serializeArray();
  
    // Convertir formulario en objeto
    var obj = {};
    for (var i = 0; i < data.length; i++) {
      obj[data[i].name] = data[i].value;
    }
  
    // Convertir objeto a JSON
    var json = JSON.stringify(obj);
  
    // Mostrar objeto en consola
    console.log(json);
  
    // Generar PDF
    generatePDF(json);
  });
  
  function generatePDF(json) {
    var pdf = new jsPDF();
  
    pdf.setFontSize(12);
    pdf.text("Resumen del Proceso", 10, 10);
  
    var data = JSON.parse(json);
  
    var y = 30;
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        pdf.text(key + ": " + data[key], 10, y);
        y += 10;
      }
    }
  
    pdf.save("resumen.pdf");
  }
  
  // Consumir API Externa
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
    },
  });

});
  