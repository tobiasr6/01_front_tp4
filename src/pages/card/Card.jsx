import { Card, Spin, Alert, Button, Select, Empty } from 'antd';
import './card.css';
import useFetchProductos from '../../routes/gets/getProductos';
import useFetchRubro from '../../routes/gets/getRubros';
import { useState } from 'react';

const { Meta } = Card;
const { Option } = Select;

const CardList = () => {
  const { productos, loading, error } = useFetchProductos();
  const { rubros, loading: loadingRubros, error: errorRubros } = useFetchRubro();
  const [viewMode, setViewMode] = useState('grid'); // Estado para cambiar entre 'grilla' y 'lista'
  const [selectedRubro, setSelectedRubro] = useState('');

  if (loading || loadingRubros) {
    return <Spin size='large' />; // Mostrar spinner mientras se cargan los productos o rubros
  }

  if (error || errorRubros) {
    return (
      <Alert
        message='Error'
        description={error || errorRubros}
        type='error'
        showIcon
      />
    ); // Mostrar mensaje de error si ocurre en productos o rubros
  }

  const handleRubroChange = (value) => {
    setSelectedRubro(value);
  };

  const filteredProductos = selectedRubro
    ? productos.filter((producto) => producto.DescripcionRub === selectedRubro)
    : productos;

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === 'grid' ? 'list' : 'grid'));
  };

  // console.log('productis', productos);
  // console.log('rubro', rubros)


  return (
    <div>
      {/* Filtro de rubros */}
      <Select
        placeholder='Seleccionar rubro'
        onChange={handleRubroChange}
        style={{ width: 200, marginBottom: 10, marginRight: 10 }}
      >
        <Option value=''>Todos</Option>
        {rubros.map((rubro) => (
          <Option key={rubro.idRubroCod} value={rubro.DescripcionRub}>
            {rubro.DescripcionRub}
          </Option>
        ))}
      </Select>
      {/* Botón para cambiar la vista */}
      <Button
        color='primary'
        variant='solid'
        onClick={toggleViewMode}
        style={{ marginBottom: 10 }}
      >
        {viewMode === 'grid' ? 'Ver como Lista' : 'Ver como Grilla'}
      </Button>

      {/* Contenedor de las tarjetas con transición */}
      {filteredProductos.length === 0 ? (
        <Empty description='No hay productos disponibles' /> // Mostrar mensaje si no hay productos
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
