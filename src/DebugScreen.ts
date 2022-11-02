export default class {
  debugContainer : HTMLElement;
  showDebug      : boolean = false;

  constructor() {
    this.debugContainer = document.createElement( "section" ) as HTMLElement;
    this.debugContainer.classList.add( "debug" );
    this.debugContainer.style.background = "rgba(255, 76, 255, 0.1)";
    this.debugContainer.style.color      = "white";
    this.debugContainer.style.visibility = "hidden";
    this.debugContainer.style.width      = "33%";

    const title = document.createElement( "h1" ) as HTMLHeadingElement;
    title.textContent = "debug";
    this.debugContainer.append( title );

    document.body.append( this.debugContainer );
    window.addEventListener( "keydown", ({ key }) => {
      if ( key === "d" ) {
        this.showDebug = !this.showDebug;
        this.debugContainer.style.visibility = this.showDebug ? "hidden" : "visible";
      }
    });
  }

  addSlider(
    name     : string,
    value    : () => number,
    min      : number,
    max      : () => number,
    step     : number,
    setValue : ( value : number ) => void
  ) {
    const slider = document.createElement( "input" ) as HTMLInputElement;
    slider.type       = "range";
    slider.min        = `${ min     }`;
    slider.max        = `${ max()   }`;
    slider.step       = `${ step    }`;
    slider.value      = `${ value() }`;

    const label  = document.createElement( "label" ) as HTMLLabelElement;
    label.textContent = `${ name }: ${ value() }`;
    label.style.display = "block";

    this.debugContainer.appendChild( label  );
    this.debugContainer.appendChild( slider );

    slider.addEventListener( "input", () => {
      setValue( slider.valueAsNumber );
      slider.max        = `${ max()   }`;
      slider.value      = `${ value() }`;
      label.textContent = `${ name }: ${ value() }`;
    });
  }

  toggle() {
    this.debugContainer.style.visibility=
      this.debugContainer.style.visibility === "hidden" ? "visible" : "hidden";
  }
}
