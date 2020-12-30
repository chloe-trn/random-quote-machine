//global variables
let newQuote = '';
let newAuthor = '';
let newImg = '';

function openInfoWindow(){
   $(".info-popup").css("visibility", "visible");
   $(".close-btn").css("display", "inline");
}
function closeInfoWindow(){
  $(".info-popup").css("visibility", "hidden");
  $(".close-btn").css("display", "none");
}
//function that chooses random background image and fades the new image in:
function changeImg(){
  $("#bgd-img").fadeOut(500, function() {
        $("#bgd-img").attr("src",newImg);
    }).fadeIn(3500);
}
//function to set twitter intent link:
function setTwitter(){
  $("#twitter-icon").attr("href",
   "https://twitter.com/intent/tweet?text=" + encodeURI('"'+newQuote+'"'+' -'+newAuthor));
}
// function that chooses random large landscape image from Unsplash API:
function getImg(){
  fetch("https://api.unsplash.com/photos/random/?client_id=JtXB13VTCyZyC4QFPj2cWBpgkD4TwRfMMXbdWCENMaI&orientation=landscape&content_filter=high")
  .then(function(response){
    console.log(response.json());
    return response.json()
  })
  .then(function(data){
    console.log(data.urls.regular);
    newImg = data.urls.raw + "&w=1500&h=750";
  })
}
//function that chooses random quote with author from Quotable API:
async function getInfo() {            //async functions return a promise
  const response = await fetch("https://api.quotable.io/random");
  const data = await response.json(); //await waits until promise settless and then executes after.
  newQuote = data.content;
  newAuthor = data.author;
}
//function that changes quote, author, and background image on button click:
function buttonClicked(){
  // check if info-window is open, if so close it
  
  getInfo();
  getImg();
  //changeImg();
  $(".fade").fadeOut(900,function() {  //animation --> callback to new Quote
    $("#quote-text").text(newQuote).fadeIn(1600);
    $("#quote-author").text("-"+newAuthor).fadeIn(1600);
    $(".quote-icon").fadeIn(1600);
    setTwitter();
  });
  $(".img-container > img").first().fadeOut(
        function(){$(this).remove();}
  );
  $(".img-container").append(
          $("#bgd-img").attr("src", newImg)
          .fadeIn()
  );
}
//executes after document is done loading:
$(document).ready(function() {
    $(".btn").on("click",buttonClicked);
});
