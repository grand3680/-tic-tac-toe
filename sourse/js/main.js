let selectedDiv; // empty variable
let number = 0;
var boxsises = document.getElementsByClassName("box");
let counting_wins_0 = 0;
let counting_wins_x = 0;

// List win pos
let arr = [
        [0, 1, 2], // horizontal right
        [3, 4, 5], // horizontal right
        [6, 7, 8], // horizontal right
        [0, 3, 6], // vertically correct
        [1, 4, 7], // vertically correct
        [2, 5, 8], // vertically correct
        [0, 4, 8], // right on the cross lying
        [2, 4, 6], // right on the cross lying
    ]

// delegation
document.querySelector("section").onclick = function(event) {
    let target = event.target; // where was the click?
    if (target.tagName != 'DIV') return; // not on DIV ? then not interested

    if (target.innerHTML != "X" && target.innerHTML != "0") {
        highlight(target); // highlight the DIV     
    }
};

// view empty cells
function return_empty_boxes() {
    let empty_boxes = [];
    for (let i = 0; i < boxsises.length; i++) {
        if (boxsises[i].innerHTML == '') empty_boxes.push(i);
    }
    return empty_boxes;
}

// Backlight function
function highlight(div) {
    check();
    if (return_empty_boxes().length > 0) {
        selectedDiv = div;
        document.querySelector("h1").textContent = "walks - zeros";
        selectedDiv.textContent = "X";
        check();
        // bat zero
        for (let i = 0; i < arr.length; i++) {
            if (boxsises[arr[i][0]].innerHTML == "0" && boxsises[arr[i][1]].innerHTML == "0" && boxsises[arr[i][2]].innerHTML == "") {
                boxsises[arr[i][2]].style.color = 'red';
                boxsises[arr[i][2]].textContent = "0";
                document.querySelector("h1").textContent = "walks - crosses";
                check();
                return false;
            }

            if (boxsises[arr[i][0]].innerHTML == "0" && boxsises[arr[i][2]].innerHTML == "0" && boxsises[arr[i][1]].innerHTML == "") {
                boxsises[arr[i][1]].style.color = 'red';
                boxsises[arr[i][1]].textContent = "0";
                document.querySelector("h1").textContent = "walks - crosses";
                check();
                return false;
            }

            if (boxsises[arr[i][1]].innerHTML == "0" && boxsises[arr[i][2]].innerHTML == "0" && boxsises[arr[i][0]].innerHTML == "") {
                boxsises[arr[i][0]].style.color = 'red';
                boxsises[arr[i][0]].textContent = "0";
                document.querySelector("h1").textContent = "walks - crosses";
                check();
                return false;
            }
        }

        for (let i = 0; i < arr.length; i++) {
            if (boxsises[arr[i][0]].innerHTML == "X" && boxsises[arr[i][1]].innerHTML == "X" && boxsises[arr[i][2]].innerHTML == "") {
                boxsises[arr[i][2]].style.color = 'red';
                boxsises[arr[i][2]].textContent = "0";
                document.querySelector("h1").textContent = "walks - crosses";
                check();
                return false;
            }

            if (boxsises[arr[i][0]].innerHTML == "X" && boxsises[arr[i][2]].innerHTML == "X" && boxsises[arr[i][1]].innerHTML == "") {
                boxsises[arr[i][1]].style.color = 'red';
                boxsises[arr[i][1]].textContent = "0";
                document.querySelector("h1").textContent = "walks - crosses";
                check();
                return false;
            }

            if (boxsises[arr[i][1]].innerHTML == "X" && boxsises[arr[i][2]].innerHTML == "X" && boxsises[arr[i][0]].innerHTML == "") {
                boxsises[arr[i][0]].style.color = 'red';
                boxsises[arr[i][0]].textContent = "0";
                document.querySelector("h1").textContent = "v";
                check();
                return false;
            }
        }


        // put it to random in an empty cell (and also check if there are no empty cells to check the result)
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


// function of removing all values in the fields
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

    // check cycle
    for (let i = 0; i < arr.length; i++) {
        if (
            // we take list 1 and check the 3 values if they are true then ok (for crosses)
            boxsis[arr[i][0]].innerHTML == "X" &&
            boxsis[arr[i][1]].innerHTML == "X" &&
            boxsis[arr[i][2]].innerHTML == "X"
        ) {
            document.getElementById("__Hiden__").classList.remove('hiden');
            document.querySelector("h6").textContent = "The crosses have won";
            counting_wins_x += 1;
            document.querySelector("h4").textContent = "cross victories - " + counting_wins_x;
            return false;
        } else if (
            // we take list 1 and check the 3 values if they are true then ok (for zeros)
            boxsis[arr[i][0]].innerHTML == "0" &&
            boxsis[arr[i][1]].innerHTML == "0" &&
            boxsis[arr[i][2]].innerHTML == "0"
        ) {
            document.getElementById("__Hiden__").classList.remove('hiden');
            document.querySelector("h6").textContent = "crosses win";
            counting_wins_0 += 1;
            document.querySelector("h5").textContent = "zero wins - " + counting_wins_0;
            return false;

        } else {
            // check for a tie (if every cell is not equal to zero)
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
                document.querySelector("h6").textContent = "Tie";
                return false;
            }

        }
    }
}
