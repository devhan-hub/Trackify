import '../../../src/index.css';
import Sidebar from './Sidebar.js';
import Main from './Main.js';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
function App() {


  return (
    <div className="App h-screen flex ">
    <Router>
      <Sidebar/>
      <Main/>
      </Router>
    </div>
  );
}

export default App;
