/*******************************************************************************
*  vertex shader                                                               *
*******************************************************************************/
export const vsSource =
`#version 300 es

in vec4 a_Position;

void main() {
  gl_Position = a_Position;
}`;


/*******************************************************************************
*  fragment shader                                                             *
*******************************************************************************/
export const fsSource =
`#version 300 es

precision highp float;

out vec4 outColor;

uniform vec4 u_Color;

void main() {
  outColor = u_Color;
}`;
