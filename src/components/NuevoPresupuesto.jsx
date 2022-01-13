import {useState} from 'react'
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({
  presupuesto ,
  setPresupuesto,
  setIsValidPresupuesto
  }) => {
  
  const [mensaje, setMensaje] = useState('')


  const handleSubmit = e =>{
    e.preventDefault()  
    if(presupuesto <= 0 || !presupuesto){
      setMensaje('presupuesto no valido')
      
      setTimeout(() => {
        setMensaje('')
      }, 1500);
        return
    }
    setMensaje('')
    setIsValidPresupuesto(true)

  }


  return (
    <div>
      <div className="contenedor-presupuesto contenedor sombra">
      <form 
        className="formulario"
        onSubmit={handleSubmit}>
        <div className="campo">
          <label className="campoLabel">
            Presupuesto
            <input
              className="nuevo-presupuesto"
              type="number"
              placeholder="Añade tu presupuesto"
              defaultValue={presupuesto}
              onChange={(e) => setPresupuesto(Number(e.target.value))}
            />
          </label>
        </div>
        <input type="submit" value="añadir presupuesto" />
        {mensaje && 
          <Mensaje 
            tipo="error"
          > 
              {mensaje}
          </Mensaje>
        }
      </form>
    </div>
    </div>
  )
}

export default NuevoPresupuesto
