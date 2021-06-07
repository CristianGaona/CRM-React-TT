import React, { useEffect, useState, useContext } from 'react';
import Select from 'react-select';
import {gql, useQuery} from '@apollo/client'
import PedidoContext from '../../context/pedidos/PedidoContext'

const OBTENER_CLIENTE_VENDEDOR = gql`
  query clientsUserResolver{
    getClientsUser {
    id  
    dni
    nombre
    apellido
    correo
    direccion
  }
}
`


const AsignarCliente = () => {
    const [cliente, setCliente] = useState([]);

    // Context de pedidos
    const pedidoContext = useContext(PedidoContext)
    const { agregarCliente } = pedidoContext;

    // Consultar API de Clients
    const {data, loading, error} = useQuery(OBTENER_CLIENTE_VENDEDOR);
    // console.log(data)
    // console.log(loading)
    // console.log(error)

    useEffect(() => {

        agregarCliente(cliente)
    }, [cliente])

    const seleccionarCliente = clientes => {
        setCliente(clientes);
    }

    // Resultados de la consulta
    if(loading) return null;
    const{ getClientsUser } = data;

    return (
        <>
        <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">1.- Asigna un cliente al pedido</p>
        <Select
        className="mt-3"
            options={getClientsUser}
            //isMulti={true}
            onChange={opcion => seleccionarCliente(opcion)}
            getOptionValue={opciones => opciones.id}
            getOptionLabel={opciones => `${opciones.nombre}  ${opciones.apellido}`}
            placeholder="Buscar o seleccionar cliente"
            noOptionsMessage={() => "No hay resultados"}


        />

        </>

    )
}

export default AsignarCliente;