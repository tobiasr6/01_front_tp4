// components/SearchBar.js
import { Input } from 'antd';

const { Search } = Input;

const SearchBar = ({ onSearch }) => {

    const handleInputChange = (e) => {
        onSearch(e.target.value); // Llamar a la función onSearch cada vez que cambia el input
      };

  return (
    <Search
      placeholder="Buscar por descripción"
      allowClear
      enterButton="Buscar"
      onChange={handleInputChange}
      style={{ width: 500, marginRight: 10, height: 32 }}
    />
  );
};

export default SearchBar;
