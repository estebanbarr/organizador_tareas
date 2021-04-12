const { v4: uuidv4 } = require('uuid');

require('colors');

class Tarea {
    id         = '';
    desc       = '';
    completaEn = null;

    constructor(desc, id=null, completaEn = null) {
        this.id         = (id == null)?uuidv4():id; 
        this.desc       = desc;
        this.completaEn = completaEn;
    }

    completar() {
        if (this.completaEn == null)
            this.completaEn = new Date().toISOString();
    }

    display() {
        return `[${this.desc}] :: `.bold + `${this.completaEn == null?'[PENDIENTE]'.bold.red:`[COMPLETADA EL ${this.completaEn}]`.bold.green}`;
    }

    displayAll() {
        return `Tarea: [${this.id}]\nDescripción: [${this.desc}]\nCompletado: [${this.completaEn == null?'-':this.completaEn}]`;
    }
}

module.exports = Tarea;
