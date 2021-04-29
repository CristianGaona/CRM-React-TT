import React from 'react'
import { useQuery, gql} from '@apollo/client';
import {useRouter} from 'next/router';


const OBTENER_USUARIO = gql `
        query getUserResolver{
            getUser{
                 uid
                 name
                 lastName
    }
  }

`;


const Header = () =>{
    const router = useRouter();
    
    const { data, loading, error} = useQuery(OBTENER_USUARIO);
    console.log(data)
    console.log(loading)
    console.log(error)


// Proteger  que no accedamos a data antes de tener resultados
    if(loading) return null;

    // Si no hay información 
    if(!data){
        return router.push('/login')
    }


    const { name, lastName } = data.getUser;
    //console.log(nombre);
    const cerrarSesion= () =>{
        localStorage.removeItem('token');
        //window.location.href = window.location.href;
        window.location.replace('/login'); // refresh page
        //router.push("/login")
    }
    return(
    
        <div className= "flex justify-between mb-6">
            <p className="mr-2">Hola: {name} {lastName} </p>
            <button 
             onClick={()=>cerrarSesion()}
            className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md" type="button">
                Cerrar Sesión
            </button>
        </div>
        
    )
    
}

export default Header;