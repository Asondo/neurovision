'use strict';
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const brain = (function() {
    var map = {};
    var columns = 100;
    var lines = 100;
    var size = 4;
    var padding = 2;
    var parent;

    function getXYByResolution(size, padding) {
        var totalSize = (size + padding);
        var xs = parseInt(window.innerWidth/totalSize);
        var ys = parseInt(window.innerHeight/totalSize);
        return {
            x: xs,
            y: ys
        }
    }
    function createData() {
        var count = getXYByResolution(size, padding);
        console.log(count);
        columns = count.x;
        lines = count.y;
        for (let x=0; x<columns; x++) {
            for (let y=0; y<lines; y++) {
                let initial = {
                    position: {
                        x: x,
                        y: y
                    },
                    size: size,
                    padding: padding,
                    columns: columns,
                    lines: lines,
                    map: map
                };
                map[x + '_' + y] = Neuron(initial);
            }
        }
    }
    function draw() {
        parent = document.createElement("div");
        parent.className = 'container';
        parent.addEventListener('click', (e) => {
            let id = e.target.id;
            //console.log(id);
            map[id].activate = 1;
        });
        document.body.appendChild(parent);
        for (let x=0; x<columns; x++) {
            for (let y=0; y<lines; y++) {
                map[x + '_' + y].draw(parent);
            }
        }
    }

    return {
        start: function() {
            createData();
            draw();
        }
    }
})();
// Запуск функции обработчика
window.onload = brain.start;
