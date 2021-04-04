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

module.exports = {
    inquirerMenu,
    pausa,
    leerInput
}