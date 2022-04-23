/* 
Chrome extension to get current playing spotify track id,
go to chosic and enter the track id and generate playlist




*/


// Initialize button with users' preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
    function: getCurrentPlaying,
  });

});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}


function getCurrentPlaying(){
  // nowplaying_full = document.querySelector('[role="contentinfo"]').getAttribute('aria-label')
  // // returns: 'Now playing: I Feel It - Instrumental Mix by Ed Gee, Vice Versa'
  // t = nowplaying_full.split(':')
  // song_title_and_author = t[1]
  // // console.log(song_title_and_author)
  // chosic(song_title_and_author)


  clickable_song_title = document.querySelector('[data-testid="context-item-info-title"]')
  rightclick(clickable_song_title)
    
}


function rightclick(clickable_song_title){

  // var element = document.querySelector('[data-testid="context-item-info-title"]')
  // if (window.CustomEvent) {
  //     element.dispatchEvent(new CustomEvent('contextmenu'));
  // } else if (document.createEvent) {
  //     var ev = document.createEvent('HTMLEvents');
  //     ev.initEvent('contextmenu', true, false);
  //     element.dispatchEvent(ev);
  // } else { // Internet Explorer
  //     element.fireEvent('oncontextmenu');
  // }
  // return

  var evt = new Event("contextmenu", {"bubbles":true, "cancelable":false});
 document.querySelector('[data-testid="context-item-info-title"]').dispatchEvent(evt)
  // document.dispatchEvent(evt);
  
  // // event can be dispatched from any element, not only the document
  // myDiv.dispatchEvent(evt);


}

// function getSongLink(){

//   fetch = GET https://api.spotify.com/v1/tracks/{id}
// }

function chosic(song_title_and_author){

  // navigate to chosic 
  // target search bar and enter the song
  // click search 

  chrome.tabs.create({
    url:'https://www.chosic.com/playlist-generator/'
  })
  search_bar = document.getElementById('search-word')
  search_bar.value = chosic
  document.getElementById('generate-button').click()
}






-----------------------

this opens the context menu on the track name
  var evt = new Event("contextmenu", {"bubbles":true, "cancelable":false});
  document.querySelector('[data-testid="context-item-link"]').dispatchEvent(evt)