import React from 'react';
import { useRouter } from 'next/router'
import Layout from '../../components/Layout';

const EditarCliente = () => {

    // Obtener el ID actual
    const router = useRouter();
    const { query: { id } } = router;
    console.log(id)

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Editar Cliente</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form className="bg-white sahdow-md px-8 pt-6 pb-8 mb-4"
                        //onSubmit={formik.handleSubmit}
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
                                /*onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.nombre}*/
                            />
                        </div>

                        {/*formik.touched.nombre && formik.errors.nombre ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.nombre}</p>
                            </div>
                        ) : null*/}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                                Apellido
                        </label>
                            <input
                                className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                id="apellido"
                                type="text"
                                placeholder="Ingresar apellido"
                                /*onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.apellido}*/
                            />
                        </div>
                        {/*formik.touched.apellido && formik.errors.apellido ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.apellido}</p>
                            </div>
                        ) : null*/}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dni">
                                DNI
                        </label>
                            <input
                                className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                id="dni"
                                type="text"
                                placeholder="Ingresar dni"
                                /*onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.dni}*/
                            />
                        </div>
                        {/*formik.touched.dni && formik.errors.dni ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.dni}</p>
                            </div>
                        ) : null*/}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="direccion">
                                Direccion
                        </label>
                            <input
                                className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                id="direccion"
                                type="text"
                                placeholder="Ingresar direccion"
                                /*onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.direccion}*/
                            />
                        </div>
                        {/*formik.touched.direccion && formik.errors.direccion ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.direccion}</p>
                            </div>
                        ) : null*/}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="correo">
                                Correo
                        </label>
                            <input
                                className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                                id="correo"
                                type="correo"
                                placeholder="Ingresar correo"
                                /*onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.correo}*/
                            />
                        </div>
                        {/*formik.touched.correo && formik.errors.correo ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.correo}</p>
                            </div>
                        ) : null*/}

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

                        {//mensaje && mostrarMensaje()
                        }
                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                            value="Registrar Cliente"
                        />

                    </form>
                </div>
            </div>
        </Layout>

    )
}

export default EditarCliente;