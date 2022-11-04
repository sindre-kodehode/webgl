export default class {
  debugContainer : HTMLElement;
  showDebug      : boolean = false;
  updateFuncs    : Array< () => void > = [];

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
    max      : () => number,
    setValue : ( value : number ) => void
  ) {
    const sliderContainer = document.createElement( "div" ) as HTMLDivElement;

    const slider = document.createElement( "input" ) as HTMLInputElement;
    slider.type       = "range";
    slider.min        = "0";
    slider.step       = "1";
    slider.max        = `${ max()   }`;
    slider.value      = `${ value() }`;

    const label  = document.createElement( "label" ) as HTMLLabelElement;
    label.textContent = `${ name }`;

    const output = document.createElement( "output" ) as HTMLOutputElement;

    sliderContainer.appendChild( label  );
    sliderContainer.appendChild( slider );
    sliderContainer.appendChild( output );

    this.debugContainer.appendChild( sliderContainer );

    const update = () => {
      setValue( slider.valueAsNumber );
      slider.max         = `${ max()   }`;
      slider.value       = `${ value() }`;
      output.textContent = `${ value() }`;
    }

    slider.addEventListener( "input",  () => update() );
    slider.addEventListener( "change", () => update() );
    this.updateFuncs.push( update );
  }

  update() {
    this.updateFuncs.forEach( update => update() );
  }

  toggle() {
    this.debugContainer.style.visibility=
      this.debugContainer.style.visibility === "hidden" ? "visible" : "hidden";
  }
}
