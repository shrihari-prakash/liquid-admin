import './App.css';
import 'antd/dist/reset.css';
import Omnibar from './components/Omnibar';
import UserResults from './components/UserResults';
import { ConfigProvider, theme } from "antd";
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
const { darkAlgorithm } = theme;

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const windowUrl = window.location;
    var url = new URL(windowUrl);
    var code = url.searchParams.get("code");
    if (code) {
      fetch("http://localhost:2000/oauth/token", {
        method: "POST"
        , body: new URLSearchParams("grant_type=authorization_code&client_id=application_client&code=" + code)
      }).then((response) => response.json())
        .then((data) => {
          const accessToken = data.access_token;
          localStorage.setItem('accessToken', accessToken);
        }).catch((err) => {
          console.error(err);
          window.location = "http://localhost:2000";
        })
    } else {
      window.location = "http://localhost:2000";
    }
  }, [])
  return (
    <div className="App">
      <ConfigProvider
        theme={{
          algorithm: darkAlgorithm,
        }}>
        <Omnibar setResults={setResults} setLoading={setLoading}></Omnibar>
        <UserResults results={results} loading={loading} />
      </ConfigProvider>
    </div >
  );
}

export default App;
