export function createField(matrix) {
    const gameElement = document.createElement('div');
    gameElement.setAttribute("class", "flex justify-content-center");
    gameElement.setAttribute("class", "sapper");

    for (let y = 0; y < matrix.length; y++){
        const rowElement = document.createElement('div')
        rowElement.classList.add('row');

        for (let x = 0; x < matrix[y].length; x++){
            const tile = matrix[y][x]
            const imgElement = document.createElement('img');
            imgElement.draggable = false;
            imgElement.setAttribute('data-tile-id', tile.id);
            rowElement.append(imgElement)

            if (tile.flag){
                imgElement.src = 'images/flag.png';
                continue
            }
            if (!tile.show){
                imgElement.src = 'images/none.png'
                continue
            }
            if (tile.mine){
                imgElement.src = 'images/bomb.jpg'
                continue
            }
            if (tile.number){
                imgElement.src = 'images/number' + tile.number + '.png'
                continue
            }

            imgElement.src = 'images/free.png'
        }

        gameElement.append(rowElement);
    }

    return gameElement
}
