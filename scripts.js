let newQuote = '';
let newAuthor = '';
let imgArr =[
  'https://raw.githubusercontent.com/chltrn/randomQuoteMachine/main/imgs/pexels-anand-dandekar-1532771.jpg',
  'https://raw.githubusercontent.com/chltrn/randomQuoteMachine/main/imgs/pexels-david-besh-884788.jpg',
  'https://raw.githubusercontent.com/chltrn/randomQuoteMachine/main/imgs/pexels-min-an-1454794.jpg',
  'https://raw.githubusercontent.com/chltrn/randomQuoteMachine/main/imgs/pexels-pixabay-372166.jpg'
];
//function that chooses random background image and fades the new image in:
function changeImg(){
  let newImg = imgArr[Math.floor(imgArr.length * Math.random())];
  $("#bgd-img").fadeOut(500, function() {
        $("#bgd-img").attr("src",newImg);
    }).fadeIn(900);
}
//function that chooses random quote from JSON file:
function getInfo(){
  console.log("i am in the getInfo");
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
function setTwitter(){
  $("#twitter-icon").attr("href",
   "https://twitter.com/intent/tweet?text=" + encodeURI('"'+newQuote+'"'+' -'+newAuthor));
}
//function that changes quote and background image on button click:
function buttonClicked(){
  getInfo();
  changeImg();
  $(".fade").fadeOut(900,function() {
    $("#quote-text").text(newQuote).fadeIn(1600);
    $("#quote-author").text("-"+newAuthor).fadeIn(1600);
    $("#quote-icon").fadeIn(1600);
    setTwitter();
  });

}

$(document).ready(function() {
    $(".btn").on("click",buttonClicked);
});
