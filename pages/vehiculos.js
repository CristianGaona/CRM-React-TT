import Layout from '../components/Layout';
import { useQuery, gql } from '@apollo/client';
import Vehiculo from '../components/Vehiculo';

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
const Vehiculos = () => {

  // Conusltar productos
  const { data, loading, error } = useQuery(OBTENER_VEHICULOS)

  

  if (loading) return 'cargando'
  return (
    <div>
      <Layout>

        <h1 className="text-2xl text-gray-800 font-light">Vehiculos</h1>

        <table className="table-auto shadow-md mt-5 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Modelo</th>
              <th className="w-1/5 py-2">Marca</th>
              <th className="w-1/5 py-2">Precio</th>
              <th className="w-1/5 py-2">Stock</th>
              <th className="w-1/5 py-2">Eliminar</th>
              <th className="w-1/5 py-2">Editar</th>

            </tr>
          </thead>
          <tbody className="bg-white">

            {data.getCar.map(car => (
              <Vehiculo key={car.id}
                car={car} />
            ))}
          </tbody>

        </table>
      </Layout>

    </div>
  )
}

export default Vehiculos