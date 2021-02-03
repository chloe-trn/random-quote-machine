// global variables:
let newQuote = '';
let newAuthor = '';
let newImg = "";   // next image that will be faded in 
let waitingImg = "";  //  image that is waiting to be the next image faded in 
let quoteFetchStatus = false;
let defaultImg = "background.jpg";

// open the info window:
function openInfoWindow(){
   $(".info-popup").css("visibility", "visible");
   $(".close-btn").css("display", "inline");
}
// close the info window:
function closeInfoWindow(){
  $(".info-popup").css("visibility", "hidden");
  $(".close-btn").css("display", "none");
}
// set twitter intent link:
function setTwitter(){
  $("#twitter-icon").attr("href",
   "https://twitter.com/intent/tweet?text=" + encodeURI('"'+newQuote+'"'+' -'+newAuthor));
}
// fade out background image and fade the new image in:
function changeImg(){
  $("#bgd-img").fadeOut(900, function() {
    $("#bgd-img").attr("src",newImg);
  }).fadeIn(800);
  return false;
}
// fetch random image from Unsplash API:
async function getImg() {
  const response = await fetch("https://api.unsplash.com/photos/random/?client_id=JtXB13VTCyZyC4QFPj2cWBpgkD4TwRfMMXbdWCENMaI&orientation=landscape&content_filter=high");
  if(response.status != 200){ // error on client or server side
    waitingImg = defaultImg ; // set background pic to default image
  }else{ // successful fetch
    const data = await response.json(); //await waits until promise settless and then executes after.
    waitingImg = data.urls.raw + '&w=1500&h=750'; // get the random image url and change it to have width = 1500
  }
}
// fetch random quote with author from Quotable API:
async function getInfo() {
  const response = await fetch("https://api.quotable.io/random?maxlen=130"); // get quote with max length of 130
  if(response.status != 200){
    quoteFetchStatus = false;
    alert("Error with Quotable API request; please try again.");
  }else{
    const data = await response.json();
    // make sure quote is not empty and again if less than max length
    if(data.length > 0 && data.length < 130){
      quoteFetchStatus = true;
      newQuote = data.content;
      newAuthor = data.author;
      // transition to new quote
      $(".fade").fadeOut(500,function() {  // animation --> callback to new Quote
        $("#quote-text").text(newQuote).fadeIn(1400);
        $("#quote-author").text("-"+newAuthor).fadeIn(1400);
        $(".quote-icon").fadeIn(1400);
        setTwitter();
      });
    }else{
      getInfo(); // fetch again
    }
  }
}
// change quote, author, and background image on button click:
function handleGetQuoteClick(){
  // check if info-window is visible:
  if( $(".info-popup").css('visibility').toLowerCase() == 'visible') {
    closeInfoWindow(); //close it
  }
  getInfo();
}
// fetch new image and change the image on button click:
function handleGetImageClick(){
    newImg = waitingImg; 
    getImg();
    changeImg();
}
//execute after document is done loading:
$(document).ready(function() {
    // set the initial waiting image 
    getImg();
    // listen for button click events
    $(".quote-btn").on("click",handleGetQuoteClick);  
    $(".image-btn").on("click",handleGetImageClick);
});
