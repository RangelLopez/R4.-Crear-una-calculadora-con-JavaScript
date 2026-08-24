let pantalla = document.getElementById('pantalla');
let expresion = '';
let ultimoFueOperador = false;

function agregarNumero(numero) {
  // Evita puntos decimales duplicados en el número actual
  if (numero === '.') {
    let partes = expresion.split(/[\+\-\*\/]/);
    let ultimoNumero = partes[partes.length - 1];
    if (ultimoNumero.includes('.')) return;
  }
  expresion += numero;
  pantalla.value = expresion;
  ultimoFueOperador = false;
}

function agregarOperador(operador) {
  if (expresion === '') return;          // no iniciar con un operador
  if (ultimoFueOperador) {
    // reemplaza el operador anterior si el usuario cambia de opinión
    expresion = expresion.slice(0, -1) + operador;
  } else {
    expresion += operador;
  }
  pantalla.value = expresion;
  ultimoFueOperador = true;
}

function borrarUltimo() {
  expresion = expresion.slice(0, -1);
  pantalla.value = expresion;
}

function calcularResultado() {
  if (expresion === '' || ultimoFueOperador) return;
  try {
    // Se evalúa la expresión aritmética construida por el usuario
    let resultado = Function('"use strict"; return (' + expresion + ')')();
    resultado = Math.round(resultado * 1000000) / 1000000; // evita errores de flotantes
    pantalla.value = resultado;
    expresion = resultado.toString();
  } catch (error) {
    pantalla.value = 'Error';
    expresion = '';
  }
  ultimoFueOperador = false;
}

function limpiar() {
  expresion = '';
  pantalla.value = '';
  ultimoFueOperador = false;
}