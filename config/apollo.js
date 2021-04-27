import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from 'apollo-link-context'
import fetch from 'node-fetch';

// para trabajar con el contex
const httpLink = createHttpLink({
    uri: 'http://localhost:7000/graphql',
    fetch
});

// Recuperamos todo lo que hay en el header pero agregamos nuestro propio header adicional
const authLink = setContext((_, { headers }) =>{

    // Leer el localstorage
    const token = localStorage.getItem('token')
    return{
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}`: ''
        }
    }
});

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authLink.concat( httpLink)
});



export default client;
