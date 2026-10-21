"use client";

import React, { useState } from "react";

// القائمة المنسدلة للخصائص والاختبارات الجاهزة داخل الجدول
const standardProperties = [
  "Kinematic viscosity, mm²/s, at 100°C",
  "Kinematic viscosity, mm²/s, at 40°C",
  "Viscosity Index",
  "Flash Point, close cup, °C, min",
  "Pour point, °C max",
  "Density at 15°C, g/cm³",
  "Color ASTM",
  "Total Base Number (TBN), mg KOH/g",
];
const defaultHeaderImage = "/image/55.jfif"; // مسار الصورة الافتراضية للهيدر
export default function ProductSpecSheet() {
  const [selectedProduct, setSelectedProduct] = useState(
    "Re Refind Base oil SN 300",
  );

  // مسار الصورة (يمكنك وضع الصورة باسم header.png داخل مجلد public أو رفعها ديناميكياً)
  const [headerImage, setHeaderImage] = useState<string | null>(
    defaultHeaderImage,
  );

  // صفوف الجدول الافتراضية
  const [rows, setRows] = useState([
    { property: "", value: "" },
    { property: "", value: "" },
    { property: "", value: "" },
    { property: "", value: "" },
    { property: "", value: "" },
  ]);

  // دالة اختيار / تغيير صورة الهيدر ديناميكياً من المكون
  const handleHeaderImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setHeaderImage(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // تعديل محتوى الخلية في الجدول
  const handleCellChange = (
    index: number,
    field: "property" | "value",
    val: string,
  ) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = val;
    setRows(updatedRows);
  };

  // إضافة صف جديد
  const handleAddRow = () => {
    setRows([...rows, { property: "", value: "" }]);
  };

  // حذف صف
  const handleDeleteRow = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  // دالة الطباعة
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-200 py-8 px-4 flex flex-col items-center print:bg-white print:p-0">
      {/* إخفاء الهيدر الخارجي (الموجود في layout) والتأكد من طباعة الخلفيات والصور */}
      <style jsx global>{`
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          /* إخفاء أي Header أو Nav موجود في ملف الـ layout الخارجي */
          header,
          nav,
          .layout-header {
            display: none !important;
          }
        }
      `}</style>

      {/* شريط أدوات التحكم (إضافة صف، رفع صورة الهيدر، والطباعة) - يختفي تماماً عند الطباعة */}
      <div className="print:hidden mb-6 flex flex-wrap gap-4 items-center bg-white p-4 rounded-xl shadow-md w-full max-w-4xl justify-between">
        <div className="flex gap-3 items-center">
          <button
            onClick={handleAddRow}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition shadow-sm"
          >
            + إضافة صف
          </button>

          {/* زر تغيير صورة الهيدر */}
          <label className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg text-sm cursor-pointer transition shadow-sm border border-gray-300">
            🖼️ تغيير الهيدر
            <input
              type="file"
              accept="image/*"
              onChange={handleHeaderImageUpload}
              className="hidden"
            />
          </label>
        </div>

        <button
          onClick={handlePrint}
          className="bg-[#0f2744] hover:bg-[#1a385c] text-white font-medium px-5 py-2 rounded-lg text-sm transition flex items-center gap-2 shadow-sm"
        >
          <span>🖨️</span> طباعة الملف
        </button>
      </div>

      {/* ورقة التقرير الرسمية A4 */}
      <div className="w-full max-w-[210mm] min-h-[297mm] bg-white shadow-xl relative flex flex-col justify-between pb-16 print:shadow-none print:w-full print:max-w-none print:min-h-screen print:m-0 print:pb-16">
        <div>
          {/* 1. صورة الهيدر المطلوبة (SPIKELUBE Header Banner) */}
          <div className="w-full">
            {headerImage ? (
              <img
                src={headerImage}
                alt="Spikelube Header"
                className="w-full h-auto object-contain block"
              />
            ) : (
              <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-gray-400 print:hidden">
                قم برفع صورة الهيدر
              </div>
            )}
          </div>

          {/* 2. اسم المنتج / PRODUCT ID */}
          <div className="px-12 mt-6 mb-6">
            <div className="flex items-center gap-3">
              <span className="font-bold text-sm border-b-2 border-black pb-0.5 uppercase tracking-wide whitespace-nowrap">
                PRODUCT ID
              </span>
              <span className="text-sm font-bold">:</span>
              <input
                type="text"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="text-base font-bold text-gray-900 border-b border-gray-200 focus:border-black focus:outline-none bg-transparent w-full px-1"
              />
            </div>
          </div>

          {/* 3. جدول المواصفات الفنية */}
          <div className="px-12">
            <table className="w-full border-collapse border border-black text-sm">
              <thead>
                <tr className="border-b border-black bg-gray-50/50">
                  <th className="border-r border-black w-14 py-2.5 text-center font-bold text-gray-800">
                    #
                  </th>
                  <th className="border-r border-black px-4 py-2.5 text-left font-bold text-gray-800">
                    Test / Parameter
                  </th>
                  <th className="px-4 py-2.5 text-center font-bold text-gray-800 w-1/3">
                    Result / Specification
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-black group hover:bg-gray-50/30 transition"
                  >
                    {/* رقم الصف */}
                    <td className="border-r border-black text-center font-semibold py-2.5 text-gray-700">
                      {index + 1}
                    </td>

                    {/* خانة الخصائص مع قائمة خيارات جانبية */}
                    <td className="border-r border-black px-3 py-1.5">
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={row.property}
                          onChange={(e) =>
                            handleCellChange(index, "property", e.target.value)
                          }
                          placeholder="أدخل الخاصية أو اختر من القائمة..."
                          className="w-full bg-transparent focus:outline-none text-gray-800 font-medium text-sm"
                        />
                        {/* القائمة المنسدلة للخصائص الشائعة (تختفي عند الطباعة) */}
                        <select
                          onChange={(e) => {
                            if (e.target.value) {
                              handleCellChange(
                                index,
                                "property",
                                e.target.value,
                              );
                            }
                          }}
                          defaultValue=""
                          className="print:hidden border border-gray-300 rounded px-0.5 py-0.5 text-xs bg-white text-gray-600 focus:outline-none cursor-pointer shadow-sm"
                          title="اختر من الاختبارات الشائعة"
                        >
                          <option value="" disabled>
                            اختر...
                          </option>
                          {standardProperties.map((p, pIdx) => (
                            <option key={pIdx} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>

                    {/* خانة القيمة والنتيجة */}
                    <td className="px-3 py-1.5 flex items-center justify-between">
                      <input
                        type="text"
                        value={row.value}
                        onChange={(e) =>
                          handleCellChange(index, "value", e.target.value)
                        }
                        placeholder="النتيجة..."
                        className="w-full bg-transparent focus:outline-none text-center font-medium text-gray-800 text-sm"
                      />
                      {/* زر حذف الصف (يختفي عند الطباعة) */}
                      <button
                        onClick={() => handleDeleteRow(index)}
                        className="print:hidden text-red-500 hover:text-red-700 font-bold text-xs ml-2 opacity-0 group-hover:opacity-100 transition p-1"
                        title="حذف الصف"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. الفوتر الأصفر الثابت في أسفل صفحات الطباعة وفي الشاشة */}
        <div
          className="absolute bottom-0 left-0 right-0 h-11 bg-yellow-400 flex items-center justify-center print:fixed print:bottom-8 print:left-0 print:right-0"
          style={{
            backgroundColor: "#facc15",
            WebkitPrintColorAdjust: "exact",
            printColorAdjust: "exact",
          }}
        >
          <span className="font-bold text-gray-900 tracking-wider text-xs sm:text-sm">
            www.spikelube.co
          </span>
        </div>
      </div>
    </div>
  );
}
