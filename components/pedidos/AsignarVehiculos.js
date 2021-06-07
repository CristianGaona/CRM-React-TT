import React, { useEffect, useState, useContext } from 'react'
import Select from 'react-select'
import { gql, useQuery } from '@apollo/client'
import PedidoContext from '../../context/pedidos/PedidoContext'

const OBTENER_VEHICULOS = gql`
query getCarResolver{
  getCar{
    id
    modelo
    marca
    precio,
    existencia
    }
  }
`

const AsignarVehiculos = () => {

    // State local del componente
    const [vehiculos, setVehiculos] = useState([]);

    // Context de pedidos
    const pedidoContext = useContext(PedidoContext)
    const { agregarVehiculo } = pedidoContext;

    // Cosulta a la API de Vehículos
    const { data, loading, error } = useQuery(OBTENER_VEHICULOS);

    useEffect(() => {
        // TODO: Función para pasar a PedidosState

        agregarVehiculo(vehiculos);

    }, [vehiculos])
    const seleccionarVehiculos = vehiculo => {
        setVehiculos(vehiculo)

    }

    if (loading) return null;
    const { getCar } = data;
    return (

        <>
            <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">2.- Selecciona o busca los vehículos</p>
            <Select
                className="mt-3"
                options={getCar}
                isMulti={true}
                onChange={opcion => seleccionarVehiculos(opcion)}
                getOptionValue={opciones => opciones.id}
                getOptionLabel={opciones => `${opciones.marca}  ${opciones.modelo} - ${opciones.existencia} disponibles`}
                placeholder="Buscar o seleccionar vehículo"
                noOptionsMessage={() => "No hay resultados"}


            />

        </>
    );
}

export default AsignarVehiculos;