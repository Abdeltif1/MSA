import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminPage } from './pages/AdminPage/AdminPage';
import { PrayerPage } from './pages/PrayerPage';
import ImamManagement from './pages/AdminPage/ImamManagement'; // No curly braces
import WelcomePage from './pages/AdminPage/WelcomePage';
import IqamaManagement from './pages/AdminPage/IqamaManagement';
import JumaaTime from './components/Menu/JumaaTime';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrayerPage />} />
        <Route path="/admin" element={<AdminPage />}>
          <Route path="" element = {<WelcomePage/>}/>
          <Route path="imam-management" element={<ImamManagement />} />
          <Route path="iqama-management" element={<IqamaManagement />} />
          <Route path="jumaa-management" element={<JumaaTime/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
