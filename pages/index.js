import Layout from '../components/Layout';
import {gql, useQuery} from '@apollo/client';
import {useRouter} from 'next/router';
import Link from 'next/link';

const OBTENER_CLIENTE_VENDEDOR = gql `
  query clientsUserResolver{
    getClientsUser {
    dni
    nombre
    apellido
    correo
    direccion
  }
}
`

const Index = () => {

  const router = useRouter();

  // Consulta de Apollo
  const {data, loading, error } = useQuery(OBTENER_CLIENTE_VENDEDOR);
  
  console.info(data)
  console.log(loading)
  console.log(error)
  if(loading) return 'Cargando';

  // Si no hay información 
  if(!data.getClientsUser){
    //window.location.replace('/login');
    return router.push('/login')
}
  
    return(
      <div>
      <Layout>
          <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
          <Link href="/nuevocliente">
            <a className="bg-blue-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">Nuevo Cliente</a>
          </Link>
         
          <table className="table-auto shadow-md mt-5 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="w-1/5 py-2">Nombre</th>
                <th className="w-1/5 py-2">Correo</th>
                <th className="w-1/5 py-2">DNI</th>
                <th className="w-1/5 py-2">Dirección</th>
                
              </tr>
            </thead>
            <tbody className="bg-white">
              
            {data.getClientsUser.map(cliente =>(
                <tr key={cliente.id}>

                  <td className="border px-4 py-2"> {cliente.nombre} {cliente.apellido}</td>
                  <td className="border px-4 py-2"> {cliente.correo} </td>
                  <td className="border px-4 py-2"> {cliente.dni} </td>
                  <td className="border px-4 py-2"> {cliente.direccion} </td>
                </tr>
                 ))}
            </tbody>

          </table>
        
      </Layout>

    </div>
    )
  }

export default Index