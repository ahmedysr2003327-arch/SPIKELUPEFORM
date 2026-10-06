"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // خيارات القائمة المنسدلة
  const invoiceMenu = [
    { name: "إنشاء فاتورة جديدة", href: "/invoice", icon: "📝" },
    { name: "الفواتير الصادرة", href: "/invoice", icon: "📤" },
    { name: "الفواتير المعلقة", href: "/invoice", icon: "⏳" },
    { name: "المسودات", href: "/invoice", icon: "📁" },
  ];

  // 🔴 ضع مسار اللوجو الخاص بك هنا داخل مجلد public (مثلاً: '/logo.png')

  return (
    <header
      className="bg-gradient-to-r from-yellow-500 to-amber-600 backdrop-blur-md text-slate-100 border-b border-slate-800 shadow-lg sticky top-0 z-50 w-full font-sans"
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
          <nav className="hidden md:flex items-center gap-1 bg-slate-800/50 p-1 rounded-xl border border-slate-700/50">
            <Link
              href="/invoice"
              className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/60 transition-all duration-200"
            >
              الرئيسية
            </Link>

            {/* القائمة المنسدلة للفواتير */}
            <div
              className="relative"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 focus:outline-none ${
                  isOpen
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/60"
                }`}
              >
                <span>الفواتير</span>
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180 text-emerald-400" : "text-slate-400"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* عناصر القائمة المنسدلة */}
              {isOpen && (
                <div className="absolute right-0 top-full pt-2 w-56 z-50">
                  <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl p-1.5 space-y-1 divide-y divide-slate-800/60 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="py-1">
                      {invoiceMenu.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-emerald-500/20 hover:to-teal-500/10 hover:border-emerald-500/30 border border-transparent transition-all duration-150"
                        >
                          <span className="text-base">{item.icon}</span>
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/form"
              className="px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/60 transition-all duration-200"
            >
              نموذج البيانات
            </Link>
          </nav>
        </div>

        {/* ===================== زر إجراء سريع ===================== */}
        <div className="flex items-center gap-3">
          <Link
            href="/invoice"
            className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-amber-50 to-amber-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-200 active:scale-95"
          >
            <span className="text-base leading-none transition-transform group-hover:rotate-90 duration-300">
              +
            </span>
            <span>فاتورة جديدة</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
