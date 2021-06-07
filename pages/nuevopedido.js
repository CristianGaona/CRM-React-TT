import React, {useContext} from 'react';
import Layout from '../components/Layout';
import AsignarCliente from '../components/pedidos/AsignarCliente';
import AsignarVehiculos from '../components/pedidos/AsignarVehiculos';

// Context de pedidos
import PedidoContext from '../context/pedidos/PedidoContext'


const NuevoPedido = () => {

    // Utilizar cotext y extraer funciones y valores
    const pedidoContext = useContext(PedidoContext);
   

    
    return (
        <Layout>

            <h1 className="text-2xl text-gray-800 font-light">Crear Nuevo Pedido</h1>
            <AsignarCliente/>
            <AsignarVehiculos/>
    
           
        </Layout>



    )

}


export default NuevoPedido;