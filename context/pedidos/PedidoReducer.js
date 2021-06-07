import {
    SELECCIONAR_CLIENTE,
    SELECCIONAR_VEHICULO,
    CANTIDAD_VEHICULOS

} from '../../types'

export default (state, action) => {
    switch(action.type){
        case SELECCIONAR_CLIENTE: 
        return{
            ...state,
            cliente: action.payload
        }
        case SELECCIONAR_VEHICULO:
            return{
                ...state,
                vehiculos: action.payload
            }
        default:
            return state
    }
}