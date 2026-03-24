import { useState } from 'react'

const IconEye = ({ open }) =>
    open ? (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
            <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" />
            <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
    ) : (
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
            <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4" />
        </svg>
    )

const IconMail = () => (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="4" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M2 5l6 4 6-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
)

const IconLock = () => (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
        <rect x="3" y="7.5" width="10" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M5 7.5V5.5a3 3 0 116 0v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
)

const IconUser = () => (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M2 14c0-3 2.5-4.5 6-4.5s6 1.5 6 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
)

const IconCard = () => (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
        <rect x="2.5" y="2" width="11" height="12" rx="2" stroke="currentColor" strokeWidth="1.3" />
        <path d="M5 6h6M5 8.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
)

const Login = () => {
    const [formData, setFormData] = useState({ nama: '', nim: '', password: '' })
    const [showPass, setShowPass] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        alert(`Login: ${formData.nama}, ${formData.nim}, ${formData.password}`)
    }

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-indigo-200/60 md:grid md:grid-cols-2">

                {/* ini sebelah kiri */}
                <div className="px-8 py-10 sm:px-10 md:px-12 md:py-12 flex flex-col justify-between">
                    <div className="flex items-center gap-3 mb-8">
                        <img src="/public/logoneo.png" alt="Logo"
                            className="w-10 h-10 rounded-xl object-contain "
                            onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
                        <div className="w-10 h-10 rounded-xl bg-indigo-600 items-center justify-center text-white text-[10px] font-black" style={{ display: 'none' }}>NT</div>
                        <div>
                            <p className="text-sm font-black text-slate-800 font-poppins uppercase tracking-widest leading-none">Neo Telemetri</p>
                            <p className="text-[10px] font-medium text-slate-600 uppercase tracking-widest">IT For The Future</p>
                        </div>
                    </div>

                    <div className="mb-7">
                        <h1 className="text-3xl font-black text-slate-900 uppercase font-poppins font-extrabold tracking-tight leading-none">Sistem Presensi</h1>
                        <p className="mt-1.5 text-sm font-poppins font-bold text-slate-400">Login untuk melanjutkan</p>
                    </div>

                    <form className="space-y-4 flex-1" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="nama" className="mb-1.5 flex items-center gap-1 text-xs font-bold text-slate-600 uppercase tracking-widest">
                                Nama Lengkap <span className="text-indigo-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"><IconUser /></span>
                                <input
                                    id="nama"
                                    name="nama"
                                    value={formData.nama}
                                    onChange={handleChange}
                                    required placeholder="Enter your full name"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-300 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="nim" className="mb-1.5 flex items-center gap-1 text-xs font-bold text-slate-600 uppercase tracking-widest">
                                NIM <span className="text-indigo-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"><IconCard /></span>
                                <input
                                    id="nim"
                                    name="nim"
                                    value={formData.nim}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your NIM"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-2.5 text-sm text-slate-800 placeholder-slate-300 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-1.5 flex items-center gap-1 text-xs font-bold text-slate-600 uppercase tracking-widest">
                                Password <span className="text-indigo-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"><IconLock /></span>
                                <input type={showPass ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} required placeholder="Enter your password"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-10 py-2.5 text-sm text-slate-800 placeholder-slate-300 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10" />
                                <button type="button" onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-indigo-500 transition-colors">
                                    <IconEye open={showPass} />
                                </button>
                            </div>
                        </div>

                        <div className="pt-1">
                            <button type="submit"
                                className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all duration-150">
                                Log in
                            </button>
                        </div>
                    </form>

                    <p className="mt-6 text-center text-xs text-slate-600">Sistem Presensi · Neo Telemetri</p>
                </div>

                {/*  sebelah kanan */}
                <div className="relative hidden md:flex flex-col items-center justify-center overflow-hidden text-white"
                    style={{ background: 'linear-gradient( #7c3aed 65%, #4338ca 100%)' }}>

                    {/* diagonal stripe */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.06]"
                        style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0px, #fff 2px, transparent 2px, transparent 22px)' }} />

                    {/* color blobs */}
                    <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full pointer-events-none"
                        style={{ background: 'radial-gradient(circle, rgba(196,181,253,0.55) 0%, transparent 68%)' }} />
                    <div className="absolute -bottom-28 -right-20 w-96 h-96 rounded-full pointer-events-none"
                        style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.7) 0%, transparent 65%)' }} />
                    <div className="absolute top-1/3 -right-12 w-56 h-56 rounded-full pointer-events-none"
                        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 65%)' }} />
                    <div className="absolute bottom-1/3 -left-10 w-48 h-48 rounded-full pointer-events-none"
                        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.3) 0%, transparent 65%)' }} />
                    <div className="absolute top-10 right-1/3 w-32 h-32 rounded-full pointer-events-none"
                        style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.22) 0%, transparent 65%)' }} />

                    {/* geometric outlines */}
                    <div className="absolute top-5 right-5 w-32 h-32 border-[3px] border-white/20 rounded-2xl rotate-12 pointer-events-none" />
                    <div className="absolute top-9 right-9 w-32 h-32 border border-white/10 rounded-2xl rotate-12 pointer-events-none" />
                    <div className="absolute bottom-8 left-5 w-24 h-24 border-[3px] border-fuchsia-300/30 rotate-45 rounded-xl pointer-events-none" />
                    <div className="absolute bottom-12 left-9 w-24 h-24 border border-fuchsia-300/15 rotate-45 rounded-xl pointer-events-none" />
                    <div className="absolute top-1/2 right-5 w-16 h-16 border-2 border-cyan-300/25 rounded-xl -rotate-12 pointer-events-none" />
                    <div className="absolute bottom-1/4 left-1/3 w-10 h-10 border-2 border-yellow-300/25 rounded-lg rotate-12 pointer-events-none" />

                    {/* dots */}
                    <div className="absolute top-1/2 left-5 w-9 h-9 bg-cyan-400/20 rounded-lg rotate-12 pointer-events-none" />
                    <div className="absolute top-1/4 left-14 w-5 h-5 bg-pink-400/30 rounded rotate-45 pointer-events-none" />
                    <div className="absolute bottom-1/4 right-8 w-7 h-7 bg-yellow-300/25 rounded rotate-12 pointer-events-none" />
                    <div className="absolute top-20 left-1/3 w-4 h-4 bg-white/20 rounded-full pointer-events-none" />
                    <div className="absolute bottom-24 right-1/3 w-3 h-3 bg-white/25 rounded-full pointer-events-none" />
                    <div className="absolute top-1/3 left-7 w-2.5 h-2.5 bg-white/35 rounded-full pointer-events-none" />

                    {/* logoskj */}
                    <div className="absolute top-20 left-10 flex items-center justify-center -rotate-12">
                        <img src="/public/logoskj.png" alt="SKJ" className="w-20 h-20" />
                    </div>

                    {/* logommd */}
                    <div className="absolute top-[52%] right-8 flex items-center justify-center rotate-[14deg]">
                        <img src="/public/logommd.png" alt="MMD" className="w-20 h-20" />
                    </div>

                    {/* logoprogramming */}
                    <div className="absolute bottom-25 left-23 rounded-2x flex items-center justify-center shadow-2xl rotate-[8deg]">
                        <img src="/public/logoprogramming.png" alt="Programming" className="w-20 h-20 " />
                    </div>

                    {/* rainbow bars */}
                    <div className="absolute top-0 left-0 right-0 h-2 pointer-events-none"
                        style={{ background: 'linear-gradient(90deg, #c026d3, #818cf8, #22d3ee, #f472b6, #fbbf24)' }} />
                    <div className="absolute bottom-0 left-0 right-0 h-1 pointer-events-none"
                        style={{ background: 'linear-gradient(90deg, #22d3ee, #818cf8, #c026d3, #fbbf24)' }} />

                    {/* ── CENTER CONTENT ── */}
                    <div className="relative z-10 flex flex-col items-center text-center px-8 gap-1">

                        <div className="flex flex-col items-center gap-2">

                            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-md">
                                <img
                                    src="/logoneo.png"
                                    alt="Neo Telemetri"
                                    className="w-30 h-30 object-contain"
                                    onError={(e) => { e.target.style.display = 'none' }}
                                />
                            </div>

                            <h2 className="text-4xl font-extrabold font-poppins uppercase tracking-tight leading-tight drop-shadow-lg">
                                Sistem Presensi
                            </h2>

                        </div>

                        {/* Subjudul */}
                        <div>
                            <p className="text-md font-extrabold font-poppins uppercase text-indigo-200">
                                Neo Telemetri
                            </p>

                            <div className="mt-3 w-10 h-0.5 rounded-full bg-white/35 mx-auto" />

                            <p className="text-sm font-bold font-poppins mt-2 shadow-2xl text-white">
                                Presensi Cerdas untuk Generasi Digital.
                            </p>
                        </div>

                    </div>

                </div>
            </div>

        </div>

    )
}

export default Login