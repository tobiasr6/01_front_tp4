import './login.css';
import { useState } from 'react';
import { Button, Form, Input, Alert, message } from 'antd'; // Importa componentes de Ant Design
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Estado para manejar errores
  const navigate = useNavigate(); // Hook para redirigir a otra página

  const onFinish = (values) => {
    setLoading(true);
    // Simulación de autenticación
    const { username, password } = values;

    if (username === 'admin' && password === '1234') {
      // Login exitoso, redirige a /inicio
      navigate('/inicio');
    } else {
      // Error de login
      message.error('Credenciales incorrectas. Intentá de nuevo.');
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      {error && <Alert message={error} type="error" showIcon closable />}
      <Form
        name="login"
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: '400px', margin: '0 auto' }}
      >
        <Form.Item
          label="Usuario"
          name="username"
          rules={[{ required: true, message: 'Por favor ingrese su usuario' }]}
        >
          <Input placeholder="Ingresa tu usuario" />
        </Form.Item>
        <Form.Item
          label="Contraseña"
          name="password"
          rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}
        >
          <Input.Password placeholder="Ingresa tu contraseña" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Iniciar Sesión
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
