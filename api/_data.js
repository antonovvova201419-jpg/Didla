// api/_data.js

// Храним данные прямо в памяти процесса
// Пока сервер "горячий", данные сохраняются.
let players = [];

export function getPlayers() {
    return players;
}

export function addPlayer(player) {
    players.push(player);
    // Сортируем сразу
    players.sort((a, b) => b.cups - a.cups);
    return player;
}

export function findPlayer(cleanNick) {
    return players.find(p => p.cleanNick === cleanNick);
}

export function updatePlayerCups(cleanNick, cupsToAdd) {
    const player = findPlayer(cleanNick);
    if (player) {
        player.cups += cupsToAdd;
        player.games = (player.games || 0) + 1;
        player.lastPlayed = new Date().toISOString();
        // Пересортировка
        players.sort((a, b) => b.cups - a.cups);
        return player;
    }
    return null;
}