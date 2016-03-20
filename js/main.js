'use strict';
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Neuron = function(initial) {
    const size = initial.size || 3;
    const padding = initial.padding || 1;
    const x = initial.position.x;
    const y = initial.position.y;
    const brain = initial.brain;
    const id = x + '_' + y;
    const view = document.createElement('div');
    const neighbors = [
        [x+1, y-1],
        [x, y-1],
        [x-1, y-1],
        [x+1, y],
        [x, y],
        [x-1, y],
        [x+1, y+1],
        [x, y+1],
        [x-1, y+1]
    ];
    const outputs = [
        [x+1, y-1],
        //[x, y-1],
        //[x-1, y-1],
        [x+1, y],
        //[x, y],
        //[x-1, y],
        [x+1, y+1]
        //[x, y+1],
        //[x-1, y+1]
    ];
    const inputs = [
        //[x+1, y-1],
        [x, y-1],
        [x-1, y-1],
        //[x+1, y],
        [x, y],
        [x-1, y],
        //[x+1, y+1]
        [x, y+1],
        [x-1, y+1]
    ];
    var that;
    var active = false;
    var value = 0;
    view.className = 'element';
    view.id = id;
    // Положение
    view.style.width = size + 'px';
    view.style.height = size + 'px';
    view.style.top = y*(padding + size) + 'px';
    view.style.left = x*(padding + size) + 'px';
    // Активация+ визуализация
    function checkActivation(v) {
        var result = 0;
        //for (let i=0; i<inputs.length; i++) {
        //    let x = inputs[i][0];
        //    let y = inputs[i][1];
        //    let neighbor = brain[x + '_' + y];
        //    if (neighbor && neighbor.active) {
        //        result++;
        //    }
        //}
        activate(v);
    }
    function activate(v) {
        if (v) {
            active = true;
            //sendOutDoor(v);
            setTimeout(()=>{sendOutDoor(v);}, 0);
            value += v;
            view.style.opacity = value;
        } else {
            active = false;
            view.style.opacity = 0;
        }
    }
    // Передача активации соседям
    function sendOutDoor(v) {
        for (let i=0; i<neighbors.length; i++) {
            let x = neighbors[i][0];
            let y = neighbors[i][1];
            let newV = v - 0.05;
            let neighbor = brain[x + '_' + y];
            if (neighbor && (neighbor.value) < newV) {
                neighbor.value = newV;
            }
        }
        //setTimeout(()=>activate(false), 100);
    }

    return {
        id: id,
        view: view,
        draw: function(parent) {
            that = this;
            parent.appendChild(view);
        },
        set value(data) {
            //value = data;
            activate(data);
        },
        set activate(data) {
            value = data;
            activate(value);
        },
        get value() {
            return value;
        }
    }
};
const brain = (function() {
    var brain = {};
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
            //brain[x] = [];
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
                    brain: brain
                };
                brain[x + '_' + y] = Neuron(initial);
            }
        }
    }
    function draw() {
        parent = document.createElement("div");
        parent.className = 'container';
        parent.addEventListener('click', (e) => {
            let id = e.target.id;
            //console.log(id);
            brain[id].activate = 1;
        });
        document.body.appendChild(parent);
        for (let x=0; x<columns; x++) {
            for (let y=0; y<lines; y++) {
                brain[x + '_' + y].draw(parent);
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
