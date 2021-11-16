const getQueryVariable = (variable) => {
  let search = window.location.search.substring(1);
  let equation = search.split("&");
  for (let i = 0; i < equation.length; i++) {
    let pair = equation[i].split("=");
    if (pair[0] === variable) return pair[1];
  }
  return null;
}

// fetch parameters
const site = getQueryVariable("s");
const version = getQueryVariable("v");
(version) && console.log(new Date(), version);

// change html
const h1 = document.querySelector("h1");
let content = h1.textContent;
if (site) {
  document.title = `${site} - Under construction`; // modify title
  if (site.length < 20) content = site + " is not ready yet."; // modify content
}
h1.innerHTML = content
  .replace(/\S/g, "<span>$&</span>")
  .replace(/\s/g, "<span>&nbsp;</span>"); // support space

// prepare for animation
let delay = 0;
document.querySelectorAll("span").forEach((span, index) => {
  delay += 0.1;
  if (span.textContent.search(/\s|\./) > -1) delay += 0.3; // sense of passage
  span.style.setProperty("--delay", `${delay}s`);
});

// animation end
h1.addEventListener("animationend", (e) => {
  if (e.target === document.querySelector("h1 span:last-child")) {
    h1.classList.add("ended");
  }
});
