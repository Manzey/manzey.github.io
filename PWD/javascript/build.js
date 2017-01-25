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
        new Drag(chatID, chatHead);
        new Chat(cloneNode);

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
        new Drag(memID, memHead);
        new Memory(4,4, cloneNode);

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
        new Drag(HLID, HLHead);
        new HighLow(cloneNode);

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

module.exports = function Chat(element) {
    var userNameInput = element.querySelector("#userNameInput");
    var serverInput = element.querySelector("#serverInput");
    var channelInput = element.querySelector("#channelInput");
    var socket = new WebSocket("ws://" + "vhost3.lnu.se:20080/socket/");
    var api = "eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd";
    var username = "";
    var message = "";
    var messageBox = element.querySelector("#message");
    var inputField = element.querySelector("#sendinput");

    //Settings start
    if (localStorage.getItem("username")) {
        element.querySelector("#infoform").classList.add("class", "blockRemove");
        element.querySelector("#chat").classList.add("class", "blockAdd");
        userNameInput.value = localStorage.getItem("username");
        channelInput.value = localStorage.getItem("channel");
        serverInput.value = localStorage.getItem("server");
    }

    userNameInput.addEventListener("input", function() {
        if (userNameInput.value.length > 0 && serverInput.value.length > 0) {
            element.querySelector("#userNameSend").removeAttribute("disabled");
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
        console.log(event.data);
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
            div.offsetLeft - e.clientX,
            div.offsetTop - e.clientY
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
        console.log(numGuess);
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

// Used the memory from the exercises, even though I am more than capable of building one of my own with all
// the new stuff I've learned, I saved time by taking this one.
module.exports = function(rows, cols, container2) {
    var a;
    var tiles = [];
    var turn1;
    var turn2;
    var lastTile;
    var triesLeft = 20;
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
                    TL.innerHTML = "Tries left: " + triesLeft;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2hvbWUvdmFncmFudC8ubnZtL3ZlcnNpb25zL25vZGUvdjcuMy4wL2xpYi9ub2RlX21vZHVsZXMvd2F0Y2hpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImNsaWVudC9zb3VyY2UvanMvRGVza3RvcC5qcyIsImNsaWVudC9zb3VyY2UvanMvYXBwLmpzIiwiY2xpZW50L3NvdXJjZS9qcy9jaGF0LmpzIiwiY2xpZW50L3NvdXJjZS9qcy9kcmFnZ2luZy5qcyIsImNsaWVudC9zb3VyY2UvanMvaGlnaGxvdy5qcyIsImNsaWVudC9zb3VyY2UvanMvbWVtb3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hbnplIG9uIDIwMTctMDEtMjIuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgRHJhZyA9IHJlcXVpcmUoXCIuL2RyYWdnaW5nLmpzXCIpO1xuICAgIHZhciBNZW1vcnkgPSByZXF1aXJlKFwiLi9tZW1vcnkuanNcIik7XG4gICAgdmFyIEhpZ2hMb3cgPSByZXF1aXJlKFwiLi9oaWdobG93LmpzXCIpO1xuICAgIHZhciBDaGF0ID0gcmVxdWlyZShcIi4vY2hhdC5qc1wiKTtcblxuICAgIHZhciBkZXNrdG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXNrdG9wXCIpO1xuICAgIHZhciB6SW5kZXggPSAxO1xuXG4gICAgLy8gTWVtb3J5IHZhcmlhYmxlc1xuICAgIHZhciBtZW1JY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtZW1JY29uXCIpO1xuICAgIHZhciBtZW1vcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21lbW9yeVRlbXBcIik7XG4gICAgdmFyIG1lbVdpbmRvdyA9IG1lbW9yeS5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVtV2luRGl2XCIpO1xuICAgIHZhciBtZW1XaW5kb3cyID0gbWVtb3J5LmNvbnRlbnQucXVlcnlTZWxlY3RvcihcIi5tZW1XaW5EaXZIZWFkXCIpO1xuICAgIHZhciBtZW1Db3VudCA9IDA7XG5cbiAgICAvLyBDaGF0IHZhcmlhYmxlc1xuICAgIHZhciBjaGF0SWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hhdEljb25cIik7XG4gICAgdmFyIGNoYXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoYXRUZW1wXCIpO1xuICAgIHZhciBjaGF0V2luZG93ID0gY2hhdC5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2hhdFdpbkRpdlwiKTtcbiAgICB2YXIgY2hhdFdpbmRvdzIgPSBjaGF0LmNvbnRlbnQucXVlcnlTZWxlY3RvcihcIi5jaGF0V2luRGl2SGVhZFwiKTtcbiAgICB2YXIgY2hhdENvdW50ID0gMDtcblxuICAgIC8vIEhpZ2ggTG93IHZhcmlhYmxlc1xuICAgIHZhciBoaWdobG93SWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaGlnaGxvd0ljb25cIik7XG4gICAgdmFyIGhpZ2hsb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hpZ2hsb3dUZW1wXCIpO1xuICAgIHZhciBITFdpbmRvdyA9IGhpZ2hsb3cuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiLkhMV2luRGl2XCIpO1xuICAgIHZhciBITFdpbmRvdzIgPSBoaWdobG93LmNvbnRlbnQucXVlcnlTZWxlY3RvcihcIi5ITFdpbkRpdkhlYWRcIik7XG4gICAgdmFyIEhMQ291bnQgPSAwO1xuXG4gICAgLy8gT3BlbiB0aGUgYXBwcyFcbiAgICBjaGF0SWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIE9wZW4gdGhlIHdpbmRvd1xuICAgICAgICB2YXIgY2hhdElEID0gY2hhdFdpbmRvdy5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgICAgICAgdmFyIGNoYXRIZWFkID0gY2hhdFdpbmRvdzIuZ2V0QXR0cmlidXRlKFwiaWRcIik7XG4gICAgICAgIHZhciBjbG9uZU5vZGUgPSBjaGF0LmNvbnRlbnQucXVlcnlTZWxlY3RvcihcIiNcIiArIGNoYXRJRCkuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICBkZXNrdG9wLmFwcGVuZENoaWxkKGNsb25lTm9kZSk7XG4gICAgICAgIG5ldyBEcmFnKGNoYXRJRCwgY2hhdEhlYWQpO1xuICAgICAgICBuZXcgQ2hhdChjbG9uZU5vZGUpO1xuXG4gICAgICAgIC8vIENsb3NlIHRoZSB3aW5kb3dcbiAgICAgICAgdmFyIGNsb3NlQnV0dG9uID0gY2xvbmVOb2RlLnF1ZXJ5U2VsZWN0b3IoXCIjY2xvc2VCdXR0b25cIik7XG4gICAgICAgIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRlc2t0b3AucmVtb3ZlQ2hpbGQoY2xvbmVOb2RlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gRm9jdXMgdGhlIHdpbmRvd1xuICAgICAgICBjbG9uZU5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgY2xvbmVOb2RlLnN0eWxlLnpJbmRleCA9IHpJbmRleCArMTtcbiAgICAgICAgICAgIHpJbmRleCArPSAxO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBQcmVwYXJlIHRoZSBuZXh0IHdpbmRvd1xuICAgICAgICBjaGF0Q291bnQgKz0gMTtcbiAgICAgICAgY2hhdFdpbmRvdy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBjaGF0SUQgKyAxKTtcbiAgICAgICAgY2hhdFdpbmRvdzIuc2V0QXR0cmlidXRlKFwiaWRcIiwgY2hhdEhlYWQgKyAxKTtcblxuICAgIH0pO1xuXG4gICAgbWVtSWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gT3BlbiB0aGUgd2luZG93XG4gICAgICAgIHZhciBtZW1JRCA9IG1lbVdpbmRvdy5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgICAgICAgdmFyIG1lbUhlYWQgPSBtZW1XaW5kb3cyLmdldEF0dHJpYnV0ZShcImlkXCIpO1xuICAgICAgICB2YXIgY2xvbmVOb2RlID0gbWVtb3J5LmNvbnRlbnQucXVlcnlTZWxlY3RvcihcIiNcIiArIG1lbUlEKS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgIGRlc2t0b3AuYXBwZW5kQ2hpbGQoY2xvbmVOb2RlKTtcbiAgICAgICAgbmV3IERyYWcobWVtSUQsIG1lbUhlYWQpO1xuICAgICAgICBuZXcgTWVtb3J5KDQsNCwgY2xvbmVOb2RlKTtcblxuICAgICAgICAvLyBDbG9zZSB0aGUgd2luZG93XG4gICAgICAgIHZhciBjbG9zZUJ1dHRvbiA9IGNsb25lTm9kZS5xdWVyeVNlbGVjdG9yKFwiI2Nsb3NlQnV0dG9uXCIpO1xuICAgICAgICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkZXNrdG9wLnJlbW92ZUNoaWxkKGNsb25lTm9kZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEZvY3VzIHRoZSB3aW5kb3dcbiAgICAgICAgY2xvbmVOb2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjbG9uZU5vZGUuc3R5bGUuekluZGV4ID0gekluZGV4ICsgMTtcbiAgICAgICAgICAgIHpJbmRleCArPSAxO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBQcmVwYXJlIHRoZSBuZXh0IHdpbmRvdy5cbiAgICAgICAgbWVtQ291bnQgKz0gMTtcbiAgICAgICAgbWVtV2luZG93LnNldEF0dHJpYnV0ZShcImlkXCIsIChtZW1JRCArIG1lbUNvdW50KSk7XG4gICAgICAgIG1lbVdpbmRvdzIuc2V0QXR0cmlidXRlKFwiaWRcIiwgKG1lbUhlYWQgKyBtZW1Db3VudCkpO1xuICAgIH0pO1xuXG4gICAgaGlnaGxvd0ljb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBPcGVuIHRoZSB3aW5kb3dcbiAgICAgICAgdmFyIEhMSUQgPSBITFdpbmRvdy5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgICAgICAgdmFyIEhMSGVhZCA9IEhMV2luZG93Mi5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgICAgICAgdmFyIGNsb25lTm9kZSA9IGhpZ2hsb3cuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiI1wiICsgSExJRCkuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICBkZXNrdG9wLmFwcGVuZENoaWxkKGNsb25lTm9kZSk7XG4gICAgICAgIG5ldyBEcmFnKEhMSUQsIEhMSGVhZCk7XG4gICAgICAgIG5ldyBIaWdoTG93KGNsb25lTm9kZSk7XG5cbiAgICAgICAgLy8gQ2xvc2UgdGhlIHdpbmRvd1xuICAgICAgICB2YXIgY2xvc2VCdXR0b24gPSBjbG9uZU5vZGUucXVlcnlTZWxlY3RvcihcIiNjbG9zZUJ1dHRvblwiKTtcbiAgICAgICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZGVza3RvcC5yZW1vdmVDaGlsZChjbG9uZU5vZGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBGb2N1cyB0aGUgd2luZG93XG4gICAgICAgIGNsb25lTm9kZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY2xvbmVOb2RlLnN0eWxlLnpJbmRleCA9IHpJbmRleCArIDE7XG4gICAgICAgICAgICB6SW5kZXggKz0gMTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUHJlcGFyZSB0aGUgbmV4dCB3aW5kb3dcbiAgICAgICAgSExDb3VudCArPSAxO1xuICAgICAgICBITFdpbmRvdy5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBITElEICsgSExDb3VudCk7XG4gICAgICAgIEhMV2luZG93Mi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBITEhlYWQgKyBITENvdW50KTtcbiAgICB9KTtcblxuICAgIC8vIE9wZW4gdGhlIGFwcHMgZW5kXG5cbn07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgbWFuemUgb24gMjAxNy0wMS0wMS5cbiAqL1xudmFyIERyYWcgPSByZXF1aXJlKFwiLi9kcmFnZ2luZy5qc1wiKTtcbnZhciBNZW1vcnkgPSByZXF1aXJlKFwiLi9tZW1vcnkuanNcIik7XG52YXIgSGlnaExvdyA9IHJlcXVpcmUoXCIuL2hpZ2hsb3cuanNcIik7XG52YXIgQ2hhdCA9IHJlcXVpcmUoXCIuL2NoYXQuanNcIik7XG52YXIgRGVza3RvcCA9IHJlcXVpcmUoXCIuL0Rlc2t0b3AuanNcIik7XG5cblxuXG5uZXcgRGVza3RvcCgpO1xuXG4vL25ldyBDaGF0KCk7XG5cbi8vbmV3IEhpZ2hMb3coKTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBtYW56ZSBvbiAyMDE3LTAxLTE5LlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gQ2hhdChlbGVtZW50KSB7XG4gICAgdmFyIHVzZXJOYW1lSW5wdXQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlck5hbWVJbnB1dFwiKTtcbiAgICB2YXIgc2VydmVySW5wdXQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VydmVySW5wdXRcIik7XG4gICAgdmFyIGNoYW5uZWxJbnB1dCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaGFubmVsSW5wdXRcIik7XG4gICAgdmFyIHNvY2tldCA9IG5ldyBXZWJTb2NrZXQoXCJ3czovL1wiICsgXCJ2aG9zdDMubG51LnNlOjIwMDgwL3NvY2tldC9cIik7XG4gICAgdmFyIGFwaSA9IFwiZURCRTc2ZGVVN0wwSDltRUJneFVLVlIwVkNucTBYQmRcIjtcbiAgICB2YXIgdXNlcm5hbWUgPSBcIlwiO1xuICAgIHZhciBtZXNzYWdlID0gXCJcIjtcbiAgICB2YXIgbWVzc2FnZUJveCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiNtZXNzYWdlXCIpO1xuICAgIHZhciBpbnB1dEZpZWxkID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlbmRpbnB1dFwiKTtcblxuICAgIC8vU2V0dGluZ3Mgc3RhcnRcbiAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VybmFtZVwiKSkge1xuICAgICAgICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaW5mb2Zvcm1cIikuY2xhc3NMaXN0LmFkZChcImNsYXNzXCIsIFwiYmxvY2tSZW1vdmVcIik7XG4gICAgICAgIGVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaGF0XCIpLmNsYXNzTGlzdC5hZGQoXCJjbGFzc1wiLCBcImJsb2NrQWRkXCIpO1xuICAgICAgICB1c2VyTmFtZUlucHV0LnZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VybmFtZVwiKTtcbiAgICAgICAgY2hhbm5lbElucHV0LnZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjaGFubmVsXCIpO1xuICAgICAgICBzZXJ2ZXJJbnB1dC52YWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwic2VydmVyXCIpO1xuICAgIH1cblxuICAgIHVzZXJOYW1lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodXNlck5hbWVJbnB1dC52YWx1ZS5sZW5ndGggPiAwICYmIHNlcnZlcklucHV0LnZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VyTmFtZVNlbmRcIikucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHNlcnZlcklucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHVzZXJOYW1lSW5wdXQudmFsdWUubGVuZ3RoID4gMCAmJiBzZXJ2ZXJJbnB1dC52YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlck5hbWVTZW5kXCIpLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlck5hbWVTZW5kXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ1c2VybmFtZVwiLCB1c2VyTmFtZUlucHV0LnZhbHVlKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzZXJ2ZXJcIiwgc2VydmVySW5wdXQudmFsdWUpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImNoYW5uZWxcIiwgY2hhbm5lbElucHV0LnZhbHVlKTtcbiAgICAgICAgZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI2luZm9mb3JtXCIpLmNsYXNzTGlzdC5hZGQoXCJjbGFzc1wiLCBcImJsb2NrUmVtb3ZlXCIpO1xuICAgICAgICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hhdFwiKS5jbGFzc0xpc3QuYWRkKFwiY2xhc3NcIiwgXCJibG9ja0FkZFwiKTtcbiAgICB9KTtcbiAgICAvL1NldHRpbmdzIGVuZFxuXG4gICAgaW5wdXRGaWVsZC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VuZGlucHV0XCIpLnZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZW5kXCIpLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBzb2NrZXQub25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIHNlcnZlck1lc3NhZ2UgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpO1xuICAgICAgICBjb25zb2xlLmxvZyhldmVudC5kYXRhKTtcbiAgICAgICAgaWYgKHNlcnZlck1lc3NhZ2UuY2hhbm5lbCA9PT0gY2hhbm5lbElucHV0LnZhbHVlKSB7XG5cbiAgICAgICAgICAgIGlmIChzZXJ2ZXJNZXNzYWdlLnR5cGUgPT09IFwibWVzc2FnZVwiKSB7XG4gICAgICAgICAgICAgICAgdXNlcm5hbWUgPSAoc2VydmVyTWVzc2FnZS51c2VybmFtZSk7XG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9IChzZXJ2ZXJNZXNzYWdlLmRhdGEpO1xuXG4gICAgICAgICAgICAgICAgLy9BcHBlbmQgdGhlIG1lc3NhZ2VcbiAgICAgICAgICAgICAgICB2YXIgY2hhdE1lc3NhZ2UgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh1c2VybmFtZSArIFwiOiBcIiArIG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VCb3guYXBwZW5kQ2hpbGQoY2hhdE1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VCb3guYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJyXCIpKTtcblxuICAgICAgICAgICAgICAgIHZhciBib3R0b21TY3JvbGwgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hhdGJveFwiKTtcbiAgICAgICAgICAgICAgICBib3R0b21TY3JvbGwuc2Nyb2xsVG9wID0gYm90dG9tU2Nyb2xsLnNjcm9sbEhlaWdodDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgfTtcbiAgICBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VuZFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRhdGFTZW50ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlbmRpbnB1dFwiKS52YWx1ZTtcbiAgICAgICAgdmFyIGpzb247XG4gICAgICAgIGlmIChkYXRhU2VudC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBqc29uID0ge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwibWVzc2FnZVwiLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFTZW50LFxuICAgICAgICAgICAgICAgIHVzZXJuYW1lOiB1c2VyTmFtZUlucHV0LnZhbHVlLFxuICAgICAgICAgICAgICAgIGNoYW5uZWw6IGNoYW5uZWxJbnB1dC52YWx1ZSxcbiAgICAgICAgICAgICAgICBrZXk6IGFwaX07XG4gICAgICAgIH1cblxuICAgICAgICBzb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeShqc29uKSk7XG4gICAgICAgIGVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZW5kXCIpLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XG4gICAgICAgIGVsZW1lbnQucXVlcnlTZWxlY3RvcihcImZvcm1cIikucmVzZXQoKTtcbiAgICB9KTtcblxufTtcbiIsIi8vRm91bmQgYSBncmVhdCBzb2x1dGlvbiBodHRwOi8vanNmaWRkbGUubmV0L2Y1RU1ULzEvXG4vL0FkanVzdGVkIGl0IHRvIHdvcmsgZm9yIG1lLCB0cmllZCBtYWtpbmcgb25lIG9uIG15IG93biwgYnV0IGhhZCBpc3N1ZXMgd2l0aCBtb3ZpbmcgdGhlIHdpbmRvdyBieSBkcmFnZ2luZyBhdCB0aGUgdG9wLlxuLy9JbnN0ZWFkIGl0IGRyYWdnZWQgZXZlcnl3aGVyZS5cblxuZnVuY3Rpb24gRHJhZyhkaXZ2LCBkaXZ2Mikge1xuICAgIHZhciBtb3VzZVBvc2l0aW9uO1xuICAgIHZhciBvZmZzZXQgPSBbMCwwXTtcbiAgICB2YXIgaXNEb3duID0gZmFsc2U7XG5cbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNcIiArIGRpdnYpO1xuICAgIHZhciBkaXYyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNcIiArIGRpdnYyKTtcblxuICAgIGRpdjIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpc0Rvd24gPSB0cnVlO1xuICAgICAgICBvZmZzZXQgPSBbXG4gICAgICAgICAgICBkaXYub2Zmc2V0TGVmdCAtIGUuY2xpZW50WCxcbiAgICAgICAgICAgIGRpdi5vZmZzZXRUb3AgLSBlLmNsaWVudFlcbiAgICAgICAgXTtcbiAgICB9LCB0cnVlKTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXNEb3duID0gZmFsc2U7XG4gICAgfSwgdHJ1ZSk7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoaXNEb3duKSB7XG4gICAgICAgICAgICBtb3VzZVBvc2l0aW9uID0ge1xuXG4gICAgICAgICAgICAgICAgeCA6IGV2ZW50LmNsaWVudFgsXG4gICAgICAgICAgICAgICAgeSA6IGV2ZW50LmNsaWVudFlcblxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGRpdi5zdHlsZS5sZWZ0ID0gKG1vdXNlUG9zaXRpb24ueCArIG9mZnNldFswXSkgKyAncHgnO1xuICAgICAgICAgICAgZGl2LnN0eWxlLnRvcCAgPSAobW91c2VQb3NpdGlvbi55ICsgb2Zmc2V0WzFdKSArICdweCc7XG4gICAgICAgIH1cbiAgICB9LCB0cnVlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gRHJhZztcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBtYW56ZSBvbiAyMDE3LTAxLTE1LlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICB2YXIgc3VibWl0ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI3N1Ym1pdFwiKTtcbiAgICB2YXIgcmVzZXQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVzZXRcIik7XG4gICAgdmFyIG51bUd1ZXNzID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwMCAtIDEpKSArIDE7XG4gICAgdmFyIGltYWdlID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI2hpZ2hMb3dJbWFnZVwiKTtcbiAgICB2YXIgYXR0ZW1wdCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiNhdHRlbXB0XCIpO1xuICAgIHZhciBhdHRlbXB0Q291bnQgPSAxMDtcblxuICAgIHN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZ2FtZSk7XG5cbiAgICByZXNldC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGF0dGVtcHRDb3VudCA9IDEwO1xuICAgICAgICBhdHRlbXB0LmlubmVySFRNTCA9IGF0dGVtcHRDb3VudDtcbiAgICAgICAgc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBnYW1lKTtcbiAgICAgICAgcmVzZXQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJibG9ja1JlbW92ZVwiKTtcbiAgICAgICAgaW1hZ2Uuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJibG9ja1JlbW92ZVwiKTtcbiAgICAgICAgbnVtR3Vlc3MgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAwIC0gMSkpICsgMTtcbiAgICB9KTtcblxuXG4gICAgZnVuY3Rpb24gZ2FtZSgpIHtcbiAgICAgICAgdmFyIGd1ZXNzID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI2d1ZXNzXCIpLnZhbHVlO1xuICAgICAgICBjb25zb2xlLmxvZyhudW1HdWVzcyk7XG4gICAgICAgIGltYWdlLmNsYXNzTGlzdC5hZGQoXCJibG9ja0FkZFwiKTtcbiAgICAgICAgaWYgKGlzTmFOKGd1ZXNzKSkge1xuICAgICAgICAgICAgaW1hZ2Uuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiaW1hZ2UvaGlnaGxvdy9uYW4ucG5nXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGd1ZXNzIDwgbnVtR3Vlc3MpIHtcbiAgICAgICAgICAgICAgICBhdHRlbXB0Q291bnQgLT0gMTtcbiAgICAgICAgICAgICAgICBhdHRlbXB0LmlubmVySFRNTCA9IGF0dGVtcHRDb3VudDtcbiAgICAgICAgICAgICAgICBub0F0dGVtcHRzKCk7XG4gICAgICAgICAgICAgICAgaW1hZ2Uuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiaW1hZ2UvaGlnaGxvdy9oaWdoZXIucG5nXCIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChndWVzcyA+IG51bUd1ZXNzKSB7XG4gICAgICAgICAgICAgICAgYXR0ZW1wdENvdW50IC09IDE7XG4gICAgICAgICAgICAgICAgYXR0ZW1wdC5pbm5lckhUTUwgPSBhdHRlbXB0Q291bnQ7XG4gICAgICAgICAgICAgICAgbm9BdHRlbXB0cygpO1xuICAgICAgICAgICAgICAgIGltYWdlLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImltYWdlL2hpZ2hsb3cvbG93ZXIucG5nXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbWFnZS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCJpbWFnZS9oaWdobG93L2NvcnJlY3QucG5nXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGF0dGVtcHRDb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGltYWdlLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImltYWdlL2hpZ2hsb3cvbG9zZS5wbmdcIik7XG4gICAgICAgICAgICAgICAgcmVzZXQuY2xhc3NMaXN0LmFkZChcImlubGluZUFkZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5vQXR0ZW1wdHMoKSB7XG4gICAgICAgIGlmIChhdHRlbXB0Q291bnQgPT09IDApIHtcbiAgICAgICAgICAgIHN1Ym1pdC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZ2FtZSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IG1hbnplIG9uIDIwMTctMDEtMTQuXG4gKi9cblxuLy8gVXNlZCB0aGUgbWVtb3J5IGZyb20gdGhlIGV4ZXJjaXNlcywgZXZlbiB0aG91Z2ggSSBhbSBtb3JlIHRoYW4gY2FwYWJsZSBvZiBidWlsZGluZyBvbmUgb2YgbXkgb3duIHdpdGggYWxsXG4vLyB0aGUgbmV3IHN0dWZmIEkndmUgbGVhcm5lZCwgSSBzYXZlZCB0aW1lIGJ5IHRha2luZyB0aGlzIG9uZS5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocm93cywgY29scywgY29udGFpbmVyMikge1xuICAgIHZhciBhO1xuICAgIHZhciB0aWxlcyA9IFtdO1xuICAgIHZhciB0dXJuMTtcbiAgICB2YXIgdHVybjI7XG4gICAgdmFyIGxhc3RUaWxlO1xuICAgIHZhciB0cmllc0xlZnQgPSAyMDtcbiAgICB2YXIgcGFpckNvdW50ID0gMDtcbiAgICB2YXIgVEwgPSBjb250YWluZXIyLnF1ZXJ5U2VsZWN0b3IoXCIjdHJpZXNMZWZ0XCIpO1xuXG4gICAgdGlsZXMgPSBnZXRQaWN0dXJlQXJyYXkocm93cywgY29scyk7XG4gICAgdmFyIGNvbnRhaW5lciA9IGNvbnRhaW5lcjIucXVlcnlTZWxlY3RvcihcIiNtZW1vcnlcIik7XG4gICAgdmFyIHRlbXBsYXRlID0gY29udGFpbmVyMi5xdWVyeVNlbGVjdG9yQWxsKFwiI21lbW9yeSB0ZW1wbGF0ZVwiKVswXS5jb250ZW50LmZpcnN0RWxlbWVudENoaWxkO1xuXG4gICAgdGlsZXMuZm9yRWFjaChmdW5jdGlvbih0aWxlLCBpbmRleCkge1xuICAgICAgICBhID0gdGVtcGxhdGUuY2xvbmVOb2RlKHRydWUpO1xuXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChhKTtcblxuICAgICAgICBhLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIGltZyA9IGV2ZW50LnRhcmdldC5ub2RlTmFtZSA9PT0gXCJJTUdcIiA/IGV2ZW50LnRhcmdldCA6IGV2ZW50LnRhcmdldC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICAgIHR1cm5Ccmljayh0aWxlLCBpbmRleCwgaW1nKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKChpbmRleCArIDEpICUgY29scyA9PT0gMCkge1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJiclwiKSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHR1cm5Ccmljayh0aWxlLCBpbmRleCwgaW1nKSB7XG5cbiAgICAgICAgaW1nLnNyYyA9IFwiaW1hZ2UvbWVtb3J5L1wiICsgdGlsZSArIFwiLnBuZ1wiO1xuXG4gICAgICAgIGlmICghdHVybjEpIHtcbiAgICAgICAgICAgIHR1cm4xID0gaW1nO1xuICAgICAgICAgICAgbGFzdFRpbGUgPSB0aWxlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGltZyA9PT0gdHVybjEpIHtyZXR1cm47fVxuXG4gICAgICAgICAgICB0dXJuMiA9IGltZztcblxuICAgICAgICAgICAgaWYgKHRpbGUgPT09IGxhc3RUaWxlKSB7XG4gICAgICAgICAgICAgICAgcGFpckNvdW50ICs9IDE7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocGFpckNvdW50KTtcbiAgICAgICAgICAgICAgICBpZiAocGFpckNvdW50ID09PSA4KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lcjIucXVlcnlTZWxlY3RvcihcIiNtZW1vcnlcIikuY2xhc3NMaXN0LmFkZChcImJsb2NrUmVtb3ZlXCIpO1xuICAgICAgICAgICAgICAgICAgICBUTC5jbGFzc0xpc3QuYWRkKFwiYmxvY2tSZW1vdmVcIik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lcjIucXVlcnlTZWxlY3RvcihcIiNtZW1XaW5cIikuY2xhc3NMaXN0LmFkZChcImJsb2NrQWRkXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0dXJuMS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoXCJyZW1vdmVkXCIpO1xuICAgICAgICAgICAgICAgIHR1cm4yLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZChcInJlbW92ZWRcIik7XG5cbiAgICAgICAgICAgICAgICB0dXJuMSA9IG51bGw7XG4gICAgICAgICAgICAgICAgdHVybjIgPSBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdHVybjEuc3JjID0gXCJpbWFnZS9tZW1vcnkvMC5wbmdcIjtcbiAgICAgICAgICAgICAgICAgICAgdHVybjIuc3JjID0gXCJpbWFnZS9tZW1vcnkvMC5wbmdcIjtcblxuICAgICAgICAgICAgICAgICAgICB0cmllc0xlZnQgLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgVEwuaW5uZXJIVE1MID0gXCJUcmllcyBsZWZ0OiBcIiArIHRyaWVzTGVmdDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodHJpZXNMZWZ0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXIyLnF1ZXJ5U2VsZWN0b3IoXCIjbWVtb3J5XCIpLmNsYXNzTGlzdC5hZGQoXCJibG9ja1JlbW92ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFRMLmNsYXNzTGlzdC5hZGQoXCJibG9ja1JlbW92ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lcjIucXVlcnlTZWxlY3RvcihcIiNtZW1Mb3NlXCIpLmNsYXNzTGlzdC5hZGQoXCJibG9ja0FkZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHR1cm4xID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdHVybjIgPSBudWxsO1xuICAgICAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFBpY3R1cmVBcnJheShyb3dzLCBjb2xzKSB7XG4gICAgICAgIHZhciBpO1xuICAgICAgICB2YXIgYXJyID0gW107XG4gICAgICAgIGZvciAoaSA9IDE7IGkgPD0gKHJvd3MgKiBjb2xzKSAvIDI7IGkgKz0gMSkge1xuICAgICAgICAgICAgYXJyLnB1c2goaSk7XG4gICAgICAgICAgICBhcnIucHVzaChpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaSA9IGFyci5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgICB2YXIgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xuICAgICAgICAgICAgdmFyIHRlbXAgPSBhcnJbaV07XG4gICAgICAgICAgICBhcnJbaV0gPSBhcnJbal07XG4gICAgICAgICAgICBhcnJbal0gPSB0ZW1wO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFycjtcbiAgICB9XG59O1xuIl19
