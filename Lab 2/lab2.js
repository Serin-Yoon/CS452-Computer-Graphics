// Serin Yoon

var canvas;
var gl;
var myShaderProgram;
var theta;
var constantMovingX;
var constantMovingY;
var movingValueX;
var movingValueY;
var keepRunning
var mouseCoordinatesUniform;
var clipX;
var clipY;

function init() {
    theta = 0.0;
    constantMovingX = 0.0;
    constantMovingY = 0.0;
    keepRunning = 1;
    clipX = 0.0;
    clipY = 0.0;
    movingValueX = 0.01;
    movingValueY = 0.0;

    canvas = document.getElementById("gl-canvas"); // set up the canvas
    gl = WebGLUtils.setupWebGL(canvas); // set up the WebGL context
    if (!gl) { alert( "WebGL is not available" ); }
    gl.viewport( 0, 0, 615, 615 ); // set up the viewport
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 ); // set up the background color

    myShaderProgram = initShaders( gl, "vertex-shader", "fragment-shader" );

    mouseCoordinatesUniform = gl.getUniformLocation(myShaderProgram, "mouseCoordinates");
    gl.uniform2f(mouseCoordinatesUniform, 0.0, 0.0);

    gl.useProgram(myShaderProgram); // set up the shader program

    setup();
    setInterval(render, 30);
}

function setup() {
    var arrayOfPoints = [
        0.0, 0.0,
        -0.1, 0.1,
        0.1, 0.1,
        0.0, 0.0,
        0.1, -0.1,
        -0.1, -0.1
    ];

    // Create a buffer on the graphics card, and send array to the buffer for use in the shaders
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arrayOfPoints), gl.STATIC_DRAW );
    
    // Create a pointer that iterates over the array of points in the shader code
    var myPositionAttribute = gl.getAttribLocation( myShaderProgram, "myPosition" );
    gl.vertexAttribPointer( myPositionAttribute, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( myPositionAttribute );    
}

// Call this function repeatedly for animation
function render() {
    var thetaUniform =
        gl.getUniformLocation(myShaderProgram, "theta");
    gl.uniform1f(thetaUniform, theta);

    var constantMovingXUniform =
        gl.getUniformLocation(myShaderProgram, "constantMovingX");
    gl.uniform1f(constantMovingXUniform, constantMovingX);

    var constantMovingYUniform =
        gl.getUniformLocation(myShaderProgram, "constantMovingY");
    gl.uniform1f(constantMovingYUniform, constantMovingY);

    gl.clear(gl.COLOR_BUFFER_BIT); // Force the WebGL context to clear the color buffer
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 6); // draw the shape

    theta += 0.05 * keepRunning;
    //requestAnimFrame(render);
    constantMovingX += movingValueX;
    constantMovingY += movingValueY;
}

function startAnim() {
    keepRunning = 1;
}

function stopAnim() {
    keepRunning = 0;
}

function moveShape(event) {
    var canvasX = event.clientX;
    var canvasY = event.clientY;
    clipX = 2.0 * canvasX / 615.0 - 1.0;
    clipY = -(2.0 * canvasY / 615.0 - 1.0);
    constantMovingX = 0.0;
    constantMovingY = 0.0;
    gl.uniform2f(mouseCoordinatesUniform, clipX, clipY);
}

function moveShapeKeys(event) {
    var theKeyCode = event.keyCode;

    // Go Left
    if (theKeyCode === 65) {
        if (movingValueX !== 0) {
            movingValueX = -Math.abs(movingValueX);
            movingValueY = 0.0;
        }
        else if (movingValueY !== 0) {
            movingValueX = -Math.abs(movingValueY);
            movingValueY = 0.0;
        }
    }
    // Go Right
    else if (theKeyCode === 68) {
        if (movingValueX !== 0) {
            movingValueX = Math.abs(movingValueX);
            movingValueY = 0.0;
        }
        else if (movingValueY !== 0) {
            movingValueX = Math.abs(movingValueY);
            movingValueY = 0.0;
        }
    }
    // Go Down
    else if (theKeyCode === 83) {
        if (movingValueX !== 0) {
            movingValueY = -Math.abs(movingValueX);
            movingValueX = 0.0;
        }
        else if (movingValueY !== 0) {
            movingValueY = -Math.abs(movingValueY);
            movingValueX = 0.0;
        }
    }
    // Go Up
    else if (theKeyCode === 87) {
        if (movingValueX !== 0) {
            movingValueY = Math.abs(movingValueX);
            movingValueX = 0.0;
        }
        else if (movingValueY !== 0) {
            movingValueY = Math.abs(movingValueY);
            movingValueX = 0.0;
        }
    }
}

function increaseSpeed() {
    if (movingValueX > 0) movingValueX += 0.003;
    else if (movingValueX < 0) movingValueX -= 0.003;
    else if (movingValueY > 0) movingValueY += 0.003;
    else if (movingValueY < 0) movingValueY -= 0.003;
}

function decreaseSpeed() {
    if (movingValueX > 0) movingValueX -= 0.003;
    else if (movingValueX < 0) movingValueX += 0.003;
    else if (movingValueY > 0) movingValueY -= 0.003;
    else if (movingValueY < 0) movingValueY += 0.003;
}