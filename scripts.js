let newQuote = '';
let newAuthor = '';
let imgArr =[
  'url("https://raw.githubusercontent.com/chltrn/randomQuoteMachine/main/imgs/img1.jpg")',
  'url("https://raw.githubusercontent.com/chltrn/randomQuoteMachine/main/imgs/img2.jpg")',
  'url("https://raw.githubusercontent.com/chltrn/randomQuoteMachine/main/imgs/img1.jpg")',
  'url("https://raw.githubusercontent.com/chltrn/randomQuoteMachine/main/imgs/img2.jpg")',
  'url("https://raw.githubusercontent.com/chltrn/randomQuoteMachine/main/imgs/img1.jpg")',
  'url("https://raw.githubusercontent.com/chltrn/randomQuoteMachine/main/imgs/img2.jpg")',
  'url("https://raw.githubusercontent.com/chltrn/randomQuoteMachine/main/imgs/img1.jpg")',
  'url("https://raw.githubusercontent.com/chltrn/randomQuoteMachine/main/imgs/img2.jpg")',
  'url("https://raw.githubusercontent.com/chltrn/randomQuoteMachine/main/imgs/img1.jpg")',
  'url("https://raw.githubusercontent.com/chltrn/randomQuoteMachine/main/imgs/img2.jpg")'
];
function changeImg(){
  let newImg = imgArr[Math.floor(imgArr.length * Math.random())];
  document.documentElement.style.setProperty('--url',newImg);
}
//function that pulls new random quote from JSON file every button click:
function buttonClicked(){
  $.ajax({
    url:'https://gist.githubusercontent.com/chltrn/8dc0865ef5deedc3c33976f0bf9c103f/raw/7f0d96cb67429ce5613f24372b774fe78b3209d2/quotes.js',
    dataType: 'json',
    type: 'get',
    cache: false,
    success: function(data){
      let newIndex = Math.floor(data.quotes.length * Math.random());
      newQuote = data.quotes[newIndex].quote;
      newAuthor = data.quotes[newIndex].author;
      $(".quote-text").html(newQuote);
      $(".quote-author").html("-"+newAuthor);
      changeImg();
    }
  });
}
$(document).ready(function() {
    buttonClicked();
    $(".btn").on("click",buttonClicked);
});
