import { Card, Spin, Alert, Button } from 'antd';
import './card.css';
import useFetchProductos from '../../routes/gets/getProductos';
import { useState } from 'react';

const { Meta } = Card;

const CardList = () => {
  const { productos, loading, error } = useFetchProductos();
  const [viewMode, setViewMode] = useState('grid'); // Estado para cambiar entre 'grilla' y 'lista'

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === 'grid' ? 'list' : 'grid'));
  };

  return (
    <div>
      {/* Botón para cambiar la vista */}
      <Button color="primary" variant="solid" onClick={toggleViewMode} style={{marginBottom: 10}}>
        {viewMode === 'grid' ? 'Ver como Lista' : 'Ver como Grilla'}
      </Button>

      {/* Contenedor de las tarjetas con transición */}
      <div className={`transition-container ${viewMode === 'grid' ? 'card-container-grid' : 'card-container-list'}`}>
        {productos.map((producto) => (
          <Card
            key={producto.idCodigo}
            hoverable
            className={viewMode === 'grid' ? 'card' : 'card-list'}
            cover={
              <div className="card-img-container">
                <img
                  className="card-img"
                  alt={producto.Descripcion}
                  src={producto.URLImagen}
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/240')}
                />
              </div>
            }
          >
            <Meta
              title={producto.Descripcion}
              description={`Precio: $${producto.Precio}`}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CardList;
