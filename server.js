const express = require("express");
const app = express();
const port = 4000;

const games = [
    {
        id: 1,
        image: {
            src: "https://www.pokemon.com/static-assets/app/static3/img/og-default-image.jpeg",
            alt: "pokemon",
        },
        company: "Nintendo",
        title: "Pokemon",
    },
    {
        id: 2,
        image: {
            src: "https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000063714/276a412988e07c4d55a2996c6d38abb408b464413b2dfeb44d2aa460b9f622e1",
            alt: "Link",
        },
        company: "Nintendo",
        title: "The Legend of Zelda",
    },
    {
        id: 3,
        image: {
            src: "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000010192/f2aceaa07354abfa1652dbfb5acede2f4b2844db3c37780d538020f51814d510",
            alt: "Fortnite",
        },
        company: "Epic Games",
        title: "Fornite Battle Royale",
    },
    {
        id: 4,
        image: {
            src: "https://upload.wikimedia.org/wikipedia/en/0/01/Call_of_Duty_Warzone_cover.png",
            alt: "CoD",
        },
        company: "Activision",
        title: "Call of Duty: Warzone",
    },
    {
        id: 5,
        image: {
            src: "https://upload.wikimedia.org/wikipedia/en/thumb/d/db/Apex_legends_cover.jpg/220px-Apex_legends_cover.jpg",
            alt: "Apex Legends",
        },
        company: "Electronic Arts (EA)",
        title: "Apex Legends",
    },
    {
        id: 6,
        image: {
            src: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/01/super-mario-new-game-rumors.jpg",
            alt: "Mario",
        },
        company: "Nintendo",
        title: "Super Mario",
    },
    {
        id: 7,
        image: {
            src: "https://cdn.arstechnica.net/wp-content/uploads/2020/04/valorant-listing-800x450.jpg",
            alt: "Valorant",
        },
        company: "Riot Games",
        title: "Valorant",
    },
    {
        id: 8,
        image: {
            src: "https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/LOL_2560x1440-98749e0d718e82d27a084941939bc9d3",
            alt: "LoL",
        },
        company: "Riot Games",
        title: "League of Legends",
    },
    {
        id: 9,
        image: {
            src: "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota2_social.jpg",
            alt: "Dota",
        },
        company: "Valve Corporation",
        title: "Dota 2",
    },
    {
        id: 10,
        image: {
            src: "https://i.ytimg.com/vi/GKXS_YA9s7E/maxresdefault.jpg",
            alt: "Overwatch 2",
        },
        company: "Blizzard",
        title: "Overwatch 2",
    },
];

app.use((req, res, next) => {
    console.log(`Request: ${req.method} ${req.originalUrl}`);
    next();
});

app.use(express.json());

function getNextIdFromCollection(collection) {
    if (collection.length === 0) 
        return 1;
    const lastRecord = collection[collection.length - 1];
    return lastRecord.id + 1;
}

app.get("/", (req, res) => {
    res.send("Welcome to the Job App Tracker API")
})

// List all games
app.get("/games", (req, res) => {
    res.send(games);
});

// Get a specific game
app.get("/games/:id", (req, res) => {
    const gameId = parseInt(req.params.id);
    const game = games.find((game) => game.id === gameId);
    if (game) {
        res.send(game);
    } else {
        res.status(404).send({ message: "Game not found" });
    }
});

// Create a new game
app.post("/games", (req, res) => {
    const newGame = {
        ...req.body,
        id: getNextIdFromCollection(games)
    };
    games.push(newGame);
    console.log("NewGame: ", newGame);
    res.status(201).send(newGame);
});

// Update a specific game
app.patch("/games/:id", (req, res) => {
    const gameId = parseInt(req.params.id, 10);
    const gameUpdates = req.body;
    const gameIndex = games.findIndex(g => g.id === gameId);

    if (gameIndex !== -1) {
        const originalGame = games[gameIndex];
        const updateGame = {
            ...originalGame,
            ...gameUpdates
        }
        games[gameIndex] = updateGame;
        res.send(updateGame);
    } else {
        res.status(404).send({ message: "Game not found" });
    }
});

// Delete a specific game
app.delete("/games/:id", (req, res) => {
    const gameId = parseInt(req.params.id, 10);
    const gameIndex = games.findIndex(g => g.id === gameId);
    if (gameIndex !== -1) {
        games.splice(gameIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send({ message: "Game not found" });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})
