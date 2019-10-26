// ------------- VARIABLES ------------- //
var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive)
var slideDurationSetting = 600; //Amount of time for which slide is "locked"
var currentSlideNumber = 0;
var totalSlideNumber = 5;

// ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
function parallaxScroll(evt) {

  if(window.innerWidth <= 768) return;

  if (isFirefox) {
    //Set delta for Firefox
    delta = evt.detail * (-120);
  } else if (isIe) {
    //Set delta for IE
    delta = -evt.deltaY;
  } else {
    //Set delta for all other browsers
    delta = evt.wheelDelta;
  }

  if (ticking != true) {
    if (delta <= -scrollSensitivitySetting) {
      //Down scroll
      
      ticking = true;
      if (currentSlideNumber !== totalSlideNumber - 1) {
        currentSlideNumber++;
        parallaxesStuff();
        nextItem();
      }
      slideDurationTimeout(slideDurationSetting);
    }
    if (delta >= scrollSensitivitySetting) {
      //Up scroll
      ticking = true;
      if (currentSlideNumber !== 0) {
        currentSlideNumber--;
        parallaxesStuff();
      }
      previousItem();
      slideDurationTimeout(slideDurationSetting);
    }
  }
}

// ------------- TOGGLE MOBILE MENU  ------------- //
function toggleMenu(){
  $("section.menu-mobile").toggleClass("show");
}

// ------------- PLAY VIDEO  ------------- //
function playVideo(){
  if(window.innerWidth < 800) document.getElementById("video-mobile").play();
  else document.getElementById("video-desktop").play();
}

// ------------- PARALLAXES STUFF ------------- //
function parallaxesStuff(){
  console.log(currentSlideNumber);
  if(currentSlideNumber == 0){
    $('#contact-btn').addClass("hider");
    playVideo();
  } else {
    $('#contact-btn').removeClass("hider");
  }
  if(currentSlideNumber == 2){
    $('#contact-btn').addClass("contrast");
  } else {
    $('#contact-btn').removeClass("contrast");
  }
  if(currentSlideNumber > 1){
    $('#contact-btn').addClass("position2");
    $('#goUp').removeClass("hidden");
  } else {
    $('#contact-btn').removeClass("position2");
    $('#goUp').addClass("hidden");
  }
  if(currentSlideNumber == 5){
    $('#contact-btn').addClass("position3");
  } else {
    $('#contact-btn').removeClass("position3");
  }
}

// ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
function slideDurationTimeout(slideDuration) {
  setTimeout(function() {
    ticking = false;
  }, slideDuration);
}

// ------------- ADD EVENT LISTENER ------------- //
var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
window.addEventListener(mousewheelEvent, _.throttle(parallaxScroll, 60), false);


// ------------- SLIDE MOTION ------------- //
function nextItem() {
  var $previousSlide = $(".background").eq(currentSlideNumber - 1);
  $previousSlide.removeClass("up-scroll").addClass("down-scroll");
}
function previousItem() {
  var $currentSlide = $(".background").eq(currentSlideNumber);
  $currentSlide.removeClass("down-scroll").addClass("up-scroll");
}
// -------------- IN-PAGE MOTION  ------------- //

function movePage(slideNum) {

  if(window.innerWidth > 768) desktopScroll(slideNum);
  else mobileScroll(slideNum);
}

function mobileScroll(slideNum){
  var str="";
  switch(slideNum){
    case 0:
      str = "inicio";
      break;
    case 1:
      str = "nosotros";
      break;
    case 2:
      str = "servicios";
      break;
    case 3:
      str = "productos";
      break;
    case 4:
      str = "clientes";
      break;
    case 5:
      str = "contacto";
      break;
  }
  $("section.menu-mobile").removeClass("show");
  $([document.documentElement, document.body]).animate({
    scrollTop: $("#" + str).offset().top
}, 500);
}

function desktopScroll(slideNum){
  $("section.menu-mobile").removeClass("show");
  ticking = true;
  if(slideNum > currentSlideNumber)
  while(currentSlideNumber < slideNum){
    currentSlideNumber++;
    nextItem();
  }
  else while(currentSlideNumber > slideNum){
    currentSlideNumber--;
    previousItem();
  }
  slideDurationTimeout();
  parallaxesStuff();
}


/*  FOR MAPS */
// Initialize and add the map
function initMap() {
  // The location of Uluru
  var uluru = {lat: 27.4937, lng: -109.998691};

  var map = new google.maps.Map(document.getElementById('map'), {
    center: uluru,
    zoom: 15,
    styles: [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
      }
    ]
  });

  var marker = new google.maps.Marker({position: uluru, map: map});
}


$(document).ready(function(){

  var _originalSize = $(window).width() + $(window).height()
  $(window).resize(function(){
    if($(window).width() + $(window).height() != _originalSize){
      console.log("keyboard show up");
      $(".white").toggle();
    }else{
      console.log("keyboard closed");
      $(".white").toggle();
    }
  });

  playVideo();
});