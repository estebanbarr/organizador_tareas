const Tarea = require('./tarea');

class Tareas {
    _listado = {};

    constructor() {
        this._listado = {};
    }
    
    add(desc='') {
        const tarea = new Tarea(desc);
        
        this._listado[tarea.id] = tarea;
    }

    forEach(callback) {
        Object.keys(this._listado).forEach (key => {
            callback(this._listado[key]);
        });
    }
}

module.exports = Tareas;
