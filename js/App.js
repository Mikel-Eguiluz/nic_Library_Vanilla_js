import Score from "./Score.js";
import Composer from "./Composer.js";

const tableBodyNode = document.getElementById("score-table-body");
const composerSelect = document.getElementById("new-score-composer");
const styleSelect = document.getElementById("new-score-style");
const instrumentsSelect = document.getElementById("new-score-instrumentation");
class App {
  scores = [];
  composers = [];
  instruments = ["Oboe", "Piano", "drum"];
  styles = ["Classic", "Romantic", "Jazz"];
  constructor({ name, password }) {
    // Defensive Checks

    if (name == null) {
      throw new Error(`accounts require a name, received ${name}`);
    }
    if (password == null) {
      throw new Error(`accounts require a password, received ${password}`);
    }
    this.name = name + "";
    this.password = password + "";
  }

  //Create
  addScore(score) {
    if (score instanceof Score) {
      this.scores.push(score);
      this.renderScoreTable();
      return score;
    } else {
      throw new Error(`score needed, received  ${score}`);
    }
  }
  addComposer(composer) {
    if (composer instanceof Composer) {
      this.composers.push(composer);
      this.renderComposerSelect();
      return composer;
    } else {
      throw new Error(`composer needed, received  ${composer}`);
    }
  }
  // addComposer(
  //   newComposer = new Composer({
  //     name,
  //     isFemale,
  //     period,
  //     nationality,
  //     funFact,
  //   }),
  // ) {
  //   this.composers.push(newComposer);
  //   return newComposer;
  // }
  //Read
  getAllScores() {
    return this.scores;
  }
  getScoreByTitle(scoreTitle) {
    return this.scores.find((score) => score.title === scoreTitle);
  }
  getScoreIndexByTitle(scoreTitle) {
    return this.scores.findIndex((score) => score.title === scoreTitle);
  }
  //Update

  // updateByName(charName, changes) {
  //   const char = this.getCharByName(charName);
  //   for (const key in changes) {
  //     if (changes.hasOwnProperty(key)) {
  //       char[key] = changes[key];
  //     }
  //   }
  //   return char;
  // }

  //Delete
  // deleteCharByName(charName) {
  //   const index = this.getCharIndexByName(charName);
  //   if (index === -1) {
  //     arr.findIndex returns -1 if not found
  //     return null;
  //   }
  //   return this.scores.splice(index, 1);
  // }
  /* -------------------Render bits-----------------------------*/
  renderComposerSelect() {
    let injectedString = "";
    for (const composer of this.composers) {
      injectedString += `<option>${composer.name}</option> `;
    }
    composerSelect.innerHTML = injectedString;
  }
  renderStyleSelect() {
    let injectedString = "";
    for (const style of this.styles) {
      injectedString += `<option>${style}</option> `;
    }
    styleSelect.innerHTML = injectedString;
  }
  renderInstrumentsSelect() {
    let injectedString = "";
    for (const instrument of this.instruments) {
      injectedString += `<option>${instrument}</option>`;
    }
    instrumentsSelect.innerHTML = injectedString;
  }
  renderScoreTable() {
    let injectedString = "";
    for (const score of this.scores) {
      let concatenatedInstruments = "";
      for (const instrument of score.instrumentation) {
        concatenatedInstruments += ` ${instrument},`;
      }

      injectedString += `<tr>
          <th>${score.title}</th>
          <td>${score.composer.name}</td>
          <td>${score.style}</td>
          <td>${concatenatedInstruments.slice(0, -1)}</td>
          <td>${score.owner}</td>
          <td>${score.stock}</td>
          <td>
            <button class="btn btn-info btn-sm" id="new-score-btn"><i class="fas fa-pen-fancy"></i></button>
            <button class="btn btn-danger btn-sm" id="new-score-btn"><i class="fas fa-trash-alt"></i></button>
          </td>
        </tr>`;
    }
    tableBodyNode.innerHTML = injectedString;
  }
}

const nic = new App({ name: "nic", password: "1234" });
nic.renderStyleSelect();
nic.renderInstrumentsSelect();
const composer1 = new Composer({
  name: "composer1",
  isFemale: true,
  period: "XIX",
  nationality: "Spanish",
  funFact: "is silly",
});
const composer2 = new Composer({
  name: "composer2",
  isFemale: true,
  period: "XIX",
  nationality: "Spsfhds",
  funFact: "is silly",
});
nic.addComposer(composer1);
nic.addComposer(composer2);

const score1 = new Score({
  style: nic.styles[0],
  composer: nic.composers[0],
  instrumentation: [nic.instruments[0], nic.instruments[1]],
  title: "Piece 1",
  stock: 1,
  owner: "tailleferre",
});
const score2 = new Score({
  style: nic.styles[2],
  composer: nic.composers[0],
  instrumentation: [nic.instruments[2], nic.instruments[1]],
  title: "Jazzy drums",
  stock: 5,
  owner: "gusi",
});
nic.addScore(score1);
nic.addScore(score2);
console.log(nic);
