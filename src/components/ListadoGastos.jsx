import React from "react";
import Gasto from "./Gasto";

const ListadoGastos = ({ 
  gastos, 
  setGastoEditar, 
  eliminarGasto, 
  filtros, 
  gastosFiltrados}) => {
  // console.log(gastos);
  return (
    <div className="listado-gastos contenedor">
      {filtros ? (
        <>
          <h2>{gastosFiltrados.length ? 'Gastos' : 'No Hay Gastos en esta categoría'}</h2>
          {gastosFiltrados.map( elem => (
            <Gasto
              key={elem.id}
              elem={elem}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
          ))}
        </>
      ) : (
        <>
        <h2>{gastos.length ? 'Gastos' : 'No Hay Gastos aún'}</h2>
        {gastos.map( elem => (
            <Gasto
              key={elem.id}
              elem={elem}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ListadoGastos;
