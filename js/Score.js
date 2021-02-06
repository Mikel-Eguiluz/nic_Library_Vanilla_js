export default class Score {
  constructor({
    title,
    composer,
    style,
    stock = 0,
    instrumentation = [],
    owner,
  }) {
    if (title == null) {
      throw new Error(`scores require a title, received ${title}`);
    }
    (this._id = uuidv4()), (this.title = title + "");
    this.composer = composer;
    this.style = style;
    this.stock = stock;
    this.owner = owner;
    this.instrumentation = instrumentation;
  }
}
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
