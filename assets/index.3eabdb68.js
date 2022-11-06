var w=Object.defineProperty;var S=(i,t,e)=>t in i?w(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var a=(i,t,e)=>(S(i,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerpolicy&&(n.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?n.credentials="include":r.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(r){if(r.ep)return;r.ep=!0;const n=e(r);fetch(r.href,n)}})();class E{constructor(){a(this,"debugContainer");a(this,"showDebug",!1);a(this,"updateFuncs",[]);this.debugContainer=document.createElement("section"),this.debugContainer.classList.add("debug"),this.debugContainer.style.background="rgba(255, 76, 255, 0.1)",this.debugContainer.style.color="white",this.debugContainer.style.visibility="hidden",this.debugContainer.style.display="inline-block",this.debugContainer.style.overflow="auto",this.debugContainer.style.resize="both";const t=document.createElement("h1");t.textContent="debug",this.debugContainer.append(t),document.body.append(this.debugContainer),window.addEventListener("keydown",({key:e})=>{e==="d"&&(this.showDebug=!this.showDebug,this.debugContainer.style.visibility=this.showDebug?"hidden":"visible")})}addSlider(t,e,s,r){const n=document.createElement("div"),o=document.createElement("input");o.type="range",o.min="0",o.step="1",o.max=`${s()}`,o.value=`${e()}`;const l=document.createElement("label");l.textContent=`${t}`;const h=document.createElement("output");n.appendChild(l),n.appendChild(o),n.appendChild(h),this.debugContainer.appendChild(n);const g=()=>{r(o.valueAsNumber),o.max=`${s()}`,o.value=`${e()}`,h.textContent=`${e()}`};o.addEventListener("input",()=>g()),o.addEventListener("change",()=>g()),this.updateFuncs.push(g)}update(){this.updateFuncs.forEach(t=>t())}toggle(){this.debugContainer.style.visibility=this.debugContainer.style.visibility==="hidden"?"visible":"hidden"}}class I{constructor(t,e){a(this,"gl");a(this,"data");a(this,"count");a(this,"renderId");this.gl=t,this.data=e,this.count=this.data.length,this.renderId=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.renderId),this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,this.data,this.gl.STATIC_DRAW)}bind(){this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.renderId)}delete(){this.gl.deleteBuffer(this.renderId)}}class R{constructor(t,e,s){a(this,"gl");a(this,"vsSource");a(this,"fsSource");a(this,"renderId");a(this,"uniformLocations",new Map);this.gl=t,this.vsSource=e,this.fsSource=s,this.renderId=this.createShader()}delete(){this.gl.deleteProgram(this.renderId)}bind(){this.gl.useProgram(this.renderId)}setUniform4f(t,e,s,r,n){this.gl.uniform4fv(this.getUniformLocation(t),new Float32Array([e,s,r,n]))}setUniform2f(t,e,s){this.gl.uniform2fv(this.getUniformLocation(t),new Float32Array([e,s]))}setUniform1i(t,e){this.gl.uniform1i(this.getUniformLocation(t),e)}setUniformMat3f(t,e){this.gl.uniformMatrix3fv(this.getUniformLocation(t),!1,e)}setUniformMat4f(t,e){this.gl.uniformMatrix4fv(this.getUniformLocation(t),!1,e)}getUniformLocation(t){var s;if(!this.renderId)return null;if(this.uniformLocations.has(t))return(s=this.uniformLocations.get(t))!=null?s:null;const e=this.gl.getUniformLocation(this.renderId,t);return e||console.warn("[WARN] Uniform :",t,"not found"),this.uniformLocations.set(t,e),e}createShader(){var o;const t=this.gl.createProgram(),e=this.compileShader(this.vsSource,this.gl.VERTEX_SHADER),s=this.compileShader(this.fsSource,this.gl.FRAGMENT_SHADER);if(this.gl.attachShader(t,e),this.gl.attachShader(t,s),this.gl.linkProgram(t),this.gl.validateProgram(t),this.gl.deleteShader(e),this.gl.deleteShader(s),this.gl.getProgramParameter(t,this.gl.LINK_STATUS))return t;const n=(o=this.gl.getProgramInfoLog(t))!=null?o:"";return console.error(n),this.delete(),null}compileShader(t,e){var o;const s=this.gl.createShader(e);if(this.gl.shaderSource(s,t),this.gl.compileShader(s),this.gl.getShaderParameter(s,this.gl.COMPILE_STATUS))return s;const n=(o=this.gl.getShaderInfoLog(s))!=null?o:"";return console.error(n),this.gl.deleteShader(s),null}}class C{constructor(t){a(this,"gl");a(this,"renderId");this.gl=t,this.renderId=this.gl.createVertexArray()}bind(){this.gl.bindVertexArray(this.renderId)}delete(){this.gl.deleteVertexArray(this.renderId)}addBuffer(t,e){this.bind(),t.bind();let s=0;e.elements.forEach((r,n)=>{const{count:o,type:l,normalized:h}=r,{stride:g}=e;this.gl.enableVertexAttribArray(n),this.gl.vertexAttribPointer(n,o,l,h,g,s),s+=r.count*r.size})}}class L{constructor(t,e){a(this,"gl");a(this,"data");a(this,"renderId");this.gl=t,this.data=e,this.renderId=t.createBuffer(),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.renderId),this.gl.bufferData(this.gl.ARRAY_BUFFER,this.data,this.gl.STATIC_DRAW)}bind(){this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.renderId)}delete(){this.gl.deleteBuffer(this.renderId)}}class _{constructor(t){a(this,"gl");a(this,"elements",[]);a(this,"stride",0);this.gl=t}pushFloat(t){this.elements.push({count:t,type:this.gl.FLOAT,normalized:!1,size:4}),this.stride+=4*t}pushUint(t){this.elements.push({count:t,type:this.gl.UNSIGNED_INT,normalized:!1,size:4}),this.stride+=4*t}}var u=typeof Float32Array<"u"?Float32Array:Array;Math.hypot||(Math.hypot=function(){for(var i=0,t=arguments.length;t--;)i+=arguments[t]*arguments[t];return Math.sqrt(i)});function p(){var i=new u(9);return u!=Float32Array&&(i[1]=0,i[2]=0,i[3]=0,i[5]=0,i[6]=0,i[7]=0),i[0]=1,i[4]=1,i[8]=1,i}function v(i,t,e){var s=t[0],r=t[1],n=t[2],o=t[3],l=t[4],h=t[5],g=t[6],f=t[7],m=t[8],d=e[0],c=e[1];return i[0]=s,i[1]=r,i[2]=n,i[3]=o,i[4]=l,i[5]=h,i[6]=d*s+c*o+g,i[7]=d*r+c*l+f,i[8]=d*n+c*h+m,i}function b(i,t,e){var s=t[0],r=t[1],n=t[2],o=t[3],l=t[4],h=t[5],g=t[6],f=t[7],m=t[8],d=Math.sin(e),c=Math.cos(e);return i[0]=c*s+d*o,i[1]=c*r+d*l,i[2]=c*n+d*h,i[3]=c*o-d*s,i[4]=c*l-d*r,i[5]=c*h-d*n,i[6]=g,i[7]=f,i[8]=m,i}function y(i,t,e){var s=e[0],r=e[1];return i[0]=s*t[0],i[1]=s*t[1],i[2]=s*t[2],i[3]=r*t[3],i[4]=r*t[4],i[5]=r*t[5],i[6]=t[6],i[7]=t[7],i[8]=t[8],i}function F(){var i=new u(2);return u!=Float32Array&&(i[0]=0,i[1]=0),i}function A(i,t){var e=new u(2);return e[0]=i,e[1]=t,e}(function(){var i=F();return function(t,e,s,r,n,o){var l,h;for(e||(e=2),s||(s=0),r?h=Math.min(r*e+s,t.length):h=t.length,l=s;l<h;l+=e)i[0]=t[l],i[1]=t[l+1],n(i,i,o),t[l]=i[0],t[l+1]=i[1];return t}})();const U=`#version 300 es

uniform vec2 u_Resolution;
uniform mat3 u_Matrix;

in vec2 a_Position;

void main() {
  vec2 position  = ( u_Matrix * vec3( a_Position, 1 ) ).xy;

  vec2 zeroToOne = position / u_Resolution;
  vec2 zeroToTwo = zeroToOne * 2.0;
  vec2 clipSpace = zeroToTwo - 1.0;

  gl_Position = vec4( clipSpace * vec2( 1, -1 ), 0, 1 );
}`,M=`#version 300 es

precision highp float;

uniform vec4 u_Color;

out vec4 outColor;

void main() {
  outColor = u_Color;
}`;class T{constructor(t){a(this,"gl");a(this,"ibo");a(this,"indices");a(this,"layout");a(this,"positions");a(this,"position");a(this,"program");a(this,"rotation");a(this,"scale");a(this,"vao");a(this,"vbo");this.gl=t,this.position=A(0,0),this.rotation=0,this.scale=A(100,100),this.positions=new Float32Array([0,0,1,0,1,1,0,1]),this.indices=new Uint32Array([0,1,2,2,3,0]),this.layout=new _(this.gl),this.layout.pushFloat(2),this.vao=new C(this.gl),this.vbo=new L(this.gl,this.positions),this.ibo=new I(this.gl,this.indices),this.vao.bind(),this.vao.addBuffer(this.vbo,this.layout),this.program=new R(this.gl,U,M),this.program.bind(),this.program.setUniform4f("u_Color",Math.random(),Math.random(),Math.random(),1);const e=p();v(e,e,this.position),b(e,e,this.rotation*Math.PI/180),y(e,e,this.scale),this.program.setUniformMat3f("u_Matrix",e)}update(t){return t}draw(){this.vao.bind(),this.ibo.bind(),this.program.bind(),this.program.setUniform2f("u_Resolution",this.gl.canvas.width,this.gl.canvas.height);const t=p();v(t,t,this.position),b(t,t,this.rotation*Math.PI/180),y(t,t,this.scale),this.program.setUniformMat3f("u_Matrix",t),this.gl.drawElements(this.gl.TRIANGLES,this.ibo.count,this.gl.UNSIGNED_INT,0)}}class x{constructor(t){a(this,"gl");a(this,"geometries",new Array);this.gl=t}addGeometry(t){this.geometries.push(t)}update(t){this.geometries.forEach(e=>{e.update(t)})}draw(){(this.gl.canvas.width!==this.gl.canvas.clientWidth||this.gl.canvas.height!==this.gl.canvas.clientHeight)&&(this.gl.canvas.width=this.gl.canvas.clientWidth,this.gl.canvas.height=this.gl.canvas.clientHeight,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height)),this.gl.clearColor(0,0,0,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.geometries.forEach(t=>{t.draw()})}}const B=()=>{const t=document.querySelector("canvas").getContext("webgl2");if(!t){console.error("Unable to Initialize WebGL");return}t.viewport(0,0,t.canvas.width,t.canvas.height);const e=new T(t),s=new x(t),r=new E;r.addSlider("x",()=>e.position[0],()=>t.canvas.width,h=>e.position[0]=h),r.addSlider("y",()=>e.position[1],()=>t.canvas.height,h=>e.position[1]=h),r.addSlider("rotation",()=>e.rotation,()=>360,h=>e.rotation=h),r.addSlider("scale",()=>e.scale[0],()=>1e3,h=>{e.scale[0]=h,e.scale[1]=h}),s.addGeometry(e);let n=0,o=0;const l=h=>{requestAnimationFrame(l),o=h-n,n=h,s.update(o),r.update(),s.draw()};requestAnimationFrame(l)};window.addEventListener("load",B);
