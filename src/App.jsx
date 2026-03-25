import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './user/Login'
import Dashboard from "./admin/Dashboard";
import Anggota from "./admin/Anggota";
import TambahAnggota from "./admin/TambahAnggota";
import EditAnggota from "./admin/EditAnggota";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/anggota" element={<Anggota />} />
        <Route path="/tambah-anggota" element={<TambahAnggota />} />
        <Route path="/edit-anggota/:id" element={<EditAnggota />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
