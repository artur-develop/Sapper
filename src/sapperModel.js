import {forEach} from "./spperController";

export function getMatrix (columns, rows) {
    const matrix = [];
    let idCounter = 1;

    for (let y = 0; y < rows; y++){
        const row = [];

        for (let x = 0; x < columns; x++){
            row.push({
                id: idCounter++,
                x,
                y,
                mine: false,
                number: 0,
                flag: false,
                show: false,
                left: false,
                right: false,
            });
        }
        matrix.push(row);
    }
    return matrix
}

export function getRandomFreeTile(matrix) {
    const freeTiles = []

    for (let y=0; y < matrix.length; y++){
        for (let x=0; x < matrix[y].length; x++){
            const tile = matrix[y][x]

            if (!tile.mine){
                freeTiles.push(tile);
            }
        }
    }

    const index = Math.floor(Math.random() * freeTiles.length);
    return freeTiles[index]
}

export function setRandomMine(matrix) {
    const tile = getRandomFreeTile(matrix);
    tile.mine = true;

    const tiles = getAroundTiles(matrix, tile.x, tile.y)

    for (const tile of tiles){
        tile.number++
    }
}

export function getTile(matrix, x, y) {
    if (!matrix[y] || !matrix[y][x]){
        return false
    }
    return matrix[y][x]
}

export function getAroundTiles(matrix, x, y) {
    const tiles = []

    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <=1; dy++) {
            if (dx === 0 && dy === 0) {
                continue
            }

            const tile = getTile(matrix, x + dx, y + dy);

            if (tile) {
                tiles.push(tile);
            }
        }
    }

    return tiles
}

export function getTileById(matrix, id) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            const tile = matrix[y][x]

            if (tile.id === id) {
                return tile
            }
        }
    }

    return false
}

export function isWin(matrix) {
    const flags = [];
    const mines = [];

    forEach(matrix, tile => {
        if (tile.flag) {
            flags.push(tile);
        }
        if (tile.mine) {
            mines.push(tile);
        }
    });

    if (flags.length !== mines.length) {
        return false
    }

    forEach(matrix, tile => {
        const defused = [];

        if (tile.flag && tile.mine) {
            defused.push(tile);
        }

        if (defused.length !== mines.length) {
            return false
        }

    });


    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix.length; x++) {
            const tile = matrix[y][x];

            if (!tile.mine && !tile.show) {
                return false
            }
        }
    }

    return true
}



