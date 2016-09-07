class JSONArea {
  constructor(entity,opts = {}) {
    this.entity = entity;
    this.opts = Object.assign({}, {
      events: ['change','keyup']
    }, opts);

    this.init();
  }

  getElement() {
    return this.entity;

  }

  init() {
    for(let event of this.opts.events) { // for each event
       this.entity.addEventListener(event,(e) => { // add the event
         this.entity.dispatchEvent(new CustomEvent("update", { // dispatch an update event
           detail: {
             isJSON: this.isJSON(e.target.value) // and let them know if the JSON is validated
           }
         }));
       });
    }
  }

  isJSON(string) {
    try {
      var jsonObject = JSON.parse(string);
    } catch(e) { return false }
    return true;
  }
}
