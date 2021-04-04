require('colors');

const mostrarMenu = () => {
    return new Promise((resolve, reject) => {
        console.clear();
        console.log('======================='.bold.blue);
        console.log(' Seleccione una opción'.bold);
        console.log('=======================\n'.bold.blue);

        console.log(`${'1.'.blue} Crear una tarea`.bold);
        console.log(`${'2.'.blue} Listar tareas`.bold);
        console.log(`${'3.'.blue} Listar tareas completadas`.bold);
        console.log(`${'4.'.blue} Listar tareas pendientes`.bold);
        console.log(`${'5.'.blue} Completar tarea(s)`.bold);
        console.log(`${'6.'.blue} Borrar una tarea`.bold);
        console.log(`${'0.'.blue} Salir\n`.bold);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        this.opt = '';
        readline.question('Seleccione una opción: '.bold, (opt) => {
            this.opt = opt;
            readline.close();

            resolve(this.opt);
        });

    });
}

const pausa = () => {
    return new Promise((resolve, reject) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPresione ${'ENTER'.blue} para continuar: \n`.bold, (opt) => {
            readline.close();

            resolve();
        });
    })
}

module.exports = {
    mostrarMenu,
    pausa
}