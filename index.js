//Importamos la libreria express
var express = require("express");
var app = express();
//Importando codigo externo
const { Pool, Client } = require("@mysql.js/mysql");

//Configurar la conexion
const config = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "12345",
  database: "test",
};

//Le enseñamos a nuestro server a procesar JSON
app.use(express.json());

app.get("/students", (request, response) => {
  var code = request.params.code;
  var student = {};
  var statusCode = 200;

  (async () => {
    const client = new Client(config);
    const { results, fields } = await client.query("SELECT * FROM alumnos");
    response.status(statusCode).send(results);
    await client.end();
  })().catch(console.error);
});

app.post("/students", (request, response) => {
  var student = request.body;
  var statusCode = 200;

  (async () => {
    const client = new Client(config);
    const { results, fields } = await client.query(
      `INSERT INTO alumnos (first_name, last_name, address, age, education_level) 
       VALUES ("${student.first_name}", "${student.last_name}", "${student.address}", ${student.age}, "${student.education_level}")`
    );
    response.status(statusCode).send({
      message: "Alumno agregado con exito",
    });
    await client.end();
  })().catch(console.error);
});

// app.get("/students/:code", (request, response) => {
//   var code = request.params.code;
//   var student = {};
//   var statusCode = 200;

//   response.status(statusCode).send("Hello");
// });

// app.post("/students", (request, response) => {
//   //Capturando la informacion del body
//   let studentData = request.body;

//   //Capturamos parte del JSON, Razon: Comprensión y orden
//   const studentPersonalData = studentData.personalData;
//   const studentGrades = studentData.grades;

//   //Asegurarnos que el alumnos esta en octavo o noveno
//   if (
//     studentPersonalData.academicGrade === "Octavo" ||
//     studentPersonalData.academicGrade === "Noveno"
//   ) {
//     //Iniciamos la variable que guardara la suma de las notas
//     let gradesSum = 0;

//     studentGrades.map((subject) => {
//       //Linea para suma acumulativa
//       gradesSum += subject.value;
//     });

//     /*
//       Promedio = sumaDeNotas / cantidadMaterias
//       Promedio = gradesSum / (studentGrades.length = 6)

//       length = Largo
//       [ {}, {}, {} ].length = 3

//       parseFloat
//       parse -> Analizar o transformar
//       float = Numeros con decimales Ej. 34.00
//       Que tenga decimales

//       AVG = Average = Promedio
//     */
//     let AVG = parseFloat(gradesSum / studentGrades.length);

//     if (AVG >= 8) {
//       response.status(200).send({
//         message: "Bienvenido a Superate poma!",
//         average: AVG.toFixed(2), //Formato deseado -> nota.00 (Con dos decimales)
//       });
//     } else {
//       response.status(200).send({
//         message: "Siga participando",
//         cause: "Promedio debajo de 8, prom = " + AVG.toFixed(2),
//       });
//     }
//   } else {
//     response.status(200).send({
//       message: "No esta en el nivel adecuado",
//     });
//   }
// });

// app.put("/students/:code", (request, response) => {
//   let code = request.params.code;
//   let studentData = request.body;

//   let exampleData = {
//     firstName: "Josue Fernando",
//     lastName: "Gomez Guardado",
//     personalData: {
//       age: 17,
//       height: 177,
//       weight: 140,
//       hairColor: "Black",
//       academicGrade: "Noveno",
//     },
//     parents: {
//       principalReponsable: {
//         completeName: "Elizabeth Guardado",
//         type: "mother",
//       },
//       secondayResponsable: {
//         completeName: "Hans Gomez",
//         type: "father",
//       },
//     },
//     economicStatus: {
//       liveInHouse: true,
//     },
//     family: {
//       hasBrothers: true,
//       manyBrothers: 2,
//     },
//     grades: [
//       {
//         name: "Math",
//         value: 8,
//       },
//       {
//         name: "Science",
//         value: 10,
//       },
//       {
//         name: "Language",
//         value: 5,
//       },
//       {
//         name: "History",
//         value: 7,
//       },
//       {
//         name: "Educacion fisica",
//         value: 10,
//       },
//       {
//         name: "Computacion",
//         value: 10,
//       },
//     ],
//   };

//   exampleData.firstName = studentData.firstName;
//   exampleData.lastName = studentData.lastName;

//   response.status(200).send(exampleData);
// });

// app.delete("/students/:code", (request, response) => {
//   //Pendiente
// });

//app.use(express.urlencoded({ extended: false }))
app.listen(3000, function () {
  console.log("Cool Zone in port 3000!");
});

//Request -> Peticion = {  }
//Response -> Respuesta = {  }
//Formas de recibir informacion
// 1. Query
// 2. Params
// 3. Body

// 1 | 2 | 3
// 3   1   3

// resultado = (col1 * col2) / col3

// 1. Analizar el problema
//   1.1 Enfocarnos en lo que nos solicitan
//   1.2 Formar una estrategia para resolver el problema
// 2. Crear una solucion basica
//   2.1 Identificar checkpoints
//   2.2 Ser persistente
//   2.3 Llegar a un solucion
// 3. Llegar a una solucion estable
//   3.1 Mejorar la solucion
//   3.2 Terminar ejercicio
