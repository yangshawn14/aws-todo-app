import { Route, Routes } from 'react-router-dom';  // No need to import BrowserRouter here
import Footer from './components/Footer';
import Header from './components/Header';
import TaskList from './components/TaskList';
import UpdateTask from './components/UpdateTask';
import './index.css';

function App() {
  return (
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
  );
}

export default App;
