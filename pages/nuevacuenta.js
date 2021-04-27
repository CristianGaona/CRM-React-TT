import React, { useState } from "react";
import { useRouter } from 'next/router';
import Layout from "../components/Layout";
import { useFormik } from "formik"; // Validación de formularios
import * as Yup from "yup"; // Colocar mayor restircciones a las validaciones
import { useMutation, gql } from "@apollo/client";

const NUEVACUENTA = gql`
  mutation createUserResolver($input: UserInput){
  createUser(input:$input){
    name
    lastName
    dni
    email
    cellNumber
    role
    img
  }
}
`;

const NuevaCuenta = () => {

    // State para el mensaje

  const [ mensaje, guardarMensaje ] = useState(null);

  // Mutations para crear nuevos usuarios  
  const [createUser] = useMutation(NUEVACUENTA);

  // Routing
  const router = useRouter();

  // Validación del formulario

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      dni: "",
      email: "",
      password: "",
      cellNumber: "",
      role: "",
      img: ""
    },

    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es Obligatorio"),
      lastName: Yup.string().required("El apellido es Obigatorio"),
      email: Yup.string()
        .email("El correo no es válido")
        .required("El email es Obligatorio"),
      password: Yup.string()
        .required("El correo es Obligatorio")
        .min(6, "El password debe ser almenos de 6 caracteres"),
    }),

    onSubmit: async (valores) => {
      console.log("enviando..");
      console.log(valores);

      const { name, lastName, dni, email, cellNumber, password, role, img} = valores;

      try {
          const { data } = await createUser({
              variables:{
                  input:{
                      name: name,
                      lastName: lastName,
                      dni: dni,
                      email: email,
                      password: password,
                      cellNumber: cellNumber,
                      role: role,
                      img: img



                  }
              }
          });
          // Usuario creado correctamente
          guardarMensaje(`Se creo correctamente el usuario: ${data.createUser.name}`);
          setTimeout(()=>{
            guardarMensaje(null);

        }, 3000)
          // Redirigir usuario para iniciar sesión

          router.push('/login');
      } catch (error) {
        
         let request = Object.values(error);
        const message = request[0];
        const msgError = message[0];
        const msgError1 = Object.values(msgError);
        const msgError2 = msgError1[0]
        const msgError3 = msgError2[0]
        console.log(msgError3.msg)
        guardarMensaje(msgError3.msg);

          setTimeout(()=>{
              guardarMensaje(null);

          }, 3000)
          
      }
    },
  });

  const mostrarMensaje = () =>{
      return (
          <div className= "bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
              <p>{mensaje}</p>

          </div>
      )
  }

  return (
    <Layout>
        {mensaje && mostrarMensaje()}
      <h1 className="text-center text-2xl text-white font-light">
        Crear Nueva Cuenta
      </h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Nombre
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Ingresar nombre"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.name && formik.errors.name ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.name}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="lastName"
              >
                Apellido
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                id="lastName"
                type="text"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                placeholder="Ingresar apellido"
              />
            </div>

            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.lastName}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="dni"
              >
                DNI
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                id="dni"
                type="text"
                value={formik.values.dni}
                onChange={formik.handleChange}
                placeholder="Ingresar DNI"
              />
            </div>

            {formik.touched.dni && formik.errors.dni ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.dni}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Correo
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                id="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Ingresar correo"
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.email}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                id="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Ingresar contraseña"
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.password}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="cellNumber"
              >
                Celular
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                id="cellNumber"
                type="text"
                value={formik.values.cellNumber}
                onChange={formik.handleChange}
                placeholder="Ingresar apellido"
              />
            </div>

            {formik.touched.cellNumber && formik.errors.cellNumber ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.cellNumber}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="role"
              >
                Rol
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                id="role"
                type="text"
                value={formik.values.role}
                onChange={formik.handleChange}
                placeholder="Seleccionar role"
              />
            </div>

            {formik.touched.role && formik.errors.role ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.role}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="img"
              >
                Ingresar URL de imagen
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-outline"
                id="img"
                type="text"
                value={formik.values.img}
                onChange={formik.handleChange}
                placeholder="Ingresar apellido"
              />
            </div>

            {formik.touched.img && formik.errors.img ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.img}</p>
              </div>
            ) : null}

            <input
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
              type="submit"
              value="Crear cuenta"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NuevaCuenta;
