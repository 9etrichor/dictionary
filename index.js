const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container")
const titleEl = document.getElementById("title")
const meaningEl = document.getElementById("meaning")
const audioEl = document.getElementById("audio")

async function fetchAPI(word){
  try {
    infoTextEl.style.display = "block";
    meaningContainerEl.style.display = "none";

    infoTextEl.innerText = `Searching the meaning of ${word} `;
    const url =  `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());

    if(result.title) {
      titleEl.innerText = word;
      meaningEl.innerText = result.title;
      audioEl.style.display = "none";
    }
    
    infoTextEl.style.display = "none";
    meaningContainerEl.style.display = "block";
    titleEl.innerText = result[0].word;
    meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
    audioEl.src = result[0].phonetics[0].audio
  } catch (error) {
    console.log(error)  
  }

}

//use the key "/" to go to search bar
function shortCutToInput() {
  inputEl.focus()
}

//use the key "Escape" to delete all word in search bar
function shortCutToDeleteInput() {
  inputEl.value = '';
}

inputEl.addEventListener("keyup", (e) => {
  if(e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
})

document.addEventListener("keyup", (e) => {
  if(e.key === "/" ) {
    shortCutToInput();
  }
  if(e.key === "Escape") {
    shortCutToDeleteInput();
  }
  console.log(e.key)
})