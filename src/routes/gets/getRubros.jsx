import { useState, useEffect } from 'react';
import axios from 'axios';
import apiConfig from '../../services/apiRoutes';
import { message } from 'antd';

const useFetchRubro = () => {
    const [rubros, setRubros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        const fetchRubros = async () => {
            try {
                const response = await axios.get(`${apiConfig.API_BASE_URL}${apiConfig.apiRubro.todosRubros}`);
      setRubros(response.data);

    } catch (error) {
        setError('Error al obtener los rubros');
        console.error(error);
      message.error('Error al obtener los rubros');
    }finally {
        setLoading(false);
    }
};

fetchRubros();
}, []);

return { rubros, loading, error };
};

export default useFetchRubro;