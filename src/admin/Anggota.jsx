import React, { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import "../App.css"
import "@fontsource/poppins"
import { MagnifyingGlassIcon, PlusIcon, PencilIcon, TrashIcon, UserGroupIcon, IdentificationIcon } from "@heroicons/react/24/solid"

// ─── Data Anggota (Mock Data) ─────────────────────────────────────────────────

const initialAnggota = [
    {
        id: 1,
        nama: "Budi Santoso",
        nim: "2024001",
        rfid: "RF001",
        shift: "Shift 1",
        hariPiket: "Senin",
    },
    {
        id: 2,
        nama: "Ani Wijaya",
        nim: "2024002",
        rfid: "RF002",
        shift: "Shift 1",
        hariPiket: "Selasa",
    },
    {
        id: 3,
        nama: "Citra Dewi",
        nim: "2024003",
        rfid: "RF003",
        shift: "Shift 2",
        hariPiket: "Rabu",
    },
    {
        id: 4,
        nama: "Doni Pratama",
        nim: "2024004",
        rfid: "RF004",
        shift: "Shift 2",
        hariPiket: "Kamis",
    },
    {
        id: 5,
        nama: "Eka Putri",
        nim: "2024005",
        rfid: "RF005",
        shift: "Shift 1",
        hariPiket: "Jumat",
    },
    {
        id: 6,
        nama: "Fajar Nugroho",
        nim: "2024006",
        rfid: "RF006",
        shift: "Shift 3",
        hariPiket: "Senin",
    },
    {
        id: 7,
        nama: "Gita Lestari",
        nim: "2024007",
        rfid: "RF007",
        shift: "Shift 3",
        hariPiket: "Selasa",
    },
    {
        id: 8,
        nama: "Hadi Kusuma",
        nim: "2024008",
        rfid: "RF008",
        shift: "Shift 2",
        hariPiket: "Rabu",
    },
    {
        id: 9,
        nama: "Indah Sari",
        nim: "2024009",
        rfid: "RF009",
        shift: "Shift 1",
        hariPiket: "Kamis",
    },
    {
        id: 10,
        nama: "Joko Purnomo",
        nim: "2024010",
        rfid: "RF010",
        shift: "Shift 3",
        hariPiket: "Jumat",
    },
    {
        id: 11,
        nama: "Kara Malik",
        nim: "2024011",
        rfid: "RF011",
        shift: "Shift 4",
        hariPiket: "Senin",
    },
    {
        id: 12,
        nama: "Lina Putri",
        nim: "2024012",
        rfid: "RF012",
        shift: "Shift 4",
        hariPiket: "Selasa",
    },
]

// ─── Status Badge Color ──────────────────────────────────────────────────────

const shiftColors = {
    "Shift 1": "bg-blue-500/20 text-blue-800",
    "Shift 2": "bg-purple-500/20 text-purple-800",
    "Shift 3": "bg-pink-500/20 text-pink-800",
    "Shift 4": "bg-green-500/20 text-green-800",
}

// ─── Main Component ─────────────────────────────────────────────────────────

const Anggota = () => {
    const navigate = useNavigate()
    const [anggota] = useState(initialAnggota)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterShift, setFilterShift] = useState("Semua")
    const [filterHari, setFilterHari] = useState("Semua")
    const [currentPage, setCurrentPage] = useState(1)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [deleteTarget, setDeleteTarget] = useState({ id: null, nama: "" })
    const itemsPerPage = 5

    // ─── Get Unique Values for Filters ──────────────────────────────────────

    const shiftList = useMemo(() => {
        const shift = ["Semua", ...new Set(anggota.map((a) => a.shift))]
        return shift
    }, [anggota])

    const hariList = useMemo(() => {
        const hari = ["Semua", ...new Set(anggota.map((a) => a.hariPiket))]
        return hari
    }, [anggota])

    // ─── Filter Data ────────────────────────────────────────────────────────

    const filteredAnggota = useMemo(() => {
        return anggota.filter((item) => {
            const matchSearch =
                item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.nim.includes(searchTerm) ||
                item.rfid.toLowerCase().includes(searchTerm.toLowerCase())

            const matchShift = filterShift === "Semua" || item.shift === filterShift
            const matchHari = filterHari === "Semua" || item.hariPiket === filterHari

            return matchSearch && matchShift && matchHari
        })
    }, [anggota, searchTerm, filterShift, filterHari])

    // ─── Pagination Logic ───────────────────────────────────────────────────

    const totalPages = Math.ceil(filteredAnggota.length / itemsPerPage)
    const paginatedAnggota = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        return filteredAnggota.slice(startIndex, endIndex)
    }, [filteredAnggota, currentPage])

    // Reset page ketika filter berubah
    const handleFilterChange = (filterType, value) => {
        setCurrentPage(1)
        if (filterType === "shift") setFilterShift(value)
        else if (filterType === "hari") setFilterHari(value)
    }

    // ─── Event Handlers ─────────────────────────────────────────────────────

    const handleEdit = (id) => {
        navigate(`/edit-anggota/${id}`)
    }

    const openDeleteModal = (id, nama) => {
        setDeleteTarget({ id, nama })
        setDeleteModalOpen(true)
    }

    const confirmDelete = () => {
        alert(`Anggota ${deleteTarget.nama} telah dihapus`)
        setDeleteModalOpen(false)
        setDeleteTarget({ id: null, nama: "" })
    }

    const closeDeleteModal = () => {
        setDeleteModalOpen(false)
        setDeleteTarget({ id: null, nama: "" })
    }

    const handleTambahAnggota = () => {
        navigate("/tambah-anggota")
    }

    // ─── Render ─────────────────────────────────────────────────────────────

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="ml-16 p-6 transition-all duration-300">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <header className="mt-2 mb-6">
                        <h3 className="text-lg font-medium font-poppins mb-1">
                            Welcome to Absensi Neo Telemetri, Admin
                        </h3>
                        <h1 className="font-bold font-poppins text-3xl">Data Anggota</h1>
                    </header>

                    {/* Top Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        {/* Search Bar */}
                        <div className="w-full md:w-1/3 relative">
                            <svg
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M21 21l-4.35-4.35M16.65 16.65A7 7 0 1116.65 2.35a7 7 0 010 14.3z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Cari Nama/NIM/RFID"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm w-full outline-none focus:border-gray-400"
                            />
                        </div>

                        {/* Add Button */}
                        <button
                            onClick={handleTambahAnggota}
                            className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
                        >
                            <PlusIcon className="w-4 h-4" />
                            Tambah Anggota
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        {/* Filter Shift */}
                        <div className="flex-1">
                            <label className="block text-xs font-semibold text-gray-700 mb-2">Shift</label>
                            <select
                                value={filterShift}
                                onChange={(e) => handleFilterChange("shift", e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400"
                            >
                                {shiftList.map((shift) => (
                                    <option key={shift} value={shift}>
                                        {shift}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Filter Hari Piket */}
                        <div className="flex-1">
                            <label className="block text-xs font-semibold text-gray-700 mb-2">Hari Piket</label>
                            <select
                                value={filterHari}
                                onChange={(e) => handleFilterChange("hari", e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400"
                            >
                                {hariList.map((hari) => (
                                    <option key={hari} value={hari}>
                                        {hari}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Total Anggota Box */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
                        <p className="text-sm text-gray-600">
                            Total Anggota: <span className="font-bold text-gray-900 text-lg">{filteredAnggota.length}</span>
                        </p>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                        {filteredAnggota.length > 0 ? (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        {/* Table Head */}
                                        <thead className="bg-gray-800 text-white">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Nama</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">NIM</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">RFID</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Shift</th>
                                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Hari Piket</th>
                                                <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider">Aksi</th>
                                            </tr>
                                        </thead>

                                        {/* Table Body */}
                                        <tbody className="divide-y divide-gray-100">
                                            {paginatedAnggota.map((item) => (
                                                <tr
                                                    key={item.id}
                                                    className="hover:bg-gray-50 transition-colors"
                                                >
                                                    <td className="px-6 py-3 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">{item.nama}</div>
                                                    </td>
                                                    <td className="px-6 py-3 whitespace-nowrap">
                                                        <div className="text-sm text-gray-600">{item.nim}</div>
                                                    </td>
                                                    <td className="px-6 py-3 whitespace-nowrap">
                                                        <div className="text-sm font-mono text-gray-600">{item.rfid}</div>
                                                    </td>
                                                    <td className="px-6 py-3 whitespace-nowrap">
                                                        <span className={`flex items-center justify-center px-0.5 py-1 text-xs font-semibold min-w-[50px] h-6 ${shiftColors[item.shift]}`}>
                                                            {item.shift}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-3 whitespace-nowrap">
                                                        <div className="text-sm text-gray-600">{item.hariPiket}</div>
                                                    </td>
                                                    <td className="px-6 py-3 whitespace-nowrap text-sm">
                                                        <div className="flex gap-1 justify-center">
                                                            <button
                                                                onClick={() => handleEdit(item.id)}
                                                                className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 border border-blue-300 rounded hover:bg-blue-50 hover:border-blue-400 transition"
                                                                title="Edit"
                                                            >
                                                                <PencilIcon className="w-3 h-3" />
                                                                <span>Edit</span>
                                                            </button>
                                                            <button
                                                                onClick={() => openDeleteModal(item.id, item.nama)}
                                                                className="flex items-center gap-1 px-2 py-1 text-xs text-red-600 border border-red-300 rounded hover:bg-red-50 hover:border-red-400 transition"
                                                                title="Hapus"
                                                            >
                                                                <TrashIcon className="w-3 h-3" />
                                                                <span>Hapus</span>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination Controls */}
                                <div className="bg-gray-50 border-t border-gray-100 px-6 py-4 flex items-center justify-between">
                                    <div className="text-sm text-gray-600">
                                        Halaman <span className="font-semibold text-gray-900">{currentPage}</span> dari <span className="font-semibold text-gray-900">{totalPages}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                            disabled={currentPage === 1}
                                            className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                        >
                                            Sebelumnya
                                        </button>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`px-3 py-1 text-sm rounded-lg transition ${currentPage === page
                                                    ? "bg-gray-800 text-white"
                                                    : "border border-gray-200 hover:bg-gray-100"
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                            disabled={currentPage === totalPages}
                                            className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                        >
                                            Berikutnya
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            // Empty State
                            <div className="px-6 py-12 text-center">
                                <p className="text-gray-600 mb-4 text-sm">Tidak ada data anggota yang sesuai dengan filter</p>
                                <button
                                    onClick={() => {
                                        setSearchTerm("")
                                        setFilterShift("Semua")
                                        setFilterHari("Semua")
                                    }}
                                    className="text-blue-400 hover:text-blue-700 text-sm font-medium"
                                >
                                    Reset Filter
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* Modal Konfirmasi Hapus */}
            {deleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 animate-scaleIn">
                        {/* Icon */}
                        <div className="flex justify-center mb-4">
                            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                                <TrashIcon className="w-7 h-7 text-red-600" />
                            </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
                            Hapus Anggota?
                        </h2>

                        {/* Message */}
                        <p className="text-gray-600 text-center mb-6 text-sm">
                            Apakah Anda benar-benar ingin menghapus anggota
                            <span className="font-semibold text-gray-900"> {deleteTarget.nama}</span>?
                            <br />
                            Tindakan ini tidak dapat dibatalkan.
                        </p>

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={closeDeleteModal}
                                className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition duration-200"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition duration-200 flex items-center justify-center gap-2"
                            >
                                <TrashIcon className="w-4 h-4" />
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Animation Styles */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { 
                        opacity: 0; 
                        transform: scale(0.95);
                    }
                    to { 
                        opacity: 1; 
                        transform: scale(1);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
                .animate-scaleIn {
                    animation: scaleIn 0.3s ease-out;
                }
            `}</style>
        </div>
    )
}

export default Anggota