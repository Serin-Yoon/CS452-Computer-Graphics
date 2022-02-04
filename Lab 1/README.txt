This is Serin Yoon's Lab 1 assignment.

In order to apply different vertex shaders and fragment shaders for each shape, I set id differently, and each FragColor value were set differently.
In the init() function, a viewport is created, and the vertex shader and the fragment shader are selected to create each program.
Square, pentagon, and ellipse are drawn in the functions drawSquare(), drawPentagon(), and drawEllipse().
Each drawing function looks for the attribute position in the vertex shader, sets up position to accept vertex data for 2D points,
enables WebGL to access the data using position, and then draws the shapes.
Square is drawn using LINE_LOOP, and pentagon and ellipse are drawn using TRIANGLE_FAN.
The number of coordinates of the ellipse is set to 400 so that the shape is not angled.