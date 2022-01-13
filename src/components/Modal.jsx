import {useState, useEffect} from "react";
import Mensaje from "./Mensaje";
import cerrarModal from "../img/cerrar.svg";

const Modal = ({ 
  setModal,
  animarModal,
  setAnimarModal,
  guardarGasto,
  gastoEditar,
setGastoEditar }) => {

  const [mensaje, setMensaje] = useState('');
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [id, setID] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    if(Object.keys(gastoEditar).length>0){
      setNombre(gastoEditar.nombre)
      setCantidad(gastoEditar.cantidad)
      setCategoria(gastoEditar.categoria)
      setFecha(gastoEditar.fecha)
      setID(gastoEditar.id)
    }
    }, [])

  // Ocultar Modal
  const ocultarModal = () => {
    setAnimarModal(false);
    setGastoEditar({})
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  // validand el formulario
  const handleSubmit = (e)=>{
    e.preventDefault()
    if([nombre, cantidad, categoria].includes("")) {
      setMensaje('fallo la validacion')
      
      setTimeout(() => {
        setMensaje('')
      }, 500);
    return
    }
    // guardamos en un Objeto que pasa al principal APP
    guardarGasto({nombre, cantidad, categoria, id, fecha})
  }

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={cerrarModal} alt="cerrar modal" onClick={ocultarModal} />
      </div>
      <form
        className={
            `formulario ${animarModal ? "animar" : "cerrar"}
            `}
        onSubmit={handleSubmit}
      >
        <legend>{gastoEditar.nombre ?'Editando' : 'Nuevo Gasto'}</legend>
        {mensaje && <Mensaje
          tipo='error'>{mensaje}</Mensaje>}
        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            id="nombre"
            type="text"
            placeholder="Añade el nombre del gasto"
            value={nombre}
            onChange={(e)=>setNombre(e.target.value)}
            />
        </div>
        <div className="campo">
          <label htmlFor="nombre">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            placeholder="Añade la cantidad del gasto: ej. 200"
            value={cantidad}
            onChange={(e)=>setCantidad(Number(e.target.value))}
            />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
          <select id="categoria"
          value={categoria}
          onChange={(e)=>setCategoria(e.target.value)}
          >
            <option value="">--Seleccione</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos Varios </option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>

        <input type="submit" value={gastoEditar.nombre ?'Guardar Cambio' :'Añadir Gasto'}></input>
      </form>
    </div>
  );
};

export default Modal;
