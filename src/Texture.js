export default class {
  constructor( gl, path ) {
    this.gl   = gl;
    this.path = path;

    this.mode           = this.gl.TEXTURE_2D;
    this.level          = 0;
    this.internalFormat = this.gl.RGBA;
    this.width          = 1;
    this.height         = 1;
    this.border         = 0;
    this.format         = this.gl.RGBA;
    this.type           = this.gl.UNSIGNED_BYTE;
    this.bpp            = 0;
    this.source         = new Uint8Array([ 0, 0, 255, 255 ]);

    this.renderId = this.gl.createTexture();
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

    this.source = new Image( this.path );
    this.source.onload = () => {
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
      this.gl.texImage2D(
        this.mode,
        this.level,
        this.internalFormat,
        this.format,
        this.type,
        this.source
      );
    }
  }

  delete() {
    this.gl.deleteTexture( this.renderId );
  }

  bind( slot = 0 ) {
    this.gl.activeTexture( this.gl.TEXTURE0 + slot );
    this.gl.bindTexture( this.gl.TEXTURE_2D, this.renderId );
  }
}
