var options = {swipeable: true}
var el = document.querySelector('.tabs');
var instance = M.Tabs.init(el, options);

let image = document.getElementById('sourceImage');
  
let canvasMainLayer = document.querySelector('.MainLayer');

let contextMain = canvasMainLayer.getContext('2d');

let brightnessSlider = document.querySelector(".brightness");
let contrastSlider = document.querySelector(".contrast");
let grayscaleSlider = document.querySelector(".grayscale");
let hueRotateSlider = document.querySelector(".hueRotate");
let saturateSlider = document.querySelector(".saturation");
let sepiaSlider = document.querySelector(".sepia");

let defaultSliderValues = {
    ".brightness": 100,
    ".contrast": 100,
    ".grayscale": 0,
    ".hueRotate": 0,
    ".saturation": 100,
    ".sepia": 0
}

function uploadImage(event) {

    image.src = URL.createObjectURL(event.target.files[0]);
  
    image.onload = function () {
        canvasMainLayer.width = this.width;
        canvasMainLayer.height = this.height;
        canvasMainLayer.crossOrigin = "anonymous";
        applyFilter();
    };
  
    document.querySelector('.file-controls').style.display = "none";
    document.querySelector('.help-text').style.display = "none";
    document.querySelector('.image-save').style.display = "block";
    document.querySelector('.image-controls').style.display = "block";
    document.querySelector('.preset-filters').style.display = "block";
};

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});
  });

function applyFilter() {
  
    let filterString =
        "brightness(" + brightnessSlider.value + "%" +
        ") contrast(" + contrastSlider.value + "%" +
        ") grayscale(" + grayscaleSlider.value + "%" +
        ") saturate(" + saturateSlider.value + "%" +
        ") sepia(" + sepiaSlider.value + "%" +
        ") hue-rotate(" + hueRotateSlider.value + "deg" + ")";
        console.log("filterString")
        console.log(filterString)

    contextMain.filter = filterString;
  
    contextMain.drawImage(image, 0, 0);
}

function brightenFilter() {
    resetImage();
    brightnessSlider.value = 130;
    contrastSlider.value = 120;
    saturateSlider.value = 120;
    applyFilter();
}
  
function bwFilter() {
    resetImage();
    grayscaleSlider.value = 100;
    brightnessSlider.value = 120;
    contrastSlider.value = 120;
    applyFilter();
}
  
function funkyFilter() {
    resetImage();
  
    hueRotateSlider.value =
        Math.floor(Math.random() * 360) + 1;
    contrastSlider.value = 120;
    applyFilter();
}
  
function vintageFilter() {
    resetImage();
    brightnessSlider.value = 120;
    saturateSlider.value = 120;
    sepiaSlider.value = 150;
    applyFilter();
}

function resetImage() {

    for (var prop in defaultSliderValues) {
            document.querySelector(prop).value = defaultSliderValues[prop]
        }
    applyFilter();
}
  
function saveImage() {
    let linkElement = document.getElementById('link');
    linkElement.setAttribute(
        'download', `${Math.round(+new Date()/1000)}.png`
    );
  
    let canvasData = canvasMainLayer.toDataURL("image/png")
  
    canvasData.replace(
      "image/png", "image/octet-stream"
    )
  
    linkElement.setAttribute('href', canvasData);
  
    linkElement.click();
}