import '../../../src/index.css';
import Sidebar from '../side/Sidebar.js';
import Main from './Main.js';
import { BrowserRouter as Router } from 'react-router-dom';
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
