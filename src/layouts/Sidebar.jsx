import { useState } from 'react';
import { Layout, Menu, Modal } from 'antd';
import { LogoutOutlined, HomeOutlined, ProductOutlined, SettingOutlined } from '@ant-design/icons';
import { useNavigate, Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const BaseLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();

    const handleMenuClick = ({ key }) => {
        if (key === 'logout') {
            setIsModalVisible(true);
        } else {
            navigate(key);
        }
    };

    const handleOk = () => {
        setIsModalVisible(false);
        localStorage.removeItem('user');
        navigate('/');
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                <Menu theme="dark" mode="inline" onClick={handleMenuClick} style={{ paddingTop: 50 }}>
                    <Menu.Item key="/inicio" icon={<HomeOutlined />}>
                        Inicio
                    </Menu.Item>
                    <Menu.Item key="/productos" icon={<ProductOutlined />}>
                        Productos
                    </Menu.Item>
                    <Menu.Item key="/config" icon={<SettingOutlined />}>
                        Configuracion
                    </Menu.Item>
                    <Menu.Item key="logout" icon={<LogoutOutlined />}>
                        Cerrar Sesión
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '10px 16px' }}>
                    <Outlet />
                </Content>
            </Layout>
            <Modal
                title="Confirmación"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Sí"
                cancelText="No"
            >
                <p>¿Estás seguro de que quieres cerrar sesión?</p>
            </Modal>
        </Layout>
    );
};

export default BaseLayout;
