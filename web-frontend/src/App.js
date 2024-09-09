import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { AdminPage } from './pages/AdminPage';
import { PrayerPage } from './pages/PrayerPage';

function App() {

  return (
  <Router>
    <Routes>
      <Route path="/msa-web-app/" element={<PrayerPage />}/>
      <Route path="/msa-web-app/admin" element={<AdminPage />} />
    </Routes>
  </Router>

  );
}


export default App;


