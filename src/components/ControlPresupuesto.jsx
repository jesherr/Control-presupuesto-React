import { useState, useEffect } from "react";


// Import react-circular-progressbar module and styles
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const percentage = 66;

const ControlPresupuesto = ({
  gastos,
  setGastos,
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto,
}) => {
  const [porcentaje, setPorcentaje] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);

  useEffect(() => {
    // total Gastado
    const totalGastado = gastos.reduce(
      (valorAct, item) => valorAct + item.cantidad,
      0
    );

    // total Disponible
    const totalDisponible = presupuesto - totalGastado;

    // nuevo porcentaje
    const nuevoPorcentaje =
      (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);

      
    setGastado(totalGastado);
    setDisponible(totalDisponible);

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    }, 1200);

  }, [gastos]);

  // Formatear la cantidad a moneda
  const formatoMoneda = (cantidad) =>
    cantidad.toLocaleString("es-ES", { style: "currency", currency: "PEN" });

  // resetear todo
  const handleResetApp = () => {
    const resultado = confirm("Desea reiniciar el presupuesto y gasto?");
    if (resultado) {
      setGastos([]);
      setPresupuesto(0);
      setIsValidPresupuesto(false);
    }
  };
  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        
        <CircularProgressbar 
        styles={buildStyles({
          pathColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
          trailColor: "#f5f5f5 ",
          textColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
        })}
        value={porcentaje}
        text={`${porcentaje}% Gastado`} />

        {/* <CircularProgressbarWithChildren value={66}>
          <img
            style={{ width: 40, marginTop: -5 }}
            src="https://i.imgur.com/b9NyUGm.png"
            alt="doge"
          />
          <div style={{ fontSize: 12, marginTop: -5 }}>
            <strong>66%</strong> mate
          </div>
        </CircularProgressbarWithChildren> */}
        
      </div>
      <div className="contenido-presupuesto">
        <button className="reset-app" type="buutton" onClick={handleResetApp}>
          resetear APP
        </button>
        <p>
          <span> Presupuesto: </span>S/
          {formatoMoneda(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span> Disponible: </span>S/
          {formatoMoneda(disponible)}
        </p>
        <p>
          <span> Gastado: </span>S/
          {formatoMoneda(gastado)}
        </p>
      </div>
    </div>
  );
};

export default ControlPresupuesto;
