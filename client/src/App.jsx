import { BrowserRouter } from 'react-router';
import './App.css'
import { Spin } from 'antd';
import Spinner from './components/common/Spinner';


const App = () => {
  return (
      <BrowserRouter>
          <AppRoutes />
      </BrowserRouter>
  );
}

export default App;
