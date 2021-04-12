const Tarea = require('./tarea');

const TAREA_PENDIENTE  = 0x01;
const TAREA_COMPLETADA = 0x10;
const TAREA_TODAS      = 0x11;

class Tareas {
    _listado = {};

    constructor() {
        this._listado = {};
    }

    get listadoArr() {
        let listado = [];
        Object.keys(this._listado).forEach (key => {
            listado.push(this._listado[key]);
        });

        return listado;
    }

    add(desc='') {
        const tarea = new Tarea(desc);
        
        this._listado[tarea.id] = tarea;
    }

    del(id) {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    completar(id) {
        if (this._listado[id]) {
            this._listado[id].completar();
        }
    }

    loadTareas(tareasJSON = []) {
        if (tareasJSON == null) {
            return;
        }

        tareasJSON.forEach(item => {
            this._listado[item.id] = new Tarea(item.desc, item.id, item.completaEn)
            //this._listado[item.id] = item;
        });
    }

    forEach(callback, estado=TAREA_TODAS) {
        let tarea_estado = 0;
        Object.keys(this._listado).forEach ((key, idx) => {
            tarea_estado = this._listado[key].completaEn == null ? TAREA_PENDIENTE : TAREA_COMPLETADA;
            if ((tarea_estado & estado) != 0) {
                callback(this._listado[key], idx);
            }
        });
    }
}

module.exports = {
    Tareas,
    TAREA_TODAS,
    TAREA_COMPLETADA,
    TAREA_PENDIENTE
};
