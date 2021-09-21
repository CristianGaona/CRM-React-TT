import React, {useState} from 'react';
import Layout from '../components/Layout'
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { gql, useMutation} from '@apollo/client';
import { useRouter } from 'next/router';

const NUEVO_PARTNER = gql`
    mutation createPartnerResolver($input: PartnerInput){
        createPartner(input: $input)
    }
`;

const OBTENER_PARTNER = gql `
  query getPartner{
    partner{
      id
      name
      city
      email
      phone
      street
      parent_name
  }
}
`

const NuevoPartner=()=>{
    //routing
    const router = useRouter();
    const [mensaje, guardarMensaje] = useState(null);

    // Mensaje de alerta

    // Mutation para crear nuevos clientes
    const [ createPartner ] = useMutation(NUEVO_PARTNER, {
        update(cache, { data:{ createPartner }}){
            // Obtener el objeto de cache que se desea actualizar
            const { partner } = cache.readQuery({ query: OBTENER_PARTNER });
            // Reescribimos el cache ( el cache no se debe modificar, es recomendable reescribir)
            cache.writeQuery({
                query: OBTENER_PARTNER,
                data :{
                    partner : [...partner, createPartner]
                }
            })
        }
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            website: '',
            phone:'',
            street: '',
            email: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                       .required('El nombre del partner es obligatorio!'),
            website: Yup.string()
                       .required('El sitio web es obligatorio!'),   
            phone: Yup.string()
                       .required('El telefóno es obligatorio!'),    
            street: Yup.string()
                       .required('la direccion es obligatorio!'),  
            email: Yup.string()
                        .email('Email no válido!')
                       .required('El correo es obligatorio!'), 
        }),
        onSubmit: async (valores) =>{
            const {name, website, phone, street, email} = valores;
            try {
                const { data }= await createPartner({
                    variables:{
                        input:{
                            name, 
                            website, 
                            phone, 
                            street, 
                            email
                        }
                    }
                });

                router.push('/partners') // Redireccionar a dashboard clientes

                //console.log(data.createClient);
                
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
            <h1 className="text-2xl text-gray-800 font-light">Nuevo Partner</h1>
            
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form className="bg-white sahdow-md px-8 pt-6 pb-8 mb-4"
                          onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Nombre
                        </label>
                            <input 
                            className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Ingresar nombre"
                            onChange={formik.handleChange}
                            onBlur= {formik.handleBlur}
                            value={formik.values.name}
                            />
                    </div> 

                    {formik.touched.name && formik.errors.name ? (
                     <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                         <p className="font-bold">Error</p>
                         <p>{formik.errors.name}</p>
                    </div>
                    ) : null}

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="website">
                            Sitio web
                        </label>
                            <input 
                            className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                            id="website"
                            type="text"
                            placeholder="Ingresar sitio web"
                            onChange={formik.handleChange}
                            onBlur= {formik.handleBlur}
                            value={formik.values.website}
                            />
                    </div> 
                    {formik.touched.website && formik.errors.website ? (
                     <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                         <p className="font-bold">Error</p>
                         <p>{formik.errors.website}</p>
                    </div>
                    ) : null}

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                            DNI
                        </label>
                            <input 
                            className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                            id="phone"
                            type="text"
                            placeholder="Ingresar telefóno"
                            onChange={formik.handleChange}
                            onBlur= {formik.handleBlur}
                            value={formik.values.phone}
                            />
                    </div> 
                    {formik.touched.phone && formik.errors.phone ? (
                     <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                         <p className="font-bold">Error</p>
                         <p>{formik.errors.phone}</p>
                    </div>
                    ) : null}

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="street">
                            Direccion
                        </label>
                            <input 
                            className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                            id="street"
                            type="text"
                            placeholder="Ingresar direccion"
                            onChange={formik.handleChange}
                            onBlur= {formik.handleBlur}
                            value={formik.values.street}
                            />
                    </div> 
                    {formik.touched.direccion && formik.errors.street ? (
                     <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                         <p className="font-bold">Error</p>
                         <p>{formik.errors.street}</p>
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
                            placeholder="Ingresar email"
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
                        value="Registrar Partner"
                    />

                    </form>
                </div>
            </div>
        </Layout>
        
    );
}

export default NuevoPartner;