export default
`#version 300 es

in vec4 a_Position;
in vec2 a_texCoord;

out vec2 v_TexCoord;

uniform mat4 u_Model;
uniform mat4 u_View;
uniform mat4 u_Projection;

void main() {
  gl_Position = u_Projection * u_View * u_Model * a_Position;
  v_TexCoord  = a_texCoord;
}`;
