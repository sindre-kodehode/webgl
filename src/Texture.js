export default class {
  constructor( gl, path ) {
    this.path = path;

    this.mode           = gl.TEXTURE_2D;
    this.level          = 0;
    this.internalFormat = gl.RGBA;
    this.width          = 1;
    this.height         = 1;
    this.border         = 0;
    this.format         = gl.RGBA;
    this.type           = gl.UNSIGNED_BYTE;
    this.source         = new Uint8Array([ 0, 0, 255, 255 ]);

    this.renderId = gl.createTexture();

    gl.activeTexture( gl.TEXTURE0 + 0 );
    gl.bindTexture( gl.TEXTURE_2D, this.renderId );
    gl.texImage2D(
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

    this.image = new Image( this.path );

    this.image.onload = () => {
      gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
      gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
      gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
      gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
      gl.pixelStorei( gl.UNPACK_FLIP_Y_WEBGL, true );

      gl.texImage2D(
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

  delete( gl ) {
    gl.deleteTexture( this.renderId );
  }

  bind( gl, slot = 0 ) {
    gl.activeTexture( gl.TEXTURE0 + slot );
    gl.bindTexture( gl.TEXTURE_2D, this.renderId );
  }
}
