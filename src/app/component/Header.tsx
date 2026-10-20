"use client";

import Link from "next/link";

export default function Header() {
  // 🔴 ضع مسار اللوجو الخاص بك هنا داخل مجلد public (مثلاً: '/logo.png')

  return (
    <header
      className="bg-gradient-to-r from-yellow-200 to-yellow-400 backdrop-blur-md text-slate-100 border-b border-slate-800 shadow-lg sticky top-0 z-50 w-full font-sans"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* ===================== الشعار + القائمة ===================== */}
        <div className="flex items-center gap-8">
          {/* اللوجو (صورة + نص احتياطي) */}
          <Link
            href="/"
            className="flex items-center gap-3 group transition-transform active:scale-95"
          >
            <div className="relative w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center overflow-hidden shadow-inner group-hover:border-emerald-500/50 transition-colors">
              <img
                src={"/image/1.jpeg"}
                alt="Logo"
                className="w-full h-full object-contain "
                onError={(e) => {
                  // في حال عدم وجود الصورة يظهر أول حرف كبديل احترافي
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              {/* <span className="text-emerald-400 font-black text-lg select-none">
                S
              </span> */}
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-slate-950 to-slate-800">
                SPIKELUBE
              </span>
              <span className="text-[10px] text-gray-50 font-medium -mt-1 tracking-widest uppercase">
                Invoice System
              </span>
            </div>
          </Link>

          {/* روابط التنقل الرئيسية */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-700/50 ">
            <Link
              href="/invoice"
              className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/60 transition-all duration-200"
            >
              فاتوره الوزاره
            </Link>

            <Link
              href="/form"
              className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/60 transition-all duration-200"
            >
              نموذج البيانات
            </Link>
            <Link
              href="/ProductSpecSheet"
              className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/60 transition-all duration-200"
            >
              ادراج عينات
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
