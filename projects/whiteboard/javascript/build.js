(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by manze on 2017-07-02.
 */

$(document).ready(function() {
    var $myCanvas = $("#myCanvas");
    var $whiteboard = $("#whiteboard");
    var ctx = $myCanvas[0].getContext("2d");
    var canvasX;
    var canvasY;
    var mouseDown = false;
    var color = "#1f4ff1";

    // Initialize canvas.
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, $myCanvas[0].width, $myCanvas[0].height);

    $myCanvas.width = window.innerWidth;
    $myCanvas.height = window.innerHeight;
    $myCanvas.mousedown(function() {
        mouseDown = true;
        ctx.beginPath();

    });

    $("#colorpick").change(function() {
        color = $("#colorpick")[0].value;
        console.log(color);
    });

    // Initialize canvas over.

    // Mouse events begin.
    $myCanvas.mouseup(function() {
        mouseDown = false;
        ctx.closePath();
    });

    $myCanvas.mousemove(function(e) {
        if (mouseDown === true) {
            canvasX = e.pageX  - this.offsetLeft;
            canvasY = e.pageY  - this.offsetTop;
            ctx.lineTo(canvasX, canvasY);
            ctx.strokeStyle = color;
            ctx.stroke();
        }
    });

    $myCanvas.mouseleave(function() {
        mouseDown = false;
        ctx.closePath();
    });

    // Mouse events end.

    // Menu begin.

    // Clear canvas.
    $("#clearicon").click(function() {
        ctx.clearRect(0, 0, $myCanvas.width, $myCanvas.height);
    });

    // Save and download file
    $("#downloadicon").click(function() {
        if (confirm("Do you want to save your image?\n(This will redirect you to your image right away)")) {
            window.location.href = $myCanvas[0].toDataURL("image/png");
        } else {
            console.log("NOT SAVED");
        }
    });

    // Fill canvas
    $("#backgroundicon").click(function() {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, $myCanvas[0].width, $myCanvas[0].height);
    });

    // Line settings
    $("#linesicon").click(function() {
        $("#lineselection").show();
    });

    $("#line1").click(function() {
        ctx.lineWidth = 1;
    });

    $("#line2").click(function() {
        ctx.lineWidth = 8;
    });

    $("#line3").click(function() {
        ctx.lineWidth = 16;
    });

    function dropDown() {
        var o = $("#linesicon").offset();
        var h = $("#linesicon").height();
        var w = $("#linesicon").width();
        $("#lineselection").css({top: o.top,
            left: o.left,
            width: w,
            height: h
        });
    }

    dropDown();
    window.onresize = function() {
        dropDown();
    };

    window.addEventListener('click', function(e) {
        if (document.getElementById('lineselection').contains(e.target) || document.getElementById('linesicon').contains(e.target)){
            console.log("clicked in");
        } else {
            console.log("clicked out");
            $("#lineselection").hide();
        }
    });
    // Menu end.
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3Vzci9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvc291cmNlL2pzL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQ3JlYXRlZCBieSBtYW56ZSBvbiAyMDE3LTA3LTAyLlxuICovXG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIHZhciAkbXlDYW52YXMgPSAkKFwiI215Q2FudmFzXCIpO1xuICAgIHZhciAkd2hpdGVib2FyZCA9ICQoXCIjd2hpdGVib2FyZFwiKTtcbiAgICB2YXIgY3R4ID0gJG15Q2FudmFzWzBdLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB2YXIgY2FudmFzWDtcbiAgICB2YXIgY2FudmFzWTtcbiAgICB2YXIgbW91c2VEb3duID0gZmFsc2U7XG4gICAgdmFyIGNvbG9yID0gXCIjMWY0ZmYxXCI7XG5cbiAgICAvLyBJbml0aWFsaXplIGNhbnZhcy5cbiAgICBjdHguZmlsbFN0eWxlID0gXCJncmF5XCI7XG4gICAgY3R4LmZpbGxSZWN0KDAsIDAsICRteUNhbnZhc1swXS53aWR0aCwgJG15Q2FudmFzWzBdLmhlaWdodCk7XG5cbiAgICAkbXlDYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAkbXlDYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICRteUNhbnZhcy5tb3VzZWRvd24oZnVuY3Rpb24oKSB7XG4gICAgICAgIG1vdXNlRG93biA9IHRydWU7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcblxuICAgIH0pO1xuXG4gICAgJChcIiNjb2xvcnBpY2tcIikuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICBjb2xvciA9ICQoXCIjY29sb3JwaWNrXCIpWzBdLnZhbHVlO1xuICAgICAgICBjb25zb2xlLmxvZyhjb2xvcik7XG4gICAgfSk7XG5cbiAgICAvLyBJbml0aWFsaXplIGNhbnZhcyBvdmVyLlxuXG4gICAgLy8gTW91c2UgZXZlbnRzIGJlZ2luLlxuICAgICRteUNhbnZhcy5tb3VzZXVwKGZ1bmN0aW9uKCkge1xuICAgICAgICBtb3VzZURvd24gPSBmYWxzZTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIH0pO1xuXG4gICAgJG15Q2FudmFzLm1vdXNlbW92ZShmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChtb3VzZURvd24gPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNhbnZhc1ggPSBlLnBhZ2VYICAtIHRoaXMub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgIGNhbnZhc1kgPSBlLnBhZ2VZICAtIHRoaXMub2Zmc2V0VG9wO1xuICAgICAgICAgICAgY3R4LmxpbmVUbyhjYW52YXNYLCBjYW52YXNZKTtcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkbXlDYW52YXMubW91c2VsZWF2ZShmdW5jdGlvbigpIHtcbiAgICAgICAgbW91c2VEb3duID0gZmFsc2U7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICB9KTtcblxuICAgIC8vIE1vdXNlIGV2ZW50cyBlbmQuXG5cbiAgICAvLyBNZW51IGJlZ2luLlxuXG4gICAgLy8gQ2xlYXIgY2FudmFzLlxuICAgICQoXCIjY2xlYXJpY29uXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsICRteUNhbnZhcy53aWR0aCwgJG15Q2FudmFzLmhlaWdodCk7XG4gICAgfSk7XG5cbiAgICAvLyBTYXZlIGFuZCBkb3dubG9hZCBmaWxlXG4gICAgJChcIiNkb3dubG9hZGljb25cIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChjb25maXJtKFwiRG8geW91IHdhbnQgdG8gc2F2ZSB5b3VyIGltYWdlP1xcbihUaGlzIHdpbGwgcmVkaXJlY3QgeW91IHRvIHlvdXIgaW1hZ2UgcmlnaHQgYXdheSlcIikpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJG15Q2FudmFzWzBdLnRvRGF0YVVSTChcImltYWdlL3BuZ1wiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTk9UIFNBVkVEXCIpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBGaWxsIGNhbnZhc1xuICAgICQoXCIjYmFja2dyb3VuZGljb25cIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsICRteUNhbnZhc1swXS53aWR0aCwgJG15Q2FudmFzWzBdLmhlaWdodCk7XG4gICAgfSk7XG5cbiAgICAvLyBMaW5lIHNldHRpbmdzXG4gICAgJChcIiNsaW5lc2ljb25cIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICQoXCIjbGluZXNlbGVjdGlvblwiKS5zaG93KCk7XG4gICAgfSk7XG5cbiAgICAkKFwiI2xpbmUxXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICBjdHgubGluZVdpZHRoID0gMTtcbiAgICB9KTtcblxuICAgICQoXCIjbGluZTJcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSA4O1xuICAgIH0pO1xuXG4gICAgJChcIiNsaW5lM1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDE2O1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gZHJvcERvd24oKSB7XG4gICAgICAgIHZhciBvID0gJChcIiNsaW5lc2ljb25cIikub2Zmc2V0KCk7XG4gICAgICAgIHZhciBoID0gJChcIiNsaW5lc2ljb25cIikuaGVpZ2h0KCk7XG4gICAgICAgIHZhciB3ID0gJChcIiNsaW5lc2ljb25cIikud2lkdGgoKTtcbiAgICAgICAgJChcIiNsaW5lc2VsZWN0aW9uXCIpLmNzcyh7dG9wOiBvLnRvcCxcbiAgICAgICAgICAgIGxlZnQ6IG8ubGVmdCxcbiAgICAgICAgICAgIHdpZHRoOiB3LFxuICAgICAgICAgICAgaGVpZ2h0OiBoXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRyb3BEb3duKCk7XG4gICAgd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGRyb3BEb3duKCk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5lc2VsZWN0aW9uJykuY29udGFpbnMoZS50YXJnZXQpIHx8IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaW5lc2ljb24nKS5jb250YWlucyhlLnRhcmdldCkpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjbGlja2VkIGluXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjbGlja2VkIG91dFwiKTtcbiAgICAgICAgICAgICQoXCIjbGluZXNlbGVjdGlvblwiKS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBNZW51IGVuZC5cbn0pO1xuIl19
