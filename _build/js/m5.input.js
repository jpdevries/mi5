export class M5Input {

  constructor(element = undefined, defaultOpts = {}, opts = {}) {
    this._element = element || undefined;
    this._opts = Object.assign({}, defaultOpts, opts);
  }

  init(element = undefined) {
    if(element) this._element = element;
  }

  getElement() {
    return this._element;
  }

  getOpts() {
    return this._opts;
  }

}
