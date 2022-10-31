export default
`#version 300 es

in vec4 a_Position;
in vec2 a_texCoord;

out vec2 v_TexCoord;

void main() {
  gl_Position = a_Position;
  v_TexCoord  = a_texCoord;
}`;
