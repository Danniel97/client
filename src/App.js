import React, { useState, useEffect } from "react";
import Axios from 'axios';
import "./App.css";

function App() {

    const [nombreComida, setNombreComida] = useState("");
    const [cantidadComida, setCantidad] = useState(0);
    const [nuevaComida, setNuevaComida] = useState("");

    const [listaDeComida, setListaDeComida] = useState([]);

    useEffect(() => {
      Axios.get("http://localhost:3001/read").then((response) => {
        setListaDeComida(response.data)
      });
    }, []);

    const addToList = () => {
      // console.log(foodName + cantidad);
      Axios.post("http://localhost:3001/insert", {
        nombreComida: nombreComida, 
        cantidadComida: cantidadComida,
      });
    };

    const actualizarComida = (id) => {
      Axios.put("http://localhost:3001/update", {
        id: id, 
        nuevaComida: nuevaComida,
      })
    }


    return (
        <div className="App">
            <h1>CRUD de Comida</h1>

            <label>Nombre de la comida</label>
            <input type="text" onChange={(event) => {
              setNombreComida(event.target.value);
            }}/>

            <label>Cantidad a agregar</label>
            <input type="number" onChange={(event) => {
              setCantidad(event.target.value);
            }}/>

            <button onClick = {addToList} >Agregar comida</button>

            <h1> Lista de Alimentos </h1>

            {listaDeComida.map((val, key) => {
              return (
              <div key = {key} className="food"> 
                <h1> {val.nombreComida} </h1> <h1> {val.cantidadComida} </h1>
                <input 
                    type="text" 
                    placeholder="Nueva comida"
                    onChange={(event) => {
                    setNuevaComida(event.target.value);
                    }}
                />
                <button onClick={() => actualizarComida(val._id)}> Actualizar </button>
                <button>Eliminar</button>
              </div>
              );
            })}

        </div>
    );
}

export default App;