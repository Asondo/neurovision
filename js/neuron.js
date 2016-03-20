const Neuron = function(initial) {
    const size = initial.size || 3;
    const padding = initial.padding || 1;
    const x = initial.position.x;
    const y = initial.position.y;
    const map = initial.map;
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
    // Активация + визуализация
    function checkActivation(v) {
        var result = 0;
        for (let i=0; i<neighbors.length; i++) {
            let x = neighbors[i][0];
            let y = neighbors[i][1];
            let neighbor = map[x + '_' + y];
            if (neighbor && neighbor.active) {
                result++;
            }
        }
        activate(result === 1);
    }
    function activate(v) {
        if (v) {
            active = true;
            view.style.borderColor = v ? 'rgb(0, 186, 255)' : 'black';
            setTimeout(()=>{sendOutDoor(v);}, 0);
        } else {
            active = false;
            view.style.borderColor = 'black';
        }
    }
    // Передача активации соседям
    function sendOutDoor(v) {
        for (let i=0; i<neighbors.length; i++) {
            let x = neighbors[i][0];
            let y = neighbors[i][1];
            let newV = v;
            let neighbor = map[x + '_' + y];
            if (neighbor) {
                neighbor.value = newV;
            }
        }
        setTimeout(()=>activate(false), 1000);
    }

    return {
        id: id,
        view: view,
        draw: function(parent) {
            that = this;
            parent.appendChild(view);
        },
        set value(data) {
            value = data;
            checkActivation(data);
        },
        set activate(data) {
            value = data;
            activate(data);
        },
        get active() {
            return active;
        }
    }
};
