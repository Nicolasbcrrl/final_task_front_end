
import './App.css';
import {Routes, Route} from 'react-router-dom';
import DrawerMenu from './components/DrawerMenu';
import CustomerList from './components/CustomerList';
import {useNavigate} from 'react-router-dom';
import TrainingsList from './components/TrainingsList';
import TrainingCalendar from './components/TrainingCalendar';
import Statistics from './components/Statistics';

function App() {
  const navigate = useNavigate();
  const handelPageChange = (page) => {
    navigate(page);
  };

  return (
    <div className="App">
      <DrawerMenu handelPageChange={handelPageChange}/>
      <Routes>
        <Route exact path="*" element={<CustomerList />} />
        <Route path="/trainings" element={<TrainingsList />} />
        <Route path="/calendar" element={<TrainingCalendar />} />
        <Route path="/statistics" element={<Statistics />} />
      </Routes>
    </div>
  );
}

export default App;
