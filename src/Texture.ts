export default class {
  gl             : WebGL2RenderingContext;
  path           : string;
  renderId       : WebGLTexture;
  image          : HTMLImageElement;

  mode           : number;
  level          : number = 0;
  internalFormat : number;
  width          : number = 1;
  height         : number = 1;
  border         : number = 0;
  format         : number;
  type           : number;
  source         : Uint8Array = new Uint8Array([ 0, 0, 0, 255 ]);

  constructor(
    gl   : WebGL2RenderingContext,
    path : string
  ) {
    this.gl   = gl;
    this.path = path;

    this.mode           = this.gl.TEXTURE_2D;
    this.internalFormat = this.gl.RGBA;
    this.format         = this.gl.RGBA;
    this.type           = this.gl.UNSIGNED_BYTE;

    this.renderId = this.gl.createTexture() as WebGLTexture;

    this.gl.activeTexture( this.gl.TEXTURE0 + 0 );
    this.gl.bindTexture( this.gl.TEXTURE_2D, this.renderId );
    this.gl.texImage2D(
      this.mode,
      this.level,
      this.internalFormat,
      this.width,
      this.height,
      this.border,
      this.format,
      this.type,
      this.source
    );

    this.gl.enable( this.gl.BLEND );
    this.gl.blendFunc( this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA );

    this.image = new Image();

    this.image.onload = () => {
      this.gl.texParameteri(
        this.gl.TEXTURE_2D,
        this.gl.TEXTURE_WRAP_S,
        this.gl.CLAMP_TO_EDGE
      );

      this.gl.texParameteri(
        this.gl.TEXTURE_2D,
        this.gl.TEXTURE_WRAP_T,
        this.gl.CLAMP_TO_EDGE
      );

      this.gl.texParameteri(
        this.gl.TEXTURE_2D,
        this.gl.TEXTURE_MIN_FILTER,
        this.gl.NEAREST
      );

      this.gl.texParameteri(
        this.gl.TEXTURE_2D,
        this.gl.TEXTURE_MAG_FILTER,
        this.gl.NEAREST
      );

      this.gl.pixelStorei(
        this.gl.UNPACK_FLIP_Y_WEBGL,
        true
      );

      this.gl.texImage2D(
        this.mode,
        this.level,
        this.internalFormat,
        this.format,
        this.type,
        this.image
      );
    }

    this.image.src = this.path;
  }

  delete() {
    this.gl.deleteTexture( this.renderId );
  }

  bind( slot : number = 0 ) {
    this.gl.activeTexture( this.gl.TEXTURE0 + slot );
    this.gl.bindTexture( this.gl.TEXTURE_2D, this.renderId );
  }
}
