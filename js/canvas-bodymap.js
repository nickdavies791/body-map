// The canvas to be used
const canvas = document.getElementById("canvas-bodymap");
// The context for this canvas
const context = canvas.getContext("2d");
// The radius of the pin drawn on the canvas
const pointSize = 4;
// The width of the canvas and image
const pointColor = "#ff0a11";
// The count label next to the pin
let pointCount = 0;

// On load, draw the image
$(window).on("load", function() {
    // Draw the image onto the canvas
    drawImage();
    // When canvas is clicked get the position and draw the co-ordinates
    $("#canvas-bodymap").on("click", function(event){
        getPosition(event);
    });
    // When save is clicked get the data URL and output value to textarea
    $("#save").on("click", function(){
        saveImage();
    });
    $("#clear").on("click", function(){
        clearCanvas();
    });
});

// Draw the image onto the canvas
function drawImage(){
    let image = document.getElementById("image-bodymap");
    context.drawImage(image, 0, 0);
}

// Get size and position of canvas and pass to drawCoordinates()
function getPosition(event){
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    drawCoordinates(x, y);
}

// Draw the pin out where the canvas was clicked
function drawCoordinates(x, y){
    context.fillStyle = pointColor;
    context.beginPath();
    context.arc(x, y, pointSize, 0, Math.PI * 2, true);
    context.fill();
    drawLabel(x, y);
}

// Draw a counter next to the pointer which increments
function drawLabel(x, y){
    pointCount++;
    context.font = "bold 16px Arial";
    context.fillText(pointCount, (x+12), y);
}

// Clear canvas, reset the counter and redraw the image
function clearCanvas(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    pointCount = 0;
    drawImage();
}

// Get the Data URL for the canvas and pass to the textarea
function saveImage(){
    let data = canvas.toDataURL();
    $("#url").val(data);
}
