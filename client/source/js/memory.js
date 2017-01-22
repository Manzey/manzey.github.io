/**
 * Created by manze on 2017-01-14.
 */
module.exports = function(rows, cols, container) {
    var i;
    var a;
    var tiles = [];
    var turn1;
    var turn2;
    var lastTile;
    var triesLeft = 20;
    var pairCount = 0;
    var TL = document.querySelector("#triesLeft");

    tiles = getPictureArray(rows, cols);
    container = document.getElementById(container);
    var template = document.querySelectorAll("#memory template")[0].content.firstElementChild;

    tiles.forEach(function(tile, index) {

        a = document.importNode(template, true);

        container.appendChild(a);

        a.addEventListener("click", function(event) {
            var img = event.target.nodeName === "IMG" ? event.target : event.target.firstElementChild;
            turnBrick(tile, index, img);
        });

        if ((index + 1) % cols === 0) {
            container.appendChild(document.createElement("br"));
        }
    });

    function turnBrick(tile, index, img) {

        img.src = "image/memory/" + tile + ".png";

        if (!turn1) {
            turn1 = img;
            lastTile = tile;
            return;
        } else {
            if (img === turn1) {return;}

            turn2 = img;

            if (tile === lastTile) {
                console.log("Pair!");
                pairCount += 1;
                console.log(pairCount);
                if (pairCount === 8) {
                    document.querySelector("#memory").classList.add("blockRemove");
                    TL.classList.add("blockRemove");
                    document.querySelector("#memWin").classList.add("blockAdd");
                }
                turn1.parentNode.classList.add("removed");
                turn2.parentNode.classList.add("removed");

                turn1 = null;
                turn2 = null;
            } else {
                window.setTimeout(function() {
                    turn1.src = "image/memory/0.png";
                    turn2.src = "image/memory/0.png";

                    triesLeft -= 1;
                    TL.innerHTML = "Tries left: " + triesLeft;
                    console.log(triesLeft);

                    if (triesLeft === 0) {
                        document.querySelector("#memory").classList.add("blockRemove");
                        TL.classList.add("blockRemove");
                        document.querySelector("#memLose").classList.add("blockAdd");
                    }

                    turn1 = null;
                    turn2 = null;
                }, 500);
            }

        }
    }

    function getPictureArray(rows, cols) {
        var i;
        var arr = [];
        for (i = 1; i <= (rows * cols) / 2; i += 1) {
            arr.push(i);
            arr.push(i);
        }

        for (i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }

        return arr;
    }
};
