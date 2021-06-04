import React from 'react';
import { useRouter } from 'next/router'
import Layout from '../../components/Layout';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Formik } from 'formik'
import * as Yup from 'yup';
import Swal from 'sweetalert2'

const OBTENER_CLIENTE = gql`
    query getClientResolver($id:ID!){
        getClient(id:$id){
            dni
            nombre
            apellido
            correo
            direccion
        }

    }

`;
const ACTUALIZAR_CLIENTE = gql`
    mutation updateClientResolver($id:ID!, $input:ClientInput){
        updateClient(id:$id, input:$input){
            nombre
            correo
        }
    }
`


const EditarCliente = () => {

    // Obtener el ID actual
    const router = useRouter();
    const { query: { id } } = router;
    console.log(id)

    // Consultar para obtener cliente
    const { data, loading, error } = useQuery(OBTENER_CLIENTE, {
        variables: {
            id
        }
    });

    // Actualizar cliente
    const [updateClient] = useMutation(ACTUALIZAR_CLIENTE);

    // Schema de validacion
    const schemaValidation= Yup.object({
        nombre: Yup.string()
                   .required('El nombre del cliente es obligatorio!'),
        apellido: Yup.string()
                   .required('El apellido del cliente es obligatorio!'),   
        dni: Yup.string()
                   .required('El dni del cliente es obligatorio!'),    
        direccion: Yup.string()
                   .required('El nombre de la direccion del cliente es obligatorio!'),  
        correo: Yup.string()
                    .email('Email no válido!')
                   .required('El correo del cliente es obligatorio!'), 
    });

    if (loading) return 'Cargando ....'

    //console.log(data.getClient)
    const {getClient} = data;

    // Modifica cliente en la base de datos
    const actualizarInfoCliente = async valores=>{
        const {nombre, apellido, correo, dni, direccion } = valores;
        try {
            const { data } = await updateClient({
                variables:{
                    id,
                    input: {
                        nombre, 
                        apellido, 
                        correo, 
                        dni, 
                        direccion 
                    }
                }
            });

            //console.log(data)

            Swal.fire(
                'Actualizado',
                'El cliente se actualizo correctamente',
                'success'
            )
            window.location.replace('/');
            //router.push('/')
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Editar Cliente</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <Formik
                        validationSchema = {schemaValidation}
                        enableReinitialize
                        initialValues={ getClient }
                        onSubmit={ (valores)=>{
                            actualizarInfoCliente(valores)
                        }}


                    >

                        {props => {
                           // console.log(props)

                            return (

                                <form className="bg-white sahdow-md px-8 pt-6 pb-8 mb-4"
                                onSubmit={props.handleSubmit}
                                >
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                                            Nombre
                        </label>
                                        <input
                                            className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                            id="nombre"
                                            type="text"
                                            placeholder="Ingresar nombre"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.nombre}
                                        />
                                    </div>

                                    {props.touched.nombre && props.errors.nombre ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{props.errors.nombre}</p>
                            </div>
                        ) : null}

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                                            Apellido
                        </label>
                                        <input
                                            className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                            id="apellido"
                                            type="text"
                                            placeholder="Ingresar apellido"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.apellido}
                                        />
                                    </div>
                                    {props.touched.apellido && props.errors.apellido ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{props.errors.apellido}</p>
                            </div>
                        ) : null}

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dni">
                                            DNI
                        </label>
                                        <input
                                            className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                            id="dni"
                                            type="text"
                                            placeholder="Ingresar dni"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.dni}
                                        />
                                    </div>
                                    {props.touched.dni && props.errors.dni ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{props.errors.dni}</p>
                            </div>
                        ) : null}

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="direccion">
                                            Direccion
                        </label>
                                        <input
                                            className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                            id="direccion"
                                            type="text"
                                            placeholder="Ingresar direccion"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.direccion}
                                        />
                                    </div>
                                    {props.touched.direccion && props.errors.direccion ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{props.errors.direccion}</p>
                            </div>
                        ) : null}

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="correo">
                                            Correo
                        </label>
                                        <input
                                            className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                            id="correo"
                                            type="correo"
                                            placeholder="Ingresar correo"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.correo}
                                        />
                                    </div>
                                    {props.touched.correo && props.errors.correo ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{props.errors.correo}</p>
                            </div>
                        ) : null}

                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                                            Telefóno
                        </label>
                                        <input
                                            className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                            id="telefono"
                                            type="tel"
                                            placeholder="Ingresar telefono"
                                        onChange={props.handleChange}
                                        onBlur= {props.handleBlur}
                                        //value={formik.values.password}
                                        />
                                    </div>

                                    {//mensaje && mostrarMensaje()
                                    }
                                    <input
                                        type="submit"
                                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                                        value="Editar Cliente"
                                    />

                                </form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </Layout>

    )
}

export default EditarCliente;