//Rivarola Agustin
import promptSync from 'prompt-sync';
const prompt = promptSync({ sigint: true });

function main(): void {
    let opcion: string;
    let titulo: string[] = [];
    let descripcion: string[] = [];
    let estado: string[] = [];
    let creacion: Date[] = [];
    let edicion: Date[] = [];
    let vencimiento: (Date | string)[] = [];
    let dificultad: string[] = [];
    do {
        menu();
        opcion = prompt('');
        switch (opcion) {
            case "1":
                menutareas(titulo, descripcion, estado, creacion, edicion, vencimiento, dificultad);
                break;
            case "2":
                buscarTareas(titulo, descripcion, estado, creacion, edicion, vencimiento, dificultad);
                break;
            case "3":
                [titulo, descripcion, estado, creacion, edicion, vencimiento, dificultad] = agregarTarea(titulo, descripcion, estado, creacion, edicion, vencimiento, dificultad);
                break;
            case "4":
                break;
            default:
                console.log("Ingrese una opción válida");
                break;
        }
    } while (opcion !== "4");
}

function menu(): void {
    console.clear();
    console.log("Bienvenid@ !!");
    console.log('');
    console.log('Seleccione la opción que desea realizar');
    console.log('[1] Ver mis Tareas');
    console.log('[2] Buscar una Tarea');
    console.log('[3] Agregar una Tarea');
    console.log('[4] Salir');
}

function menutareas(
    titulo: string[],
    descripcion: string[],
    estado: string[],
    creacion: Date[],
    edicion: Date[],
    vencimiento: (Date | string)[],
    dificultad: string[]
): void {
    console.log("¿Qué tareas deseas ver?");
    console.log('[1] Todas');
    console.log('[2] Pendientes');
    console.log('[3] En Curso');
    console.log('[4] Terminadas');
    console.log('[0] Volver');
    let opcion: string = prompt('');
    switch (opcion) {
        case "1":
            console.log("Esta es tu Lista de tareas");
            verTareaTodas(titulo, descripcion, estado, creacion, edicion, vencimiento, dificultad);
            console.log("Presione una tecla para continuar...");
            prompt('');
            break;
        case "2":
            console.log("Esta es tu Lista de tareas Pendientes");
            verTareas(titulo, descripcion, "P", estado, creacion, edicion, vencimiento, dificultad);
            console.log("Presione una tecla para continuar...");
            prompt('');
            break;
        case "3":
            console.log("Esta es tu Lista de tareas En Curso");
            verTareas(titulo, descripcion, "E", estado, creacion, edicion, vencimiento, dificultad);
            console.log("Presione una tecla para continuar...");
            prompt('');
            break;
        case "4":
            console.log("Esta es tu Lista de tareas Terminadas");
            verTareas(titulo, descripcion, "T", estado, creacion, edicion, vencimiento, dificultad);
            console.log("Presione una tecla para continuar...");
            prompt('');
            break;
        default:
            console.log("Ingrese una opción correcta nuevamente");
            console.log("Presione una tecla para continuar...");
            prompt('');
            break;
    }
}

function verTareaTodas(
    titulo: string[],
    descripcion: string[],
    estado: string[],
    creacion: Date[],
    edicion: Date[],
    vencimiento: (Date | string)[],
    dificultad: string[]
): void {
    for (let i = 0; i < titulo.length; i++) {
        console.log(`[${i + 1}] ${titulo[i]}`);
    }
    preguntarDetalles(titulo, descripcion, estado, creacion, edicion, vencimiento, dificultad);
}

function verTareas(
    titulo: string[],
    descripcion: string[],
    estadito: string,
    estado: string[],
    creacion: Date[],
    edicion: Date[],
    vencimiento: (Date | string)[],
    dificultad: string[]
): void {
    for (let i = 0; i < titulo.length; i++) {
        if (estado[i] === estadito) {
            console.log(`[${i + 1}] ${titulo[i]}`);
        }
    }
    preguntarDetalles(titulo, descripcion, estado, creacion, edicion, vencimiento, dificultad);
}

function agregarTarea(
    titulo: string[],
    descripcion: string[],
    estado: string[],
    creacion: Date[],
    edicion: Date[],
    vencimiento: (Date | string)[],
    dificultad: string[]
): [string[], string[], string[], Date[], Date[], (Date | string)[], string[]] {
    let auxiliar: string = "";
    let opcion: string;
    const fechaCreacion: Date = new Date();

    console.log("Estás creando una nueva tarea...");
    auxiliar = prompt("1. Ingrese el Título: ");
    while (auxiliar.length > 100 || auxiliar.length == 0) {
        console.clear();
        console.log("El Título ingresado es incorrecto, ingrese nuevamente");
        auxiliar = prompt("Ingrese el Título: ");
    }
    titulo.push(auxiliar);
    auxiliar = prompt("2. Ingrese la descripción: ");
    while (auxiliar.length > 500) {
        console.clear();
        console.log("Supera la cantidad máxima permitida de caracteres");
        auxiliar = prompt("Ingrese nuevamente la Descripción: ");
    }
    descripcion.push(auxiliar);
    auxiliar = prompt("3. Estado ([P]endiente / [E]n curso) / [T]erminada / [C]ancelada: ");
    auxiliar = auxiliar.toUpperCase();
    while (!(auxiliar === 'P' || auxiliar === 'E' || auxiliar === 'T' || auxiliar === 'C' || auxiliar.length === 0)) {
        console.clear();
        auxiliar = prompt("Ingrese una opción correcta Estado ([P]endiente / [E]n curso) / [T]erminada / [C]ancelada: ");
        auxiliar = auxiliar.toUpperCase();
    }
    estado.push(auxiliar || 'P');
    auxiliar = prompt("4. Vencimiento (DD/MM/AAAA): ");
    while (auxiliar !== null) {
        if (auxiliar === '') {
            vencimiento.push("SIN DATOS");
            break;
        } else {
            if (isValidDate(auxiliar)) {
                let parsedDate = new Date(auxiliar.split("/").reverse().join("-"));
                vencimiento.push(parsedDate);
                break;
            } else {
                console.log("¡Ingrese una fecha válida!");
                auxiliar = prompt("Vencimiento (DD/MM/AAAA): ");
            }
        }
    }
    auxiliar = prompt("5. Dificultad ([F]ácil / [M]edio / [D]ificil):");
    auxiliar = auxiliar.toUpperCase();
    while (!(auxiliar === 'F' || auxiliar === 'M' || auxiliar === 'D' || auxiliar.length === 0)) {
        console.clear();
        auxiliar = prompt("Ingrese una opción correcta de Dificultad ([F]ácil / [M]edio / [D]ificil):");
        auxiliar = auxiliar.toUpperCase();
    }
    dificultad.push(auxiliar || 'F');
    fechaCreacion.setDate(fechaCreacion.getDate() - 1);
    creacion.push(fechaCreacion);
    edicion.push(fechaCreacion);
    console.log("");
    console.log("¡Datos guardados!");
    console.log("Presione una tecla para continuar...");
    prompt('');
    return [titulo, descripcion, estado, creacion, edicion, vencimiento, dificultad];
}

function isValidDate(dateString: string): boolean {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(dateString)) {
        return false;
    }
    const dateParts = dateString.split("/");
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const year = parseInt(dateParts[2], 10);
    const testDate = new Date(year, month, day);
    return testDate.getDate() === day && testDate.getMonth() === month && testDate.getFullYear() === year;
}

function preguntarDetalles(
    titulo: string[],
    descripcion: string[],
    estado: string[],
    creacion: Date[],
    edicion: Date[],
    vencimiento: (Date | string)[],
    dificultad: string[]
): void {
    let otp: string | null;
    console.log("¿Quieres ver los detalles de alguna tarea?");
    console.log("Introduce el número para verla o 0 para volver");
    otp = prompt('');

    if (otp === '0') {
        menu();
        return;
    }

    while (otp === null || isNaN(Number(otp)) || Number(otp) < 1 || Number(otp) > titulo.length) {
        console.log("No existe esa tarea, ingrésela nuevamente");
        otp = prompt('');
    }

    if (otp !== null) {
        const tareaIndex = Number(otp) - 1; 
        Detalles(tareaIndex, titulo, descripcion, estado, creacion, edicion, vencimiento, dificultad);
    }
}

function Detalles(
    tareaIndex: number,
    titulo: string[],
    descripcion: string[],
    estado: string[],
    creacion: Date[],
    edicion: Date[],
    vencimiento: (Date | string)[],
    dificultad: string[]
): void {
    console.log(`
        Título: ${titulo[tareaIndex]}
        Descripción: ${descripcion[tareaIndex]}
        Estado: ${estado[tareaIndex]}
        Fecha de Creación: ${creacion[tareaIndex].toLocaleDateString()}
        Fecha de Edición: ${edicion[tareaIndex].toLocaleDateString()}
        Fecha de Vencimiento: ${vencimiento[tareaIndex]}
        Dificultad: ${dificultad[tareaIndex]}
    `);
    console.log("Presione una tecla para continuar...");
    prompt('');
}
function buscarTareas(
    titulo: string[],
    descripcion: string[],
    estado: string[],
    creacion: Date[],
    edicion: Date[],
    vencimiento: (Date | string)[],
    dificultad: string[]
): void {
    const buscar: string = prompt("Ingresa una parte del título de la tarea a buscar: ");
    const resultados: Array<{
        index: number;
        title: string;
        description: string;
        status: string;
        creationDate: Date;
        editDate: Date;
        dueDate: Date | string;
        difficulty: string;
    }> = [];

    for (let i = 0; i < titulo.length; i++) {
        if (titulo[i].toLowerCase().includes(buscar.toLowerCase())) {
            resultados.push({
                index: i,
                title: titulo[i],
                description: descripcion[i],
                status: estado[i],
                creationDate: creacion[i],
                editDate: edicion[i],
                dueDate: vencimiento[i],
                difficulty: dificultad[i]
            });
        }
    }

    if (resultados.length > 0) {
        console.log("Tareas encontradas:");
        resultados.forEach(tarea => {
            console.log(`[${tarea.index + 1}] ${tarea.title}`);
        });
    } else {
        console.log("No hay tareas relacionadas con esa búsqueda");
    }

    preguntarDetalles(titulo, descripcion, estado, creacion, edicion, vencimiento, dificultad);
}


main();
