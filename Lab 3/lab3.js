var canvas;
var gl;
var myShaderProgram;

var alpha;
var beta;
var gamma;
var alphaLoc;
var betaLoc;
var gammaLoc;

var moveX;
var moveY;
var moveLoc;

var scaleX;
var scaleY;
var scaleLoc;

function init() {
    alpha = 0.0;
    beta = 0.0;
    gamma = 0.0;

    moveX = 0.0;
    moveY = 0.0;

    scaleX = 1.0;
    scaleY = 1.0;

    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert( "WebGL is not available" ); }
    gl.viewport( 0, 0, 512, 512 );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );

    myShaderProgram = initShaders(gl, "vertex-shader", "fragment-shader");

    gl.useProgram(myShaderProgram);
    gl.enable( gl.DEPTH_TEST );

    moveLoc = gl.getUniformLocation(myShaderProgram, "movingValue");
    gl.uniform2f(moveLoc, moveX, moveY);

    scaleLoc = gl.getUniformLocation(myShaderProgram, "scaleValue");
    gl.uniform2f(scaleLoc, scaleX, scaleY);

    setupShape();
    render();

}

function setupShape() {
    var vertices = [
        vec4(0.0, 0.6, 0.0, 1),
        vec4(-0.4, 0.0, -0.4, 1),
        vec4(-0.4, 0.0, 0.4, 1),
        vec4(0.4, 0.0, 0.4, 1),
        vec4(0.4, 0.0, -0.4, 1),
        vec4(0.0, -0.6, 0.0, 1)
    ];

    var vertexColors = [
        vec4(1.0, 0.0, 0.0, 1.0),
        vec4(0.0, 1.0, 0.0, 1.0),
        vec4(0.0, 0.0, 1.0, 1.0),
        vec4(1.0, 1.0, 0.0, 1.0),
        vec4(0.0, 1.0, 1.0, 1.0),
        vec4(1.0, 0.0, 1.0, 1.0)
    ];

    var indexList = [
        0, 1, 2,
        0, 2, 3,
        0, 3, 4,
        0, 4, 1,
        1, 5, 2,
        2, 5, 3,
        3, 5, 4,
        1, 4, 5
    ];

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    var vertexPosition = gl.getAttribLocation( myShaderProgram, "vertexPosition" );
    gl.vertexAttribPointer( vertexPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vertexPosition );

    var colorBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, colorBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW );

    var vertexColor = gl.getAttribLocation( myShaderProgram, "vertexColor" );
    gl.vertexAttribPointer( vertexColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vertexColor );

    var iBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, iBuffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indexList), gl.STATIC_DRAW );
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    gl.drawElements( gl.TRIANGLES, 24, gl.UNSIGNED_BYTE, 0 );
    //console.log(vertices);
    requestAnimFrame(render);
}

function rotateAroundX() {
    alpha += 0.1;
    alphaLoc = gl.getUniformLocation(myShaderProgram, "alpha");
    gl.uniform1f(alphaLoc, alpha);
}

function rotateAroundY() {
    beta += 0.1;
    betaLoc = gl.getUniformLocation(myShaderProgram, "beta");
    gl.uniform1f(betaLoc, beta);
}

function rotateAroundZ() {
    gamma += 0.1;
    gammaLoc = gl.getUniformLocation(myShaderProgram, "gamma");
    gl.uniform1f(gammaLoc, gamma);
}

function moveShape(move) {
    if (move === "up") {
        moveY += 0.05;
    }
    if (move === "down") {
        moveY -= 0.05;
    }
    if (move === "left") {
        moveX -= 0.05;
    }
    if (move === "right") {
        moveX += 0.05;
    }
    gl.uniform2f(moveLoc, moveX, moveY);
}

function scaleShape(axis) {
    if (axis === "D") {
        scaleX *= 1.1;
    }
    if (axis === "W") {
        scaleY *= 1.1;
    }
    gl.uniform2f(scaleLoc, scaleX, scaleY);
}

function keyPress(event) {
    var keyCode = event.keyCode;
    if (keyCode === 88) rotateAroundX(); // Rotate X
    if (keyCode === 89) rotateAroundY(); // Rotate Y
    if (keyCode === 90) rotateAroundZ(); // Rotate Z
    if (keyCode === 38) moveShape("up");
    if (keyCode === 40) moveShape("down");
    if (keyCode === 37) moveShape("left");
    if (keyCode === 39) moveShape("right");
    if (keyCode === 68) scaleShape("D");
    if (keyCode === 87) scaleShape("W");
}