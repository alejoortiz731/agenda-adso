const nombre = "Daniel";
const ficha = 3412768
const notas = [4.0, 4.5, 3.8];
const promedio = (notas[0] + notas[1] + notas[2]) / 3;
console.log(`======================================`)
console.log(`       SISTEMA DE NOTAS SENA`)
console.log(`======================================`)
console.log(`Aprendiz: ${nombre}`);
console.log(`Ficha: ${ficha}`);
console.log(`Notas: ${notas}`)
console.log(`======================================`)
console.log(`Promedio: ${promedio.toFixed(2)}`);
console.log(`Estado: ${promedio >= 3 ? "Aprobado" : "No Aprobado"}`);
