const form = document.forms.date,
  dd = form.elements.dd,
  mm = form.elements.mm,
  yyyy = form.elements.yyyy,
  daysdom = document.querySelector("#dd-re"),
  monthsdom = document.querySelector("#mm-re"),
  yearsdom = document.querySelector("#yyyy-re"),
  headers = document.querySelectorAll(".inp-title"),
  errorMessage = document.querySelector(".error-message");

const elements = [errorMessage, dd, mm, yyyy];
let index = 0;
while (index < 3) {
  elements.push(headers[index]);
  index++;
}
// FUNCTIONS
function checkDateValid(date) {
  return date instanceof Date && !isNaN(date);
}

function checkEmpty(dd, mm, yyyy) {
  const dateAr = [dd, mm, yyyy];
  let error;
  dateAr.forEach((element) => {
    if (element == "") {
      error = true;
    }
  });
  return error === true;
}

function getValue(event) {
  event.preventDefault();

  // checking empty
  if (checkEmpty(dd.value, mm.value, yyyy.value) === true) {
    errorMessage.innerHTML = "All fields must be completed!";
    elements.forEach((element) => element.classList.add("error"));
    return;
  }

  // creating the date
  let date = new Date(`${yyyy.value}-${mm.value}-${dd.value}`);

  // checking if date is valid
  if (checkDateValid(date) === false) {
    errorMessage.innerHTML = "Please enter a valid date!";
    elements.forEach((element) => element.classList.add("error"));
    return;
  }

  // getting date value in milliseconds
  const datemil = Date.parse(yyyy.value, mm.value, dd.value);

  // checking if that is from the future
  if (Date.now() < datemil) {
    errorMessage.innerHTML = "Please enter a date from the past!";
    elements.forEach((element) => element.classList.add("error"));
    return;
  } else {
    elements.forEach((element) => element.classList.remove("error"));
  }

  // getting the number of days/months/years and changing the DOM accordingly
  var seconds = Math.floor((Date.now() - datemil) / 1000),
    minutes = Math.floor(seconds / 60),
    hours = Math.floor(minutes / 60),
    days = Math.floor(hours / 24),
    months = Math.floor(days / 30),
    years = Math.floor(days / 365);

  days %= 30;
  months %= 12;

  daysdom.innerText = `${days} `;
  monthsdom.innerText = `${months} `;
  yearsdom.innerText = `${years} `;
}

form.addEventListener("submit", getValue);
