const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, listadoTareasCompletar, confirm } = require('./helpers/inquirer'  );
const { Tareas, TAREA_TODAS, TAREA_COMPLETADA, TAREA_PENDIENTE                               } = require('./models/tareas'     );
const { leerInfo, guardarInfo                                                                } = require('./helpers/admin_info');

const main = async() => {
    const tareas = new Tareas();
    let   opt    = '';
    let   idx    = 0;

    tareas.loadTareas(leerInfo());

    do {
        opt = await inquirerMenu();

        switch(opt) {
            case '1': //Crear una tarea...
                const desc = await leerInput('Ingrese la descripción:'.italic.bold);
                tareas.add(desc);
            break;
            case '2': //Listar tareas...
                console.log('');
                tareas.forEach((element, idx) => console.log(`${ ++idx }- `.bold.blue + element.display()), TAREA_TODAS);
            break;
            case '3': //Listar tareas completadas...
                console.log('');
                idx = 0;
                tareas.forEach((element) => console.log(`${ ++idx }- `.bold.blue + element.display()), TAREA_COMPLETADA);
            break;
            case '4': //Listar tareas pendientes...
                console.log('');
                idx = 0;
                tareas.forEach((element) => console.log(`${ ++idx }- `.bold.blue + element.display()), TAREA_PENDIENTE);
            break;
            case '5': //Completar tarea(s)...
                console.log('');
                const ids = await listadoTareasCompletar(tareas.listadoArr);
                console.log('');
                if (ids.length > 0) {
                    console.clear();
                    const rta = await confirm(`Seguro/a desea completar la/s [${ids.length}] tareas seleccionadas?`.italic.bold);
                    if (rta) {
                        ids.forEach(id => {
                            tareas.completar(id);
                        });
                        console.log(`Se han completado [${ids.length}] tarea/s`.bold);
                    }
                } else {
                    console.clear();
                }
            break;
            case '6': //Borrar una tarea...
                console.log('');
                const id = await listadoTareasBorrar(tareas.listadoArr);
                console.log('');
                if (tareas._listado[id]) {
                    const rta = await confirm('Seguro/a desea eliminar la tarea seleccionada?'.italic.bold);
                    if (rta) {
                        descTarea = tareas._listado[id].desc;
                        tareas.del(id);
                        console.log(`Se ha eliminado la tarea [${descTarea.red}]`.bold);
                    }
                }
            break;
        }

        guardarInfo(tareas.listadoArr);

        if (opt !== '0') await pausa();
    } while (opt !== '0');
}

main();
