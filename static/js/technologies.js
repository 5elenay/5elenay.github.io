const technologiesElement = document.getElementById("technologies");

const technologies = [
    {
        url: "https://elixir-lang.org/",
        name: "Elixir",
        icon: "elixir.svg",
    },
    {
        url: "https://golang.org/",
        name: "Golang",
        icon: "golang.svg",
    },
    {
        url: "https://www.javascript.com/",
        name: "JavaScript",
        icon: "javascript.svg",
    },
    {
        url: "https://python.org/",
        name: "Python",
        icon: "python.svg",
    },
    {
        url: "https://en.wikipedia.org/wiki/HTML",
        name: "HTML",
        icon: "html.svg",
    },
    {
        url: "https://sass-lang.com/",
        name: "Sass",
        icon: "sass.svg",
    },
    {
        url: "https://www.mongodb.com/",
        name: "MongoDB",
        icon: "mongodb.svg",
    },
    {
        url: "https://www.postgresql.org/",
        name: "PostgreSQL",
        icon: "postgres.svg",
    },
    {
        url: "https://deno.land/",
        name: "Deno",
        icon: "deno.svg",
    },
    {
        url: "https://git-scm.com/",
        name: "Git",
        icon: "git.svg",
    },
    {
        url: "https://code.visualstudio.com/",
        name: "Visual Studio Code",
        icon: "vscode.svg",
    },
];

for (let technology of technologies) {
    const techSpan = document.createElement("span");
    techSpan.className = "technology";

    const logo = document.createElement("img");
    logo.src = `./static/images/technologies/${technology.icon}`;

    const text = document.createElement("a");
    text.href = technology.url;
    text.target = "_blank";
    text.innerText = technology.name;

    techSpan.append(logo, text);
    technologiesElement.appendChild(techSpan);
}
