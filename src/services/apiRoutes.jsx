const API_BASE_URL = 'http://localhost:3000/api'

const apiProducto = {
    //!GET
    todosProductos: '/producto', //Obtener todos los productos
    productoId: (id) => `/producto/${id}`, //Obtener producto por id

    //!POST
    crearProducto: '/producto', //Crear un nuevo producto

    //!PUT
    actualizarProducto: (id) => `/producto/${id}`, //Actualizar un producto por id

    //!DELETE
    borrarProducto: (id) => `/producto/${id}` //Borrar un producto por id
}

const apiRubro = {
    //!GET
    todosRubros: '/rubro', //Obtener todos los rubro
    rubroId: (id) => `/rubro/${id}`, //Obtener rubro por id

    //!POST
    crearRubro: '/rubro', //Crear un nuevo rubro

    //!PUT
    actualizarRubro: (id) => `/rubro/${id}`, //Actualizar un rubro por id

    //!DELETE
    borrarRubro: (id) => `/rubro/${id}` //Borrar un rubro por id
}

export default {
    API_BASE_URL,
    apiProducto,
    apiRubro
}

