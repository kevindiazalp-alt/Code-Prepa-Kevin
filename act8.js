// Ejercicio : El mostrador

// ---------- Pasos 1 y 2 · Funciones normales ----------
function calculartotal(precio, cantidad = 1) {
  return precio * cantidad;
}

function esPedidoValido(cantidad) {
  return cantidad > 0;
}

function formatearPrecio(monto) {
  return "$" + monto.toFixed(2);
}

console.log("--- Pasos 1 y 2 ---");
console.log(calculartotal(35, 2));
console.log(calculartotal(35));
console.log(esPedidoValido(0));
console.log(formatearPrecio(35));

// ---------- Paso 3 · Las mismas funciones, en flecha corta ----------
const calculartotal2 = (precio, cantidad = 1) => precio * cantidad;
const esPedidoValido2 = (cantidad) => cantidad > 0;
const formatearPrecio2 = (monto) => "$" + monto.toFixed(2);

console.log("--- Paso 3 ---");
console.log(calculartotal2(35, 2), esPedidoValido2(0), formatearPrecio2(35));

// ---------- Paso 4 · La trampa de las llaves ----------
const dobleMal = (n) => { n * 2; };
console.log("--- Paso 4 ---");
console.log(dobleMal(5));
// Imprime undefined: al poner llaves, la función necesita un return explícito.
// La multiplicación sí ocurre, pero el resultado nunca sale de la función.

const dobleBienA = (n) => n * 2;              // sin llaves: return implícito
const dobleBienB = (n) => { return n * 2; };  // con llaves y return
console.log(dobleBienA(5), dobleBienB(5));

// ---------- Paso 5 · El objeto respuesta ----------
const respuesta = {
  codigo: 200,
  estado(c) {
    this.codigo = c;
    return this;
  },
  json(cuerpo) {
    console.log("HTTP " + this.codigo);
    console.log(cuerpo);
    this.codigo = 200; // se reinicia para la siguiente petición de la demo
  }
};

// ---------- Paso 6 · atender ----------
function atender(peticion, manejador) {
  console.log("→ " + peticion.metodo + " " + peticion.ruta);
  manejador(peticion, respuesta);
}

// ---------- Paso 7 · Los controladores ----------
const catalogo = [
  { id: "p-01", nombre: "Agua de jamaica", precio: 15 },
  { id: "p-02", nombre: "Sándwich", precio: 28 }
];

const listarProductos = (req, res) => {
  res.json({ ok: true, data: catalogo });
};

const verProducto = (req, res) => {
  const { id } = req.params;
  if (id !== "p-01") {
    res.estado(404).json({ ok: false, error: { mensaje: "No encontrado" } });
    return;
  }
  res.json({ ok: true, data: catalogo[0] });
};

const crearPedido = (req, res) => {
  const { cantidad } = req.body;
  if (!esPedidoValido(cantidad)) {
    res.estado(400).json({
      ok: false,
      error: { mensaje: "La cantidad debe ser mayor que cero" }
    });
    return;
  }
  const total = calculartotal(catalogo[0].precio, cantidad); // antes: calcularTotal (no existía)
  res.estado(201).json({
    ok: true,
    data: { producto: catalogo[0].nombre, cantidad, total }
  });
};

console.log("--- Paso 7 ---");
atender({ metodo: "GET", ruta: "/api/productos" }, listarProductos);
atender({ metodo: "GET", ruta: "/api/productos/p-01", params: { id: "p-01" } }, verProducto);
atender({ metodo: "GET", ruta: "/api/productos/p-99", params: { id: "p-99" } }, verProducto);
atender({ metodo: "POST", ruta: "/api/pedidos", body: { cantidad: 0 } }, crearPedido);
atender({ metodo: "POST", ruta: "/api/pedidos", body: { cantidad: 2 } }, crearPedido);

// ---------- Paso 8 · Pasar vs llamar ----------
console.log("--- Paso 8 ---");
console.log(typeof listarProductos);
// listarProductos  (sin paréntesis) es la función misma: se la puedo ENTREGAR a atender.
// listarProductos() (con paréntesis) la EJECUTA en ese instante y da su resultado.
// Express siempre quiere la primera forma.

console.log("Kevin Azael Diaz Puente");