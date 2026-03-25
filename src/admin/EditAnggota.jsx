import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import "../App.css"
import "@fontsource/poppins"
import { ArrowLeftIcon, ArrowPathIcon } from "@heroicons/react/24/solid"

// Mock data - dalam aplikasi real, ini akan diambil dari API/database
const allAnggota = [
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
        nama: "Lisa Mara",
        nim: "2024012",
        rfid: "RF012",
        shift: "Shift 4",
        hariPiket: "Selasa",
    },
]

const EditAnggota = () => {
    const navigate = useNavigate()
    const { id } = useParams()

    const [formData, setFormData] = useState({
        nama: "",
        nim: "",
        rfid: "",
        shift_id: "",
        hari_piket: "",
    })

    const hariList = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"]

    const [rfidScanned, setRfidScanned] = useState(false)
    const [rfidFocused, setRfidFocused] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [notFoundMessage, setNotFoundMessage] = useState("")

    // Load data anggota berdasarkan ID
    useEffect(() => {
        const anggota = allAnggota.find((item) => item.id === parseInt(id))
        if (anggota) {
            setFormData({
                nama: anggota.nama,
                nim: anggota.nim,
                rfid: anggota.rfid,
                shift_id: anggota.shift,
                hari_piket: anggota.hariPiket,
            })
        } else {
            setNotFoundMessage("Anggota tidak ditemukan!")
            setTimeout(() => {
                navigate("/anggota")
            }, 2000)
        }
    }, [id, navigate])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleHariChange = (hari) => {
        setFormData((prev) => ({
            ...prev,
            hari_piket: hari,
        }))
    }

    const handleRfidKeyDown = (e) => {
        if (e.key === "Enter" && formData.rfid.trim()) {
            setRfidScanned(true)
            setRfidFocused(false)
            setTimeout(() => setRfidScanned(false), 2000)
        }
    }

    const handleRfidFocus = () => {
        setRfidFocused(true)
        setRfidScanned(false)
    }

    const handleRfidBlur = () => {
        setRfidFocused(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (
            !formData.nama.trim() ||
            !formData.nim.trim() ||
            !formData.rfid.trim() ||
            !formData.hari_piket.trim()
        ) {
            alert("Mohon isi semua field!")
            return
        }

        setSuccessMessage("Anggota berhasil diperbarui! 🎉")

        setTimeout(() => {
            navigate("/anggota")
        }, 1500)
    }

    const handleCancel = () => {
        navigate("/anggota")
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Sidebar />

            <div className="ml-16 p-6 transition-all duration-300">
                <div className="max-w-7xl mx-auto">

                    <header className="mt-2 mb-6">
                        <h3 className="text-lg font-medium font-poppins mb-1">
                            Welcome to Absensi Neo Telemetri, Admin
                        </h3>
                        <h1 className="font-bold font-poppins text-3xl">Edit Anggota</h1>
                    </header>

                    {/* Error Message */}
                    {notFoundMessage && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                            <p className="text-red-700 text-sm font-medium">
                                {notFoundMessage}
                            </p>
                        </div>
                    )}

                    {/* Success Message */}
                    {successMessage && (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
                            <p className="text-emerald-700 text-sm font-medium">
                                {successMessage}
                            </p>
                        </div>
                    )}

                    {/* Form */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Nama */}
                            <div className="flex items-center gap-3">
                                <label className="min-w-[100px] text-sm font-semibold text-gray-700">
                                    Nama
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="nama"
                                    value={formData.nama}
                                    placeholder="Masukan nama lengkap"
                                    onChange={handleInputChange}
                                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-300 outline-none"
                                />
                            </div>

                            {/* NIM */}
                            <div className="flex items-center gap-3">
                                <label className="min-w-[100px] text-sm font-semibold text-gray-700">
                                    NIM
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="nim"
                                    value={formData.nim}
                                    placeholder="Masukan NIM (contoh: 2410532042)"
                                    onChange={handleInputChange}
                                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-1 focus:ring-blue-300 outline-none"
                                />
                            </div>

                            {/* RFID */}
                            <div className="flex items-start gap-3">
                                <label className="text-sm font-semibold text-gray-700 min-w-[100px] flex-shrink-0 pt-1 self-start">
                                    RFID
                                    <span className="text-red-500">*</span>
                                </label>

                                <div className="flex-1 flex flex-col gap-2">
                                    {/* Input + Button */}
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            name="rfid"
                                            value={formData.rfid}
                                            placeholder="Scan atau Input ID"
                                            onChange={handleInputChange}
                                            onKeyDown={handleRfidKeyDown}
                                            onFocus={handleRfidFocus}
                                            onBlur={handleRfidBlur}
                                            className={`flex-1 px-4 py-2 border rounded-lg outline-none transition
                ${rfidScanned
                                                    ? "border-emerald-300 bg-emerald-50"
                                                    : rfidFocused
                                                        ? "border-blue-400 bg-blue-50"
                                                        : "border-gray-200"
                                                }`}
                                        />

                                        <button
                                            type="button"
                                            onClick={() => {
                                                document.querySelector('input[name="rfid"]')?.focus()
                                            }}
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                                        >
                                            <ArrowPathIcon className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180" />
                                            Scan RFID
                                        </button>
                                    </div>

                                    {/* Helper text */}
                                    <p className="text-xs text-gray-500">
                                        Setiap anggota harus memiliki ID yang unik.
                                    </p>
                                </div>
                            </div>


                            {/* Shift */}
                            <div className="flex items-center gap-3">
                                <label className="min-w-[100px] text-sm font-semibold text-gray-700">
                                    Shift
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="shift_id"
                                    value={formData.shift_id}
                                    placeholder="Pilih Shift"
                                    onChange={handleInputChange}
                                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-300"
                                >
                                    <option className="text-grey-300" value="" disabled> Pilih Shift</option>
                                    <option value="Shift 1">Shift 1</option>
                                    <option value="Shift 2">Shift 2</option>
                                    <option value="Shift 3">Shift 3</option>
                                    <option value="Shift 4">Shift 4</option>
                                </select>
                            </div>

                            {/* Hari Piket */}
                            <div className="flex items-start gap-3">
                                <label className="min-w-[100px] text-sm font-semibold text-gray-700">
                                    Hari Piket
                                    <span className="text-red-500">*</span>
                                </label>

                                <div className="flex-1">
                                    <div className="grid grid-cols-3 gap-3 p-4 border border-gray-200 rounded-xl">
                                        {hariList.map((hari) => (
                                            <label
                                                key={hari}
                                                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer border transition
                                                ${formData.hari_piket === hari
                                                        ? "bg-blue-50 border-blue-300"
                                                        : "border-transparent hover:border-gray-200 hover:bg-gray-100"
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="hari_piket"
                                                    checked={formData.hari_piket === hari}
                                                    onChange={() => handleHariChange(hari)}
                                                    className="w-4 h-4 accent-blue-600"
                                                />
                                                <span className="text-sm text-gray-700">
                                                    {hari}
                                                </span>
                                            </label>
                                        ))}
                                    </div>

                                    <p className="text-xs text-gray-500 mt-2">
                                        Pilih hari piket
                                    </p>
                                </div>
                            </div>

                            {/* Button */}
                            <div className="flex justify-end gap-2 pt-6 border-gray-200">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-400 hover:text-gray-200 transition"
                                >
                                    Batal
                                </button>

                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-lg transition"
                                >
                                    Simpan Perubahan
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditAnggota
