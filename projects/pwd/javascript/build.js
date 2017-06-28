(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by manze on 2017-01-22.
 */

module.exports = function() {
    var Drag = require("./dragging.js");
    var Memory = require("./memory.js");
    var HighLow = require("./highlow.js");
    var Chat = require("./chat.js");

    var desktop = document.querySelector("#desktop");
    var zIndex = 1;

    // Memory variables
    var memIcon = document.querySelector("#memIcon");
    var memory = document.querySelector("#memoryTemp");
    var memWindow = memory.content.querySelector(".memWinDiv");
    var memWindow2 = memory.content.querySelector(".memWinDivHead");
    var memCount = 0;

    // Chat variables
    var chatIcon = document.querySelector("#chatIcon");
    var chat = document.querySelector("#chatTemp");
    var chatWindow = chat.content.querySelector(".chatWinDiv");
    var chatWindow2 = chat.content.querySelector(".chatWinDivHead");
    var chatCount = 0;

    // High Low variables
    var highlowIcon = document.querySelector("#highlowIcon");
    var highlow = document.querySelector("#highlowTemp");
    var HLWindow = highlow.content.querySelector(".HLWinDiv");
    var HLWindow2 = highlow.content.querySelector(".HLWinDivHead");
    var HLCount = 0;

    // Open the apps!
    chatIcon.addEventListener("click", function() {
        // Open the window
        var chatID = chatWindow.getAttribute("id");
        var chatHead = chatWindow2.getAttribute("id");
        var cloneNode = chat.content.querySelector("#" + chatID).cloneNode(true);
        desktop.appendChild(cloneNode);
        Drag(chatID, chatHead);
        Chat(cloneNode);

        // Opening the new window ontop.
        cloneNode.style.zIndex = zIndex +1;
        zIndex += 1;

        // Close the window
        var closeButton = cloneNode.querySelector("#closeButton");
        closeButton.addEventListener("click", function() {
            desktop.removeChild(cloneNode);
        });

        // Focus the window
        cloneNode.addEventListener("mousedown", function(){
            cloneNode.style.zIndex = zIndex +1;
            zIndex += 1;
        });

        // Prepare the next window
        chatCount += 1;
        chatWindow.setAttribute("id", chatID + 1);
        chatWindow2.setAttribute("id", chatHead + 1);

    });

    memIcon.addEventListener("click", function(){
        // Open the window
        var memID = memWindow.getAttribute("id");
        var memHead = memWindow2.getAttribute("id");
        var cloneNode = memory.content.querySelector("#" + memID).cloneNode(true);
        desktop.appendChild(cloneNode);
        Drag(memID, memHead);
        Memory(4,4, cloneNode);

        // Opening the new window ontop.
        cloneNode.style.zIndex = zIndex +1;
        zIndex += 1;

        // Close the window
        var closeButton = cloneNode.querySelector("#closeButton");
        closeButton.addEventListener("click", function() {
            desktop.removeChild(cloneNode);
        });

        // Focus the window
        cloneNode.addEventListener("mousedown", function() {
            cloneNode.style.zIndex = zIndex + 1;
            zIndex += 1;
        });

        // Prepare the next window.
        memCount += 1;
        memWindow.setAttribute("id", (memID + memCount));
        memWindow2.setAttribute("id", (memHead + memCount));
    });

    highlowIcon.addEventListener("click", function() {
        // Open the window
        var HLID = HLWindow.getAttribute("id");
        var HLHead = HLWindow2.getAttribute("id");
        var cloneNode = highlow.content.querySelector("#" + HLID).cloneNode(true);
        desktop.appendChild(cloneNode);
        Drag(HLID, HLHead);
        HighLow(cloneNode);

        // Opening the new window ontop.
        cloneNode.style.zIndex = zIndex +1;
        zIndex += 1;

        // Close the window
        var closeButton = cloneNode.querySelector("#closeButton");
        closeButton.addEventListener("click", function() {
            desktop.removeChild(cloneNode);
        });

        // Focus the window
        cloneNode.addEventListener("mousedown", function() {
            cloneNode.style.zIndex = zIndex + 1;
            zIndex += 1;
        });

        // Prepare the next window
        HLCount += 1;
        HLWindow.setAttribute("id", HLID + HLCount);
        HLWindow2.setAttribute("id", HLHead + HLCount);
    });

    // Open the apps end

};

},{"./chat.js":3,"./dragging.js":5,"./highlow.js":6,"./memory.js":7}],2:[function(require,module,exports){
/**
 * Created by manze on 2017-01-01.
 */
var Desktop = require("./Desktop.js");
var Clock = require("./clock.js");

Desktop();
Clock();

},{"./Desktop.js":1,"./clock.js":4}],3:[function(require,module,exports){
/**
 * Created by manze on 2017-01-19.
 */

module.exports = function Chat(element) {
    var userNameInput = element.querySelector("#userNameInput");
    var serverInput = element.querySelector("#serverInput");
    var channelInput = element.querySelector("#channelInput");
    var socket = new WebSocket("wss://" + "vhost3.lnu.se:20080/socket/");
    var api = "eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd";
    var username = "";
    var message = "";
    var messageBox = element.querySelector("#message");
    var inputField = element.querySelector("#sendinput");

    //Settings start
    if (localStorage.getItem("username")) {
        userNameInput.value = localStorage.getItem("username");
        element.querySelector("#userNameSend").removeAttribute("disabled");
    }

    userNameInput.addEventListener("input", function() {
        if (userNameInput.value.length > 0 && serverInput.value.length > 0) {
            element.querySelector("#userNameSend").removeAttribute("disabled");
        }

        if (userNameInput.value.length < 1 && serverInput.value.length < 1) {
            element.querySelector("#userNameSend").setAttribute("disabled");
        }

    });

    serverInput.addEventListener("input", function() {
        if (userNameInput.value.length > 0 && serverInput.value.length > 0) {
            element.querySelector("#userNameSend").removeAttribute("disabled");
        }
    });

    element.querySelector("#userNameSend").addEventListener("click", function(e) {
        if (e) {
            e.preventDefault();
        }
        localStorage.setItem("username", userNameInput.value);
        localStorage.setItem("server", serverInput.value);
        localStorage.setItem("channel", channelInput.value);
        element.querySelector("#infoform").classList.add("class", "blockRemove");
        element.querySelector("#chat").classList.add("class", "blockAdd");
    });
    //Settings end

    inputField.addEventListener("input", function() {
        if (element.querySelector("#sendinput").value.length > 0) {
            element.querySelector("#send").removeAttribute("disabled");
        }
    });

    socket.onmessage = function(event) {
        var serverMessage = JSON.parse(event.data);
        if (serverMessage.channel === channelInput.value) {

            if (serverMessage.type === "message") {
                username = (serverMessage.username);
                message = (serverMessage.data);

                //Append the message
                var chatMessage = document.createTextNode(username + ": " + message);
                messageBox.appendChild(chatMessage);
                messageBox.appendChild(document.createElement("br"));

                var bottomScroll = element.querySelector("#chatbox");
                bottomScroll.scrollTop = bottomScroll.scrollHeight;
            }

        }
    };
    element.querySelector("#send").addEventListener("click", function(e) {
        if (e) {
            e.preventDefault();
        }

        var dataSent = element.querySelector("#sendinput").value;
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
        element.querySelector("#send").setAttribute("disabled", "disabled");
        element.querySelector("form").reset();
    });

};

},{}],4:[function(require,module,exports){
/**
 * Created by manze on 2017-06-25.
 */

function clockGo() {
    var clock = document.getElementById("clock");
    var dateElement = document.getElementById("date");
    var todaysDate = new Date();
    var hour = todaysDate.getHours();
    var min = todaysDate.getMinutes();
    var day = todaysDate.getDay();
    var month = todaysDate.getMonth();
    var date = todaysDate.getDate();
    var monthArray = ["January", "February", "Mars", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    if (min < 10) {
        min = "0" + min;
    }

    if (hour < 10) {
        hour = "0" + hour;
    }

    clock.innerHTML = hour + ":" + min;
    dateElement.innerHTML = dayArray[day] + " " + date + " " + monthArray[month];
    setTimeout(function() { clockGo(); }, 500);
}

module.exports = clockGo;

},{}],5:[function(require,module,exports){
//Found a great solution http://jsfiddle.net/f5EMT/1/
//Adjusted it to work for me, tried making one on my own, but had issues with moving the window by dragging at the top.
//Instead it dragged everywhere.

function Drag(divv, divv2) {
    var mousePosition;
    var offset = [0,0];
    var isDown = false;

    var div = document.querySelector("#" + divv);
    var div2 = document.querySelector("#" + divv2);

    div2.addEventListener("mousedown", function(e) {
        div.style.opacity = "0.5";
        isDown = true;
        offset = [
            div.offsetLeft - e.clientX,
            div.offsetTop - e.clientY
        ];
    }, true);

    document.addEventListener("mouseup", function() {
        div.style.opacity = "1";
        isDown = false;
    }, true);

    document.addEventListener("mousemove", function(event) {
        event.preventDefault();
        if (isDown) {
            mousePosition = {

                x : event.clientX,
                y : event.clientY

            };
            div.style.left = (mousePosition.x + offset[0]) + "px";
            div.style.top  = (mousePosition.y + offset[1]) + "px";
        }
    }, true);
}

module.exports = Drag;

},{}],6:[function(require,module,exports){
/**
 * Created by manze on 2017-01-15.
 */
module.exports = function(element) {
    var submit = element.querySelector("#submit");
    var reset = element.querySelector("#reset");
    var numGuess = Math.floor(Math.random() * (100 - 1)) + 1;
    var image = element.querySelector("#highLowImage");
    var attempt = element.querySelector("#attempt");
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
        var guess = element.querySelector("#guess").value;

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

},{}],7:[function(require,module,exports){
/**
 * Created by manze on 2017-01-14.
 */

// Used the memory from the exercises, even though I am more than capable of building one of my own with all
// the new stuff I've learned, I saved time by taking this one.
module.exports = function(rows, cols, container2) {
    var a;
    var tiles = [];
    var turn1;
    var turn2;
    var lastTile;
    var triesLeft = 15;
    var pairCount = 0;
    var TL = container2.querySelector("#triesLeft");

    tiles = getPictureArray(rows, cols);
    var container = container2.querySelector("#memory");
    var template = container2.querySelectorAll("#memory template")[0].content.firstElementChild;

    tiles.forEach(function(tile, index) {
        a = template.cloneNode(true);

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
                pairCount += 1;
                console.log(pairCount);
                if (pairCount === 8) {
                    container2.querySelector("#memory").classList.add("blockRemove");
                    TL.classList.add("blockRemove");
                    container2.querySelector("#memWin").classList.add("blockAdd");
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
                    TL.innerHTML = "Attempts left: " + triesLeft;

                    if (triesLeft === 0) {
                        container2.querySelector("#memory").classList.add("blockRemove");
                        TL.classList.add("blockRemove");
                        container2.querySelector("#memLose").classList.add("blockAdd");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3Vzci9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvc291cmNlL2pzL0Rlc2t0b3AuanMiLCJjbGllbnQvc291cmNlL2pzL2FwcC5qcyIsImNsaWVudC9zb3VyY2UvanMvY2hhdC5qcyIsImNsaWVudC9zb3VyY2UvanMvY2xvY2suanMiLCJjbGllbnQvc291cmNlL2pzL2RyYWdnaW5nLmpzIiwiY2xpZW50L3NvdXJjZS9qcy9oaWdobG93LmpzIiwiY2xpZW50L3NvdXJjZS9qcy9tZW1vcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQ3JlYXRlZCBieSBtYW56ZSBvbiAyMDE3LTAxLTIyLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIERyYWcgPSByZXF1aXJlKFwiLi9kcmFnZ2luZy5qc1wiKTtcbiAgICB2YXIgTWVtb3J5ID0gcmVxdWlyZShcIi4vbWVtb3J5LmpzXCIpO1xuICAgIHZhciBIaWdoTG93ID0gcmVxdWlyZShcIi4vaGlnaGxvdy5qc1wiKTtcbiAgICB2YXIgQ2hhdCA9IHJlcXVpcmUoXCIuL2NoYXQuanNcIik7XG5cbiAgICB2YXIgZGVza3RvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVza3RvcFwiKTtcbiAgICB2YXIgekluZGV4ID0gMTtcblxuICAgIC8vIE1lbW9yeSB2YXJpYWJsZXNcbiAgICB2YXIgbWVtSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWVtSWNvblwiKTtcbiAgICB2YXIgbWVtb3J5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtZW1vcnlUZW1wXCIpO1xuICAgIHZhciBtZW1XaW5kb3cgPSBtZW1vcnkuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiLm1lbVdpbkRpdlwiKTtcbiAgICB2YXIgbWVtV2luZG93MiA9IG1lbW9yeS5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVtV2luRGl2SGVhZFwiKTtcbiAgICB2YXIgbWVtQ291bnQgPSAwO1xuXG4gICAgLy8gQ2hhdCB2YXJpYWJsZXNcbiAgICB2YXIgY2hhdEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoYXRJY29uXCIpO1xuICAgIHZhciBjaGF0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaGF0VGVtcFwiKTtcbiAgICB2YXIgY2hhdFdpbmRvdyA9IGNoYXQuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiLmNoYXRXaW5EaXZcIik7XG4gICAgdmFyIGNoYXRXaW5kb3cyID0gY2hhdC5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2hhdFdpbkRpdkhlYWRcIik7XG4gICAgdmFyIGNoYXRDb3VudCA9IDA7XG5cbiAgICAvLyBIaWdoIExvdyB2YXJpYWJsZXNcbiAgICB2YXIgaGlnaGxvd0ljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hpZ2hsb3dJY29uXCIpO1xuICAgIHZhciBoaWdobG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNoaWdobG93VGVtcFwiKTtcbiAgICB2YXIgSExXaW5kb3cgPSBoaWdobG93LmNvbnRlbnQucXVlcnlTZWxlY3RvcihcIi5ITFdpbkRpdlwiKTtcbiAgICB2YXIgSExXaW5kb3cyID0gaGlnaGxvdy5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIuSExXaW5EaXZIZWFkXCIpO1xuICAgIHZhciBITENvdW50ID0gMDtcblxuICAgIC8vIE9wZW4gdGhlIGFwcHMhXG4gICAgY2hhdEljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBPcGVuIHRoZSB3aW5kb3dcbiAgICAgICAgdmFyIGNoYXRJRCA9IGNoYXRXaW5kb3cuZ2V0QXR0cmlidXRlKFwiaWRcIik7XG4gICAgICAgIHZhciBjaGF0SGVhZCA9IGNoYXRXaW5kb3cyLmdldEF0dHJpYnV0ZShcImlkXCIpO1xuICAgICAgICB2YXIgY2xvbmVOb2RlID0gY2hhdC5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIjXCIgKyBjaGF0SUQpLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgZGVza3RvcC5hcHBlbmRDaGlsZChjbG9uZU5vZGUpO1xuICAgICAgICBEcmFnKGNoYXRJRCwgY2hhdEhlYWQpO1xuICAgICAgICBDaGF0KGNsb25lTm9kZSk7XG5cbiAgICAgICAgLy8gT3BlbmluZyB0aGUgbmV3IHdpbmRvdyBvbnRvcC5cbiAgICAgICAgY2xvbmVOb2RlLnN0eWxlLnpJbmRleCA9IHpJbmRleCArMTtcbiAgICAgICAgekluZGV4ICs9IDE7XG5cbiAgICAgICAgLy8gQ2xvc2UgdGhlIHdpbmRvd1xuICAgICAgICB2YXIgY2xvc2VCdXR0b24gPSBjbG9uZU5vZGUucXVlcnlTZWxlY3RvcihcIiNjbG9zZUJ1dHRvblwiKTtcbiAgICAgICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZGVza3RvcC5yZW1vdmVDaGlsZChjbG9uZU5vZGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBGb2N1cyB0aGUgd2luZG93XG4gICAgICAgIGNsb25lTm9kZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjbG9uZU5vZGUuc3R5bGUuekluZGV4ID0gekluZGV4ICsxO1xuICAgICAgICAgICAgekluZGV4ICs9IDE7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFByZXBhcmUgdGhlIG5leHQgd2luZG93XG4gICAgICAgIGNoYXRDb3VudCArPSAxO1xuICAgICAgICBjaGF0V2luZG93LnNldEF0dHJpYnV0ZShcImlkXCIsIGNoYXRJRCArIDEpO1xuICAgICAgICBjaGF0V2luZG93Mi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBjaGF0SGVhZCArIDEpO1xuXG4gICAgfSk7XG5cbiAgICBtZW1JY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuICAgICAgICAvLyBPcGVuIHRoZSB3aW5kb3dcbiAgICAgICAgdmFyIG1lbUlEID0gbWVtV2luZG93LmdldEF0dHJpYnV0ZShcImlkXCIpO1xuICAgICAgICB2YXIgbWVtSGVhZCA9IG1lbVdpbmRvdzIuZ2V0QXR0cmlidXRlKFwiaWRcIik7XG4gICAgICAgIHZhciBjbG9uZU5vZGUgPSBtZW1vcnkuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiI1wiICsgbWVtSUQpLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgZGVza3RvcC5hcHBlbmRDaGlsZChjbG9uZU5vZGUpO1xuICAgICAgICBEcmFnKG1lbUlELCBtZW1IZWFkKTtcbiAgICAgICAgTWVtb3J5KDQsNCwgY2xvbmVOb2RlKTtcblxuICAgICAgICAvLyBPcGVuaW5nIHRoZSBuZXcgd2luZG93IG9udG9wLlxuICAgICAgICBjbG9uZU5vZGUuc3R5bGUuekluZGV4ID0gekluZGV4ICsxO1xuICAgICAgICB6SW5kZXggKz0gMTtcblxuICAgICAgICAvLyBDbG9zZSB0aGUgd2luZG93XG4gICAgICAgIHZhciBjbG9zZUJ1dHRvbiA9IGNsb25lTm9kZS5xdWVyeVNlbGVjdG9yKFwiI2Nsb3NlQnV0dG9uXCIpO1xuICAgICAgICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkZXNrdG9wLnJlbW92ZUNoaWxkKGNsb25lTm9kZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEZvY3VzIHRoZSB3aW5kb3dcbiAgICAgICAgY2xvbmVOb2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjbG9uZU5vZGUuc3R5bGUuekluZGV4ID0gekluZGV4ICsgMTtcbiAgICAgICAgICAgIHpJbmRleCArPSAxO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBQcmVwYXJlIHRoZSBuZXh0IHdpbmRvdy5cbiAgICAgICAgbWVtQ291bnQgKz0gMTtcbiAgICAgICAgbWVtV2luZG93LnNldEF0dHJpYnV0ZShcImlkXCIsIChtZW1JRCArIG1lbUNvdW50KSk7XG4gICAgICAgIG1lbVdpbmRvdzIuc2V0QXR0cmlidXRlKFwiaWRcIiwgKG1lbUhlYWQgKyBtZW1Db3VudCkpO1xuICAgIH0pO1xuXG4gICAgaGlnaGxvd0ljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBPcGVuIHRoZSB3aW5kb3dcbiAgICAgICAgdmFyIEhMSUQgPSBITFdpbmRvdy5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgICAgICAgdmFyIEhMSGVhZCA9IEhMV2luZG93Mi5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgICAgICAgdmFyIGNsb25lTm9kZSA9IGhpZ2hsb3cuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiI1wiICsgSExJRCkuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICBkZXNrdG9wLmFwcGVuZENoaWxkKGNsb25lTm9kZSk7XG4gICAgICAgIERyYWcoSExJRCwgSExIZWFkKTtcbiAgICAgICAgSGlnaExvdyhjbG9uZU5vZGUpO1xuXG4gICAgICAgIC8vIE9wZW5pbmcgdGhlIG5ldyB3aW5kb3cgb250b3AuXG4gICAgICAgIGNsb25lTm9kZS5zdHlsZS56SW5kZXggPSB6SW5kZXggKzE7XG4gICAgICAgIHpJbmRleCArPSAxO1xuXG4gICAgICAgIC8vIENsb3NlIHRoZSB3aW5kb3dcbiAgICAgICAgdmFyIGNsb3NlQnV0dG9uID0gY2xvbmVOb2RlLnF1ZXJ5U2VsZWN0b3IoXCIjY2xvc2VCdXR0b25cIik7XG4gICAgICAgIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRlc2t0b3AucmVtb3ZlQ2hpbGQoY2xvbmVOb2RlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gRm9jdXMgdGhlIHdpbmRvd1xuICAgICAgICBjbG9uZU5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNsb25lTm9kZS5zdHlsZS56SW5kZXggPSB6SW5kZXggKyAxO1xuICAgICAgICAgICAgekluZGV4ICs9IDE7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFByZXBhcmUgdGhlIG5leHQgd2luZG93XG4gICAgICAgIEhMQ291bnQgKz0gMTtcbiAgICAgICAgSExXaW5kb3cuc2V0QXR0cmlidXRlKFwiaWRcIiwgSExJRCArIEhMQ291bnQpO1xuICAgICAgICBITFdpbmRvdzIuc2V0QXR0cmlidXRlKFwiaWRcIiwgSExIZWFkICsgSExDb3VudCk7XG4gICAgfSk7XG5cbiAgICAvLyBPcGVuIHRoZSBhcHBzIGVuZFxuXG59O1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hbnplIG9uIDIwMTctMDEtMDEuXG4gKi9cbnZhciBEZXNrdG9wID0gcmVxdWlyZShcIi4vRGVza3RvcC5qc1wiKTtcbnZhciBDbG9jayA9IHJlcXVpcmUoXCIuL2Nsb2NrLmpzXCIpO1xuXG5EZXNrdG9wKCk7XG5DbG9jaygpO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hbnplIG9uIDIwMTctMDEtMTkuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBDaGF0KGVsZW1lbnQpIHtcbiAgICB2YXIgdXNlck5hbWVJbnB1dCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VyTmFtZUlucHV0XCIpO1xuICAgIHZhciBzZXJ2ZXJJbnB1dCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZXJ2ZXJJbnB1dFwiKTtcbiAgICB2YXIgY2hhbm5lbElucHV0ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoYW5uZWxJbnB1dFwiKTtcbiAgICB2YXIgc29ja2V0ID0gbmV3IFdlYlNvY2tldChcIndzczovL1wiICsgXCJ2aG9zdDMubG51LnNlOjIwMDgwL3NvY2tldC9cIik7XG4gICAgdmFyIGFwaSA9IFwiZURCRTc2ZGVVN0wwSDltRUJneFVLVlIwVkNucTBYQmRcIjtcbiAgICB2YXIgdXNlcm5hbWUgPSBcIlwiO1xuICAgIHZhciBtZXNzYWdlID0gXCJcIjtcbiAgICB2YXIgbWVzc2FnZUJveCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiNtZXNzYWdlXCIpO1xuICAgIHZhciBpbnB1dEZpZWxkID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlbmRpbnB1dFwiKTtcblxuICAgIC8vU2V0dGluZ3Mgc3RhcnRcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VybmFtZVwiKSkge1xuICAgICAgICB1c2VyTmFtZUlucHV0LnZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VybmFtZVwiKTtcbiAgICAgICAgZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXJOYW1lU2VuZFwiKS5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICB9XG5cbiAgICB1c2VyTmFtZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHVzZXJOYW1lSW5wdXQudmFsdWUubGVuZ3RoID4gMCAmJiBzZXJ2ZXJJbnB1dC52YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlck5hbWVTZW5kXCIpLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHVzZXJOYW1lSW5wdXQudmFsdWUubGVuZ3RoIDwgMSAmJiBzZXJ2ZXJJbnB1dC52YWx1ZS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlck5hbWVTZW5kXCIpLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgICAgICB9XG5cbiAgICB9KTtcblxuICAgIHNlcnZlcklucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHVzZXJOYW1lSW5wdXQudmFsdWUubGVuZ3RoID4gMCAmJiBzZXJ2ZXJJbnB1dC52YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlck5hbWVTZW5kXCIpLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlck5hbWVTZW5kXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ1c2VybmFtZVwiLCB1c2VyTmFtZUlucHV0LnZhbHVlKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzZXJ2ZXJcIiwgc2VydmVySW5wdXQudmFsdWUpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImNoYW5uZWxcIiwgY2hhbm5lbElucHV0LnZhbHVlKTtcbiAgICAgICAgZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI2luZm9mb3JtXCIpLmNsYXNzTGlzdC5hZGQoXCJjbGFzc1wiLCBcImJsb2NrUmVtb3ZlXCIpO1xuICAgICAgICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hhdFwiKS5jbGFzc0xpc3QuYWRkKFwiY2xhc3NcIiwgXCJibG9ja0FkZFwiKTtcbiAgICB9KTtcbiAgICAvL1NldHRpbmdzIGVuZFxuXG4gICAgaW5wdXRGaWVsZC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VuZGlucHV0XCIpLnZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZW5kXCIpLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBzb2NrZXQub25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIHNlcnZlck1lc3NhZ2UgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpO1xuICAgICAgICBpZiAoc2VydmVyTWVzc2FnZS5jaGFubmVsID09PSBjaGFubmVsSW5wdXQudmFsdWUpIHtcblxuICAgICAgICAgICAgaWYgKHNlcnZlck1lc3NhZ2UudHlwZSA9PT0gXCJtZXNzYWdlXCIpIHtcbiAgICAgICAgICAgICAgICB1c2VybmFtZSA9IChzZXJ2ZXJNZXNzYWdlLnVzZXJuYW1lKTtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gKHNlcnZlck1lc3NhZ2UuZGF0YSk7XG5cbiAgICAgICAgICAgICAgICAvL0FwcGVuZCB0aGUgbWVzc2FnZVxuICAgICAgICAgICAgICAgIHZhciBjaGF0TWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHVzZXJuYW1lICsgXCI6IFwiICsgbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgbWVzc2FnZUJveC5hcHBlbmRDaGlsZChjaGF0TWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgbWVzc2FnZUJveC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnJcIikpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGJvdHRvbVNjcm9sbCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaGF0Ym94XCIpO1xuICAgICAgICAgICAgICAgIGJvdHRvbVNjcm9sbC5zY3JvbGxUb3AgPSBib3R0b21TY3JvbGwuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICB9O1xuICAgIGVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZW5kXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZGF0YVNlbnQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VuZGlucHV0XCIpLnZhbHVlO1xuICAgICAgICB2YXIganNvbjtcbiAgICAgICAgaWYgKGRhdGFTZW50Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGpzb24gPSB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YVNlbnQsXG4gICAgICAgICAgICAgICAgdXNlcm5hbWU6IHVzZXJOYW1lSW5wdXQudmFsdWUsXG4gICAgICAgICAgICAgICAgY2hhbm5lbDogY2hhbm5lbElucHV0LnZhbHVlLFxuICAgICAgICAgICAgICAgIGtleTogYXBpfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KGpzb24pKTtcbiAgICAgICAgZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlbmRcIikuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKS5yZXNldCgpO1xuICAgIH0pO1xuXG59O1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hbnplIG9uIDIwMTctMDYtMjUuXG4gKi9cblxuZnVuY3Rpb24gY2xvY2tHbygpIHtcbiAgICB2YXIgY2xvY2sgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsb2NrXCIpO1xuICAgIHZhciBkYXRlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGF0ZVwiKTtcbiAgICB2YXIgdG9kYXlzRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgdmFyIGhvdXIgPSB0b2RheXNEYXRlLmdldEhvdXJzKCk7XG4gICAgdmFyIG1pbiA9IHRvZGF5c0RhdGUuZ2V0TWludXRlcygpO1xuICAgIHZhciBkYXkgPSB0b2RheXNEYXRlLmdldERheSgpO1xuICAgIHZhciBtb250aCA9IHRvZGF5c0RhdGUuZ2V0TW9udGgoKTtcbiAgICB2YXIgZGF0ZSA9IHRvZGF5c0RhdGUuZ2V0RGF0ZSgpO1xuICAgIHZhciBtb250aEFycmF5ID0gW1wiSmFudWFyeVwiLCBcIkZlYnJ1YXJ5XCIsIFwiTWFyc1wiLCBcIkFwcmlsXCIsIFwiTWF5XCIsIFwiSnVuZVwiLCBcIkp1bHlcIiwgXCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPY3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiXTtcbiAgICB2YXIgZGF5QXJyYXkgPSBbXCJTdW5kYXlcIiwgXCJNb25kYXlcIiwgXCJUdWVzZGF5XCIsIFwiV2VkbmVzZGF5XCIsIFwiVGh1cnNkYXlcIiwgXCJGcmlkYXlcIiwgXCJTYXR1cmRheVwiXTtcbiAgICBpZiAobWluIDwgMTApIHtcbiAgICAgICAgbWluID0gXCIwXCIgKyBtaW47XG4gICAgfVxuXG4gICAgaWYgKGhvdXIgPCAxMCkge1xuICAgICAgICBob3VyID0gXCIwXCIgKyBob3VyO1xuICAgIH1cblxuICAgIGNsb2NrLmlubmVySFRNTCA9IGhvdXIgKyBcIjpcIiArIG1pbjtcbiAgICBkYXRlRWxlbWVudC5pbm5lckhUTUwgPSBkYXlBcnJheVtkYXldICsgXCIgXCIgKyBkYXRlICsgXCIgXCIgKyBtb250aEFycmF5W21vbnRoXTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBjbG9ja0dvKCk7IH0sIDUwMCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2xvY2tHbztcbiIsIi8vRm91bmQgYSBncmVhdCBzb2x1dGlvbiBodHRwOi8vanNmaWRkbGUubmV0L2Y1RU1ULzEvXG4vL0FkanVzdGVkIGl0IHRvIHdvcmsgZm9yIG1lLCB0cmllZCBtYWtpbmcgb25lIG9uIG15IG93biwgYnV0IGhhZCBpc3N1ZXMgd2l0aCBtb3ZpbmcgdGhlIHdpbmRvdyBieSBkcmFnZ2luZyBhdCB0aGUgdG9wLlxuLy9JbnN0ZWFkIGl0IGRyYWdnZWQgZXZlcnl3aGVyZS5cblxuZnVuY3Rpb24gRHJhZyhkaXZ2LCBkaXZ2Mikge1xuICAgIHZhciBtb3VzZVBvc2l0aW9uO1xuICAgIHZhciBvZmZzZXQgPSBbMCwwXTtcbiAgICB2YXIgaXNEb3duID0gZmFsc2U7XG5cbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNcIiArIGRpdnYpO1xuICAgIHZhciBkaXYyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNcIiArIGRpdnYyKTtcblxuICAgIGRpdjIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGRpdi5zdHlsZS5vcGFjaXR5ID0gXCIwLjVcIjtcbiAgICAgICAgaXNEb3duID0gdHJ1ZTtcbiAgICAgICAgb2Zmc2V0ID0gW1xuICAgICAgICAgICAgZGl2Lm9mZnNldExlZnQgLSBlLmNsaWVudFgsXG4gICAgICAgICAgICBkaXYub2Zmc2V0VG9wIC0gZS5jbGllbnRZXG4gICAgICAgIF07XG4gICAgfSwgdHJ1ZSk7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZGl2LnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgICAgICAgaXNEb3duID0gZmFsc2U7XG4gICAgfSwgdHJ1ZSk7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmIChpc0Rvd24pIHtcbiAgICAgICAgICAgIG1vdXNlUG9zaXRpb24gPSB7XG5cbiAgICAgICAgICAgICAgICB4IDogZXZlbnQuY2xpZW50WCxcbiAgICAgICAgICAgICAgICB5IDogZXZlbnQuY2xpZW50WVxuXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZGl2LnN0eWxlLmxlZnQgPSAobW91c2VQb3NpdGlvbi54ICsgb2Zmc2V0WzBdKSArIFwicHhcIjtcbiAgICAgICAgICAgIGRpdi5zdHlsZS50b3AgID0gKG1vdXNlUG9zaXRpb24ueSArIG9mZnNldFsxXSkgKyBcInB4XCI7XG4gICAgICAgIH1cbiAgICB9LCB0cnVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEcmFnO1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hbnplIG9uIDIwMTctMDEtMTUuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZWxlbWVudCkge1xuICAgIHZhciBzdWJtaXQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3VibWl0XCIpO1xuICAgIHZhciByZXNldCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZXNldFwiKTtcbiAgICB2YXIgbnVtR3Vlc3MgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAwIC0gMSkpICsgMTtcbiAgICB2YXIgaW1hZ2UgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaGlnaExvd0ltYWdlXCIpO1xuICAgIHZhciBhdHRlbXB0ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI2F0dGVtcHRcIik7XG4gICAgdmFyIGF0dGVtcHRDb3VudCA9IDEwO1xuXG4gICAgc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBnYW1lKTtcblxuICAgIHJlc2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgYXR0ZW1wdENvdW50ID0gMTA7XG4gICAgICAgIGF0dGVtcHQuaW5uZXJIVE1MID0gYXR0ZW1wdENvdW50O1xuICAgICAgICBzdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGdhbWUpO1xuICAgICAgICByZXNldC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJsb2NrUmVtb3ZlXCIpO1xuICAgICAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJsb2NrUmVtb3ZlXCIpO1xuICAgICAgICBudW1HdWVzcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMDAgLSAxKSkgKyAxO1xuICAgIH0pO1xuXG5cbiAgICBmdW5jdGlvbiBnYW1lKCkge1xuICAgICAgICB2YXIgZ3Vlc3MgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZ3Vlc3NcIikudmFsdWU7XG5cbiAgICAgICAgaW1hZ2UuY2xhc3NMaXN0LmFkZChcImJsb2NrQWRkXCIpO1xuICAgICAgICBpZiAoaXNOYU4oZ3Vlc3MpKSB7XG4gICAgICAgICAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCJpbWFnZS9oaWdobG93L25hbi5wbmdcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZ3Vlc3MgPCBudW1HdWVzcykge1xuICAgICAgICAgICAgICAgIGF0dGVtcHRDb3VudCAtPSAxO1xuICAgICAgICAgICAgICAgIGF0dGVtcHQuaW5uZXJIVE1MID0gYXR0ZW1wdENvdW50O1xuICAgICAgICAgICAgICAgIG5vQXR0ZW1wdHMoKTtcbiAgICAgICAgICAgICAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCJpbWFnZS9oaWdobG93L2hpZ2hlci5wbmdcIik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGd1ZXNzID4gbnVtR3Vlc3MpIHtcbiAgICAgICAgICAgICAgICBhdHRlbXB0Q291bnQgLT0gMTtcbiAgICAgICAgICAgICAgICBhdHRlbXB0LmlubmVySFRNTCA9IGF0dGVtcHRDb3VudDtcbiAgICAgICAgICAgICAgICBub0F0dGVtcHRzKCk7XG4gICAgICAgICAgICAgICAgaW1hZ2Uuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiaW1hZ2UvaGlnaGxvdy9sb3dlci5wbmdcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGltYWdlLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImltYWdlL2hpZ2hsb3cvY29ycmVjdC5wbmdcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYXR0ZW1wdENvdW50ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaW1hZ2Uuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiaW1hZ2UvaGlnaGxvdy9sb3NlLnBuZ1wiKTtcbiAgICAgICAgICAgICAgICByZXNldC5jbGFzc0xpc3QuYWRkKFwiaW5saW5lQWRkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbm9BdHRlbXB0cygpIHtcbiAgICAgICAgaWYgKGF0dGVtcHRDb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgc3VibWl0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBnYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWFuemUgb24gMjAxNy0wMS0xNC5cbiAqL1xuXG4vLyBVc2VkIHRoZSBtZW1vcnkgZnJvbSB0aGUgZXhlcmNpc2VzLCBldmVuIHRob3VnaCBJIGFtIG1vcmUgdGhhbiBjYXBhYmxlIG9mIGJ1aWxkaW5nIG9uZSBvZiBteSBvd24gd2l0aCBhbGxcbi8vIHRoZSBuZXcgc3R1ZmYgSSd2ZSBsZWFybmVkLCBJIHNhdmVkIHRpbWUgYnkgdGFraW5nIHRoaXMgb25lLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihyb3dzLCBjb2xzLCBjb250YWluZXIyKSB7XG4gICAgdmFyIGE7XG4gICAgdmFyIHRpbGVzID0gW107XG4gICAgdmFyIHR1cm4xO1xuICAgIHZhciB0dXJuMjtcbiAgICB2YXIgbGFzdFRpbGU7XG4gICAgdmFyIHRyaWVzTGVmdCA9IDE1O1xuICAgIHZhciBwYWlyQ291bnQgPSAwO1xuICAgIHZhciBUTCA9IGNvbnRhaW5lcjIucXVlcnlTZWxlY3RvcihcIiN0cmllc0xlZnRcIik7XG5cbiAgICB0aWxlcyA9IGdldFBpY3R1cmVBcnJheShyb3dzLCBjb2xzKTtcbiAgICB2YXIgY29udGFpbmVyID0gY29udGFpbmVyMi5xdWVyeVNlbGVjdG9yKFwiI21lbW9yeVwiKTtcbiAgICB2YXIgdGVtcGxhdGUgPSBjb250YWluZXIyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIjbWVtb3J5IHRlbXBsYXRlXCIpWzBdLmNvbnRlbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XG5cbiAgICB0aWxlcy5mb3JFYWNoKGZ1bmN0aW9uKHRpbGUsIGluZGV4KSB7XG4gICAgICAgIGEgPSB0ZW1wbGF0ZS5jbG9uZU5vZGUodHJ1ZSk7XG5cbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGEpO1xuXG4gICAgICAgIGEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgaW1nID0gZXZlbnQudGFyZ2V0Lm5vZGVOYW1lID09PSBcIklNR1wiID8gZXZlbnQudGFyZ2V0IDogZXZlbnQudGFyZ2V0LmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAgICAgdHVybkJyaWNrKHRpbGUsIGluZGV4LCBpbWcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoKGluZGV4ICsgMSkgJSBjb2xzID09PSAwKSB7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gdHVybkJyaWNrKHRpbGUsIGluZGV4LCBpbWcpIHtcblxuICAgICAgICBpbWcuc3JjID0gXCJpbWFnZS9tZW1vcnkvXCIgKyB0aWxlICsgXCIucG5nXCI7XG5cbiAgICAgICAgaWYgKCF0dXJuMSkge1xuICAgICAgICAgICAgdHVybjEgPSBpbWc7XG4gICAgICAgICAgICBsYXN0VGlsZSA9IHRpbGU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaW1nID09PSB0dXJuMSkge3JldHVybjt9XG5cbiAgICAgICAgICAgIHR1cm4yID0gaW1nO1xuXG4gICAgICAgICAgICBpZiAodGlsZSA9PT0gbGFzdFRpbGUpIHtcbiAgICAgICAgICAgICAgICBwYWlyQ291bnQgKz0gMTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwYWlyQ291bnQpO1xuICAgICAgICAgICAgICAgIGlmIChwYWlyQ291bnQgPT09IDgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyMi5xdWVyeVNlbGVjdG9yKFwiI21lbW9yeVwiKS5jbGFzc0xpc3QuYWRkKFwiYmxvY2tSZW1vdmVcIik7XG4gICAgICAgICAgICAgICAgICAgIFRMLmNsYXNzTGlzdC5hZGQoXCJibG9ja1JlbW92ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyMi5xdWVyeVNlbGVjdG9yKFwiI21lbVdpblwiKS5jbGFzc0xpc3QuYWRkKFwiYmxvY2tBZGRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHR1cm4xLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZChcInJlbW92ZWRcIik7XG4gICAgICAgICAgICAgICAgdHVybjIucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKFwicmVtb3ZlZFwiKTtcblxuICAgICAgICAgICAgICAgIHR1cm4xID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0dXJuMiA9IG51bGw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB0dXJuMS5zcmMgPSBcImltYWdlL21lbW9yeS8wLnBuZ1wiO1xuICAgICAgICAgICAgICAgICAgICB0dXJuMi5zcmMgPSBcImltYWdlL21lbW9yeS8wLnBuZ1wiO1xuXG4gICAgICAgICAgICAgICAgICAgIHRyaWVzTGVmdCAtPSAxO1xuICAgICAgICAgICAgICAgICAgICBUTC5pbm5lckhUTUwgPSBcIkF0dGVtcHRzIGxlZnQ6IFwiICsgdHJpZXNMZWZ0O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmllc0xlZnQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lcjIucXVlcnlTZWxlY3RvcihcIiNtZW1vcnlcIikuY2xhc3NMaXN0LmFkZChcImJsb2NrUmVtb3ZlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgVEwuY2xhc3NMaXN0LmFkZChcImJsb2NrUmVtb3ZlXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyMi5xdWVyeVNlbGVjdG9yKFwiI21lbUxvc2VcIikuY2xhc3NMaXN0LmFkZChcImJsb2NrQWRkXCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdHVybjEgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB0dXJuMiA9IG51bGw7XG4gICAgICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UGljdHVyZUFycmF5KHJvd3MsIGNvbHMpIHtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIHZhciBhcnIgPSBbXTtcbiAgICAgICAgZm9yIChpID0gMTsgaSA8PSAocm93cyAqIGNvbHMpIC8gMjsgaSArPSAxKSB7XG4gICAgICAgICAgICBhcnIucHVzaChpKTtcbiAgICAgICAgICAgIGFyci5wdXNoKGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpID0gYXJyLmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICAgIHZhciBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGkgKyAxKSk7XG4gICAgICAgICAgICB2YXIgdGVtcCA9IGFycltpXTtcbiAgICAgICAgICAgIGFycltpXSA9IGFycltqXTtcbiAgICAgICAgICAgIGFycltqXSA9IHRlbXA7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXJyO1xuICAgIH1cbn07XG4iXX0=
