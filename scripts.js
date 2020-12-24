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

let newQuote = '';
let newAuthor = '';

function buttonClicked(){
  changeColor();
  $.ajax({
    url:'https://gist.githubusercontent.com/chltrn/8dc0865ef5deedc3c33976f0bf9c103f/raw/7f0d96cb67429ce5613f24372b774fe78b3209d2/quotes.js',
    dataType: 'json',
    type: 'get',
    cache: false,
    success: function(data){
      let newIndex = Math.floor(data.quotes.length * Math.random());
      newQuote = data.quotes[newIndex].quote;
      newAuthor = data.quotes[newIndex].author;
      console.log(newIndex +"hi");
      $().
    }
  });
}

$(document).ready(function() {
    // all custom jQuery will go here
    changeColor();
    $(".btn").on("click",buttonClicked);


});
