import { useState, useEffect } from 'react';
import axios from 'axios';
import apiConfig from '../../services/apiRoutes';
import { message } from 'antd';

const useFetchProductos = (sortField = 'Precio', sortOrder = 'ASC', searchTerm = '') => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        const fetchProductos = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${apiConfig.API_BASE_URL}${apiConfig.apiProducto.todosProductos}`, {
                    params: { sortField, 
                              sortOrder,
                            search: searchTerm } // Pasar los parámetros al backend
                });
                setProductos(response.data);
            } catch (error) {
                setError('Error al obtener los productos');
                console.error(error);
                message.error('Error al obtener los productos');
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, [sortField, sortOrder, searchTerm]); // Vuelve a hacer la consulta si cambian los parámetros de orden

    return { productos, loading, error };
};

export default useFetchProductos;
