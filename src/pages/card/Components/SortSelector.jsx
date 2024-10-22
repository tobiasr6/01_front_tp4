import { Select } from 'antd';

const { Option } = Select;

const SortSelector = ({ onSortChange }) => {
  const handleSortChange = (value) => {
    onSortChange(value); // Llamar a la función que se pasa desde CardList
  };

  return (
    <Select
      placeholder="Ordenar por"
      onChange={handleSortChange}
      style={{ width: 200, marginBottom: 10, marginRight: 10 }}
    >
      <Option value="Precio_DESC">Precio (mayor a menor)</Option>
      <Option value="Precio_ASC">Precio (menor a mayor)</Option>
      <Option value="Descripcion_ASC">Nombre (A-Z)</Option>
      <Option value="Descripcion_DESC">Nombre (Z-A)</Option>
    </Select>
  );
};

export default SortSelector;
