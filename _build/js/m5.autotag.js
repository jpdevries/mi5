const M5Input = require('m5.input');

export class M5AutoTag extends M5Input {
  constructor(element = undefined, opts = {}) {
    super(element, {
      caseSensitive: false,
      separator: ',',
      inputSelector: 'input[type="text"]',
      tagsHolder: '.auto-tags'
    }, opts);

    if(this.getElement()) {
      this.init();
    }
  }

  init(element = undefined) {
    super.init(element);
    this.assignTagsInputListener();
    this.assignTagCheckboxesListeners();
  }

  getTagsInput() {
    return this.getElement().querySelector(this.getOpts().inputSelector);
  }

  getTagsHolder() {
    return this.getElement().querySelector(this.getOpts().tagsHolder);
  }

  getTags() {
    return this.getTagsInput().value.split(this.getOpts().separator).map((tag) => (
      tag.trim()
    )).filter((tag) => tag);
  }

  getTagCheckboxes() {
    return this.getTagsHolder().querySelectorAll('input[type="checkbox"]');
  }

  assignTagCheckboxesListeners() {
    const tagCheckboxes = this.getTagCheckboxes(),
    separator = this.getOpts().separator;

    for(let i = 0; i < tagCheckboxes.length; i++) {
      tagCheckboxes[i].addEventListener('change', (event) => {
        let tags = this.getTags(),
        opts = this.getOpts();

        if(!opts.caseSensitive) {
          tags = tags.map((tag) => (
            (tag.toLowerCase() == event.target.value.toLowerCase()) ? event.target.value : tag
          ));
        }

        if(event.target.checked) {
          if(!tags.includes(event.target.value)) tags.push(event.target.value)
        } else {
          tags = tags.filter((tag) => (
            tag !== event.target.value
          ));
        }

        this.getTagsInput().value = tags.join(`${separator} `);
      });
    }
  }

  assignTagsInputListener() {
    const tagCheckboxes = this.getTagCheckboxes(),
    opts = this.getOpts();

    this.getTagsInput().addEventListener('input', (event) => {
      let tags = this.getTags();

      if(!opts.caseSensitive) {
        tags = tags.map((tag) => (
          tag.toLowerCase()
        ));
      }

      for(let i = 0; i < tagCheckboxes.length; i++) tagCheckboxes[i].checked = false;
      for(let i = 0; i < tagCheckboxes.length; i++) {
        const tagCheckbox = tagCheckboxes[i];
        if(tags.includes((!opts.caseSensitive) ? tagCheckbox.value.toLowerCase() : tagCheckbox.value ))  tagCheckbox.checked = true;
      }

    });
  }
}
