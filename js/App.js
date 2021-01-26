import Score from "./Score.js";
import Composer from "./Composer.js";

class App {
  scores = [];
  composers = [];
  instruments = ["Oboe", "Piano"];
  styles = ["Classic", "Romantic", "Jazz"];
  constructor({ name, password }) {
    // Defensive Checks
    console.log(document);
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
  createScore(
    newScore = { title, composer, style, stock, instrumentation, owner },
  ) {
    newScore = new Score(newScore);
    this.scores.push(newScore);
    return newScore;
  }

  createComposer(
    newComposer = new Composer({
      name,
      isFemale,
      period,
      nationality,
      funFact,
    }),
  ) {
    this.composers.push(newComposer);
    return newComposer;
  }
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
}

const nic = new App({ name: "nic", password: "1234" });
nic.createComposer({
  name: "composer1",
  isFemale: true,
  period: "XIX",
  nationality: "Spanish",
  funFact: "is silly",
});
console.log(nic);

nic.createScore({
  style: nic.styles[0],
  composer: nic.composers[0],
  instrumentation: [nic.instruments[0], nic.instruments[1]],
  title: "Piece 1",
  stock: 1,
  owner: "tailleferre",
});
