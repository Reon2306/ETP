import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './components/landing/landing'
import Login from './components/landing/login'
import Signup from './components/landing/signup'
import Header from './components/landing/Header';
import Footer from './components/landing/footer';
import DashboardLayout from './components/dashboard/layout';
import Dashboard from './components/dashboard/home';
import SearchPage from './components/dashboard/search';
import SettingsPage from './components/dashboard/settings';
import FavoritesPage from './components/dashboard/favorites';
import UploadPage from './components/dashboard/upload';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="upload" element={<UploadPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App