const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const loadingSpinner = document.getElementById("loading-spinner");
const spinnerDiv = document.getElementById("spinner-div");
const quoteButton = document.getElementById("quote-button");
const fixerDiv = document.getElementById("fixer");
const resetButton = document.getElementById("reset-button");

const loading = (e) => {
  fixerDiv.hidden = true;
  quoteContainer.hidden = true;
  spinnerDiv.hidden = false;
};

const complete = (e) => {
  quoteContainer.hidden = false;
  spinnerDiv.hidden = true;
};

const fetchQuote = async (e) => {
  loading();
  const proxyUrl = "https://guarded-peak-77488.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    quoteText.innerText = data.quoteText;
    quoteAuthor.innerText = data.quoteAuthor;
    if (data.quoteText.length > 90) {
      quoteText.classList.add("long-quote");
    }
    complete();
    loadingSpinner.hidden = true;
  } catch (err) {
    fixerDiv.hidden = false;
  }
};

const debounce = (fn, delay) => {
  let timeoutID;
  return () => {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(fn, delay);
  };
};

const debouncedCall = debounce(fetchQuote, 150);

quoteButton.addEventListener("click", fetchQuote);
resetButton.addEventListener("click", debouncedCall);

fetchQuote();
