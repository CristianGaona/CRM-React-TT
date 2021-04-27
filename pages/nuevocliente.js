import React, {useState} from 'react';
import Layout from '../components/Layout'
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { gql, useMutation} from '@apollo/client';
import { useRouter } from 'next/router';

const NUEVO_CLIENTE = gql`
        mutation nuevoCliente($input: ClienteInput){
            nuevoCliente(input: $input){
                nombre
                apellido
                empresa
                email
                telefono
            }
        }

`;

const OBTENER_CLIENTES_USUARIO = gql `
    query obtenerClienteVendedor{
      obtenerClienteVendedor {
        id
        nombre
        apellido
        dni
        empresa
        email
      }
    }
`

const NuevoCliente =()=>{
    //routing
    const router = useRouter();
    const [mensaje, guardarMensaje] = useState(null);

    // Mensaje de alerta

    // Mutation para crear nuevos clientes
    const [nuevoCliente] = useMutation(NUEVO_CLIENTE, {
        update(cache, { data:{ nuevoCliente}}){
            // Obtener el objeto de cache que se desea actualizar
            const { obtenerClienteVendedor} = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO });
            // Reescribimos el cache ( el cache no se debe modificar, es recomendable reescribir)
            cache.writeQuery({
                query: OBTENER_CLIENTES_USUARIO,
                data :{
                    obtenerClienteVendedor : [...obtenerClienteVendedor, nuevoCliente]
                }
            })
        }
    });

    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            dni:'',
            empresa: '',
            email: '',
            telefono: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                       .required('El nombre del cliente es obligatorio!'),
            apellido: Yup.string()
                       .required('El apellido del cliente es obligatorio!'),   
            dni: Yup.string()
                       .required('El dni del cliente es obligatorio!'),    
            empresa: Yup.string()
                       .required('El nombre de la empresa del cliente es obligatorio!'),  
            email: Yup.string()
                        .email('Email no válido!')
                       .required('El correo del cliente es obligatorio!'), 
        }),
        onSubmit: async (valores) =>{
            const {nombre, apellido, dni, empresa, email, telefono} = valores;
            try {
                const { data }= await nuevoCliente({
                    variables:{
                        input:{
                            nombre, 
                            apellido,
                            dni,
                            empresa,
                            email,
                            telefono
                        }
                    }
                });

                router.push('/') // Redireccionar a dashboard clientes

                //console.log(data.nuevoCliente);
                
            } catch (error) {
                guardarMensaje(error.message);
                setTimeout(()=>{
                    guardarMensaje(null);
                },2000);
            }
            //console.log(valores);
        }
    });

    const mostrarMensaje = () =>{
        return (
            <div className= "bg-red-100 py-2 px-3 w-full my-5 max-w-sm text-center text-pink-700 mx-auto">
                <p>{mensaje}</p>
  
            </div>
        )
    }

    return(
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Nuevo Cliente</h1>
            
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form className="bg-white sahdow-md px-8 pt-6 pb-8 mb-4"
                          onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                            Nombre
                        </label>
                            <input 
                            className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                            id="nombre"
                            type="text"
                            placeholder="Ingresar nombre"
                            onChange={formik.handleChange}
                            onBlur= {formik.handleBlur}
                            value={formik.values.nombre}
                            />
                    </div> 

                    {formik.touched.nombre && formik.errors.nombre ? (
                     <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                         <p className="font-bold">Error</p>
                         <p>{formik.errors.nombre}</p>
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
                            onChange={formik.handleChange}
                            onBlur= {formik.handleBlur}
                            value={formik.values.apellido}
                            />
                    </div> 
                    {formik.touched.apellido && formik.errors.apellido ? (
                     <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                         <p className="font-bold">Error</p>
                         <p>{formik.errors.apellido}</p>
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
                            onChange={formik.handleChange}
                            onBlur= {formik.handleBlur}
                            value={formik.values.dni}
                            />
                    </div> 
                    {formik.touched.dni && formik.errors.dni ? (
                     <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                         <p className="font-bold">Error</p>
                         <p>{formik.errors.dni}</p>
                    </div>
                    ) : null}

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="empresa">
                            Empresa
                        </label>
                            <input 
                            className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                            id="empresa"
                            type="text"
                            placeholder="Ingresar empresa"
                            onChange={formik.handleChange}
                            onBlur= {formik.handleBlur}
                            value={formik.values.empresa}
                            />
                    </div> 
                    {formik.touched.empresa && formik.errors.empresa ? (
                     <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                         <p className="font-bold">Error</p>
                         <p>{formik.errors.empresa}</p>
                    </div>
                    ) : null}

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Correo
                        </label>
                            <input 
                            className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Ingresar correo"
                            onChange={formik.handleChange}
                            onBlur= {formik.handleBlur}
                            value={formik.values.email}
                            />
                    </div> 
                    {formik.touched.email && formik.errors.email ? (
                     <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                         <p className="font-bold">Error</p>
                         <p>{formik.errors.email}</p>
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
                            //onChange={formik.handleChange}
                            //onBlur= {formik.handleBlur}
                            //value={formik.values.password}
                            />
                    </div> 
                    
                    {mensaje && mostrarMensaje()}
                    <input
                        type="submit"
                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                        value="Registrar Cliente"
                    />
                    

 

                    </form>
                </div>
            </div>
        </Layout>
        
    );
}

export default NuevoCliente;