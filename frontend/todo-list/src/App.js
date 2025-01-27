import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import TaskList from './components/TaskList';
import UpdateTask from './components/UpdateTask';
import './index.css';

function App() {
  return (
    <Router>  {/* Wrap the routes with Router */}
      <div className="App">
        <Header />
        <main>
          <Routes>
            {/* Define routes */}
            <Route path="/" element={<TaskList />} /> {/* Default route */}
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/updateTask/:id" element={<UpdateTask />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
