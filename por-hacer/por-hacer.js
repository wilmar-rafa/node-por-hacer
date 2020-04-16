

const fs = require('fs');

let listadoPorHacer=[];

const guardarDB=()=>{

	let data = JSON.stringify(listadoPorHacer);

	fs.writeFile(`db/data.json`, data, (err) => {
		  if (err) 
		  		//reject(err);
		  		//console.log(`Error al almacenar data: ${data}`);
		  		throw new Error('No se pudo grabar',err);
		  else
		  		//resolve (`tabla-${base}-al-${limite}.txt`);
		  		console.log(`Data almacenada con exito: ${listadoPorHacer}`);
		});
}

const cargarDB = ()=>{
	try{
			listadoPorHacer=require('../db/data.json');

	}catch(error){
			listadoPorHacer=[];
	}

}

const crear=(descripcion)=>{
	cargarDB();
	let porHacer={
		descripcion,
		completado:'false'
	}

	listadoPorHacer.push(porHacer);
	guardarDB();

	return porHacer;
}

const getListado=(completado)=>{
	console.log(`completado=${completado}`);
	cargarDB();
	//if (completado=='true' || completado=='false'){
	if (completado){
		console.log("entra a filtrar");
		let listadoPorhacerCompletado = listadoPorHacer.filter(tarea=>{
			return tarea.completado==completado;
		});
		listadoPorHacer=listadoPorhacerCompletado;
	}
	return listadoPorHacer;
}

const actualizar = (descripcion,completado='true')=>{
	cargarDB();
	let index = listadoPorHacer.findIndex(tarea=>{
		return tarea.descripcion===descripcion;
	});

	if (index>=0){
		listadoPorHacer[index].completado=completado;
		guardarDB();
		return true;
	}else{
		return false;
	}
}

const borrar = (descripcion)=>{
	cargarDB();
	let index = listadoPorHacer.findIndex(tarea=>{
		return tarea.descripcion===descripcion;
	});

	if (index>=0){
		listadoPorHacer.splice(index,1);
		guardarDB();
		return true;
	}else{
		return false;
	}
}

module.exports={
	crear,
	getListado,
	actualizar,
	borrar
}