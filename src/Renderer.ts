// *** default imports *** //
import Rectangle from "./Rectangle";

export default class {
  gl         : WebGL2RenderingContext;
  geometries : Rectangle[] = new Array< Rectangle >();

  constructor( gl : WebGL2RenderingContext ) {
    this.gl = gl;
  }

  addGeometry( rectangle : Rectangle ) {
    this.geometries.push( rectangle );
  }

  update( dt : number ) {
    this.geometries.forEach( rectangle => {
      rectangle.update( dt );
    });
  }

  draw() {
    // *** resize canvas and viewport *** //
    if ( this.gl.canvas.width  !== this.gl.canvas.clientWidth
      || this.gl.canvas.height !== this.gl.canvas.clientHeight ) {

      this.gl.canvas.width  = this.gl.canvas.clientWidth;
      this.gl.canvas.height = this.gl.canvas.clientHeight;
      this.gl.viewport( 0, 0, this.gl.canvas.width, this.gl.canvas.height );
    }

    this.gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    this.gl.clear( this.gl.COLOR_BUFFER_BIT );

    this.geometries.forEach( rectangle => {
      rectangle.draw();
    });
  }
}
