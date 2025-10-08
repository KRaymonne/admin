import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Personnel } from './pages/Personnel';
import { Contacts } from './pages/Contacts';
import { EquipmentPage } from './pages/Equipment';
import { Vehicles } from './pages/Vehicles';
import { Alerts } from './pages/Alerts';
import { Offers } from './pages/Offers';
import { BusinessPage } from './pages/Business';
import { Invoices } from './pages/Invoices';
import { Login } from './pages/login';
import { Banks } from './pages/Banks';
import { CashRegisters } from './pages/CashRegisters';
import { Taxes } from './pages/Taxes';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="personnel" element={<Personnel />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="equipements" element={<EquipmentPage />} />
              <Route path="offres" element={<Offers />} />
              <Route path="affaires" element={<BusinessPage />} />
              <Route path="alertes" element={<Alerts />} />
              <Route path="parc-auto" element={<Vehicles />} />
              <Route path="factures" element={<Invoices />} />
              <Route path="banques" element={<Banks />} />
              <Route path="caisses" element={<CashRegisters />} />
              <Route path="impots" element={<Taxes />} />
              <Route path="login" element={<Login/>} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;