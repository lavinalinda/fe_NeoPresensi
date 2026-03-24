import { useState } from "react"
import { NavLink } from "react-router-dom"
import laporan from "../assets/laporan.png"
import pengajuan from "../assets/pengajuan.png"
import { LuLogOut } from "react-icons/lu";
import { FiHome } from "react-icons/fi";
import { TbUsers } from "react-icons/tb";
import ranking from "../assets/ranking.png"

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    // Add logout logic here
  }

  return (
    <aside
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={`fixed top-0 left-0 z-50 h-screen bg-white border-r border-slate-200 
        transition-all duration-100 ease-in-out transform
        flex flex-col
        ${open ? "w-64 translate-x-0" : "w-16 translate-x-0"}`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 p-4 border-b border-slate-200 overflow-hidden">

        <img
          src="/logoneo.png"
          className="h-9 w-9 shrink-0"
        />

        <div
          className={`transition-all duration-100 ease-in-out
          ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
        >
          <h1 className="font-semibold text-slate-800 whitespace-nowrap">
            Sistem Presensi
          </h1>
          <p className="text-xs text-slate-500 whitespace-nowrap">
            NEO TELEMETRI
          </p>
        </div>
      </div>

      {/* Menu + Logout container */}
      <div className="flex flex-col flex-1">

        {/* Menu */}
        <nav className="p-2 space-y-2">

          <NavLink
            to="/Dashboard"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
              transition-all duration-100
              ${isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-700 hover:bg-slate-100"
              }`
            }
          >
            <FiHome className="h-6 w-6 shrink-0" />

            <span
              className={`transition-all duration-100 whitespace-nowrap
              ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
            >
              Dashboard
            </span>
          </NavLink>

          <NavLink
            to="/rankinganggota"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
              transition-all duration-100
              ${isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-700 hover:bg-slate-100"
              }`
            }
          >
            <img src={ranking} className="h-6 w-6 shrink-0" alt="ranking" />

            <span
              className={`transition-all duration-100 whitespace-nowrap
              ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
            >
              Ranking
            </span>
          </NavLink>

          <NavLink
            to="/anggota"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
              transition-all duration-100
              ${isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-700 hover:bg-slate-100"
              }`
            }
          >
            <TbUsers className="h-6 w-6 shrink-0" />

            <span
              className={`transition-all duration-100 whitespace-nowrap
              ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
            >
              Anggota
            </span>
          </NavLink>

          <NavLink
            to="/laporanpiket"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
              transition-all duration-100
              ${isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-700 hover:bg-slate-100"
              }`
            }
          >
            <img src={laporan} className="h-6 w-6 shrink-0" alt="laporan" />

            <span
              className={`transition-all duration-100 whitespace-nowrap
              ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
            >
              Laporan
            </span>
          </NavLink>

          <NavLink
            to="/pengajuananggota"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
              transition-all duration-100
              ${isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-700 hover:bg-slate-100"
              }`
            }
          >
            <img src={pengajuan} className="h-6 w-6 shrink-0" alt="pengajuan" />

            <span
              className={`transition-all duration-100 whitespace-nowrap
              ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
            >
              Pengajuan
            </span>
          </NavLink>

        </nav>

        {/* Logout*/}
        <div className="p-2 mt-auto border-t border-slate-200">
          <button
            className="flex items-center gap-3 w-full rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-200 transition-all duration-100"
            onClick={handleLogout}
          >
            <LuLogOut className="h-6 w-6 shrink-0" />

            <span
              className={`transition-all duration-100 whitespace-nowrap
              ${open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
            >
              Log Out
            </span>
          </button>
        </div>

      </div>
    </aside>
  )
}