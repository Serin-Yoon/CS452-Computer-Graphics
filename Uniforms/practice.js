var gl;
var myShaderProgram;
var canvas;

function init() {
    // Set up the canvas
    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL is not available"); }

    // Set up the viewport
    gl.viewport(0, 0, 512, 512);

    // Set up the background color
    gl.clearColor(1.0, 0.0, 0.0, 1.0);

    // Force the WebGL context to clear the color buffer
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Create shader program, needs vertex & fragment shader code
    // in GLSL to be written in HTML file
    myShaderProgram = initShaders(gl, "vertex-shader", "fragment-shader");

    gl.useProgram(myShaderProgram);
    drawTriangle();

    gl.useProgram(myShaderProgram);
    drawSquare();
}

function drawTriangle() {
    // Enter array set up code
    var arrayOfPointsTri = [
      0.0, 0.0,
      1.0, 0.0,
      0.0, 1.0
    ];

    // Create a buffer on the graphics card,
    // and send array to the buffer for use
    // in the shaders
    var bufferIdTri = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdTri);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(arrayOfPointsTri), gl.STATIC_DRAW);

    // Create a pointer that iterates over the
    // array of points in the shader code
    var myPositionHandleTri = gl.getAttribLocation(myShaderProgram, "myPosition");
    gl.vertexAttribPointer(myPositionHandleTri, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(myPositionHandleTri);

    var myColorUniformHandleTri = gl.getUniformLocation(myShaderProgram, "myColor");
    gl.uniform4f(myColorUniformHandleTri, 0.0, 1.0, 0.0, 1.0);

    var scaleValueUniformHandleTri = gl.getUniformLocation(myShaderProgram, "scaleValue");
    gl.uniform2f(scaleValueUniformHandleTri, 1.0, 0.5);

    // Force a draw of the triangle using the
    // 'drawArrays()' call
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

function drawSquare() {
    // Enter array set up code
    var arrayOfPointsSq = [
        0.0, 0.0,
        -1.0, 0.0,
        -1.0, -1.0,
        0.0, -1.0
    ];

    // Create a buffer on the graphics card,
    // and send array to the buffer for use
    // in the shaders
    var bufferIdSq = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferIdSq);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(arrayOfPointsSq), gl.STATIC_DRAW);

    // Create a pointer that iterates over the
    // array of points in the shader code
    var myPositionHandleSq = gl.getAttribLocation(myShaderProgram, "myPosition");
    gl.vertexAttribPointer(myPositionHandleSq, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(myPositionHandleSq);

    var myColorUniformHandleSq = gl.getUniformLocation(myShaderProgram, "myColor");
    gl.uniform4f(myColorUniformHandleSq, 0.0, 0.0, 1.0, 1.0);

    var scaleValueUniformHandleSq = gl.getUniformLocation(myShaderProgram, "scaleValue");
    gl.uniform2f(scaleValueUniformHandleSq, 0.5, 0.7);

    // Force a draw of the square using the
    // 'drawArrays()' call
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}