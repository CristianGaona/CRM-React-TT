import React from 'react';

const Vehiculo =({car})=>{
    const {marca, modelo, precio, existencia, id} = car;
    return(
        <tr>
            <td className="border px-4 py-2">{marca}</td>
            <td className="border px-4 py-2">{modelo}</td>
            <td className="border px-4 py-2">$ {precio}</td>
            <td className="border px-4 py-2">{existencia} vehiculos disponibles</td>        
            <td className="border px-4 py-2">
                <button
                    type="button"
                    className="flex justify-center items-center bg-red-800 py-2 px-4"
                > Eliminar

                </button>
            </td>
            <td className="border px-4 py-2">$ {precio}</td>
        </tr>
        
    );
}

export default Vehiculo;