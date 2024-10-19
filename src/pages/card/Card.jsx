import { Card, Spin, Alert } from 'antd';
import './card.css';
import useFetchProductos from '../../routes/gets/getProductos';

// import imagen from '../../assets/1.jpg';

const { Meta } = Card;

const CardP = () => {
    const { productos, loading, error } = useFetchProductos();

    if (loading) {
        return <Spin size="large" />;
    }

    if (error) {
        return <Alert message="Error" description={error} type="error" showIcon />;
    }

    console.log(productos); // Esto te ayudará a verificar que estás recibiendo los productos correctamente.

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            {productos.map((producto) => {
                const imagen = producto.URLImagen; // Asegúrate de que esta URL sea correcta

                return (
                    <Card
                        key={producto.idCodigo}
                        hoverable
                        style={{ width: 240 }}
                        cover={
                            <img
                                alt={producto.Descripcion}
                                src={imagen} // Usa directamente la URL de la base de datos
                                onError={(e) => (e.target.src = 'https://via.placeholder.com/240')} // Usa una imagen de respaldo si la URL falla
                            />
                        }
                    >
                        <Meta title={producto.Descripcion} description={`Precio: $${producto.Precio}`} />
                    </Card>
                );
            })}
        </div>
    );
};

export default CardP;
