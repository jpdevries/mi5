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
    console.log(this.opts.events);
    for(let event of this.opts.events) { // for each event
      console.log(event);
       this.entity.addEventListener(event,(e) => { // add the event
         console.log(e.target.value);
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
