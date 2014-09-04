var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
  new YT.Player('getting-started', {
    height: '550px',
    width: '100%',
    videoId: 'ZRYcTzgtQRI',
    playerVars: {showinfo: 0, controls: 0, modesbranding: 1, autoplay: 0}
  });
}
