import Head from 'next/head'
import Layout from '../components/Layout';
import {gql, useQuery} from '@apollo/client';
import {useRouter} from 'next/router';
import Link from 'next/link';


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

const Partners =()=> {

const router = useRouter();

const {data, loading, error } = useQuery(OBTENER_PARTNER);
console.info(data)
console.log(loading)
console.log(error)
if(loading) return 'Cargando';

  // Si no hay información 
  if(!data.partner){
    //window.location.replace('/login');
    return router.push('/login')
}

return(
  <div>
    <Layout>

    <h1 className="text-2xl text-gray-800 font-light">Socios ERP Odoo</h1>
    <Link href="/nuevopartner">
            <a className="bg-blue-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">Nuevo Partner</a>
     </Link>
     <table className="table-auto shadow-md mt-5 w-full w-lg">
       <thead className="bg-gray-800">
         <tr className="text-white">
            <th className="w-1/5 py-2">Nombre</th>
            <th className="w-1/5 py-2">Correo</th>
            <th className="w-1/5 py-2">Empresa</th>
            <th className="w-1/5 py-2">Dirección</th>
         </tr>
       </thead>
       <tbody className="bg-white">
         {data.partner.map(partner=>(
           <tr key={partner.id}>
             <td className="border px-4 py-2">{partner.name}</td>
             <td className="border px-4 py-2">{partner.email}</td>
             <td className="border px-4 py-2">{partner.parent_name}</td>
             <td className="border px-4 py-2">{partner.city}, {partner.street}</td>
           </tr>
         ))}
       </tbody>
     </table>
    
    </Layout>

  </div>
  )
}
export default Partners