import React from 'react';
import { Row, Col, Card } from 'antd';
import './App.css';

const Canvas = ({ children }) => {
  return (
    <Row justify="center" align="middle" style={{ height: '100vh', background: '#f0f2f5', padding: 20 }}>
      <Col>
        <Card style={{ minWidth: 300, minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {children}
        </Card>
      </Col>
    </Row>
  );
};

const App = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <Canvas>
      <Button type="primary" onClick={() => setModalVisible(true)}>Open Modal</Button>
      <ModalWrapper visible={modalVisible} onClose={() => setModalVisible(false)}>
        <p>Modal Content Goes Here</p>
      </ModalWrapper>
    </Canvas>
  );
}

export default App;
