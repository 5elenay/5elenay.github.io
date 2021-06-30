"use strict";

var OPCODES = {
    INFO: 0,
    HELLO: 1,
    INIT: 2,
    HEARTBEAT: 3,
};

var elements = {
    container: document.getElementsByClassName("container")[0],
    username: document.getElementById("discord-username"),
    discriminator: document.getElementById("discord-disc"),
    avatar: document.getElementById("discord-avatar"),
    card: document.getElementById("profile-card"),
};

var projects = [
    {
        name: "Htmotor",
        description:
            "HTML Template engine for python. Supports XSS preventation and many more!",
        link: "https://github.com/5elenay/htmotor",
    },
    {
        name: "Hyaline",
        description:
            "Hyaline is a discord api wrapper for python. Uses latest (v9) gateway version and supports cache system.",
        link: "https://github.com/5elenay/hyaline",
    },
    {
        name: "Postgrey",
        description:
            "Simple, Fast, Async & ORM PostgreSQL database client based on Asyncpg for Python.",
        link: "https://github.com/5elenay/postgrey",
    },
    {
        name: "Floppa P.L.",
        description:
            "A programming language that created for fun. Works like brainf*ck. But has more commands.",
        link: "https://github.com/5elenay/floppa-programming-language",
    },
    {
        name: "Datagoose",
        description:
            "Fastest JSON database for Python. Supports encryption and has tons of functions.",
        link: "https://github.com/5elenay/datagoose",
    },
    {
        name: "Pewn",
        description: "Another Python library for downloading files from URL.",
        link: "https://github.com/5elenay/pewn",
    },
    {
        name: "Hawser",
        description:
            "Hawser is a Lanyard API Wrapper for Python. Supports both REST and WebSocket methods.",
        link: "https://github.com/5elenay/hawser",
    },
    {
        name: "Scupt",
        description: "An uptime service for websites. (Dead Project.)",
        link: "https://scupt.ga/",
    },
    {
        name: "Acebin",
        description: "A bin that supports over 40+ language.",
        link: "https://acebin.ga/",
    },
];

var using = [
    {
        "background-color": "#3F7CAD",
        color: "#FFDF5A",
        name: "Python",
    },
    {
        "background-color": "#FCDC00",
        color: "#000",
        name: "JavaScript",
    },
    {
        "background-color": "#967AB4",
        color: "#fff",
        name: "Elixir",
    },
    {
        "background-color": "#7FD5EA",
        color: "#fff",
        name: "Golang",
    },
    {
        "background-color": "#F1662A",
        color: "#fff",
        name: "HTML",
    },
    {
        "background-color": "#33A9DC",
        color: "#fff",
        name: "CSS",
    },
    {
        "background-color": "#CF649A",
        color: "#fff",
        name: "SCSS",
    },
    {
        "background-color": "#3EAF7C",
        color: "#30435A",
        name: "VueJS",
    },
    {
        "background-color": "#FFF",
        color: "#161E2E",
        name: "Deno",
    },
    {
        "background-color": "#FFF",
        color: "#13AA52",
        name: "MongoDB",
    },
];

var lanyard = new WebSocket("wss://api.lanyard.rest/socket");

// On Message
lanyard.onmessage = function (_ref) {
    var data = _ref.data;

    var parsedData = JSON.parse(data);

    if (parsedData.op == OPCODES.HELLO) {
        // Identify
        lanyard.send(
            JSON.stringify({
                op: OPCODES.INIT,
                d: {
                    subscribe_to_id: "793467584820281346",
                },
            })
        );

        // Interval
        setInterval(function () {
            lanyard.send(
                JSON.stringify({
                    op: OPCODES.HEARTBEAT,
                })
            );
        }, parsedData.d.heartbeat_interval);
    } else if (parsedData.op == OPCODES.INFO) {
        var statusColors = {
            online: "#2afa62",
            offline: "#ddd",
            idle: "#eddf47",
            dnd: "#ff3640",
        };

        if (parsedData.t == "INIT_STATE") {
            var user = parsedData.d;

            elements.card.style.opacity = "1";
            elements.username.innerText = user.discord_user.username;
            elements.discriminator.innerText =
                "#" + user.discord_user.discriminator;

            elements.avatar.src =
                "https://cdn.discordapp.com/avatars/793467584820281346/" +
                user.discord_user.avatar +
                ".png?size=128";
            elements.avatar.style.border =
                "3px solid " + statusColors[user.discord_status];

            if (
                !elements.status &&
                user.activities.filter(function (i) {
                    return i.type == 4;
                }).length > 0
            ) {
                elements.status = document.createElement("p");
                elements.status.innerText =
                    '"' +
                    user.activities.filter(function (i) {
                        return i.type == 4;
                    })[0].state +
                    '"';
                document.getElementById("profile-card").append(elements.status);
            }
        } else if (parsedData.t == "PRESENCE_UPDATE") {
            var filteredActivity = parsedData.d.activities.filter(function (i) {
                return i.type == 4;
            });

            if (elements.status && parsedData.d.activities.length == 0) {
                elements.status.remove();
                elements.status = undefined;
            } else if (!elements.status && filteredActivity.length > 0) {
                elements.status = document.createElement("p");
                elements.status.innerText =
                    '"' + filteredActivity[0].state + '"';
                document.getElementById("profile-card").append(elements.status);
            } else if (elements.status && filteredActivity.length > 0) {
                elements.status.innerText =
                    '"' + filteredActivity[0].state + '"';
            }

            elements.avatar.style.border =
                "3px solid " + statusColors[parsedData.d.discord_status];
        }
    }
};

// Clipboard
elements.username.onclick = function (e) {
    copyText("" + e.target.innerText + elements.discriminator.innerText);
};

// Copy Text
function copyText(text) {
    var el = document.createElement("input");
    el.style.position = "absolute";
    el.style.left = "-1000px";
    el.value = text;
    el.setAttribute("readonly", "");

    document.body.appendChild(el);
    el.select();

    document.execCommand("copy");
    document.body.removeChild(el);
}

// List Projects
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    var _loop = function _loop() {
        var project = _step.value;

        var projectList = document.getElementById("project-list");

        var newCard = document.createElement("div");
        newCard.className = "project-card";
        newCard.style.cursor = "pointer";

        newCard.onclick = function () {
            window.location.href = project.link;
        };

        var title = document.createElement("h1");
        title.innerText = project.name;
        newCard.append(title);

        var description = document.createElement("p");
        description.innerText = project.description;
        newCard.append(description);

        projectList.append(newCard);
    };

    for (
        var _iterator = projects[Symbol.iterator](), _step;
        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
        _iteratorNormalCompletion = true
    ) {
        _loop();
    }

// List Tools and Languages
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally {
    try {
        if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
        }
    } finally {
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}

var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
    for (
        var _iterator2 = using[Symbol.iterator](), _step2;
        !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
        _iteratorNormalCompletion2 = true
    ) {
        var u = _step2.value;

        var usingList = document.getElementById("using-list");

        var newCard = document.createElement("a");
        newCard.style.backgroundColor = u["background-color"];
        newCard.style.color = u.color;
        newCard.innerText = u.name;

        usingList.append(newCard);
    }
} catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
} finally {
    try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
        }
    } finally {
        if (_didIteratorError2) {
            throw _iteratorError2;
        }
    }
}
