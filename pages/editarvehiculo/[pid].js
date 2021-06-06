import { gql, useQuery, useMutation } from '@apollo/client';
import Layout from '../../components/Layout'
import React from 'react';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2'


const OBTENER_VEHICULO = gql`
    query getCarIdResolver($id:ID!){
        getCarId(id:$id){
            marca,
            modelo,
            anio,
            puertas,
            color,
            transmision,
            existencia,
            precio
        }
    }

`;

const ACTUALIZAR_VEHICULO = gql`
mutation updateCarResolver($id:ID!, $input:CarInput){
    updateCar(id:$id, input:$input){
        id
        marca
        modelo
        anio
        puertas
        color
        transmision
        existencia
        precio
    }
}

`;


const EditarVehiculo = () => {
    const router = useRouter();
    const { query: { id } } = router;
    //console.log(id)

    // Consultar para obtener el producto
    const { data, loading, error } = useQuery(OBTENER_VEHICULO, {
        variables: {
            id
        }
    });

    // Modificar Vehiculo
    const [ updateCar ] = useMutation(ACTUALIZAR_VEHICULO);
   
    // Schema de valicación
    const schemaValidation = Yup.object({
        marca: Yup.string().required('La marca del vehículo es obligatorio'),
        modelo: Yup.string().required('El modelo del vehículo es obligatorio'),
        anio: Yup.number().required('El año del vehículo es obligatorio')
            .positive("No se acepta números negativos")
            .integer('Los años deben ser números enteros'),
        puertas: Yup.number().required('El número de puertas es obligatorio')
            .positive("No se acepta números negativos")
            .integer('Se debe ingresar números enteros'),
        color: Yup.string().required('El color es obligatorio'),
        transmision: Yup.string().required('La trasmisión es obligatorio'),
        existencia: Yup.number().required('La disponibilidad de vehículos es obligatorio')
            .positive("No se acepta números negativos")
            .integer('Se debe ingresar números enteros'),
        precio: Yup.number().required('El precio del vehículo es obligatorio')
            .positive("No se acepta números negativos")
    });

    if (loading) return 'Cargando ....';

    if(!data){
        return 'Acción no permitida'
    }

    const { getCarId } = data;

    const actualizarInfoVehiculo = async valores => {

        const { marca, modelo, anio, puertas, color, transmision, existencia, precio } = valores;
        try {
            const { data } = await updateCar({
                variables: {
                    id,
                    input: {
                        marca,
                        modelo,
                        anio,
                        puertas,
                        color,
                        transmision,
                        existencia,
                        precio
                    }
                }
            });
            //console.log(data)
            // Redirigir
            router.push("/vehiculos")
            // Alerta
            Swal.fire(
                'Actualizado',
                'Los datos del vehiculo han sido actualizados',
                'success'
            )

        } catch (error) {
            console.log(error)
            console.log('ERORRRR')
        }
    }


    return (

        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Editar Vehiculo</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">

                    <Formik
                        enableReinitialize
                        initialValues={getCarId}
                        validationSchema={schemaValidation}
                        onSubmit={(valores) => {
                            actualizarInfoVehiculo(valores)

                        }}

                    >


                        {props => {
                            return (


                                <form className="bg-white sahdow-md px-8 pt-6 pb-8 mb-4"
                                    onSubmit={props.handleSubmit}
                                >
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="marca">
                                            Marca de Vehículo
                        </label>
                                        <input
                                            className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                            id="marca"
                                            type="text"
                                            placeholder="Ingresar marca"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.marca}
                                        />
                                    </div>

                                    {props.touched.marca && props.errors.marca ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.marca}</p>
                                        </div>
                                    ) : null}

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="modelo">
                                            Modelo de Vehículo
                        </label>
                                        <input
                                            className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                            id="modelo"
                                            type="text"
                                            placeholder="Ingresar modelo"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.modelo}
                                        />
                                    </div>

                                    {props.touched.modelo && props.errors.modelo ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.modelo}</p>
                                        </div>
                                    ) : null}

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="anio">
                                            Año de Vehículo
                        </label>
                                        <input
                                            className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                            id="anio"
                                            type="number"
                                            placeholder="Ingresar año"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.anio}
                                        />
                                    </div>
                                    {props.touched.anio && props.errors.anio ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.anio}</p>
                                        </div>
                                    ) : null}

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="puertas">
                                            Número de puertas
                        </label>
                                        <input
                                            className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                            id="puertas"
                                            type="number"
                                            placeholder="Ingresar número de puertas"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.puertas}
                                        />
                                    </div>
                                    {props.touched.puertas && props.errors.puertas ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.puertas}</p>
                                        </div>
                                    ) : null}

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">
                                            Color de Vehículo
                        </label>
                                        <input
                                            className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                            id="color"
                                            type="text"
                                            placeholder="Ingresar color"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.color}
                                        />
                                    </div>
                                    {props.touched.color && props.errors.color ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.color}</p>
                                        </div>
                                    ) : null}

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="transmision">
                                            Transmisión de Vehículo
                        </label>
                                        <input
                                            className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                            id="transmision"
                                            type="text"
                                            placeholder="Ingresar transmision"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.transmision}
                                        />
                                    </div>

                                    {props.touched.transmision && props.errors.transmision ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.transmision}</p>
                                        </div>
                                    ) : null}

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="existencia">
                                            Cantidad disponible de Vehículos
                        </label>
                                        <input
                                            className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                            id="existencia"
                                            type="number"
                                            placeholder="Ingresar cantidad"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.existencia}
                                        />
                                    </div>

                                    {props.touched.existencia && props.errors.existencia ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.existencia}</p>
                                        </div>
                                    ) : null}

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">
                                            Precio de Vehículo
                        </label>
                                        <input
                                            className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                            id="precio"
                                            type="number"
                                            placeholder="Ingresar precio"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.precio}
                                        />
                                    </div>

                                    {props.touched.precio && props.errors.precio ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.precio}</p>
                                        </div>
                                    ) : null}
                                    <input
                                        type="submit"
                                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                                        value="Guardar Cambios"
                                    />
                                </form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </Layout>
    )

};

export default EditarVehiculo;
