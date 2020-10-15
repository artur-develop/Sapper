import {getTileById, getAroundTiles, getTile, isWin} from "./sapperModel";
import {createField} from "./sappecView";
import {matrix} from "./index";

export function mousedownHandler(event) {
    const {left, right, tile} = getInfo(event);

    if (left) {
        tile.left = true
    }

    if (right) {
        tile.right = true;
    }

    update()
}

export function mouseupHandler(event) {
    const {left, right, tile} = getInfo(event);
    const leftMouse = tile.left && !right;
    const rightMouse = tile.right && !left;

    if (left) {
        tile.left = false;
    }

    if (right) {
        tile.right = false;
    }

    if (leftMouse) {
        leftHandler(tile);
    }

    else if (rightMouse) {
        rightHandler(tile);
    }

    update()

    //console.log(event.which)
}

// function mouseleaveHandler(event) {
//     const info = getInfo(event);
//
//     info.tile.left = false;
//     info.tile.right = false;
//
//     update()
// }

export function getInfo(event) {
    const element = event.target;
    const tileId = parseInt(element.getAttribute('data-tile-id'));

    return{
        left: event.which === 1,
        right: event.which === 3,
        tile: getTileById(matrix, tileId),
    }
}


export function leftHandler(tile) {
    if (tile.show || tile.flag) {
        return
    }

    if (tile.mine) {
        alert('You lose :( New game?')
        document.location.reload();
    }

    tile.show = true;

    chainReaction(matrix, tile.x, tile.y)
}

export function rightHandler(tile) {
    if (!tile.show){
        tile.flag = !tile.flag;
    }
}

export function update() {
    const gameElement = createField(matrix);

    console.log(gameElement);

    const appElement = document.getElementById('#app');

    appElement.innerHTML = '';
    appElement.append(gameElement);

    appElement
        .querySelectorAll('img')
        .forEach(imgElement => {
            imgElement.addEventListener('mousedown', mousedownHandler)
            imgElement.addEventListener('mouseup', mouseupHandler)
            //imgElement.addEventListener("mouseleave", mousedownHandler)
        })

    if (isWin(matrix)) {
        alert('Congratulation! You the Winner!!! (^_^)');
        document.location.reload();
    }
}

export function chainReaction(matrix, x, y) {
    const tile = getTile(matrix, x, y);

    if (tile.number || tile.mine || tile.flag) {
        return
    }

    forEach(matrix,x => x._marked = false);

    tile._marked = true;

    let flag = true
    while (flag) {
        flag = false;

        for (let y = 0; y < matrix.length; y++) {
            for (let x = 0; x < matrix.length; x++) {
                const tile = matrix[y][x];

                if (!tile._marked || tile.number){
                    continue
                }

                const tiles = getAroundTiles(matrix, x, y);

                for (const tile of tiles) {
                    if (tile._marked) {
                        continue
                    }

                    if (!tile.mine && !tile.flag) {
                        tile._marked = true;
                        flag = true;
                    }
                }

            }
        }
    }

    forEach(matrix,x => {
        if (x._marked) {
            x.show = true;
        }

        delete x._marked;
    })
}

export function forEach (matrix, handler) {
    for (let y = 0; y < matrix.length; y++){
        for (let x = 0; x < matrix[y].length; x++) {
            handler(matrix[y][x])
        }
    }
}