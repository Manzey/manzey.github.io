(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by manze on 2017-01-22.
 */

module.exports = function() {
    var Drag = require("./dragging.js");
    var Memory = require("./memory.js");
    var HighLow = require("./highlow.js");
    var Chat = require("./chat.js");

    var memIcon = document.querySelector("#memIcon");
    var memory = document.querySelector("#memoryTemp");
    var chatIcon = document.querySelector("#chatIcon");
    var chat = document.querySelector("#chatTemp");
    var chatWindow = chat.content.querySelector(".chatWinDiv");
    var chatWindow2 = chat.content.querySelector(".chatWinDivHead");
    var chatCount = 0;
    var highlowIcon = document.querySelector("#highlowIcon");
    var highlow = document.querySelector("#highlowTemp");
    var desktop = document.querySelector("#desktop");

    chatIcon.addEventListener("click", function() {
        var chatID = chatWindow.getAttribute("id");
        var chatHead = chatWindow2.getAttribute("id");
        desktop.appendChild(chat.content.querySelector("#" + chatID));
        console.log(chatID + " " + chatHead);
        //new Chat();
        new Drag(chatID, chatHead);
        chatCount += 1;
        chatWindow.setAttribute("id", ((chatWindow.getAttribute("id") + chatCount)));
        chatWindow2.setAttribute("id", ((chatWindow2.getAttribute("id") + chatCount)));

    });

};

},{"./chat.js":3,"./dragging.js":4,"./highlow.js":5,"./memory.js":6}],2:[function(require,module,exports){
/**
 * Created by manze on 2017-01-01.
 */
var Drag = require("./dragging.js");
var Memory = require("./memory.js");
var HighLow = require("./highlow.js");
var Chat = require("./chat.js");
var Desktop = require("./Desktop.js");



new Desktop();

//new Chat();

//new HighLow();

},{"./Desktop.js":1,"./chat.js":3,"./dragging.js":4,"./highlow.js":5,"./memory.js":6}],3:[function(require,module,exports){
/**
 * Created by manze on 2017-01-19.
 */

module.exports = function Chat() {
    var temp = document.querySelector("#chatTemp");
    var userNameInput = temp.querySelector("input[name='username']");
    var serverInput = temp.querySelector("input[name='server']");
    var channelInput = temp.querySelector("input[name='channel']");
    var socket = new WebSocket("ws://" + serverInput.value);
    var api = "eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd";
    var username = "";
    var message = "";
    var messageBox = document.querySelector("#message");
    var inputField = document.querySelector("#sendinput");

    //Settings start
    if (localStorage.getItem("username")) {
        document.querySelector("#infoform").classList.add("class", "blockRemove");
        document.querySelector("#chat").classList.add("class", "blockAdd");
        userNameInput.value = localStorage.getItem("username");
        channelInput.value = localStorage.getItem("channel");
        serverInput.value = localStorage.getItem("server");
    }

    userNameInput.addEventListener("input", function() {
        if (userNameInput.value.length > 0 && serverInput.value.length > 0) {
            document.querySelector("#userNameSend").removeAttribute("disabled");
        }
    });

    serverInput.addEventListener("input", function() {
        if (userNameInput.value.length > 0 && serverInput.value.length > 0) {
            document.querySelector("#userNameSend").removeAttribute("disabled");
        }
    });

    document.querySelector("#userNameSend").addEventListener("click", function(e) {
        if (e) {
            e.preventDefault();
        }
        localStorage.setItem("username", userNameInput.value);
        localStorage.setItem("server", serverInput.value);
        localStorage.setItem("channel", channelInput.value);
        document.querySelector("#infoform").classList.add("class", "blockRemove");
        document.querySelector("#chat").classList.add("class", "blockAdd");
    });
    //Settings end

    inputField.addEventListener("input", function() {
        if (document.querySelector("#sendinput").value.length > 0) {
            document.querySelector("#send").removeAttribute("disabled");
        }
    });

    socket.onmessage = function(event) {
        var serverMessage = JSON.parse(event.data);
        console.log(event.data);
        if (serverMessage.channel === channelInput.value) {

            if (serverMessage.type === "message") {
                username = (serverMessage.username);
                message = (serverMessage.data);

                //Append the message
                var chatMessage = document.createTextNode(username + ": " + message);
                messageBox.appendChild(chatMessage);
                messageBox.appendChild(document.createElement("br"));
            }

        }

        document.querySelector("#send").addEventListener("click", function(e) {
            if (e) {
                e.preventDefault();
            }

            var dataSent = document.querySelector("#sendinput").value;
            var json;
            if (dataSent.length > 0) {
                json = {
                    type: "message",
                    data: dataSent,
                    username: userNameInput.value,
                    channel: channelInput.value,
                    key: api};
            }

            socket.send(JSON.stringify(json));
            document.querySelector("#send").setAttribute("disabled", "disabled");
            document.querySelector("form").reset();
        });
    };

};

},{}],4:[function(require,module,exports){
//Found a great solution http://jsfiddle.net/f5EMT/1/
//Adjusted it to work for me, tried making one on my own, but had issues with moving the window by dragging at the top.
//Instead it dragged everywhere.

function Drag(divv, divv2) {
    var mousePosition;
    var offset = [0,0];
    var isDown = false;

    var div = document.querySelector("#" + divv);
    var div2 = document.querySelector("#" + divv2);

    div2.addEventListener('mousedown', function(e) {
        isDown = true;
        offset = [
            div.offsetLeft - e.clientX - 8,
            div.offsetTop - e.clientY - 8
        ];
    }, true);

    document.addEventListener('mouseup', function() {
        isDown = false;
    }, true);

    document.addEventListener('mousemove', function(event) {
        event.preventDefault();
        if (isDown) {
            mousePosition = {

                x : event.clientX,
                y : event.clientY

            };
            div.style.left = (mousePosition.x + offset[0]) + 'px';
            div.style.top  = (mousePosition.y + offset[1]) + 'px';
        }
    }, true);
}
module.exports = Drag;

},{}],5:[function(require,module,exports){
/**
 * Created by manze on 2017-01-15.
 */
module.exports = function() {
    var submit = document.querySelector("#submit");
    var reset = document.querySelector("#reset");
    var numGuess = Math.floor(Math.random() * (100 - 1)) + 1;
    var image = document.querySelector("#highLowImage");
    var attempt = document.querySelector("#attempt");
    var attemptCount = 10;

    submit.addEventListener("click", game);

    reset.addEventListener("click", function() {
        attemptCount = 10;
        attempt.innerHTML = attemptCount;
        submit.addEventListener("click", game);
        reset.setAttribute("class", "blockRemove");
        image.setAttribute("class", "blockRemove");
        numGuess = Math.floor(Math.random() * (100 - 1)) + 1;
    });


    function game() {
        var guess = document.querySelector("#guess").value;
        image.classList.add("blockAdd");
        if (isNaN(guess)) {
            image.setAttribute("src", "image/highlow/nan.png");
        } else {
            if (guess < numGuess) {
                attemptCount -= 1;
                attempt.innerHTML = attemptCount;
                noAttempts();
                image.setAttribute("src", "image/highlow/higher.png");
            } else if (guess > numGuess) {
                attemptCount -= 1;
                attempt.innerHTML = attemptCount;
                noAttempts();
                image.setAttribute("src", "image/highlow/lower.png");
            } else {
                image.setAttribute("src", "image/highlow/correct.png");
            }
            if (attemptCount === 0) {
                image.setAttribute("src", "image/highlow/lose.png");
                reset.classList.add("inlineAdd");
            }
        }
    }

    function noAttempts() {
        if (attemptCount === 0) {
            submit.removeEventListener("click", game);
        }
    }
};

},{}],6:[function(require,module,exports){
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

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hvbWUvdmFncmFudC8ubnZtL3ZlcnNpb25zL25vZGUvdjcuMy4wL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNsaWVudC9zb3VyY2UvanMvRGVza3RvcC5qcyIsImNsaWVudC9zb3VyY2UvanMvYXBwLmpzIiwiY2xpZW50L3NvdXJjZS9qcy9jaGF0LmpzIiwiY2xpZW50L3NvdXJjZS9qcy9kcmFnZ2luZy5qcyIsImNsaWVudC9zb3VyY2UvanMvaGlnaGxvdy5qcyIsImNsaWVudC9zb3VyY2UvanMvbWVtb3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIENyZWF0ZWQgYnkgbWFuemUgb24gMjAxNy0wMS0yMi5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBEcmFnID0gcmVxdWlyZShcIi4vZHJhZ2dpbmcuanNcIik7XG4gICAgdmFyIE1lbW9yeSA9IHJlcXVpcmUoXCIuL21lbW9yeS5qc1wiKTtcbiAgICB2YXIgSGlnaExvdyA9IHJlcXVpcmUoXCIuL2hpZ2hsb3cuanNcIik7XG4gICAgdmFyIENoYXQgPSByZXF1aXJlKFwiLi9jaGF0LmpzXCIpO1xuXG4gICAgdmFyIG1lbUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21lbUljb25cIik7XG4gICAgdmFyIG1lbW9yeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWVtb3J5VGVtcFwiKTtcbiAgICB2YXIgY2hhdEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoYXRJY29uXCIpO1xuICAgIHZhciBjaGF0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaGF0VGVtcFwiKTtcbiAgICB2YXIgY2hhdFdpbmRvdyA9IGNoYXQuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiLmNoYXRXaW5EaXZcIik7XG4gICAgdmFyIGNoYXRXaW5kb3cyID0gY2hhdC5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2hhdFdpbkRpdkhlYWRcIik7XG4gICAgdmFyIGNoYXRDb3VudCA9IDA7XG4gICAgdmFyIGhpZ2hsb3dJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNoaWdobG93SWNvblwiKTtcbiAgICB2YXIgaGlnaGxvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaGlnaGxvd1RlbXBcIik7XG4gICAgdmFyIGRlc2t0b3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Rlc2t0b3BcIik7XG5cbiAgICBjaGF0SWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjaGF0SUQgPSBjaGF0V2luZG93LmdldEF0dHJpYnV0ZShcImlkXCIpO1xuICAgICAgICB2YXIgY2hhdEhlYWQgPSBjaGF0V2luZG93Mi5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgICAgICAgZGVza3RvcC5hcHBlbmRDaGlsZChjaGF0LmNvbnRlbnQucXVlcnlTZWxlY3RvcihcIiNcIiArIGNoYXRJRCkpO1xuICAgICAgICBjb25zb2xlLmxvZyhjaGF0SUQgKyBcIiBcIiArIGNoYXRIZWFkKTtcbiAgICAgICAgLy9uZXcgQ2hhdCgpO1xuICAgICAgICBuZXcgRHJhZyhjaGF0SUQsIGNoYXRIZWFkKTtcbiAgICAgICAgY2hhdENvdW50ICs9IDE7XG4gICAgICAgIGNoYXRXaW5kb3cuc2V0QXR0cmlidXRlKFwiaWRcIiwgKChjaGF0V2luZG93LmdldEF0dHJpYnV0ZShcImlkXCIpICsgY2hhdENvdW50KSkpO1xuICAgICAgICBjaGF0V2luZG93Mi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCAoKGNoYXRXaW5kb3cyLmdldEF0dHJpYnV0ZShcImlkXCIpICsgY2hhdENvdW50KSkpO1xuXG4gICAgfSk7XG5cbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWFuemUgb24gMjAxNy0wMS0wMS5cbiAqL1xudmFyIERyYWcgPSByZXF1aXJlKFwiLi9kcmFnZ2luZy5qc1wiKTtcbnZhciBNZW1vcnkgPSByZXF1aXJlKFwiLi9tZW1vcnkuanNcIik7XG52YXIgSGlnaExvdyA9IHJlcXVpcmUoXCIuL2hpZ2hsb3cuanNcIik7XG52YXIgQ2hhdCA9IHJlcXVpcmUoXCIuL2NoYXQuanNcIik7XG52YXIgRGVza3RvcCA9IHJlcXVpcmUoXCIuL0Rlc2t0b3AuanNcIik7XG5cblxuXG5uZXcgRGVza3RvcCgpO1xuXG4vL25ldyBDaGF0KCk7XG5cbi8vbmV3IEhpZ2hMb3coKTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBtYW56ZSBvbiAyMDE3LTAxLTE5LlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gQ2hhdCgpIHtcbiAgICB2YXIgdGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hhdFRlbXBcIik7XG4gICAgdmFyIHVzZXJOYW1lSW5wdXQgPSB0ZW1wLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPSd1c2VybmFtZSddXCIpO1xuICAgIHZhciBzZXJ2ZXJJbnB1dCA9IHRlbXAucXVlcnlTZWxlY3RvcihcImlucHV0W25hbWU9J3NlcnZlciddXCIpO1xuICAgIHZhciBjaGFubmVsSW5wdXQgPSB0ZW1wLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFtuYW1lPSdjaGFubmVsJ11cIik7XG4gICAgdmFyIHNvY2tldCA9IG5ldyBXZWJTb2NrZXQoXCJ3czovL1wiICsgc2VydmVySW5wdXQudmFsdWUpO1xuICAgIHZhciBhcGkgPSBcImVEQkU3NmRlVTdMMEg5bUVCZ3hVS1ZSMFZDbnEwWEJkXCI7XG4gICAgdmFyIHVzZXJuYW1lID0gXCJcIjtcbiAgICB2YXIgbWVzc2FnZSA9IFwiXCI7XG4gICAgdmFyIG1lc3NhZ2VCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21lc3NhZ2VcIik7XG4gICAgdmFyIGlucHV0RmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlbmRpbnB1dFwiKTtcblxuICAgIC8vU2V0dGluZ3Mgc3RhcnRcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VybmFtZVwiKSkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2luZm9mb3JtXCIpLmNsYXNzTGlzdC5hZGQoXCJjbGFzc1wiLCBcImJsb2NrUmVtb3ZlXCIpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoYXRcIikuY2xhc3NMaXN0LmFkZChcImNsYXNzXCIsIFwiYmxvY2tBZGRcIik7XG4gICAgICAgIHVzZXJOYW1lSW5wdXQudmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJuYW1lXCIpO1xuICAgICAgICBjaGFubmVsSW5wdXQudmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImNoYW5uZWxcIik7XG4gICAgICAgIHNlcnZlcklucHV0LnZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJzZXJ2ZXJcIik7XG4gICAgfVxuXG4gICAgdXNlck5hbWVJbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh1c2VyTmFtZUlucHV0LnZhbHVlLmxlbmd0aCA+IDAgJiYgc2VydmVySW5wdXQudmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VyTmFtZVNlbmRcIikucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHNlcnZlcklucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHVzZXJOYW1lSW5wdXQudmFsdWUubGVuZ3RoID4gMCAmJiBzZXJ2ZXJJbnB1dC52YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXJOYW1lU2VuZFwiKS5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VyTmFtZVNlbmRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInVzZXJuYW1lXCIsIHVzZXJOYW1lSW5wdXQudmFsdWUpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInNlcnZlclwiLCBzZXJ2ZXJJbnB1dC52YWx1ZSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiY2hhbm5lbFwiLCBjaGFubmVsSW5wdXQudmFsdWUpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2luZm9mb3JtXCIpLmNsYXNzTGlzdC5hZGQoXCJjbGFzc1wiLCBcImJsb2NrUmVtb3ZlXCIpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoYXRcIikuY2xhc3NMaXN0LmFkZChcImNsYXNzXCIsIFwiYmxvY2tBZGRcIik7XG4gICAgfSk7XG4gICAgLy9TZXR0aW5ncyBlbmRcblxuICAgIGlucHV0RmllbGQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZW5kaW5wdXRcIikudmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZW5kXCIpLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBzb2NrZXQub25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIHNlcnZlck1lc3NhZ2UgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpO1xuICAgICAgICBjb25zb2xlLmxvZyhldmVudC5kYXRhKTtcbiAgICAgICAgaWYgKHNlcnZlck1lc3NhZ2UuY2hhbm5lbCA9PT0gY2hhbm5lbElucHV0LnZhbHVlKSB7XG5cbiAgICAgICAgICAgIGlmIChzZXJ2ZXJNZXNzYWdlLnR5cGUgPT09IFwibWVzc2FnZVwiKSB7XG4gICAgICAgICAgICAgICAgdXNlcm5hbWUgPSAoc2VydmVyTWVzc2FnZS51c2VybmFtZSk7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IChzZXJ2ZXJNZXNzYWdlLmRhdGEpO1xuXG4gICAgICAgICAgICAgICAgLy9BcHBlbmQgdGhlIG1lc3NhZ2VcbiAgICAgICAgICAgICAgICB2YXIgY2hhdE1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh1c2VybmFtZSArIFwiOiBcIiArIG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VCb3guYXBwZW5kQ2hpbGQoY2hhdE1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VCb3guYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZW5kXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGRhdGFTZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZW5kaW5wdXRcIikudmFsdWU7XG4gICAgICAgICAgICB2YXIganNvbjtcbiAgICAgICAgICAgIGlmIChkYXRhU2VudC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAganNvbiA9IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFTZW50LFxuICAgICAgICAgICAgICAgICAgICB1c2VybmFtZTogdXNlck5hbWVJbnB1dC52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgY2hhbm5lbDogY2hhbm5lbElucHV0LnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBrZXk6IGFwaX07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KGpzb24pKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VuZFwiKS5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImZvcm1cIikucmVzZXQoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxufTtcbiIsIi8vRm91bmQgYSBncmVhdCBzb2x1dGlvbiBodHRwOi8vanNmaWRkbGUubmV0L2Y1RU1ULzEvXG4vL0FkanVzdGVkIGl0IHRvIHdvcmsgZm9yIG1lLCB0cmllZCBtYWtpbmcgb25lIG9uIG15IG93biwgYnV0IGhhZCBpc3N1ZXMgd2l0aCBtb3ZpbmcgdGhlIHdpbmRvdyBieSBkcmFnZ2luZyBhdCB0aGUgdG9wLlxuLy9JbnN0ZWFkIGl0IGRyYWdnZWQgZXZlcnl3aGVyZS5cblxuZnVuY3Rpb24gRHJhZyhkaXZ2LCBkaXZ2Mikge1xuICAgIHZhciBtb3VzZVBvc2l0aW9uO1xuICAgIHZhciBvZmZzZXQgPSBbMCwwXTtcbiAgICB2YXIgaXNEb3duID0gZmFsc2U7XG5cbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNcIiArIGRpdnYpO1xuICAgIHZhciBkaXYyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNcIiArIGRpdnYyKTtcblxuICAgIGRpdjIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpc0Rvd24gPSB0cnVlO1xuICAgICAgICBvZmZzZXQgPSBbXG4gICAgICAgICAgICBkaXYub2Zmc2V0TGVmdCAtIGUuY2xpZW50WCAtIDgsXG4gICAgICAgICAgICBkaXYub2Zmc2V0VG9wIC0gZS5jbGllbnRZIC0gOFxuICAgICAgICBdO1xuICAgIH0sIHRydWUpO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpc0Rvd24gPSBmYWxzZTtcbiAgICB9LCB0cnVlKTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmIChpc0Rvd24pIHtcbiAgICAgICAgICAgIG1vdXNlUG9zaXRpb24gPSB7XG5cbiAgICAgICAgICAgICAgICB4IDogZXZlbnQuY2xpZW50WCxcbiAgICAgICAgICAgICAgICB5IDogZXZlbnQuY2xpZW50WVxuXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZGl2LnN0eWxlLmxlZnQgPSAobW91c2VQb3NpdGlvbi54ICsgb2Zmc2V0WzBdKSArICdweCc7XG4gICAgICAgICAgICBkaXYuc3R5bGUudG9wICA9IChtb3VzZVBvc2l0aW9uLnkgKyBvZmZzZXRbMV0pICsgJ3B4JztcbiAgICAgICAgfVxuICAgIH0sIHRydWUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBEcmFnO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hbnplIG9uIDIwMTctMDEtMTUuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN1Ym1pdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3VibWl0XCIpO1xuICAgIHZhciByZXNldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVzZXRcIik7XG4gICAgdmFyIG51bUd1ZXNzID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwMCAtIDEpKSArIDE7XG4gICAgdmFyIGltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNoaWdoTG93SW1hZ2VcIik7XG4gICAgdmFyIGF0dGVtcHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2F0dGVtcHRcIik7XG4gICAgdmFyIGF0dGVtcHRDb3VudCA9IDEwO1xuXG4gICAgc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBnYW1lKTtcblxuICAgIHJlc2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYXR0ZW1wdENvdW50ID0gMTA7XG4gICAgICAgIGF0dGVtcHQuaW5uZXJIVE1MID0gYXR0ZW1wdENvdW50O1xuICAgICAgICBzdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGdhbWUpO1xuICAgICAgICByZXNldC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJsb2NrUmVtb3ZlXCIpO1xuICAgICAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJsb2NrUmVtb3ZlXCIpO1xuICAgICAgICBudW1HdWVzcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMDAgLSAxKSkgKyAxO1xuICAgIH0pO1xuXG5cbiAgICBmdW5jdGlvbiBnYW1lKCkge1xuICAgICAgICB2YXIgZ3Vlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2d1ZXNzXCIpLnZhbHVlO1xuICAgICAgICBpbWFnZS5jbGFzc0xpc3QuYWRkKFwiYmxvY2tBZGRcIik7XG4gICAgICAgIGlmIChpc05hTihndWVzcykpIHtcbiAgICAgICAgICAgIGltYWdlLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImltYWdlL2hpZ2hsb3cvbmFuLnBuZ1wiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChndWVzcyA8IG51bUd1ZXNzKSB7XG4gICAgICAgICAgICAgICAgYXR0ZW1wdENvdW50IC09IDE7XG4gICAgICAgICAgICAgICAgYXR0ZW1wdC5pbm5lckhUTUwgPSBhdHRlbXB0Q291bnQ7XG4gICAgICAgICAgICAgICAgbm9BdHRlbXB0cygpO1xuICAgICAgICAgICAgICAgIGltYWdlLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImltYWdlL2hpZ2hsb3cvaGlnaGVyLnBuZ1wiKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZ3Vlc3MgPiBudW1HdWVzcykge1xuICAgICAgICAgICAgICAgIGF0dGVtcHRDb3VudCAtPSAxO1xuICAgICAgICAgICAgICAgIGF0dGVtcHQuaW5uZXJIVE1MID0gYXR0ZW1wdENvdW50O1xuICAgICAgICAgICAgICAgIG5vQXR0ZW1wdHMoKTtcbiAgICAgICAgICAgICAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCJpbWFnZS9oaWdobG93L2xvd2VyLnBuZ1wiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaW1hZ2Uuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiaW1hZ2UvaGlnaGxvdy9jb3JyZWN0LnBuZ1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhdHRlbXB0Q291bnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCJpbWFnZS9oaWdobG93L2xvc2UucG5nXCIpO1xuICAgICAgICAgICAgICAgIHJlc2V0LmNsYXNzTGlzdC5hZGQoXCJpbmxpbmVBZGRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBub0F0dGVtcHRzKCkge1xuICAgICAgICBpZiAoYXR0ZW1wdENvdW50ID09PSAwKSB7XG4gICAgICAgICAgICBzdWJtaXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGdhbWUpO1xuICAgICAgICB9XG4gICAgfVxufTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBtYW56ZSBvbiAyMDE3LTAxLTE0LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHJvd3MsIGNvbHMsIGNvbnRhaW5lcikge1xuICAgIHZhciBpO1xuICAgIHZhciBhO1xuICAgIHZhciB0aWxlcyA9IFtdO1xuICAgIHZhciB0dXJuMTtcbiAgICB2YXIgdHVybjI7XG4gICAgdmFyIGxhc3RUaWxlO1xuICAgIHZhciB0cmllc0xlZnQgPSAyMDtcbiAgICB2YXIgcGFpckNvdW50ID0gMDtcbiAgICB2YXIgVEwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RyaWVzTGVmdFwiKTtcblxuICAgIHRpbGVzID0gZ2V0UGljdHVyZUFycmF5KHJvd3MsIGNvbHMpO1xuICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbnRhaW5lcik7XG4gICAgdmFyIHRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNtZW1vcnkgdGVtcGxhdGVcIilbMF0uY29udGVudC5maXJzdEVsZW1lbnRDaGlsZDtcblxuICAgIHRpbGVzLmZvckVhY2goZnVuY3Rpb24odGlsZSwgaW5kZXgpIHtcblxuICAgICAgICBhID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0ZW1wbGF0ZSwgdHJ1ZSk7XG5cbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGEpO1xuXG4gICAgICAgIGEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgaW1nID0gZXZlbnQudGFyZ2V0Lm5vZGVOYW1lID09PSBcIklNR1wiID8gZXZlbnQudGFyZ2V0IDogZXZlbnQudGFyZ2V0LmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAgICAgdHVybkJyaWNrKHRpbGUsIGluZGV4LCBpbWcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoKGluZGV4ICsgMSkgJSBjb2xzID09PSAwKSB7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gdHVybkJyaWNrKHRpbGUsIGluZGV4LCBpbWcpIHtcblxuICAgICAgICBpbWcuc3JjID0gXCJpbWFnZS9tZW1vcnkvXCIgKyB0aWxlICsgXCIucG5nXCI7XG5cbiAgICAgICAgaWYgKCF0dXJuMSkge1xuICAgICAgICAgICAgdHVybjEgPSBpbWc7XG4gICAgICAgICAgICBsYXN0VGlsZSA9IHRpbGU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaW1nID09PSB0dXJuMSkge3JldHVybjt9XG5cbiAgICAgICAgICAgIHR1cm4yID0gaW1nO1xuXG4gICAgICAgICAgICBpZiAodGlsZSA9PT0gbGFzdFRpbGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBhaXIhXCIpO1xuICAgICAgICAgICAgICAgIHBhaXJDb3VudCArPSAxO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBhaXJDb3VudCk7XG4gICAgICAgICAgICAgICAgaWYgKHBhaXJDb3VudCA9PT0gOCkge1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21lbW9yeVwiKS5jbGFzc0xpc3QuYWRkKFwiYmxvY2tSZW1vdmVcIik7XG4gICAgICAgICAgICAgICAgICAgIFRMLmNsYXNzTGlzdC5hZGQoXCJibG9ja1JlbW92ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtZW1XaW5cIikuY2xhc3NMaXN0LmFkZChcImJsb2NrQWRkXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0dXJuMS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoXCJyZW1vdmVkXCIpO1xuICAgICAgICAgICAgICAgIHR1cm4yLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZChcInJlbW92ZWRcIik7XG5cbiAgICAgICAgICAgICAgICB0dXJuMSA9IG51bGw7XG4gICAgICAgICAgICAgICAgdHVybjIgPSBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdHVybjEuc3JjID0gXCJpbWFnZS9tZW1vcnkvMC5wbmdcIjtcbiAgICAgICAgICAgICAgICAgICAgdHVybjIuc3JjID0gXCJpbWFnZS9tZW1vcnkvMC5wbmdcIjtcblxuICAgICAgICAgICAgICAgICAgICB0cmllc0xlZnQgLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgVEwuaW5uZXJIVE1MID0gXCJUcmllcyBsZWZ0OiBcIiArIHRyaWVzTGVmdDtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codHJpZXNMZWZ0KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHJpZXNMZWZ0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21lbW9yeVwiKS5jbGFzc0xpc3QuYWRkKFwiYmxvY2tSZW1vdmVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBUTC5jbGFzc0xpc3QuYWRkKFwiYmxvY2tSZW1vdmVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21lbUxvc2VcIikuY2xhc3NMaXN0LmFkZChcImJsb2NrQWRkXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdHVybjEgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB0dXJuMiA9IG51bGw7XG4gICAgICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UGljdHVyZUFycmF5KHJvd3MsIGNvbHMpIHtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIHZhciBhcnIgPSBbXTtcbiAgICAgICAgZm9yIChpID0gMTsgaSA8PSAocm93cyAqIGNvbHMpIC8gMjsgaSArPSAxKSB7XG4gICAgICAgICAgICBhcnIucHVzaChpKTtcbiAgICAgICAgICAgIGFyci5wdXNoKGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpID0gYXJyLmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICAgIHZhciBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGkgKyAxKSk7XG4gICAgICAgICAgICB2YXIgdGVtcCA9IGFycltpXTtcbiAgICAgICAgICAgIGFycltpXSA9IGFycltqXTtcbiAgICAgICAgICAgIGFycltqXSA9IHRlbXA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXJyO1xuICAgIH1cbn07XG4iXX0=
