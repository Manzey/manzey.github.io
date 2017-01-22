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
