let newQuote = '';
let newAuthor = '';
let imgArr =[
  'url("https://raw.githubusercontent.com/chltrn/randomQuoteMachine/main/imgs/pexels-anand-dandekar-1532771.jpg")',
  'url("https://raw.githubusercontent.com/chltrn/randomQuoteMachine/main/imgs/pexels-blaque-x-863963.jpg")',
  'url("https://raw.githubusercontent.com/chltrn/randomQuoteMachine/main/imgs/pexels-david-besh-884788.jpg")',
  'url("https://raw.githubusercontent.com/chltrn/randomQuoteMachine/main/imgs/pexels-darwis-alwan-1212045.jpg")',
  'url("https://raw.githubusercontent.com/chltrn/randomQuoteMachine/main/imgs/pexels-eberhard-grossgasteiger-454880.jpg")',
  'url("https://raw.githubusercontent.com/chltrn/randomQuoteMachine/main/imgs/pexels-min-an-1454794.jpg")',
  'url("https://raw.githubusercontent.com/chltrn/randomQuoteMachine/main/imgs/pexels-nicole-avagliano-2236713.jpg")',
  'url("https://raw.githubusercontent.com/chltrn/randomQuoteMachine/main/imgs/pexels-pixabay-372166.jpg")',
  'url("https://raw.githubusercontent.com/chltrn/randomQuoteMachine/main/imgs/pexels-simon-matzinger-1323550.jpg")'
];
//function that chooses random background image:
function changeImg(){
  let newImg = imgArr[Math.floor(imgArr.length * Math.random())];
  document.documentElement.style.setProperty('--url',newImg);
}
//function that chooses random quote from JSON file:
function getInfo(){
  console.log("iam in the getInfo");
  $.ajax({
    url:'https://gist.githubusercontent.com/chltrn/8dc0865ef5deedc3c33976f0bf9c103f/raw/7f0d96cb67429ce5613f24372b774fe78b3209d2/quotes.js',
    dataType: 'json',
    type: 'get',
    cache: false,
    success: function(data){
      let newIndex = Math.floor(data.quotes.length * Math.random());
      newQuote = data.quotes[newIndex].quote;
      newAuthor = data.quotes[newIndex].author;
    }
  });
}
//function that changes quote and background image:
function buttonClicked(){
  getInfo();
  changeImg();
  $(".fade").fadeOut(900,function() {
    $("#quote-text").text(newQuote).fadeIn(1500);
    $("#quote-author").text("-"+newAuthor).fadeIn(1500);
    $("#quote-icon").fadeIn(1500);
  });
}
$(document).ready(function() {
    buttonClicked();
    $(".btn").on("click",buttonClicked);
});
