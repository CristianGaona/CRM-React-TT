import React from 'react';
import Swal from 'sweetalert2';
import { useMutation, gql, useQuery } from '@apollo/client';
import Router from 'next/router';

const ELIMINAR_VEHICULO = gql `

mutation deleteVehiculoResolver($id:ID!){
    deleteCar(id:$id)
}
`
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
const Vehiculo = ({ car }) => {
    const { marca, modelo, precio, existencia, id } = car;

    // Mutation para eliminar vehiculos
    const[deleteCar] = useMutation(ELIMINAR_VEHICULO, {
        update(cache){
            const {getCar} = cache.readQuery({
                query: OBTENER_VEHICULOS
            });
            cache.writeQuery({
                query: OBTENER_VEHICULOS,
                data: {
                    getCar: getCar.filter(vehiculoActual => vehiculoActual.id !== id) 
                }
            })
        }
    });

    // Alert
    const confirmarEliminarVehiculo = () => {

        Swal.fire({
            title: 'Deseas eliminar un vehiculo',
            text: "Esta acción no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText: 'No, Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Eliminar vehiculo
                    const{ data }= await deleteCar({
                        variables: {
                            id
                        }
                    });
                    console.log(data);

                    Swal.fire(
                        'Vehiculo Eliminado',
                        data.deleteCar,
                        'success'
                    )
                } catch (error) {
                    console.log(error)
                }

            }
        })


    }

    const editCar = () =>{
        Router.push({
            pathname: "/editarvehiculo/[id]",
            query: {id}
        })
    }

    return (
        <tr>
            <td className="border px-4 py-2">{marca}</td>
            <td className="border px-4 py-2">{modelo}</td>
            <td className="border px-4 py-2">$ {precio}</td>
            <td className="border px-4 py-2">{existencia} vehiculos disponibles</td>
            <td className="border px-4 py-2">
                <button
                    type="button"
                    className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                    onClick={() => confirmarEliminarVehiculo()}
                >Eliminar
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </td>
            <td className="border px-4 py-2">

                <button
                    type="button"
                    className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
                onClick={() => editCar()}
                >Editar
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                    </svg>
                </button>
            </td>
        </tr>

    );
}

export default Vehiculo;