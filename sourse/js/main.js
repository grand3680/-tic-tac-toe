let selectedDiv; // пустая переменая
let number = 0;
var boxsises = document.getElementsByClassName("box");
let counting_wins_0 = 0;
let counting_wins_x = 0;

// список с выигрышными значениями
let arr = [
        [0, 1, 2], // правильные по горизонтали
        [3, 4, 5], // правильные по горизонтали
        [6, 7, 8], // правильные по горизонтали
        [0, 3, 6], // правильные по вертикали
        [1, 4, 7], // правильные по вертикали
        [2, 5, 8], // правильные по вертикали
        [0, 4, 8], // правильные на крест лежащие
        [2, 4, 6], // правильные на крест лежащие
    ]
    // делегирование 
document.querySelector("section").onclick = function(event) {
    let target = event.target; // где был клик?
    if (target.tagName != 'DIV') return; // не на DIV ? тогда не интересует

    if (target.innerHTML != "X" && target.innerHTML != "0") {
        highlight(target); // подсветить DIV     
    }
};

// просмотр пустых ячеек
function return_empty_boxes() {
    let empty_boxes = [];
    for (let i = 0; i < boxsises.length; i++) {
        if (boxsises[i].innerHTML == '') empty_boxes.push(i);
    }
    return empty_boxes;
}

// Функция Подсветки
function highlight(div) {
    check();
    if (return_empty_boxes().length > 0) {
        selectedDiv = div;
        document.querySelector("h1").textContent = "ходит - нолики";
        selectedDiv.textContent = "X";
        check();
        // бот Нолики с X
        for (let i = 0; i < arr.length; i++) {
            if (boxsises[arr[i][0]].innerHTML == "0" && boxsises[arr[i][1]].innerHTML == "0" && boxsises[arr[i][2]].innerHTML == "") {
                boxsises[arr[i][2]].style.color = 'red';
                boxsises[arr[i][2]].textContent = "0";
                document.querySelector("h1").textContent = "ходит - крестики";
                check();
                return false;
            }

            if (boxsises[arr[i][0]].innerHTML == "0" && boxsises[arr[i][2]].innerHTML == "0" && boxsises[arr[i][1]].innerHTML == "") {
                boxsises[arr[i][1]].style.color = 'red';
                boxsises[arr[i][1]].textContent = "0";
                document.querySelector("h1").textContent = "ходит - крестики";
                check();
                return false;
            }

            if (boxsises[arr[i][1]].innerHTML == "0" && boxsises[arr[i][2]].innerHTML == "0" && boxsises[arr[i][0]].innerHTML == "") {
                boxsises[arr[i][0]].style.color = 'red';
                boxsises[arr[i][0]].textContent = "0";
                document.querySelector("h1").textContent = "ходит - крестики";
                check();
                return false;
            }
        }

        for (let i = 0; i < arr.length; i++) {
            if (boxsises[arr[i][0]].innerHTML == "X" && boxsises[arr[i][1]].innerHTML == "X" && boxsises[arr[i][2]].innerHTML == "") {
                boxsises[arr[i][2]].style.color = 'red';
                boxsises[arr[i][2]].textContent = "0";
                document.querySelector("h1").textContent = "ходит - крестики";
                check();
                return false;
            }

            if (boxsises[arr[i][0]].innerHTML == "X" && boxsises[arr[i][2]].innerHTML == "X" && boxsises[arr[i][1]].innerHTML == "") {
                boxsises[arr[i][1]].style.color = 'red';
                boxsises[arr[i][1]].textContent = "0";
                document.querySelector("h1").textContent = "ходит - крестики";
                check();
                return false;
            }

            if (boxsises[arr[i][1]].innerHTML == "X" && boxsises[arr[i][2]].innerHTML == "X" && boxsises[arr[i][0]].innerHTML == "") {
                boxsises[arr[i][0]].style.color = 'red';
                boxsises[arr[i][0]].textContent = "0";
                document.querySelector("h1").textContent = "ходит - крестики";
                check();
                return false;
            }
        }


        // поставление на рандом в пустую клетку ( а так-же проверка если нет пустых клеток проверять результат)
        if (return_empty_boxes().length > 0) {
            let empty_boxes = return_empty_boxes();
            let rand = empty_boxes[Math.floor(Math.random() * empty_boxes.length)];
            boxsises[rand].innerHTML = '0';
            boxsises[rand].style.color = 'red';
            check();
            return false;
        } else {
            check();
            return false
        }


    } else {
        check();
        return false;
    }


}


// функция убора всех значени в полях
function clearning() {
    let boxs = document.getElementsByClassName("box");
    document.getElementById("__Hiden__").classList.add('hiden');
    for (let i = 0; i < boxs.length; i++) {
        boxs[i].textContent = "";
        boxs[i].style.color = 'blue';
    }
}

function check() {
    let boxsis = document.getElementsByClassName("box");

    // цикл проверки
    for (let i = 0; i < arr.length; i++) {
        if (
            // Берём список 1 и проверяем 3 значение если верны значит ок ( для крестков )
            boxsis[arr[i][0]].innerHTML == "X" &&
            boxsis[arr[i][1]].innerHTML == "X" &&
            boxsis[arr[i][2]].innerHTML == "X"
        ) {
            document.getElementById("__Hiden__").classList.remove('hiden');
            document.querySelector("h6").textContent = "крестики победили";
            counting_wins_x += 1;
            document.querySelector("h4").textContent = "побед крестика - " + counting_wins_x;
            return false;
        } else if (
            // Берём список 1 и проверяем 3 значение если верны значит ок ( для ноликов )
            boxsis[arr[i][0]].innerHTML == "0" &&
            boxsis[arr[i][1]].innerHTML == "0" &&
            boxsis[arr[i][2]].innerHTML == "0"
        ) {
            document.getElementById("__Hiden__").classList.remove('hiden');
            document.querySelector("h6").textContent = "Нолики победили";
            counting_wins_0 += 1;
            document.querySelector("h5").textContent = "побед нолика - " + counting_wins_0;
            return false;

        } else {
            // проверка на ничью ( если каждая клетка не ровна нулю)
            if (
                boxsis[0].innerHTML != "" &&
                boxsis[1].innerHTML != "" &&
                boxsis[2].innerHTML != "" &&
                boxsis[3].innerHTML != "" &&
                boxsis[4].innerHTML != "" &&
                boxsis[5].innerHTML != "" &&
                boxsis[6].innerHTML != "" &&
                boxsis[7].innerHTML != "" &&
                boxsis[8].innerHTML != ""
            ) {
                document.getElementById("__Hiden__").classList.remove('hiden');
                document.querySelector("h6").textContent = "Ничья";
                return false;
            }

        }
    }
}