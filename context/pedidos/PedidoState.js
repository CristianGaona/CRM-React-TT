
import React, { useReducer } from 'react';
import PedidoContext from './PedidoContext'
import PedidoReducer from './PedidoReducer'


import {
    SELECCIONAR_CLIENTE,
    SELECCIONAR_VEHICULO,
    CANTIDAD_VEHICULOS

} from '../../types'

const PedidoState = ({children})=>{

    // State de pedidos
    const initialState = {
        cliente: {},
        vehiculos: [],
        total: 0
    }

    const [state, dispach] = useReducer(PedidoReducer, initialState);

    // Modifica el cliente
    const agregarCliente = cliente =>{
        //console.log(cliente)
        dispach({
            type: SELECCIONAR_CLIENTE,
            payload: cliente
        })
    }

    // Modifica los vehiculos
    const agregarVehiculo = vehiculos =>{
        dispach({
            type: SELECCIONAR_VEHICULO,
            payload: vehiculos
        })
    }
   
        return (
            <PedidoContext.Provider
                value={{
                    agregarCliente,
                    agregarVehiculo  
                }}
            
            >{children}



            </PedidoContext.Provider>
    
    )
}

export default PedidoState;