var canvas;
var gl;
var myShaderProgram;

function init() {
    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL is not available") };

    gl.viewport(0, 0, 512, 512);
    gl.clearColor(1.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    myShaderProgram = initShaders(gl, "vertex-shader", "fragment-shader");

    gl.useProgram(myShaderProgram);
    drawTriangle();

    gl.useProgram(myShaderProgram);
    drawSquare();
}

function drawTriangle() {
    var triangleVertices = [
        vec2(0.0, 0.0),
        vec2(0.0, 1.0),
        vec2(1.0, 0.0)
    ];

    var triangleBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(triangleVertices), gl.STATIC_DRAW);

    var myPosition = gl.getAttribLocation(myShaderProgram, "myPosition");
    gl.vertexAttribPointer(myPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(myPosition);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

function drawSquare() {
    var squareVertices = [
        vec2(-1.0, -1.0),
        vec2(-1.0, 0.0),
        vec2(0.0, 0.0),
        vec2( 0.0, -1.0)
    ];

    var squareBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(squareVertices), gl.STATIC_DRAW);

    var myPosition = gl.getAttribLocation(myShaderProgram, "myPosition");
    gl.vertexAttribPointer(myPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(myPosition);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}