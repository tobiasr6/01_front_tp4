import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from '../pages/login/Login';
import BaseLayout from '../layouts/Sidebar';
import { Inicio } from '../pages/inicio/Inicio';
import { Producto } from '../pages/productos/Producto';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route element={<BaseLayout />}>
                    <Route path="/inicio" element={<Inicio />} />
                    <Route path="/productos" element={<Producto/>} />
                </Route>
            </Routes>
        </Router>
    );
}

export default AppRoutes;
