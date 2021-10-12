$(document).ready(function() {
    var numQuestions = 0;
    var questions = {};
    var url =
      window.location.hostname === "localhost"
        ? "http://localhost::5500/questions"
        : "https://bloom-taxonomy.herokuapp.com/questions";
  
    $(".uni-summary").fadeIn(800);
    $(".chart-heading").fadeIn(1000);
  
    //Disabling button when input is empty
    $("#question-input").on("keyup", function() {
      $("#add-question").prop("disabled", !$(this).val());
    });
  
    //Adding a question
    $("#add-question").on("click", function() {
      var question = $("#question-input").val();
      $("#paper-heading").text("таны тест:");
      numQuestions += 1;
      questions[numQuestions] = question;
      var questionTemplate = $("#question-template").html();
      var html = Mustache.render(questionTemplate, {
        question: question
      });
      $("#question-list").append(html);
      $("#submit").css("display", "inline-block");
      $("#question-input").val("");
      $(this).prop("disabled", true);
    });
  
    //SUBMITTING THE PAPER!
    $("#submit").on("click", function() {
      $("#question-input").prop("disabled", true);
      $("#added-paper").css("display", "none");
      $("#loader").css("display", "block");
      fetch(url, {
        method: "POST",
        body: JSON.stringify(questions),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(response => {
          response = JSON.parse(response);
          $("#question-list").empty();
          var resultTemplate = $("#question-result-template").html();
          var responseQuestions = response["questions_data"];
          var responsePercentage = response["percentage"];
          var classPercentages = [];
          for (var key in responseQuestions) {
            var html = Mustache.render(resultTemplate, {
              question: key,
              class: responseQuestions[key]
            });
            $("#question-summary").append(html);
          }
          for (var key in responsePercentage) {
            classPercentages.push(Number(responsePercentage[key]));
          }
          $("#loader").css("display", "none");
          $("#summary-paper").css("display", "block");
          draw_chart(classPercentages);
        })
        .catch(error => console.error("Error:", error));
    });
  
    $("#reset").on("click", function() {
      $("#paper-heading").text("Дээрх маягтыг ашиглан асуулт нэмээрэй");
      $("#question-input").prop("disabled", false);
      $("#question-summary").empty();
      $("#summary-paper").css("display", "none");
      $("#added-paper").css("display", "");
      $("#submit").css("display", "none");
      $(".chartjs-size-monitor").remove();
      questions = {};
      numQuestions = 0;
    });
  });
  
  function draw_chart(data) {
    var summaryCanvas = document.getElementById("summaryChart").getContext("2d");
    var summaryChart = new Chart(summaryCanvas, {
      type: "doughnut",
      data: {
        labels: [
          "Задлан шинжлэх",
          "Хэрэглэх",
          "Бүтээх",
          "Үнэлэх",
          "Сэргээн санах",
          "Ойлгох"
        ],
        datasets: [
          {
            label: "Classes",
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 206, 86, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 206, 86, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        animation: {
          animateScale: true
        },
        plugins: {
          labels: {
            render: 'percentage',
            precision: 2,
            fontColor: '#222222',
            fontStyle: 'bold',
            fontSize: 10
          }
        },
        legend: {
          display: false
        }
      }
    });
  }