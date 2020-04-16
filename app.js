

//const argv = require('yargs').argv;
const argv = require('./config/yargs.js').argv;
const colors = require('colors');
const porHacer=require('./por-hacer/por-hacer');//requireds

//console.log(argv);

let comando = argv._[0];

switch (comando){

	case "crear":
		let tarea=porHacer.crear(argv.descripcion);
		console.log(tarea);
	break;

	case "listar":
		let listado = porHacer.getListado(argv.completado2);

		for (let tarea of listado){
			console.log('=================='.green);
			console.log(tarea.descripcion);
			console.log(tarea.completado);
			console.log('=================='.green);
		}

	break;

	case "actualizar":
		let actualizado = porHacer.actualizar(argv.descripcion,argv.completado);
		console.log(actualizado);
	break;

	case "borrar":
		let borrado = porHacer.borrar(argv.descripcion);
		console.log(borrado);
	break;

	default:
		console.log('comando no es reconocido');
	break;
}