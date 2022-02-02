// Serin Yoon

var canvas;
var gl;
var squareProgram, pentagonProgram, ellipseProgram;

function init() {
    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL is not available") };

    gl.viewport(0, 0, 768, 768);
    gl.clearColor(0.9, 0.9, 0.9, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    squareProgram = initShaders(gl, "square-vertex-shader", "square-fragment-shader");
    pentagonProgram = initShaders(gl, "pentagon-vertex-shader", "pentagon-fragment-shader");
    ellipseProgram = initShaders(gl, "ellipse-vertex-shader", "ellipse-fragment-shader");

    // 1. Square
    gl.useProgram(squareProgram);
    drawSquare();

    // 2. Pentagon
    gl.useProgram(pentagonProgram);
    drawPentagon();

    // 3. Ellipse
    gl.useProgram(ellipseProgram);
    drawEllipse();
}

function drawSquare() {
    var squareVertices = [
        -0.9, -0.9,
        -0.9, 0,
        -0.1, -0.3,
        -0.1, -0.9
    ];

    var squareBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, squareBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(squareVertices), gl.STATIC_DRAW);

    var squarePosition = gl.getAttribLocation(squareProgram, "squarePosition");
    gl.vertexAttribPointer(squarePosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(squarePosition);

    gl.drawArrays(gl.LINE_LOOP, 0, 4);
}

function drawPentagon() {
    var pentagonVertices = [
        0, -0.1,
        -0.5, 0.3,
        -0.3, 0.9,
        0.3, 0.9,
        0.5, 0.3
    ];

    var pentagonBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pentagonBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pentagonVertices), gl.STATIC_DRAW);

    var pentagonPosition = gl.getAttribLocation(pentagonProgram, "pentagonPosition");
    gl.vertexAttribPointer(pentagonPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(pentagonPosition);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, 5);
}

function drawEllipse() {
    var ellipseVertices = [];

    var x, y;
    var theta = 0.0;

    var n = 400;
    var thetaStep = 2.0 * Math.PI / n;

    for (i = 0; i < n; i++) {
        theta = i + thetaStep;
        x = 0.5 + 0.3 * Math.cos( theta );
        y = -0.43 + 0.5 * Math.sin( theta );
        var p = vec2(x, y);
        ellipseVertices.push( p );
    }

    var ellipseBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, ellipseBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(ellipseVertices), gl.STATIC_DRAW);

    var ellipsePosition = gl.getAttribLocation(ellipseProgram, "ellipsePosition");
    gl.vertexAttribPointer(ellipsePosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(ellipsePosition);

    gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
}
