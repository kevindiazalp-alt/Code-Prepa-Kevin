// Ejercicio - El menu vivo - Version de referencia

// ----- PASO 1 ----- El Arreglo

const productos = [
    {id:crypto.randomUUID(), nombre:"Molletes", precio:30, categoria:"Comida", disponible:true},
    {id:crypto.randomUUID(), nombre:"Jugo de naranja", precio:18, categoria:"Bebida", disponible:true},
    {id:crypto.randomUUID(), nombre:"Gelatina", precio:12, categoria:"Postre", disponible:false}
];


// ----- PASO 2 y 3 ----- LEER(read) ------
const listar = ()=> productos;

const listarDisponibles = () => productos.filter((p) => p.disponible);

// ----- PASO 4: Buscar uno -----
const obtenerPorId = (id) => productos.find((p) => p.id === id);

// ----- PASO 5: Crear ------
function crear(datos){
    const nuevo = {id:crypto.randomUUID(), disponible:true, ...datos};
    productos.push(nuevo);
    return nuevo;
};

// ----- PASO 6 Actualizar -----
function actualizar(id, cambios){
    const i = productos.findIndex((p) => p.id === id);
    if (i === -1) return null;
    productos[i] = {...productos[id], ...cambios};
    return productos[i];
};

// ----- PASO 7 Borrador logico -----
function eliminar(id){
    const producto = obtenerPorId(id);
    if(!producto) return null;
    producto.disponible = false;
    return producto;
}

// Razon: Los pedidos viejos guardan su id de su prodcuto, el historial queda apuntando a algo que ya no esxite
// y el corte del dia se rompe, es mejor marcarlo como no disponible para sacarlo del menu sin destruir la informacion, ademas se puede revertir

// ----- PASO 8 Total con reduce -----
function calcularTotal(pedido){
    return pedido.items.reduce((suma, item) => suma + item.precio * item.cantidad, 0)
};

// ----- PASO 9 ¿ya existe? -----
const existeNombre = (nombre =>
    productos.some((p) => p.nombre.toLowerCase() === nombre.toLowerCase()));

const buscarPorTexto = (texto) =>
    productos.filter((p) => p.nombre.toLocaleLowerCase().includes(texto.toLocaleLowerCase()));

// ----- PASO 10 Pruebas -----
console.log("-----LISTAR-----");
console.log(listar());

console.log("-----LISTAR DISPONIBLES");
console.log(listarDisponibles().map((p) => p.nombre));

console.log("-----CREAR-----");
const creado = crear ({nombre:"Sincronizada", precio:32, categoria:"Comida"});
console.log(creado)
console.log(listar());
console.log("Kevin Azael Diaz Puente")