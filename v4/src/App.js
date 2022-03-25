
import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Event from './pages/Event';
import Events from './pages/Events';
import { useParams } from 'react-router-dom';

export  const webLink = "https://vef2-20222-v3-synilausn.herokuapp.com/";


function App() {
    
  return (
    <div className="App">
    <Router>
        <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/events/:slug" element={<Event />} exact/>
      </Routes>
    </Router>
      
    </div>
  );
}





export default App;
