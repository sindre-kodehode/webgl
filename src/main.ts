// *** style imports *** //
import "./css/style.css";

// *** default imports  *** //
import DebugScreen from "./DebugScreen";
import Rectangle   from "./Rectangle";
import Renderer    from "./Renderer";

const main = () => {
  const canvas = document.querySelector( "canvas" ) as HTMLCanvasElement;
  const gl     = canvas.getContext( "webgl2" );

  if ( !gl ) {
    console.error( "Unable to Initialize WebGL" )
    return;
  }

  gl.viewport( 0, 0, gl.canvas.width, gl.canvas.height );

  const rect  = new Rectangle( gl );
  const scene = new Renderer( gl );
  const ui    = new DebugScreen();

  ui.addSlider(
    "x",
    () => rect.x,
    () => gl.canvas.width,
    value => rect.x = value
  );
  ui.addSlider(
    "y",
    () => rect.y,
    () => gl.canvas.height,
    value => rect.y = value
  );
  ui.addSlider(
    "rotation",
    () => rect.rotation,
    () => 360,
    value => rect.rotation = value
  );

  scene.addGeometry( rect );

  // *** render loop *** //
  let then : number = 0;
  let dt   : number = 0;

  const render = ( now : number )  => {
    requestAnimationFrame( render );

    dt   = now - then;
    then = now;

    scene.update( dt );
    ui.update();

    scene.draw();
  };

  requestAnimationFrame( render );
};

window.addEventListener( "load", main );
