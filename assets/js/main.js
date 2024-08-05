function openMenu() {
  let menu = document.getElementById("menu");
  menu.classList.add("show-mobile");
}

function closeMenu() {
  let menu = document.getElementById("menu");
  menu.classList.remove("show-mobile");
}

function createListWithTitleAndDescription(element, data) {
  element.innerHTML = ""; // Clear existing list items
  data.forEach((d) => {
    const li = document.createElement("li");
    const title = document.createElement("h2");
    const description = document.createElement("p");

    title.textContent = d.title;
    description.innerHTML = d.description;
    if (d.link) {
      const link = document.createElement("a");
      link.href = d.link;
      link.target = "_blank";
      link.appendChild(title);
      li.appendChild(link);
    } else {
      li.appendChild(title);
    }
    li.appendChild(description);
    element.appendChild(li);
  });
}

function translateSite(data) {
  // Translate the site using the provided JSON data
  // Menu items
  document.getElementById("about-link").textContent = data.menu.about;
  document.getElementById("experiences-link").textContent =
    data.menu.experiences;
  document.getElementById("projects-link").textContent = data.menu.projects;
  document.getElementById("skills-link").textContent = data.menu.skills;
  document.getElementById("contact-link").textContent = data.menu.contact;

  //About Section
  document.getElementById("about-title").textContent = data.about.title;
  document.getElementById("about-description").textContent =
    data.about.description;
  document.getElementById("about-knowledge-title").textContent =
    data.about.knowledge.title;

  // About Skill list
  const skillsList = document.getElementById("about-knowledge-skills");
  skillsList.innerHTML = ""; // Clear existing list items
  data.about.knowledge.skills.forEach((skill) => {
    const li = document.createElement("li");
    li.innerHTML = skill;
    skillsList.appendChild(li);
  });

  document.getElementById("about-button-text").textContent = data.about.button;

  // Experiences Section
  document.getElementById("experiences-title").textContent =
    data.experiences.title;

  // Experiences list
  const experiencesList = document.getElementById("experiences-list");
  createListWithTitleAndDescription(
    experiencesList,
    data.experiences.my_experiences
  );

  // Projects Section
  document.getElementById("projects-title").textContent = data.projects.title;
  // Projects list
  const projectsList = document.getElementById("projects-list");
  createListWithTitleAndDescription(projectsList, data.projects.my_projects);

  // Skills Section
  document.getElementById("skills-title").textContent = data.skills.title;
  document.getElementById("skills-subtitle").textContent = data.skills.subtitle;

  // Contact Section
  document.getElementById("contact-title").textContent = data.contact.title;
  const contactSubtitle = document.getElementById("contact-subtitle");
  contactSubtitle.innerHTML = ""; // Clear existing subtitle items
  data.contact.subtitle.forEach((subtitle) => {
    const p = document.createElement("p");
    p.textContent = subtitle;
    contactSubtitle.appendChild(p);
  });
}

// function changeLanguage() {
//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);
//   const button = document.getElementById("language-button");
//   if (urlParams.has("lang")) {
//     if (urlParams.get("lang") == "EN") {
//       fetch("./assets/languages/en.json")
//         .then((response) => response.json())
//         .then((data) => translateSite(data));
//       button.textContent = "PT";
//       button.classList.remove("en");
//       button.classList.add("pt");

//       urlParams.set("lang", "en");
//     } else {
//       fetch("./assets/languages/pt.json")
//         .then((response) => response.json())
//         .then((data) => translateSite(data));
//       button.textContent = "EN";
//       button.classList.remove("pt");
//       button.classList.add("en");

//       urlParams.set("lang", "pt")
//     }
//   }
//   else{
//     fetch("./assets/languages/en.json")
//       .then((response) => response.json())
//       .then((data) => translateSite(data));
//     button.textContent = "PT";
//     button.classList.remove("en");
//     button.classList.add("pt");

//     const currentUrl = new URL(window.location.href);
//     // Adiciona parâmetros de consulta
//     currentUrl.searchParams.set("lang", "en");
//     // Atualiza a URL no navegador
//     window.history.pushState({}, "", currentUrl);
//   }
// }

function changeLanguage() {
  const urlParams = new URLSearchParams(window.location.search);
  const button = document.getElementById("language-button");
  const currentLang = urlParams.get("lang") || "PT"; // Default to "EN" if no "lang" param

  // Map de idiomas e suas URLs
  const languageMap = {
    EN: {
      file: "./assets/languages/en.json",
      buttonText: "PT",
      classToRemove: "en",
      classToAdd: "pt",
      param: "EN",
    },
    PT: {
      file: "./assets/languages/pt.json",
      buttonText: "EN",
      classToRemove: "pt",
      classToAdd: "en",
      param: "PT",
    },
  };

  let languageData;

  if(currentLang == "PT"){
    languageData = languageMap["EN"];
  }
  else{
    languageData = languageMap["PT"];
  }

  const newLang = languageData.param;

  // Atualiza o botão e a classe
  button.textContent = languageData.buttonText;
  button.classList.remove(languageData.classToRemove);
  button.classList.add(languageData.classToAdd);

  // Carrega o arquivo de tradução
  fetch(languageData.file)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => translateSite(data))
    .catch((error) => console.error("Failed to load translation:", error));

  // Atualiza a URL com o novo parâmetro de idioma
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set("lang", newLang);
  window.history.pushState({}, "", currentUrl);
}


document.addEventListener("DOMContentLoaded", function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (urlParams.has("lang")) {
    const language = urlParams.get("lang");
    if (language == "en") {
      fetch("./assets/languages/en.json")
        .then((response) => response.json())
        .then((data) => translateSite(data));
    }
  }
});
