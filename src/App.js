import Input from './components/Input';
import TodoList from './components/TodoList.jsx';
import { Provider } from 'react-redux';
import './index.css';
import Sidebar from './components/side/Sidebar.js';
import Main from './components/main/Main.js';
function App() {
  return (
    <div className="App h-screen flex ">
    
      <Sidebar/>
      <Main/>
    </div>
  );
}

export default App;
