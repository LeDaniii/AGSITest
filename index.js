document.addEventListener("DOMContentLoaded", () => {
  setupNavigationEventListeners();
});

function setupNavigationEventListeners() {
  const loadHome = document.getElementById("load-home");
  const loadAbout = document.getElementById("load-about");
  const loadContact = document.getElementById("load-contact");
  const loadContent = document.getElementById("load-content");
  const loadService = document.getElementById("load-service");
  const loadNews = document.getElementById("load-news");

  // ---------- Navigation Navbar start ----------
  loadHome.addEventListener("click", () => {
    loadDocument(nav.HOME);
  });

  loadAbout.addEventListener("click", () => {
    loadDocument(nav.ABOUT);
  });

  loadContact.addEventListener("click", () => {
    loadDocument(nav.CONTACT);
  });

  loadContent.addEventListener("click", () => {
    loadDocument(nav.CONTENT);
  });

  loadService.addEventListener("click", () => {
    loadDocument(nav.SERVICE);
  });

  loadNews.addEventListener("click", () => {
    loadDocument(nav.NEWS);
  });
}

function loadDocument(url) {
  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("main-wrapper").innerHTML = html;
      setupDynamicEventListeners(url);
    })
    .catch((error) => console.error("Error loading the document:", error));
}
// ---------- Navigation Navbar end ----------

// ---------- Load Data start ----------
function setupDynamicEventListeners(url) {
  switch (url) {
    case nav.HOME:
      setupHomeEventListeners();
      break;
    case nav.ABOUT:
      setupAboutEventListeners();
      break;
    case nav.CONTACT:
      setupContactEventListeners();
      break;
    case nav.CONTENT:
      setupContentEventListeners();
      break;
    case nav.SERVICE:
      setupServiceEventListeners();
      break;
    case nav.NEWS:
      setupNewsEventListeners();
      break;
    default:
      console.error("Error loading the document:", error);
  }
}

function setupContentEventListeners() {
  const loadProviderBtn = document.getElementById("load-provider-btn");
  const loadDataBtn = document.getElementById("load-data-btn");
  const data = [30, 86, 168, 281, 303, 365];

  loadProviderBtn.addEventListener("click", () => {
    loadProviderData();
  });

  loadDataBtn.addEventListener("click", () => {
    loadData();
  });

  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", 500)
    .attr("height", 300);

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 70)
    .attr("y", (d) => 300 - d)
    .attr("width", 65)
    .attr("height", (d) => d)
    .attr("fill", "blue");

  svg
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text((d) => d)
    .attr("x", (d, i) => i * 70 + 32.5) // Center the text in the bar
    .attr("y", (d) => 300 - d - 10)
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", "white")
    .attr("text-anchor", "middle");
}

function setupServiceEventListeners() {
  console.log("setupServiceEventListeners");
}

function setupContactEventListeners() {
  console.log("setupContactEventListeners");
}

function setupAboutEventListeners() {
  console.log("setupAboutEventListeners");
}

function setupHomeEventListeners() {
  console.log("setupHomeEventListeners");
}

function setupNewsEventListeners() {
  const newsElement = document.getElementById("news-wrapper");

  function getNewsData() {
    const apiKey = "221022933d7faf5091b9c3556ed99932";
    const url = "https://agsi.gie.eu/api/news";

    fetch(url, {
      method: "GET",
      headers: {
        "x-key": apiKey,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((getData) => {
        console.log(getData);
        renderNews(getData, newsElement);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }
  getNewsData();
  console.log("setupNewsEventListeners");
}

function loadProviderData() {
  console.log("loadProviderData");
  const apiKey = "221022933d7faf5091b9c3556ed99932";
  const url = "https://agsi.gie.eu/api/providers";

  fetch(url, {
    method: "GET",
    headers: {
      "x-key": apiKey,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((dataProviders) => {
        console.log(dataProviders);
        renderProviderCountries(dataProviders);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function loadData() {
    console.log("loadData");
    const apiKey = "221022933d7faf5091b9c3556ed99932";
    const url = "https://agsi.gie.eu/api";
  

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-key": apiKey,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((apiData) => {
      console.log(apiData);

      // const test = apiData;

      // console.log(test.data[apiLocation.EU].name);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function renderProviderCountries(data) {
  const countriesData = data.data.map((country) => country.children).flat();
  countriesData.forEach((element) => {
    document.getElementById(
      "country-list"
    ).innerHTML += `<option >${element.name}</option >`;
  });
}
// ---------- Load Data end ----------

function renderNews(data, newsElement) {
  let renderData = data;

  renderData.data.forEach((element) => {
    newsElement.innerHTML += `<div class="news-panel">
        <div class="panel-header">
            <h1>${element.title}</h1>
            <p>${element.start_at}</p>
        </div>
        <div class="panel-content">
            ${element.details}
            <hr>
        </div>
        <div class="panel-footer">
            adsfadsfasdf
        </div>
    </div>`;
  });

  // data.forEach((element) => {
  //   console.log(element);
  //   // document.getElementById(
  //   //   "news-list"
  //   // ).innerHTML += `<li class="list-group-item">${element.title}</li>`;
  // });
}



// Js Enums ---------
const nav = {
  HOME: "./html/home.html",
  ABOUT: "./html/about.html",
  CONTACT: "./html/contact.html",
  CONTENT: "./html/content.html",
  SERVICE: "./html/service.html",
  NEWS: "./html/news.html",
};

const apiLocation = {
  EU: 0,
  NON_EU: 1,
}