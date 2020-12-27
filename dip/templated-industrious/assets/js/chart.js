var uniChartOne = document.getElementById("uniChartOne").getContext("2d");
var myChartOne = new Chart(uniChartOne, {
  type: "doughnut",
  data: {
    labels: [
      "Analysis",
      "Application",
      "Creation",
      "Evaluation",
      "Remembering",
      "Understanding"
    ],
    datasets: [
      {
        label: "Classes",
        data: [0, 50, 12.5, 0, 12.5, 25],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 206, 86, 0.2)",
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
        labels: [{
          render: 'percentage',
          precision: 2,
          fontColor: '#222222',
          fontStyle: 'bold',
          fontSize: 10
        }]
    },
    legend: {
      display: false
    }
  }
});


