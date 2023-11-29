import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tarea, setTarea] = useState("")
	const [lista, setLista] = useState([])

	useEffect(() => {
		// crearUsuario()
		obtenerListaTarea()
	}, [])

	useEffect(() => {
	actualizarListaTarea()

	}, [lista])

	function agregarTarea(e) {
		e.preventDefault()
		setLista([...lista, {"label":tarea,"done":false}])
		setTarea("")
	}
	function eliminar(id) {
		let nuevoArray = []
		nuevoArray = lista.filter((items, index) => {
			if (index != id) {
				return items
			}
		})
		setLista(nuevoArray)
	}
	const crearUsuario = async () => {
		const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/Ricardo1", {
			method: "POST",
			body: JSON.stringify([]),
			headers: { "Content-Type": "application/json" }

		})
		const data = await response.json()
		console.log(data)
	}
	const obtenerListaTarea = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/Ricardo1")
			const data = await response.json()
			console.log(data)
			setLista(data)
		} catch (error) {
			console.log(error)
		}

	}
	const actualizarListaTarea = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/apis/fake/todos/user/Ricardo1", {
			method: "PUT",
			body: JSON.stringify(lista),
			headers: { "Content-Type": "application/json" }

		})
		const data = await response.json()

		} catch (error) {
			console.log(error)
		}

	}
	return (
		<div className="text-center container">
			<input className="form-control" type="text" value={tarea} onChange={(e) => setTarea(e.target.value)} />
			<button className="btn btn-success" onClick={agregarTarea}> Agregar tarea </button>
			<div>
				<ul className="list-group">
					{lista.map((items, id) => (
						<li className="list-group-item" key={id}> {items.label}
							<button className="btn btn-danger float-end" onClick={() => eliminar(id)} > x </button>

						</li>
					))}

				</ul>		</div>
			<p> Tarea pendiente:{lista.length}</p>

		</div>
	);
};


export default Home;