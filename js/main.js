import Score from "./Score.js";
import App from "./App.js";

/***************************************
 ************ Initialize ***************
 ***************************************/

const appData = JSON.parse(localStorage.getItem("app"));
const app = new App();

if (!appData) {
  //if no data is in LS we create some example data

  app.composers = ["Poulenc", "Schumann", "Mozart", "Nielsen", "Pease"];
  app.instruments = ["Oboe", "Piano", "Drums", "Sax"];
  app.styles = ["Classic", "Romantic", "Jazz"];
  app.scores = [
    new Score({
      style: app.styles[0],
      composer: app.composers[0],
      instrumentation: [app.instruments[0], app.instruments[1]],
      title: "Example 1",
      stock: 1,
      owner: "Example",
    }),
    new Score({
      style: app.styles[2],
      composer: app.composers[1],
      instrumentation: [app.instruments[2], app.instruments[1]],
      title: "Example 2",
      stock: 5,
      owner: "Example",
    }),
  ];

  console.log("No LS data found, created", app);
} else {
  console.log(appData);
  app.composers = appData.composers;
  app.instruments = appData.instruments;
  app.styles = appData.styles;
  app.scores = appData.scores;
}
app.renderScoreTable();
app.renderStyleSelect();
app.renderInstrumentsSelect();
app.renderComposerSelect();

/***************************************
 ************ Listeners ****************
 **************************************/

/***************************************
 *********** Form Submit ***************
 **************************************/

const newScoreForm = document.getElementById("new-score-form");
const newScoreInstrumentation = document.getElementById(
  "new-score-instrumentation",
);
const instrumentsSelect = document.getElementById(
  "new-score-instrument-picker",
);
newScoreForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(newScoreForm);
  const data = Object.fromEntries(formData);
  console.log("data", data);
  console.log("valid?", newScoreForm.checkValidity());

  //Bootstrap validation
  if (!newScoreForm.checkValidity() || newScoreInstrumentation.value === "") {
    e.stopPropagation();
    newScoreForm.classList.add("was-validated");
    if (newScoreInstrumentation.value === "") {
      newScoreInstrumentation.classList.remove("is-valid");
      newScoreInstrumentation.classList.add("is-invalid");
    } else {
      newScoreInstrumentation.classList.remove("is-invalid");
      newScoreInstrumentation.classList.add("is-valid");
    }
    instrumentsSelect.classList.remove("was-validated");
    return;
  } else {
    newScoreForm.classList.remove("was-validated");
    newScoreInstrumentation.classList.remove("is-invalid");
    newScoreInstrumentation.classList.remove("is-valid");
  }

  const addedScore = new Score({
    title: data.title,
    style: data.style,
    composer: data.composer,
    instrumentation: data.instrumentation.split(", "),
    stock: data.stock === "" ? 0 : data.stock * 1,
    owner: data.owner,
  });
  console.log(addedScore);
  if (!toBeUpdatedId) {
    // console.log("addedScore", addedScore);
    app.addScore(addedScore);
  } else {
    // console.log("attempting to update", toBeUpdatedId);
    app.updateScoreById(toBeUpdatedId, addedScore);
  }
  e.target.reset();
});
let toBeUpdatedId = null;
newScoreForm.addEventListener("reset", (e) => {
  updateInfo.innerText = "";
  newScoreBtn.innerText = "Add Score";
  toBeUpdatedId = null;
});

/**************************************
 ********Update & delete buttons********
 **************************************/

const tableBodyNode = document.getElementById("score-table-body");
const updateInfo = document.getElementById("edit-target-name");
const newScoreBtn = document.getElementById("new-score-btn");

tableBodyNode.addEventListener("click", (e) => {
  toBeUpdatedId = e.target.dataset.id;

  if (e.target && e.target.matches("button.deleteBtn")) {
    e.stopPropagation();
    app.deleteScoreById(toBeUpdatedId);
    newScoreForm.reset();
  } else if (e.target.matches("button.updateBtn")) {
    e.stopPropagation();
    const toBeUpdatedScore = app.getScoreById(toBeUpdatedId); // if this is not null the form will update on submit
    updateInfo.innerText = `Updating ${toBeUpdatedScore.title} by ${toBeUpdatedScore.composer}`;
    newScoreBtn.innerText = `Update ${toBeUpdatedScore.title}`;
    document.getElementById("new-score-title").value = toBeUpdatedScore.title;
    document.getElementById("new-score-composer").value =
      toBeUpdatedScore.composer;
    document.getElementById(
      "new-score-instrumentation",
    ).value = toBeUpdatedScore.instrumentation.join(" ,");
    document.getElementById("new-score-style").value = toBeUpdatedScore.style;
    document.getElementById("new-score-owner").value = toBeUpdatedScore.owner;
    document.getElementById("new-score-stock").value = toBeUpdatedScore.stock;
  }
});

/**************************************
 **********add/delete composer**********
 **************************************/

const addComposerBtn = document.getElementById("add-composer-btn");
const addComposerInput = document.getElementById("add-composer-input");
const composerModalList = document.getElementById("composer-modal-list");

addComposerBtn.addEventListener("click", (e) => {
  app.addComposer(addComposerInput.value);
  addComposerInput.value = "";
});

composerModalList.addEventListener("click", (e) => {
  if (e.target && e.target.matches("button.deleteBtn")) {
    e.stopPropagation();
    app.deleteComposerByName(e.target.dataset.name);
  }
});

/**************************************
 *********add/delete instrument*********
 **************************************/

const addInstrumentBtn = document.getElementById("add-instrument-btn");
const addInstrumentInput = document.getElementById("add-instrument-input");
const instrumentModalList = document.getElementById("instrument-modal-list");

addInstrumentBtn.addEventListener("click", (e) => {
  app.addInstrument(addInstrumentInput.value);
  addInstrumentInput.value = "";
});

instrumentModalList.addEventListener("click", (e) => {
  if (e.target && e.target.matches("button.deleteBtn")) {
    e.stopPropagation();
    app.deleteInstrumentByName(e.target.dataset.name);
  }
});

/*****************************************
 ***********add/delete style***************
 *****************************************/

const addStyleBtn = document.getElementById("add-style-btn");
const addStyleInput = document.getElementById("add-style-input");
const styleModalList = document.getElementById("style-modal-list");

addStyleBtn.addEventListener("click", (e) => {
  app.addStyle(addStyleInput.value);
  addStyleInput.value = "";
});

styleModalList.addEventListener("click", (e) => {
  if (e.target && e.target.matches("button.deleteBtn")) {
    e.stopPropagation();
    app.deleteStyleByName(e.target.dataset.name);
  }
});

/**************************************
 ***add instrument to instrumentation***
 **************************************/

const instrumentationInput = document.getElementById(
  "new-score-instrumentation",
);

instrumentsSelect.addEventListener("input", (e) => {
  // console.log(e.target.value);
  if (instrumentationInput.value != "") {
    instrumentationInput.value += ", ";
  }
  instrumentationInput.value += e.target.value;
  instrumentsSelect.value = "";
});

document
  .getElementById("clear-instrumentation-button")
  .addEventListener("click", () => {
    instrumentationInput.value = "";
  });
