//global variables:
let newQuote = '';
let newAuthor = '';
let newImg = "";
//let newImg = "https://raw.githubusercontent.com/chltrn/randomQuoteMachine/main/imgs/pexels-min-an-1454794.jpg"; // TODO- get rid of this

// function that opens the info window:
function openInfoWindow(){
   $(".info-popup").css("visibility", "visible");
   $(".close-btn").css("display", "inline");
}
// function that closes the info window:
function closeInfoWindow(){
  $(".info-popup").css("visibility", "hidden");
  $(".close-btn").css("display", "none");
}
//function to set twitter intent link:
function setTwitter(){
  $("#twitter-icon").attr("href",
   "https://twitter.com/intent/tweet?text=" + encodeURI('"'+newQuote+'"'+' -'+newAuthor));
}


//function that fades out image fades the new image in:
function changeImg(){
  $('body').fadeTo('slow', 0.2, function(){
    $(this).css("background-image",'url(' + newImg + ')');
  }).fadeTo('slow', 1);
}
// function that chooses random large landscape image from Unsplash API:
async function getImg() {
  //const response = await fetch("https://api.unsplash.com/photos/random/?client_id=JtXB13VTCyZyC4QFPj2cWBpgkD4TwRfMMXbdWCENMaI&orientation=landscape&content_filter=high");
  const response = await fetch("https://api.unsplash.com/photos/random/?client_id=JtXB13VTCyZyC4QFPjafwcWBpgkD4TwRfMMXbdWCENMaI&orientation=landscape&content_filter=high");
  console.log(response);
  if(response.status != 200){ // error on client or server side
    console.log("ERROR");
    // set background pic to default image
    newImg = "https://raw.githubusercontent.com/chltrn/randomQuoteMachine/main/imgs/pexels-min-an-1454794.jpg";
  }else{ // successful fetch
    const data = await response.json(); //await waits until promise settless and then executes after.
    console.log(data);
    console.log(data.urls.regular);
    newImg = data.urls.raw + '&w=1500&h=750';
  }
  changeImg();

}
//function that chooses random quote with author from Quotable API:
async function getInfo() {            //async functions return a promise
  const response = await fetch("https://api.quotable.io/random?maxlen=130");
  const data = await response.json(); //await waits until promise settless and then executes after.
  newQuote = data.content;
  newAuthor = data.author;
}
//function that changes quote, author, and background image on button click:
function buttonClicked(){
  // check if info-window is visible:
  if( $(".info-popup").css('visibility').toLowerCase() == 'visible') {
    closeInfoWindow(); //close it
  }
  getInfo();
  $(".fade").fadeOut(500,function() {  //animation --> callback to new Quote
    $("#quote-text").text(newQuote).fadeIn(1400);
    $("#quote-author").text("-"+newAuthor).fadeIn(1400);
    $(".quote-icon").fadeIn(1400);
    setTwitter();
  });
}
//executes after document is done loading:
$(document).ready(function() {
    $(".quote-btn").on("click",buttonClicked);  // listen for button click event
    $(".image-btn").on("click",getImg);
});
