import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './user/Login'
import Dashboard from "./admin/Dashboard";
import Anggota from "./admin/Anggota";
import TambahAnggota from "./admin/TambahAnggota";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/anggota" element={<Anggota />} />
        <Route path="/tambah-anggota" element={<TambahAnggota />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
