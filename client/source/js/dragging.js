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
