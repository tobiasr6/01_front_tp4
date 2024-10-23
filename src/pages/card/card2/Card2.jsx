import { Card, Spin, Alert, Button, Select, Empty } from 'antd';
import './card2.css';
import useFetchProductos from '../../../routes/gets/getProducto2';
import useFetchRubro from '../../../routes/gets/getRubros';
import SearchBar from '../card2/components/SearchBar2';
import SortSelector from '../Components/SortSelector';
import { useState, useEffect } from 'react';

const { Meta } = Card;
const { Option } = Select;

const CardList = () => {
  const [viewMode, setViewMode] = useState('grid'); // Estado para cambiar entre 'grilla' y 'lista'
  const [selectedRubro, setSelectedRubro] = useState('');
  const [sortField, setSortField] = useState('Precio');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // Cargar valores desde localStorage al montar el componente
  useEffect(() => {
    const storedRubro = localStorage.getItem('selectedRubro');
    const storedSortField = localStorage.getItem('sortField');
    const storedSortOrder = localStorage.getItem('sortOrder');
    const storedSearchTerm = localStorage.getItem('searchTerm');

    if (storedRubro) setSelectedRubro(storedRubro);
    if (storedSortField) setSortField(storedSortField);
    if (storedSortOrder) setSortOrder(storedSortOrder);
    if (storedSearchTerm) setSearchTerm(storedSearchTerm);
  }, []);

  // Guardar en localStorage cuando cambia el estado
  useEffect(() => {
    localStorage.setItem('selectedRubro', selectedRubro);
    localStorage.setItem('sortField', sortField);
    localStorage.setItem('sortOrder', sortOrder);
    localStorage.setItem('searchTerm', searchTerm);
    console.log('Guardando en localStorage:', { selectedRubro, sortField, sortOrder, searchTerm });
  }, [selectedRubro, sortField, sortOrder, searchTerm]);

  // Llamar a la función useFetchProductos con los parámetros de ordenamiento
  const { productos, loading, error } = useFetchProductos(sortField, sortOrder, debouncedSearchTerm);
  const { rubros, loading: loadingRubros, error: errorRubros } = useFetchRubro();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 150);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  if (loading || loadingRubros) {
    return <Spin size='large' />;
  }

  if (error || errorRubros) {
    return (
      <Alert
        message='Error'
        description={error || errorRubros}
        type='error'
        showIcon
      />
    );
  }

  const handleRubroChange = (value) => {
    setSelectedRubro(value);
  };

  const handleSortChange = (value) => {
    const [field, order] = value.split('_');
    setSortField(field);
    setSortOrder(order);
  };

  const filteredProductos = selectedRubro
    ? productos.filter((producto) => producto.DescripcionRub === selectedRubro)
    : productos;

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === 'grid' ? 'list' : 'grid'));
  };

  const handleSearch = (value) => {
    setSearchTerm(value); // Actualizar el término de búsqueda cuando el usuario busca
  };

  return (
    <div>
      {/* Filtro de rubros */}
      <Select
        placeholder='Seleccionar rubro'
        onChange={handleRubroChange}
        style={{ width: 200, marginBottom: 10, marginRight: 10 }}
        value={selectedRubro} // Asegúrate de que el valor del select esté vinculado
      >
        <Option value=''>Todos</Option>
        {rubros && rubros.map((rubro) => (
          <Option key={rubro.idRubroCod} value={rubro.DescripcionRub}>
            {rubro.DescripcionRub}
          </Option>
        ))}
      </Select>

      {/* Componente de búsqueda */}
      <SearchBar onSearch={handleSearch} value={searchTerm} />
      
      {/* Componente de ordenamiento */}
      <SortSelector 
        onSortChange={handleSortChange} 
        sortField={sortField}  // Pasa el sortField actual
        sortOrder={sortOrder}  // Pasa el sortOrder actual
      />

      {/* Botón para cambiar la vista */}
      <Button
        color='primary'
        variant='solid'
        onClick={toggleViewMode}
        style={{ marginBottom: 10 }}
      >
        {viewMode === 'grid' ? 'Ver como Lista' : 'Ver como Grilla'}
      </Button>

      {filteredProductos.length === 0 ? (
        <Empty description='No hay productos disponibles' />
      ) : (
        <div
          className={`transition-container ${
            viewMode === 'grid' ? 'card-container-grid' : 'card-container-list'
          }`}
        >
          {filteredProductos.map((producto) => (
            <Card
              key={producto.idCodigo}
              hoverable
              className={viewMode === 'grid' ? 'card' : 'card-list'}
              cover={
                <div className='card-img-container'>
                  <img
                    className='card-img'
                    alt={producto.Descripcion}
                    src={producto.URLImagen}
                    onError={(e) =>
                      (e.target.src = 'https://via.placeholder.com/240')
                    }
                  />
                </div>
              }
            >
              <Meta
                title={producto.Descripcion}
                description={
                  <>
                    <p>Precio: ${producto.Precio}</p>
                    <p>Rubro: {producto.DescripcionRub}</p>
                  </>
                }
              />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardList;
