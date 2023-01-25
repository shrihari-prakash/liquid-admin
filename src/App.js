import './App.css';
import 'antd/dist/reset.css';
import Omnibar from './components/Omnibar';
import { ConfigProvider, theme } from "antd";
const { darkAlgorithm } = theme;

function App() {
  return (
    <div className="App">
      <ConfigProvider
        theme={{
          algorithm: darkAlgorithm,
        }}>
        <Omnibar></Omnibar>
      </ConfigProvider>
    </div>
  );
}

export default App;
