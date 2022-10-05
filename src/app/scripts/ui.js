export class getFormElements{
  constructor(iditem) {
      this.item = document.getElementById(iditem);
    }
  getValue(postition) {
      return this.item.elements[postition].value;
    }
};