import React from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation, useQuery } from '@apollo/client'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router';

const NUEVO_VEHICULO = gql`

    mutation createCarResolver($input: CarInput){
        createCar(input: $input){
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

const NuevoVehiculo = () => {

    const router = useRouter();
    // Muatation de apollo

    const [createCar] = useMutation(NUEVO_VEHICULO, {
        update(cache, { data: {createCar}}){
            // Obtener obj cache
            const {getCar} = cache.readQuery({query: OBTENER_VEHICULOS});

            // Reescribir
            cache.writeQuery({
                query: OBTENER_VEHICULOS,
                data: {
                    getCar: [...getCar, createCar]
                }
            })
        }
    });

    const formik = useFormik({
        initialValues: {
            marca: '',
            modelo: '',
            anio: '',
            puertas: '',
            color: '',
            transmision: '',
            existencia: '',
            precio: ''
        },
        validationSchema: Yup.object({
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
        }),

        onSubmit: async valores => {
            const {
                marca,
                modelo,
                anio,
                puertas,
                color,
                transmision,
                existencia,
                precio } = valores;
            try {
                const { data } = await createCar({
                    variables: {
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
                console.log(data)

                // Mostrar Alerta
                Swal.fire(
                    'Creado',
                    'Vehículo registrado correctamente',
                    'success'
                )
                router.push('/vehiculos') // Redireccionar a dashboard clientes

            } catch (error) {
                console.log(error)
            }

        }
    })
    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Crear Nuevo Vehiculo</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form className="bg-white sahdow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
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
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.marca}
                            />
                        </div>

                        {formik.touched.marca && formik.errors.marca ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.marca}</p>
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
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.modelo}
                            />
                        </div>

                        {formik.touched.modelo && formik.errors.modelo ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.modelo}</p>
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
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.anio}
                            />
                        </div>
                        {formik.touched.anio && formik.errors.anio ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.anio}</p>
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
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.puertas}
                            />
                        </div>
                        {formik.touched.puertas && formik.errors.puertas ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.puertas}</p>
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
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.color}
                            />
                        </div>
                        {formik.touched.color && formik.errors.color ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.color}</p>
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
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.transmision}
                            />
                        </div>

                        {formik.touched.transmision && formik.errors.transmision ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.transmision}</p>
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
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.existencia}
                            />
                        </div>

                        {formik.touched.existencia && formik.errors.existencia ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.existencia}</p>
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
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.precio}
                            />
                        </div>

                        {formik.touched.precio && formik.errors.precio ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.precio}</p>
                            </div>
                        ) : null}
                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                            value="Registrar Vehículo"
                        />
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default NuevoVehiculo;