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
    this.title = title + "";
    this.composer = composer;
    this.style = style;
    this.stock = stock;
    this.owner = owner;
    this.instrumentation = instrumentation;
  }
}
