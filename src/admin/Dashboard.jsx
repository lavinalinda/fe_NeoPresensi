import React, { useMemo, useState } from "react"
import Sidebar from "../components/Sidebar"
import "../App.css"
import "@fontsource/poppins"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import sedangpiket from "../assets/sedangpiket.png"
import hadir from "../assets/hadir.png"
import ngilang from "../assets/ngilang.png"

// ─── Konstanta Status ────────────────────────────────────────────────────────

const STATUS = {
  Hadir: "Hadir",
  Sedang_Piket: "Sedang piket",
  Tidak_Piket: "Tidak Piket",
  Izin: "Izin",
}

const statusStyles = {
  [STATUS.Hadir]: "bg-emerald-500/20 text-emerald-800",
  [STATUS.Sedang_Piket]: "bg-amber-500/20 text-amber-800",
  [STATUS.Tidak_Piket]: "bg-rose-500/20 text-rose-800",
  [STATUS.Izin]: "bg-sky-500/20 text-sky-800",
}

const BULAN_LABEL = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]
const HARI_LABEL = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"]

// ─── Data Absensi ─────────────────────────────────────────────────────────────


const rekapData = [
  { nama: "Budi Santoso", shift_id: "Shift 1", tanggal: "2025-03-24", waktu_masuk: "08:00", waktu_keluar: "10:00", durasi_menit: 120, status: STATUS.Hadir },
  { nama: "Ani Wijaya", shift_id: "Shift 1", tanggal: "2025-03-10", waktu_masuk: "08:15", waktu_keluar: "10:15", durasi_menit: 120, status: STATUS.Izin },
  { nama: "Citra Dewi", shift_id: "Shift 2", tanggal: "2025-03-10", waktu_masuk: "07:55", waktu_keluar: "09:55", durasi_menit: 120, status: STATUS.Sedang_Piket },
  { nama: "Doni Pratama", shift_id: "Shift 2", tanggal: "2025-03-10", waktu_masuk: "08:30", waktu_keluar: "10:30", durasi_menit: 120, status: STATUS.Hadir },
  { nama: "Eka Putri", shift_id: "Shift 1", tanggal: "2025-03-10", waktu_masuk: "08:05", waktu_keluar: "10:05", durasi_menit: 120, status: STATUS.Sedang_Piket },
  { nama: "Fajar Nugroho", shift_id: "Shift 3", tanggal: "2025-03-10", waktu_masuk: "09:00", waktu_keluar: "11:00", durasi_menit: 120, status: STATUS.Tidak_Piket },
  { nama: "Gita Lestari", shift_id: "Shift 3", tanggal: "2025-03-10", waktu_masuk: "07:50", waktu_keluar: "09:50", durasi_menit: 120, status: STATUS.Hadir },
  { nama: "Hadi Kusuma", shift_id: "Shift 2", tanggal: "2025-03-10", waktu_masuk: "08:20", waktu_keluar: "10:20", durasi_menit: 120, status: STATUS.Hadir },
  { nama: "Indah Sari", shift_id: "Shift 1", tanggal: "2025-03-10", waktu_masuk: "08:10", waktu_keluar: "10:10", durasi_menit: 120, status: STATUS.Sedang_Piket },
  { nama: "Joko Purnomo", shift_id: "Shift 3", tanggal: "2025-03-10", waktu_masuk: "08:45", waktu_keluar: "10:45", durasi_menit: 120, status: STATUS.Tidak_Piket },
]

// ─── Helper Umum ──────────────────────────────────────────────────────────────

const ITEMS_PER_PAGE = 5

/** Format Date → "YYYY-MM-DD" */
const toDateStr = (d) => d.toISOString().split("T")[0]

/** Ambil tanggal terbaru dari data */
const getLatestDate = (data) =>
  [...data].map((d) => d.tanggal).sort().pop()

/** Hitung hadir/piket/tidakPiket untuk tanggal tertentu (dipakai StatCard) */
const getCountsForDate = (data, date) => {
  const rows = data.filter((d) => d.tanggal === date)
  return {
    hadir: rows.filter((d) => d.status === STATUS.Hadir).length,
    piket: rows.filter((d) => d.status === STATUS.Sedang_Piket).length,
    tidakPiket: rows.filter((d) => d.status === STATUS.Tidak_Piket || d.status === STATUS.Izin).length,
  }
}

/** Akumulasi count dari array rows ke dalam object acc, return acc */
const accumulateCounts = (acc, rows) => {
  rows.forEach((row) => {
    if (row.status === STATUS.Hadir) acc.hadir++
    else if (row.status === STATUS.Sedang_Piket) acc.piket++
    else if (row.status === STATUS.Tidak_Piket || row.status === STATUS.Izin) acc.tidakPiket++
  })
  return acc
}

/** Format durasi menit ke jam:menit */
const formatDurasi = (menit) => {
  const jam = Math.floor(menit / 60)
  const mnt = menit % 60
  return `${jam}j ${mnt}m`
}

// ─── Compute Grafik ───────────────────────────────────────────────────────────

/**
 * HARIAN — Senin-Jumat pekan terbaru dari tanggal terbaru.
 * Label: "Senin", "Selasa", "Rabu", "Kamis", "Jumat"
 */
const computeDataHarian = (data) => {
  const latestStr = getLatestDate(data)
  if (!latestStr) return []

  const latest = new Date(latestStr)

  // Find Monday of the latest week
  const latestDayOfWeek = latest.getDay() // 0=Sun, 1=Mon, ..., 6=Sat
  const daysToMonday = latestDayOfWeek === 0 ? 6 : latestDayOfWeek - 1
  const monday = new Date(latest)
  monday.setDate(latest.getDate() - daysToMonday)

  const days = []
  for (let i = 0; i < 5; i++) {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    const dateStr = toDateStr(d)
    const rows = data.filter((r) => r.tanggal === dateStr)
    const acc = accumulateCounts({
      label: HARI_LABEL[i],
      hadir: 0, piket: 0, tidakPiket: 0
    }, rows)
    days.push(acc)
  }
  return days
}

/**
 * BULANAN — Minggu 1-4 (Senin–Jumat) di bulan terbaru.
 * Selalu 4 minggu tetap: Minggu 1 (1-5), Minggu 2 (8-12), Minggu 3 (15-19), Minggu 4 (22-26)
 */
const computeDataBulanan = (data) => {
  const latestStr = getLatestDate(data)
  if (!latestStr) return []

  const latest = new Date(latestStr)
  const year = latest.getFullYear()
  const month = latest.getMonth()

  const weeks = []
  for (let weekIndex = 1; weekIndex <= 4; weekIndex++) {
    const weekStart = new Date(year, month, (weekIndex - 1) * 7 + 1)
    const acc = { label: `Minggu ${weekIndex}`, hadir: 0, piket: 0, tidakPiket: 0 }

    // Senin-Jumat minggu ini (5 hari)
    for (let i = 0; i < 5; i++) {
      const d = new Date(weekStart)
      d.setDate(weekStart.getDate() + i)
      if (d.getMonth() === month) {
        const rows = data.filter((r) => r.tanggal === toDateStr(d))
        accumulateCounts(acc, rows)
      }
    }
    weeks.push(acc)
  }
  return weeks
}

/**
 * TAHUNAN — Bulanan Jan-Des di tahun terbaru
 */
const computeDataTahunan = (data) => {
  const latestStr = getLatestDate(data)
  if (!latestStr) return BULAN_LABEL.map((label) => ({ label, hadir: 0, piket: 0, tidakPiket: 0 }))

  const latestYear = new Date(latestStr).getFullYear()
  return BULAN_LABEL.map((label, i) => {
    const prefix = `${latestYear}-${String(i + 1).padStart(2, "0")}`
    const rows = data.filter((d) => d.tanggal.startsWith(prefix))
    return accumulateCounts({ label, hadir: 0, piket: 0, tidakPiket: 0 }, rows)
  })
}

// ─── Komponen ─────────────────────────────────────────────────────────────────

const StatCard = ({ label, iconSrc, count }) => (
  <div className="bg-white rounded-xl p-5 shadow-sm flex items-center gap-4 flex-1">
    <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-gray-100">
      <img src={iconSrc} alt="" className="h-10 w-10 object-contain" />
    </div>
    <div className="flex-1">
      <p className="text-sm text-gray-500 font-poppins">{label}</p>
      <p className="text-3xl font-bold font-poppins">{count}</p>
    </div>
    <p className="text-sm font-medium text-gray-400">orang</p>
  </div>
)

const AttendanceChart = ({ chartData }) => (
  <div className="bg-white rounded-xl p-5 shadow-sm mb-6 mt-4">
    <div className="mt-4 h-56">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line dataKey="hadir" name="Hadir" stroke="#4ade80" strokeWidth={2} dot={{ r: 4 }} />
          <Line dataKey="piket" name="Piket" stroke="#facc15" strokeWidth={2} dot={{ r: 4 }} />
          <Line dataKey="tidakPiket" name="Tidak Piket" stroke="#f87171" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
)

const AttendanceTable = ({ data, page, setPage, totalPages, totalFiltered, search, setSearch }) => (
  <div className="bg-white rounded-xl p-5 shadow-sm">
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
      <p className="font-semibold font-poppins text-sm">Ringkasan Absensi Terbaru</p>
      <div className="relative w-full md:w-72">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-4.35-4.35M16.65 16.65A7 7 0 1116.65 2.35a7 7 0 010 14.3z" />
        </svg>
        <input
          type="text"
          placeholder="Cari Nama / Tanggal / Status"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          className="border border-gray-200 rounded-md pl-8 pr-3 py-1.5 text-xs font-poppins w-full outline-none focus:border-gray-400"
        />
      </div>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-sm font-poppins">
        <thead>
          <tr className="bg-gray-800 text-white">

            {["Nama", "Tanggal", "Waktu Masuk", "Waktu Keluar", "Durasi", "Status"].map((h) => (
              <th key={h} className="py-2.5 px-4 text-center first:text-left">{h}</th>
            ))}

          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>

              <td colSpan={6} className="py-8 text-center text-gray-400 text-xs">
                Tidak ada data ditemukan.
              </td>

            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={i} className="border-b border-gray-100 text-center hover:bg-gray-50 transition-colors">
                <td className="py-2.5 px-4 font-medium text-left">{row.nama}</td>
                <td className="py-2.5 px-4 text-gray-500">{row.tanggal}</td>

                <td className="py-2.5 px-4 text-gray-500">{row.waktu_masuk}</td>
                <td className="py-2.5 px-4 text-gray-500">{row.waktu_keluar}</td>
                <td className="py-2.5 px-4 text-gray-500">{formatDurasi(row.durasi_menit)}</td>


                <td className="py-2.5 px-4">
                  <span className={`flex items-center justify-center  px-0.5 py-1 text-xs font-semibold min-w-[50px] h-6 flex items-center justify-center ${statusStyles[row.status] || "bg-gray-500/20 text-gray-800"}`}>
                    {row.status}
                  </span>
                </td>



              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>

    <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
      <div>
        Menampilkan {totalFiltered === 0 ? 0 : Math.min((page - 1) * ITEMS_PER_PAGE + 1, totalFiltered)} sampai{" "}
        {Math.min(page * ITEMS_PER_PAGE, totalFiltered)} dari {totalFiltered} Data
      </div>
      <div className="flex items-center gap-1">
        <button
          className="rounded border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium hover:bg-gray-50 disabled:opacity-40"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          ‹ Sebelumnya
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`rounded border px-2.5 py-1 text-xs font-medium transition-colors ${p === page
              ? "bg-gray-800 text-white border-gray-800"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
              }`}
          >
            {p}
          </button>
        ))}
        <button
          className="rounded border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium hover:bg-gray-50 disabled:opacity-40"
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Selanjutnya ›
        </button>
      </div>
    </div>
  </div >
)

// ─── Dashboard ────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [tab, setTab] = useState("Harian")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const latestDate = useMemo(() => getLatestDate(rekapData), [])
  const counts = useMemo(() => getCountsForDate(rekapData, latestDate), [latestDate])

  // Grafik dihitung dinamis dari rekapData
  const dataHarian = useMemo(() => computeDataHarian(rekapData), [])
  const dataBulanan = useMemo(() => computeDataBulanan(rekapData), [])
  const dataTahunan = useMemo(() => computeDataTahunan(rekapData), [])

  const chartData =
    tab === "Harian" ? dataHarian :
      tab === "Bulanan" ? dataBulanan :
        dataTahunan

  const filtered = useMemo(() => {
    const term = search.toLowerCase()
    return rekapData.filter((d) =>
      d.nama.toLowerCase().includes(term) ||
      d.shift_id.toLowerCase().includes(term) ||
      d.tanggal.includes(term) ||
      d.status.toLowerCase().includes(term)
    )
  }, [search])

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE)),
    [filtered.length]
  )

  const paginated = useMemo(
    () => filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE),
    [filtered, page]
  )

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />

      <div className="ml-16 p-6 transition-all duration-300">
        <header className="mt-2 mb-6">
          <h3 className="text-lg font-medium font-poppins mb-1">
            Welcome to Absensi Neo Telemetri, Admin
          </h3>
          <h1 className="font-bold font-poppins text-3xl">Dashboard</h1>
        </header>


        {/* Stat Cards */}
        <section className="flex flex-col gap-4 lg:flex-row mb-6">
          <StatCard label="Hadir Hari Ini" iconSrc={hadir} count={counts.hadir} />
          <StatCard label="Sedang Piket" iconSrc={sedangpiket} count={counts.piket} />
          <StatCard label="Tidak Piket Hari Ini" iconSrc={ngilang} count={counts.tidakPiket} />
        </section>

        {/* Grafik */}

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between mb-4">
            <div>
              <h3 className="font-semibold font-poppins text-lg text-gray-800">Grafik Kehadiran</h3>
            </div>
            <div className="flex gap-0 border-b border-gray-200">
              {["Harian", "Bulanan", "Tahunan"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-6 py-3 text-sm font-poppins font-medium transition-all border-b-2 -mb-px ${tab === t
                    ? "border-indigo-500 text-indigo-600 bg-indigo-50"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <AttendanceChart chartData={chartData} />
        </div>


        {/* Tabel */}
        <AttendanceTable
          data={paginated}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          totalFiltered={filtered.length}
          search={search}
          setSearch={setSearch}
        />
      </div>
    </div>
  )
}

