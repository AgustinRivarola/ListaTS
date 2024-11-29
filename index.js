"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Rivarola Agustin
var prompt_sync_1 = require("prompt-sync");
var prompt = (0, prompt_sync_1.default)({ sigint: true });
function main() {
    var _a;
    var opcion;
    var titulo = [];
    var descripcion = [];
    var estado = [];
    var creacion = [];
    var edicion = [];
    var vencimiento = [];
    var dificultad = [];
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
                agregarTarea(titulo, descripcion, estado, creacion, edicion, vencimiento, dificultad), titulo = [], descripcion = [], estado = [], creacion = [], edicion = [], vencimiento = [], dificultad = [];
                break;
            case "4":
                break;
            default:
                console.log(" Ingrese una opcion valida");
                break;
        }
    } while (opcion !== "4");
}
function menu() {
    console.clear();
    console.log(" Bienvenid@ !!");
    console.log('');
    console.log('Seleccione la opcion que desea realizar ');
    console.log('[1] Ver mis Tareas');
    console.log('[2] Buscar una Tarea ');
    console.log('[3] Agregar una Tarea ');
    console.log('[4] Salir');
}
function menutareas(titulo, descripcion, estado, creacion, edicion, vencimiento, dificultad) {
    console.log("¿ Que tareas Deseas ver?");
    console.log('[1] Todas ');
    console.log('[2] Pendientes ');
    console.log('[3] En Curso ');
    console.log('[4] Terminadas ');
    console.log('[0] Volver ');
    var opcion = prompt('');
    switch (opcion) {
        case "1":
            console.log(" Esta es tu Lista de tareas ");
            verTareaTodas(titulo, descripcion, estado, creacion, edicion, vencimiento, dificultad);
            console.log(" Presione una tecla para continuar..");
            opcion = prompt('');
            break;
        case "2":
            console.log(" Esta es tu Lista de tareas Pendientes ");
            verTareas(titulo, descripcion, "P", estado, creacion, edicion, vencimiento, dificultad);
            console.log(" Presione una tecla para continuar..");
            opcion = prompt('');
            break;
        case "3":
            console.log(" Esta es tu Lista de tareas En Curso ");
            verTareas(titulo, descripcion, "E", estado, creacion, edicion, vencimiento, dificultad);
            console.log(" Presione una tecla para continuar..");
            opcion = prompt('');
            break;
        case "4":
            console.log(" Esta es tu Lista de tareas Terminadas ");
            verTareas(titulo, descripcion, "T", estado, creacion, edicion, vencimiento, dificultad);
            console.log(" Presione una tecla para continuar..");
            opcion = prompt('');
            break;
        default:
            console.log(" Ingrese una Opcion Correcta nuevamente");
            console.log(" Presione una tecla para continuar..");
            opcion = prompt('');
            break;
    }
}
function verTareaTodas(titulo, descripcion, estado, creacion, edicion, vencimiento, dificultad) {
    var i;
    for (i = 0; i < titulo.length; i++) {
        console.log("[".concat(i + 1, "] ").concat(titulo[i]));
        //console.log(`${}`)
    }
    preguntarDetalles(titulo, descripcion, estado, creacion, edicion, vencimiento, dificultad);
}
function verTareas(titulo, descripcion, estadito, estado, creacion, edicion, vencimiento, dificultad) {
    var i;
    for (i = 0; i < titulo.length; i++) {
        if (estado[i] === estadito) {
            console.log("[".concat(i + 1, "] ").concat(titulo[i]));
        }
    }
    preguntarDetalles(titulo, descripcion, estado, creacion, edicion, vencimiento, dificultad);
}
function agregarTarea(titulo, descripcion, estado, creacion, edicion, vencimiento, dificultad) {
    let auxiliar = "";
    let opcion;
    var fechaCreacion = new Date();
    console.log("Estas Creando una nueva tarea...");
    auxiliar = prompt("1. Ingrese el Titulo : ");
    while (auxiliar.length > 100 || auxiliar.length == 0) {
        console.clear();
        console.log("El Titulo ingresado es incorrecto, Ingrese nuevamente ");
        auxiliar = prompt(" Ingrese el Titulo : ");
    }
    titulo.push(auxiliar);
    auxiliar = prompt("2. Ingrese la descripcion : ");
    while (auxiliar.length > 500) {
        console.clear();
        console.log(" Supera la Cantidad maxima permitida de caracteres ");
        auxiliar = prompt("Ingrese nuevamente la Descripcion : ");
    }
    descripcion.push(auxiliar);
    auxiliar = prompt("3. Estado ([P]endiente / [E]n curso) / [T]erminada / [C]ancelada: ");
    auxiliar = auxiliar.toUpperCase();
    while (!((auxiliar === 'P') || (auxiliar === 'E') || (auxiliar === 'T') || (auxiliar === 'C') || (auxiliar.length === 0))) {
        console.clear();
        auxiliar = prompt("Ingrese una opcion correcta Estado ([P]endiente / [E]n curso) / [T]erminada / [C]ancelada: ");
        auxiliar = auxiliar.toUpperCase();
    }
    if (auxiliar.length === 0) {
        auxiliar = 'P';
        estado.push(auxiliar);
    }
    else {
        estado.push(auxiliar);
    }
    auxiliar = prompt("4. Vencimiento (DD/MM/AAAA): ");
    while (auxiliar !== null) {
        if (auxiliar === '') {
            vencimiento.push("SIN DATOS");
            break;
        }
        else {
            if (isValidDate(auxiliar)) {
                var parsedDate = new Date(auxiliar.split("/").reverse().join("-"));
                vencimiento.push(parsedDate);
                break;
            }
            else {
                console.log("¡¡ Ingrese una fecha valida !! ");
                auxiliar = prompt("Vencimiento (DD/MM/AAAA) ");
            }
        }
    }
    auxiliar = prompt("5. Dificultad ([F]ácil / [M]edio / [D]ificil):");
    auxiliar = auxiliar.toUpperCase();
    while (!((auxiliar === 'F') || (auxiliar === 'M') || (auxiliar === 'D') || (auxiliar.length === 0))) {
        console.clear();
        auxiliar = prompt(" Ingrese una opcion correcta de Dificultad ([F]ácil / [M]edio / [D]ificil):");
        auxiliar = auxiliar.toUpperCase();
    }
    if (auxiliar.length === 0) {
        auxiliar = 'F';
        dificultad.push(auxiliar);
    }
    else {
        dificultad.push(auxiliar);
    }
    fechaCreacion.setDate(fechaCreacion.getDate() - 1);
    creacion.push(fechaCreacion);
    edicion.push(fechaCreacion);
    console.log("");
    console.log("¡Datos guardados!");
    console.log(" Presione una tecla para continuar..");
    opcion = prompt('');
    return [titulo, descripcion, estado, creacion, edicion, vencimiento, dificultad];
}
function isValidDate(dateString) {
    var dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(dateString)) {
        return false;
    }
    var dateParts = dateString.split("/");
    var day = parseInt(dateParts[0], 10);
    var month = parseInt(dateParts[1], 10) - 1;
    var year = parseInt(dateParts[2], 10);
    var testDate = new Date(year, month, day);
    return testDate.getDate() === day && testDate.getMonth() === month && testDate.getFullYear() === year;
}
function preguntarDetalles(titulo, descripcion, estado, creacion, edicion, vencimiento, dificultad) {
    let otp;
    console.log("¿Quieres ver los detalles de alguna tarea?");
    console.log("Introduce el número para verla o 0 para volver");
    otp = prompt('');
    if (otp === '0') {
        menu();
        return;
    }
    while (otp === null || Number(otp) < 0 || Number(otp) >= titulo.length) {
        console.log("No existe esa tarea, ingrésela nuevamente");
        otp = prompt('');
    }
    if (otp !== null) {
        let tareaIndex = Number(otp); // Restamos 1 para ajustar al índice
        Detalles(tareaIndex, titulo, descripcion, estado, creacion, edicion, vencimiento, dificultad);
    }
}
function Detalles(otp, titulo, descripcion, estado, creacion, edicion, vencimiento, dificultad) {
    var auxi;
    console.log(" Esta es la Tarea que elegiste ");
    console.log("[".concat(titulo[otp], "]"));
    console.log("[".concat(descripcion[otp], "]"));
    console.log("[".concat(estado[otp], "]"));
    console.log("[".concat(dificultad[otp], "]"));
    console.log("[".concat(vencimiento[otp], "]"));
    console.log("[".concat(creacion[otp], "]"));
    console.log("[".concat(edicion[otp], "]"));
    console.log(" Si deseas Editarla, presiona E, o presiona 0 para volver");
    auxi = prompt('');
    auxi = auxi.toUpperCase();
    if (auxi === "0") {
        menu();
    }
    else {
        while (!(auxi === 'E')) {
            console.log(" Ingrese una Opcion Correcta E o 0 ");
            auxi = prompt('');
            auxi = auxi.toUpperCase();
        }
        Edicion(otp, titulo, descripcion, estado, creacion, edicion, vencimiento, dificultad);
    }
}
function Edicion(otp, titulo, descripcion, estado, creacion, edicion, vencimiento, dificultad) {
    var auxiliar;
    console.log(" Estas editando la tarea : [".concat(titulo[otp], "]"));
    console.log("  - Si deseas mantener los valores de un atributo, simplemente dejalo en blanco. ");
    console.log("  - Si deseas dejar en blanco un atributo, escribe un espacio");
    auxiliar = prompt("1- Ingrese la descripcion : ");
    if (auxiliar != "") {
        descripcion[otp] = auxiliar;
    }
    auxiliar = prompt("2- Estado ([P]endiente / [E]n curso) / [T]erminada / [C]ancelada: ");
    auxiliar = auxiliar.toUpperCase();
    if (auxiliar != "") {
        estado[otp] = auxiliar;
    }
    auxiliar = prompt("3- Dificultad ([F]ácil / [M]edio / [D]ificil):");
    auxiliar = auxiliar.toUpperCase();
    if (auxiliar != "") {
        dificultad[otp] = auxiliar;
    }
    auxiliar = prompt("4. Vencimiento (DD/MM/AAAA): ");
    if (auxiliar != "") {
        vencimiento[otp] = auxiliar;
    }
}
function buscarTareas(titulo, descripcion, estado, creacion, edicion, vencimiento, dificultad) {
    var coincidencias = [];
    console.log("Introduce el título de una Tarea para buscarla:");
    var input = prompt("> ").toLowerCase();
    console.log();
    coincidencias = titulo
        .map(function (t, index) { return ({ titulo: t.toLowerCase(), indice: index + 1 }); })
        .filter(function (item) { return item.titulo.indexOf(input) !== -1; }) // Alternativa a includes
        .map(function (item) { return item.indice; });
    if (coincidencias.length > 0) {
        console.log("Tareas encontradas:");
        coincidencias.forEach(function (i) {
            console.log("[".concat(i, "] ").concat(titulo[i - 1]));
        });
    }
    else {
        console.log("No hay tareas relacionadas con la búsqueda.");
    }
    preguntarDetalles(titulo, descripcion, estado, creacion, edicion, vencimiento, dificultad);
}
main();
