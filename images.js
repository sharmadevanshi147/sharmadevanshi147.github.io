/* api to fetch cake images from internet */
var cakeImages = [];
var cakeImagesIndex = 0;
var cakeImagesMax = 0;
var cakeImagesFetching = false;
var cakeImagesFetchingCallback = null;
function fetchCakeImages(callback) {
  if (cakeImagesFetching) {
    cakeImagesFetchingCallback = callback;
    return;
  }
  cakeImagesFetching = true;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=a5e95177da353f58113fd60296e1d250&text=cake&safe_search=1&content_type=1&sort=relevance&per_page=500&format=json&nojsoncallback=1');
  xhr.onload = function() {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      cakeImages = response.photos.photo;
      cakeImagesIndex = 0;
      cakeImagesMax = cakeImages.length;
      cakeImagesFetching = false;
      if (cakeImagesFetchingCallback) {
        cakeImagesFetchingCallback();
        cakeImagesFetchingCallback = null;
      }
    }
    else {
      alert('Request failed.  Returned status of ' + xhr.status);
    }
  };
  xhr.send();
}
function getCakeImage() {
  if (cakeImagesIndex >= cakeImagesMax) {
    cakeImagesIndex = 0;
  }
  var cakeImage = cakeImages[cakeImagesIndex];
  cakeImagesIndex++;
  return 'https://farm' + cakeImage.farm + '.staticflickr.com/' + cakeImage.server + '/' + cakeImage.id + '_' + cakeImage.secret + '.jpg';
}
/* api to fetch cake images from internet and place them in html webpage */
function addCakeImage() {
  var cakeImage = document.createElement('img');
  cakeImage.src = getCakeImage();
  document.body.appendChild(cakeImage);
}
