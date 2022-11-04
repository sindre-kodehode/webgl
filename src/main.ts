// *** style imports *** //
import "./css/style.css";

// *** default imports  *** //
import Rectangle from "./Rectangle";
import Renderer  from "./Renderer";

const main = () => {
  const canvas = document.querySelector( "canvas" ) as HTMLCanvasElement;
  const gl     = canvas.getContext( "webgl2" );

  if ( !gl ) {
    console.error( "Unable to Initialize WebGL" )
    return;
  }

  gl.viewport( 0, 0, gl.canvas.width, gl.canvas.height );

  const rect  = new Rectangle( gl, 100, 100 );
  const scene = new Renderer( gl );

  scene.addGeometry( rect );

  // *** render loop *** //
  let then : number = 0;
  let dt   : number = 0;

  const render = ( now : number )  => {
    requestAnimationFrame( render );

    dt   = now - then;
    then = now;

    scene.update( dt );
    scene.draw();
  };

  requestAnimationFrame( render );
};

window.addEventListener( "load", main );
