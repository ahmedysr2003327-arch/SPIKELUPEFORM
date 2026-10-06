"use client";

import { useState, useRef, useEffect } from "react";
import { Briefcase, ChevronDown, Check } from "lucide-react";

interface Option {
  value: string;
  labelAr: string;
  labelEn: string;
}

const businessOptions: Option[] = [
  { value: "تاجر", labelAr: "تاجر", labelEn: "Trader" },
  { value: "موزع", labelAr: "موزع", labelEn: "Distributor" },
  { value: "محل", labelAr: "محل", labelEn: "Shop" },
  { value: "مستهلك", labelAr: "مستهلك", labelEn: "Consumer" },
];

export default function BusinessTypeSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = businessOptions.find((opt) => opt.value === value);

  return (
    <div className="relative w-full z-40" ref={dropdownRef}>
      <label className="block text-sm font-semibold text-brand-blue mb-1 mr-1">
        طبيعة العمل / Business Nature <span className="text-red-500">*</span>
      </label>

      {/* زر القائمة الرئيسي */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`glass-input w-full px-3.5 py-3 rounded-xl text-right flex items-center justify-between border transition-all ${
          isOpen
            ? "border-sky-500 ring-2 ring-sky-500/20 bg-white"
            : "border-white/30"
        }`}
      >
        <div className="flex items-center gap-2 min-w-0 pr-1">
          <Briefcase
            className={`w-5 h-5 shrink-0 ${
              isOpen ? "text-sky-500" : "text-slate-400"
            }`}
          />
          <span className="truncate text-xs sm:text-sm text-slate-800">
            {selectedOption ? (
              <span className="font-bold">
                {selectedOption.labelAr}{" "}
                <span className="text-xs text-slate-500 font-normal">
                  / {selectedOption.labelEn}
                </span>
              </span>
            ) : (
              <span className="text-slate-400">
                اختر طبيعة العمل / Select Nature
              </span>
            )}
          </span>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-sky-500" : ""
          }`}
        />
      </button>

      {/* قائمة الخيارات المنسدلة - معتمة تماماً 100% لإخفاء الخانات السفلية */}
      {isOpen && (
        <div
          style={{
            backgroundColor: "#ffffff",
            opacity: 1,
            zIndex: 9999,
          }}
          className="absolute top-full right-0 left-0 mt-1.5 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100"
        >
          {businessOptions.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                style={{
                  backgroundColor: isSelected ? "#f0f9ff" : "#ffffff",
                  opacity: 1,
                }}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-right flex items-center justify-between transition-colors hover:bg-slate-50 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-800">
                    {option.labelAr}
                  </span>
                  <span className="text-xs text-slate-500 font-normal">
                    ({option.labelEn})
                  </span>
                </div>

                {isSelected && (
                  <Check className="w-4 h-4 text-sky-600 stroke-[3]" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
