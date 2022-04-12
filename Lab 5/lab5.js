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

var textureImage;
var iBuffer;

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
    gl.enable( gl.DEPTH_TEST );

    myShaderProgram = initShaders(gl, "vertex-shader", "fragment-shader");

    gl.useProgram(myShaderProgram);

    moveLoc = gl.getUniformLocation(myShaderProgram, "movingValue");
    gl.uniform2f(moveLoc, moveX, moveY);

    scaleLoc = gl.getUniformLocation(myShaderProgram, "scaleValue");
    gl.uniform2f(scaleLoc, scaleX, scaleY);

    setupShape();
    render();
}

function setupShape() {
    var vertices = [
        0.0, 0.6, 0.0,
        -0.4, 0.0, -0.4,
        -0.4, 0.0, 0.4,

        0.0, 0.6, 0.0,
        -0.4, 0.0, 0.4,
        0.4, 0.0, 0.4,

        0.0, 0.6, 0.0,
        0.4, 0.0, 0.4,
        0.4, 0.0, -0.4,

        0.0, 0.6, 0.0,
        0.4, 0.0, -0.4,
        -0.4, 0.0, -0.4,

        -0.4, 0.0, -0.4,
        0.0, -0.6, 0.0,
        -0.4, 0.0, 0.4,

        -0.4, 0.0, 0.4,
        0.0, -0.6, 0.0,
        0.4, 0.0, 0.4,

        0.4, 0.0, 0.4,
        0.0, -0.6, 0.0,
        0.4, 0.0, -0.4,

        -0.4, 0.0, -0.4,
        0.4, 0.0, -0.4,
        0.0, -0.6, 0.0
    ]

    var textureCoordinates = [
        0.5, 0.5,
        0.0, 0.0,
        1.0, 0.0,

        0.5, 0.5,
        0.0, 0.0,
        1.0, 0.0,

        0.5, 0.5,
        0.0, 0.0,
        1.0, 0.0,

        0.5, 0.5,
        0.0, 0.0,
        1.0, 0.0,

        0.0, 0.0,
        0.5, 0.5,
        1.0, 0.0,

        0.0, 0.0,
        0.5, 0.5,
        1.0, 0.0,

        0.0, 0.0,
        0.5, 0.5,
        1.0, 0.0,

        1.0, 0.0,
        0.0, 0.0,
        0.5, 0.5
    ]

    var indexList = [
        0, 1, 2,
        3, 4, 5,
        6, 7, 8,
        9, 10, 11,
        12, 13, 14,
        15, 16, 17,
        18, 19, 20,
        21, 22, 23
    ];

    var myImage = document.getElementById("textureImage");

    textureImage = gl.createTexture();
    gl.bindTexture( gl.TEXTURE_2D, textureImage );
    gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true );
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, myImage );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST );
    gl.generateMipmap( gl.TEXTURE_2D );

    iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indexList), gl.STATIC_DRAW);

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER,vertexBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    var vertexPosition = gl.getAttribLocation(myShaderProgram,"vertexPosition");
    gl.vertexAttribPointer( vertexPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vertexPosition );

    var textureVertexbuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER,textureVertexbuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(textureCoordinates), gl.STATIC_DRAW );

    var textureCoordinate = gl.getAttribLocation(myShaderProgram, "textureCoordinate");
    gl.vertexAttribPointer( textureCoordinate, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( textureCoordinate );

}

function render() {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textureImage);
    gl.uniform1f(gl.getUniformLocation(myShaderProgram, "texMap0"), 0);

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
    gl.drawElements( gl.TRIANGLES, 24, gl.UNSIGNED_SHORT, 0 ); // gl.UNSINGED_BYTE
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
    if (keyCode === 38) moveShape("up"); // Go Up
    if (keyCode === 40) moveShape("down"); // Go Down
    if (keyCode === 37) moveShape("left"); // Go Left
    if (keyCode === 39) moveShape("right"); // Go Right
    if (keyCode === 68) scaleShape("D"); // Scale X
    if (keyCode === 87) scaleShape("W"); // Scale Y
}