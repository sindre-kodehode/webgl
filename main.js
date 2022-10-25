/*******************************************************************************
*  vertex shader                                                               *
*******************************************************************************/
const vertexShaderSource =
`#version 300 es

in vec2 a_Position;

uniform vec2 u_Resolution;

void main() {
  vec2 zeroToOne = a_Position / u_Resolution;
  vec2 zeroToTwo = zeroToOne * 2.0;
  vec2 clipSpace = zeroToTwo - 1.0;

  gl_Position = vec4( clipSpace * vec2( 1, -1 ), 0, 1 );
}
`;


/*******************************************************************************
*  fragment shader                                                             *
*******************************************************************************/
const fragmentShaderSource =
`#version 300 es

precision highp float;

uniform vec4 u_Color;

out vec4 outColor;

void main() {
  outColor = u_Color;
}
`;


/*******************************************************************************
*  compile shader                                                              *
*******************************************************************************/
const createShader = ( gl, type, source ) => {
  const shader = gl.createShader( type );

  gl.shaderSource( shader, source );
  gl.compileShader( shader );

  const success = gl.getShaderParameter( shader, gl.COMPILE_STATUS );

  if ( success ) return shader;

  console.error( gl.getShaderInfoLog( shader ) );
  gl.deleteShader( shader );
}


/*******************************************************************************
*  create program                                                              *
*******************************************************************************/
const createProgram = ( gl, vertexShader, fragmentShader ) => {
  const program = gl.createProgram();

  gl.attachShader( program, vertexShader   );
  gl.attachShader( program, fragmentShader );
  gl.linkProgram( program );

  const success = gl.getProgramParameter( program, gl.LINK_STATUS );
  
  if ( success ) return program;

  console.error( gl.getProgramInfoLog( program ) );
  gl.deleteProgram( program );
};

/*******************************************************************************
*  create rectangle                                                            *
*******************************************************************************/
const createRectangle = ( gl, x, y, width, height ) => {
  const x1 = x;
  const x2 = x + width;
  const y1 = y;
  const y2 = y + height;

  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      x1, y1,
      x2, y1,
      x1, y2,
      x1, y2,
      x2, y1,
      x2, y2,
    ]),
    gl.STATIC_DRAW
  );
}

/*******************************************************************************
*  main                                                                        *
*******************************************************************************/
const main = () => {
  const canvas = document.querySelector( "canvas" );
  const gl     = canvas.getContext( "webgl2" );

  if ( !gl ) {
    console.error( "Unable to Initialize WebGL" )
    return;
  }

  const vertexShader = createShader(
    gl,
    gl.VERTEX_SHADER,
    vertexShaderSource
  );

  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  );

  const program = createProgram(
    gl,
    vertexShader,
    fragmentShader
  );

  const resolutionUniformLocation = gl.getUniformLocation(
    program,
    "u_Resolution"
  );

  const positionAttributeLocation = gl.getAttribLocation(
    program,
    "a_Position"
  );

  const colorAttributeLocation = gl.getUniformLocation(
    program,
    "u_Color"
  );

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer( gl.ARRAY_BUFFER, positionBuffer );

  const positions = new Float32Array([
    10, 20,
    80, 20,
    10, 30,
    10, 30,
    80, 20,
    80, 30,
  ]);

  gl.bufferData( gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW );

  const vertexArrayObject = gl.createVertexArray();
  gl.bindVertexArray( vertexArrayObject );
  gl.enableVertexAttribArray( positionAttributeLocation );

  {
    const size      = 2;
    const type      = gl.FLOAT;
    const normalize = false;
    const stride    = 0;
    const offset    = 0;

    gl.vertexAttribPointer(
      positionAttributeLocation,
      size,
      type,
      normalize,
      stride,
      offset
    );
  }

  gl.viewport( 0, 0, gl.canvas.width, gl.canvas.height );
  gl.clearColor( 0, 0, 0, 1.0 )  ;
  gl.clear( gl.COLOR_BUFFER_BIT );
  gl.useProgram( program );

  gl.uniform2f(
    resolutionUniformLocation,
    gl.canvas.width,
    gl.canvas.height
  );

  const randomInt = range => Math.floor( Math.random() * range );

  for ( let i = 0; i < 50; i++ ) {
    createRectangle(
      gl,
      randomInt( 300 ),
      randomInt( 300 ),
      randomInt( 300 ),
      randomInt( 300 ),
    )

    gl.uniform4f(
      colorAttributeLocation,
      Math.random(),
      Math.random(),
      Math.random(),
      1.0
    );

    const primitiveType = gl.TRIANGLES;
    const offset        = 0;
    const count         = 6;

    gl.drawArrays( primitiveType, offset, count );
  }
};

window.addEventListener( "load", main );
