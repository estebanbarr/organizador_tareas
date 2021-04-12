const inquirer = require('inquirer');
require ('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.blue} Crear una tarea`.bold
            },
            {   value: '2',
                name: `${'2.'.blue} Listar tareas`.bold
            },
            {
                value: '3',
                name: `${'3.'.blue} Listar tareas completadas`.bold
            },
            {
                value: '4',
                name: `${'4.'.blue} Listar tareas pendientes`.bold
            },
            {
                value: '5',
                name: `${'5.'.blue} Completar tarea(s)`.bold
            },
            {
                value: '6',
                name: `${'6.'.blue} Borrar una tarea`.bold
            },
            {
                value: '0',
                name: `${'0.'.blue} Salir\n`.bold
            }
        ]
    }
];


const inquirerMenu = async() => {
    console.clear();
    
    console.log('======================='.bold.blue);
    console.log(' Seleccione una opción'.bold);
    console.log('=======================\n'.bold.blue);
    
    const { opcion } = await inquirer.prompt(preguntas);
    
    return opcion;
}

leerInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }

                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);

    return desc;
}

const pausa = async() => {
    const preguntas = [
        {
            type: 'input',
            name: 'opcion',
            message: `Presione ${'ENTER'.blue} para continuar:`.bold
        }
    ];

    console.log('\n');
    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

const listadoTareasBorrar = async(tareas = []) => {
    console.clear();
    const pregs = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione la tarea a eliminar',
            choices: []
        }
    ];

    let idx = 0;
    /*tareas.forEach((tarea) => {
        pregs[0].choices.push({
            value: tarea.id,
            name: `${ ++idx }- `.bold.blue + tarea.display()
        });
    });*/

    pregs[0].choices = tareas.map(tarea => {
        return {
            value: tarea.id,
            name: `${ ++idx }- `.bold.blue + tarea.display()
        };
    });

    pregs[0].choices.push({
        value: '0',
        name: `${ ++idx }- `.bold.blue + 'Cancelar'.bold
    });

    const { id } = await inquirer.prompt(pregs);

    return id;
}

const listadoTareasCompletar = async(tareas = []) => {
    console.clear();
    const pregs = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione la/s tarea/s a completar',
            choices: []
        }
    ];

    
    let idx = 0;
    tareas.forEach((tarea) => {
        if (tarea.completaEn == null) {
            pregs[0].choices.push({
                value: tarea.id,
                name: `${ ++idx }- `.bold.blue + tarea.display()
            });
        }
    });

    pregs[0].choices.push({
        value: '0',
        name: `${ ++idx }- `.bold.blue + 'Cancelar'.bold
    });

    const { ids } = await inquirer.prompt(pregs);

    let cancel = false;
    ids.forEach(id => {
        if (id == '0') {
            cancel = true;
        }
    });

    if (cancel)
        return [];

    return ids;
}

confirm = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);

    return ok;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    listadoTareasCompletar,
    confirm
}