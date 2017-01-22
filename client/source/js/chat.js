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
