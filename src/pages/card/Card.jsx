import { Card, Spin, Alert, Button, Select, Empty } from 'antd';
import './card.css';
import useFetchProductos from '../../routes/gets/getProductos';
import useFetchRubro from '../../routes/gets/getRubros';
import SearchBar from './Components/SearchBar';
import SortSelector from './Components/SortSelector';
import { useState } from 'react';

const { Meta } = Card;
const { Option } = Select;

const CardList = () => {
  const [viewMode, setViewMode] = useState('grid'); // Estado para cambiar entre 'grilla' y 'lista'
  const [selectedRubro, setSelectedRubro] = useState('');
  const [sortField, setSortField] = useState('Precio');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda
  
  // Llamar a la función useFetchProductos con los parámetros de ordenamiento
  const { productos, loading, error } = useFetchProductos(sortField, sortOrder);
  const { rubros, loading: loadingRubros, error: errorRubros } = useFetchRubro();

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

  const filteredProductos = productos
    .filter((producto) => 
      (!selectedRubro || producto.DescripcionRub === selectedRubro) && // Filtrar por rubro
      producto.Descripcion.toLowerCase().includes(searchTerm.toLowerCase()) // Filtrar por búsqueda
    );

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
      >
        <Option value=''>Todos</Option>
        {rubros && rubros.map((rubro) => (
          <Option key={rubro.idRubroCod} value={rubro.DescripcionRub}>
            {rubro.DescripcionRub}
          </Option>
        ))}
      </Select>

      {/* Componente de búsqueda */}
      <SearchBar onSearch={handleSearch} />
      
      {/* Componente de ordenamiento */}
      <SortSelector onSortChange={handleSortChange} />

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
