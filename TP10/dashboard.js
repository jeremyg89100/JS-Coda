// http://13.38.137.68:8000/api/listPlayers pour accéder avec Postman
//  http://13.38.137.68:8000/api/stats?name=TheWall Pour accéder à mon perso

// Création d'un input
const serverInputUrl = document.createElement("input");
serverInputUrl.type = "text";
serverInputUrl.id = "serverInputUrl";
serverInputUrl.value = "http://localhost:8000/";
const dashboard = document.querySelector(".dashboard");
dashboard.appendChild(serverInputUrl);

// Création d'un bouton
const buttonServer = document.createElement("button");
buttonServer.id = "buttonServer";
buttonServer.textContent = "Entrez";
dashboard.appendChild(buttonServer);

function getUrl() {
  const input = document.querySelector("#serverInputUrl");
  return (input ? input.value.trim() : "http://localhost:8000/").replace(
    /\/$/,
    "",
  );
}

// Écouteur d'affichage des tableaux
document.querySelector("#buttonServer").addEventListener("click", async () => {
  await loadRanking();
  await getPlayer();
});

// Récupère la liste des joueurs
async function loadPlayers() {
  try {
    const url = `${getUrl()}/api/listPlayers`;
    const response = await fetch(url);

    if (!response.ok) throw new Error(`HTTP error : ${response.status}`);

    const listPlayers = await response.json();
    return listPlayers;
  } catch (error) {
    console.error("Erreur loadPlayers", error);
    return [];
  }
}

// Récupère les stats de chaque joueurs
async function loadPlayerStats(name) {
  try {
    const url = `${getUrl()}/api/stats?name=${encodeURIComponent(name)}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const player = await response.json();
    return player;
  } catch (error) {
    console.error("Erreur loadPlayerStats", error);
    return null;
  }
}

// Variable globale pour tracker le tri actuel et le joueur sélectionné
let currentSort = "gamesPlayed";
let selectedPlayerName = null;

async function loadRanking(sortBy = currentSort) {
  // Permet de garder le surlignage même après le refresh
  currentSort = sortBy;

  let listPlayers = await loadPlayers();
  let rankingPlayers = listPlayers.slice();

  // Tri les tableaux en fonction du choix de l'utilisateur
  if (sortBy === "kills") {
    rankingPlayers.sort((a, b) => b.totalKills - a.totalKills);
  } else if (sortBy === "deaths") {
    rankingPlayers.sort((a, b) => b.totalDeaths - a.totalDeaths);
  } else if (sortBy === "ratio") {
    rankingPlayers.sort((a, b) => b.kdRatio - a.kdRatio);
  } else if (sortBy === "gamesPlayed") {
    rankingPlayers.sort((a, b) => b.gamesPlayed - a.gamesPlayed);
  }

  const arrayRanking = document.querySelector("#rankingTable tbody");
  // Crée un tableau vide pour empêcher une erreur au refresh
  arrayRanking.innerHTML = "";

  // Crée des colonnes pour chaque donnée présente dans le tableau des joueurs
  rankingPlayers.forEach((player, index) => {
    const row = document.createElement("tr");
    row.setAttribute("data-player-name", player.name);

    // Réapplique la classe active si c'est le joueur sélectionné
    if (player.name === selectedPlayerName) {
      row.classList.add("active-player");
    }

    // Ajout des données des persos
    row.innerHTML = `<td>${index + 1}</td>
    <td>${player.name}</td>
    <td>${player.gamesPlayed}</td>
    <td>${player.totalKills}</td>
    <td>${player.totalDeaths}</td>
    <td>${player.kdRatio}</td>`;
    arrayRanking.appendChild(row);
  });
}

// Les écouteurs pour mettre à jour currentSort
document
  .querySelector("#kills")
  .addEventListener("click", () => loadRanking("kills"));
document
  .querySelector("#death")
  .addEventListener("click", () => loadRanking("deaths"));
document
  .querySelector("#ratio")
  .addEventListener("click", () => loadRanking("ratio"));
document
  .querySelector("#gamePlayed")
  .addEventListener("click", () => loadRanking("gamesPlayed"));

async function getPlayer() {
  // Récupère la liste des joueurs
  let listPlayers = await loadPlayers();
  const getListPlayer = document.querySelector("#listPlayers");
  getListPlayer.innerHTML = "";

  // Crée un bouton avec le nom de chaque joueur
  listPlayers.forEach((player) => {
    const button = document.createElement("button");
    button.textContent = player.name;
    button.className = "buttonsPlayersName";

    button.addEventListener("click", async () => {
      selectedPlayerName = player.name;

      // Appel de l'API pour les stats des joueurs
      const stats = await loadPlayerStats(player.name);
      if (!stats) return;

      let playerStatsDiv = document.querySelector("#playerStats");

      //Création de la div si elle n'existe pas
      if (!playerStatsDiv) {
        playerStatsDiv = document.createElement("div");
        playerStatsDiv.id = "playerStats";
      }
      // Ajout d'un tableau des stats de joueurs au clic
      playerStatsDiv.innerHTML = `
    <h3>${stats.name}</h3>
    <p>Parties jouées: ${stats.gamesPlayed}</p>
    <p>Kills: ${stats.totalKills}</p>
    <p>Morts: ${stats.totalDeaths}</p>
    <p>Ratio K/D: ${stats.kdRatio}</p>
    <p>Rang dernière partie: ${stats.lastGameRank}</p>
    <p>Classement global: ${stats.overallRanking}</p>
  `;
      // Place le tableau après les boutons de nom de joueur
      document.querySelector("#listPlayers").after(playerStatsDiv);

      // Retire l'ancien surlignage
      document.querySelectorAll("#rankingTable tbody tr").forEach((row) => {
        row.classList.remove("active-player");
      });

      // Ajoute le surlignage sur la nouvelle ligne
      const playerRow = document.querySelector(
        `#rankingTable tbody tr[data-player-name="${player.name}"]`,
      );
      if (playerRow) {
        playerRow.classList.add("active-player");
        playerRow.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });

    getListPlayer.appendChild(button);
  });
}

// Actualise
setInterval(() => {
  loadRanking();
}, 5000);
