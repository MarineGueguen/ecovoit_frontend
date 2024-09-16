import { SetStateAction } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useLocalStorage } from './hooks/useLocalStorage';
import { RegisterValues } from './types/User';

import MainLayout from "./layouts/MainLayout";
import ProfilLayout from './layouts/ProfilLayout';

import AddJourney from './pages/AddJourney';
import Home from "./pages/Home";
import Journeys from './pages/Journeys';
import Login from "./pages/Login";
import MyJourneys from './pages/MyJourneys';
import Profil from './pages/Profil';
import Register from "./pages/Register";
import Vehicles from './pages/Vehicles';

import "./assets/App.css";



const App = () => {
  const [token, setToken] = useLocalStorage("Token", "");
  return (
    <Routes>
      <Route path="/" element={<MainLayout token={token} setToken={setToken} />}>
        <Route path="/inscription" element={<Register submit={function (_value: RegisterValues) { }} viewPassword={false} setViewPassword={function (_value: SetStateAction<boolean>): void { }} />} />
        <Route path="/" element={<Home />} />
        <Route path="/connexion" element={<Login token={token} setToken={setToken} />} />
        <Route path="/publication" element={<AddJourney />} />
        <Route path="/trajets" element={<Journeys />} />
        <Route path="/profil" element={<ProfilLayout />}>
          <Route path='/profil' element={<Profil />} />
          <Route path='/profil/vehicules' element={<Vehicles />} />
          <Route path="/profil/trajets" element={<MyJourneys />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
