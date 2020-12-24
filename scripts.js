let colorArr = [
  '#91A6FF',
  '#FFEEDB',
  '#4C3B4D',
  '#A53860',
  '#61C9A8'
];
//function to change color of page on "get quote button click"
// color changes based on an array of colors
function changeColor(){
  let newColor = colorArr[Math.floor(colorArr.length * Math.random())];
  document.documentElement.style.setProperty('--mainColor', newColor);
}



$(document).ready(function() {
    // all custom jQuery will go here
    changeColor();
    $(".btn").on("click",changeColor);
    $.getJSON('https://raw.githubusercontent.com/chltrn/randomQuoteMachine/main/quotes.json',function(data){
      console.log(data);
    });


});
