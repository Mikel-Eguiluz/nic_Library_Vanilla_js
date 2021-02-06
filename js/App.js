import Score from "./Score.js";

const tableBodyNode = document.getElementById("score-table-body");
const composerSelect = document.getElementById("new-score-composer");
const styleSelect = document.getElementById("new-score-style");
const instrumentsSelect = document.getElementById(
  "new-score-instrument-picker",
);

const composerModalList = document.getElementById("composer-modal-list");
const instrumeModalList = document.getElementById("instrument-modal-list");
const styleModalList = document.getElementById("style-modal-list");

export default class App {
  scores = [];
  composers = [];
  instruments = [];
  styles = [];

  saveToLS() {
    localStorage.setItem(`app`, JSON.stringify(this));
  }
  //Create

  addScore(score) {
    if (score instanceof Score) {
      this.scores.push(score);
      this.renderScoreTable();
      this.saveToLS();
      return score;
    } else {
      throw new Error(`score needed, received  ${score}`);
    }
  }
  addComposer(composer) {
    this.composers.push(composer);
    this.renderComposerSelect();
    this.saveToLS();
    return composer;
  }
  addInstrument(instrument) {
    this.instruments.push(instrument);
    this.renderInstrumentsSelect();
    this.saveToLS();
    return instrument;
  }
  addStyle(style) {
    this.styles.push(style);
    this.renderStyleSelect();
    this.saveToLS();
    return style;
  }
  //Read
  getAllScores() {
    return this.scores;
  }
  getScoreById(id) {
    return this.scores.find((score) => score._id === id);
  }
  getScoreIndexById(id) {
    return this.scores.findIndex((score) => score._id === id);
  }

  //Delete
  deleteScoreById(id) {
    const index = this.getScoreIndexById(id);
    if (index === -1) {
      return null;
    }
    const deletedScore = this.scores.splice(index, 1);
    this.renderScoreTable();
    // console.log(this.scores);
    this.saveToLS();
    return deletedScore;
  }
  deleteComposerByName(name) {
    const index = this.composers.findIndex((composer) => composer === name);
    if (index === -1) {
      return null;
    }
    const deletedComposer = this.composers.splice(index, 1);
    this.renderComposerSelect();
    // console.log(this.scores);
    this.saveToLS();
    return deletedComposer;
  }

  deleteStyleByName(name) {
    const index = this.styles.findIndex((style) => style === name);
    if (index === -1) {
      return null;
    }
    const deletedStyle = this.styles.splice(index, 1);
    this.renderStyleSelect();
    // console.log(this.scores);
    this.saveToLS();
    return deletedStyle;
  }

  deleteInstrumentByName(name) {
    const index = this.instruments.findIndex(
      (instrument) => instrument === name,
    );
    if (index === -1) {
      return null;
    }
    const deletedInstrument = this.instruments.splice(index, 1);
    this.renderInstrumentsSelect();
    // console.log(this.scores);
    this.saveToLS();
    return deletedInstrument;
  }
  //Update

  updateScoreById(id, score) {
    const index = this.getScoreIndexById(id);
    if (index === -1) {
      return null;
    }
    if (score instanceof Score) {
      this.scores[index] = score;
      this.renderScoreTable();
      this.saveToLS();
      return score;
    } else {
      throw new Error(`score needed, received  ${score}`);
    }
  }
  /* -------------------Render bits-----------------------------*/
  renderComposerSelect() {
    let injectedString = "<option></option>";
    let modalString = "";
    for (const composer of this.composers) {
      injectedString += `<option>${composer}</option>`;
      modalString += `
        <li class=" py-1 list-group-item d-flex justify-content-between align-items-center">
          ${composer}
          <button class="badge badge-pill badge-warning deleteBtn" data-name = "${composer}">
            <i class="fas fa-trash-alt"></i>
          </button>
        </li>`;
    }

    composerSelect.innerHTML = injectedString;
    composerModalList.innerHTML = modalString;
  }
  renderStyleSelect() {
    let injectedString = "<option></option>";
    let modalString = "";
    for (const style of this.styles) {
      injectedString += `<option>${style}</option> `;
      modalString += `
        <li class=" py-1 list-group-item d-flex justify-content-between align-items-center">
          ${style}
          <button class="badge badge-pill badge-warning deleteBtn" data-name = "${style}">
            <i class="fas fa-trash-alt"></i>
          </button>
        </li>`;
    }
    styleSelect.innerHTML = injectedString;
    styleModalList.innerHTML = modalString;
  }
  renderInstrumentsSelect() {
    let injectedString = "<option></option>";
    let modalString = "";
    for (const instrument of this.instruments) {
      injectedString += `<option>${instrument}</option>`;
      modalString += `
        <li class=" py-1 list-group-item d-flex justify-content-between align-items-center">
          ${instrument}
          <button class="badge badge-pill badge-warning deleteBtn" data-name = "${instrument}">
            <i class="fas fa-trash-alt"></i>
          </button>
        </li>`;
    }
    instrumentsSelect.innerHTML = injectedString;
    instrumeModalList.innerHTML = modalString;
  }
  renderScoreTable() {
    let injectedString = "";
    for (const score of this.scores) {
      // let concatenatedInstruments = "";
      // for (const instrument of score.instrumentation) {
      //   concatenatedInstruments += ` ${instrument},`;
      // }

      injectedString += `<tr>
          <th>${score.title}</th>
          <td>${score.composer}</td>
          <td>${score.style}</td>
          <td>${score.instrumentation.join(", ")}</td>
          <td>${score.owner}</td>
          <td>${score.stock}</td>
          <td>
            <button data-id="${
              score._id
            }" class="updateBtn btn btn-info btn-sm" ><i class="fas fa-pen-fancy"></i></button>
            <button data-id="${
              score._id
            }" class="deleteBtn btn btn-danger btn-sm" ><i class="fas fa-trash-alt"></i></button>
          </td>
        </tr>`;
    }
    tableBodyNode.innerHTML = injectedString;
  }
}
