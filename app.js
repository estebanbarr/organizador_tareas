const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async() => {
    const tareas = new Tareas();
    let   opt    = '';

    do {
        opt = await inquirerMenu();

        switch(opt) {
            case '1':
                //Crear opcion...
                const desc = await leerInput('Ingrese la descripción:'.italic.bold);
                //Agrego la tarea...
                tareas.add(desc);
                break;
            case '2':
                console.log('\n');
                tareas.forEach(element => console.log(`Tarea: [${element.id}]\nDescripcion: [${element.desc}]\nCompletado: [${element.completaEn == null?'-':element.completaEn}]\n\n`.bold.green));
                break;
            case '3':
                break;
        }

        if (opt !== '0') await pausa();
    } while (opt !== '0');

}

main();
