import 'bootstrap/dist/css/bootstrap.min.css';
import {getMatrix} from "./sapperModel";
import {setRandomMine} from "./sapperModel";
import {update} from "./spperController";

document.oncontextmenu = function () { return false };


export let matrix = getMatrix(10, 10);


export function init(columns, rows, mines) {
    matrix = getMatrix(columns, rows)

    for (let i = 0; i < mines; i++){
        setRandomMine(matrix);
    }
    update()
}

for (let i = 0; i < 5; i++){
    setRandomMine(matrix);
}


document
    .querySelector('button')
    .addEventListener('click', () => {

        let inputValue = document.getElementById('boardSize');

        if (inputValue.value < 2 || inputValue.value > 20) {
            alert('Wrong number! From 2 to 20');
            document.location.reload();ч
        }

        let minesNumber = document.getElementsByName('difficulty');

        let col = inputValue.value;
        let rw = inputValue.value;
        let min = 0;

        for (let i = 0, length = minesNumber.length; i < length; i++) {
            if (minesNumber[i].checked) {
                if (minesNumber[i].value === 'easy') {
                    min = Math.round((col * rw) * 0.1)
                } else if (minesNumber[i].value === 'mid') {
                    min = Math.round((col * rw) * 0.3);
                } else if (minesNumber[i].value === 'rare') {
                    min = Math.round((col * rw) * 0.5);
                }
                break;
            }
        }

        console.log(min);

        init(col, rw, min);
    })

