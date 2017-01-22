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
