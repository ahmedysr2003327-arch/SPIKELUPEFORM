"use client";

// import React, { useState, useRef, ChangeEvent } from "react";
// import { useReactToPrint } from "react-to-print";

// export interface InvoiceItem {
//   id: string;
//   itemNo: string;
//   description: string;
//   quantity: number;
//   unit: string;
//   unitPrice: number;
// }

// // 1. اللوجو الافتراضي الثابت
// const DEFAULT_LOGO =
//   "data:image/svg+xml;utf8," +
//   encodeURIComponent(`
// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 80" width="300" height="80">
//   <g transform="translate(10, 5)">
//     <path d="M 30 10 C 30 10 10 38 10 52 C 10 63 19 72 30 72 C 41 72 50 63 50 52 C 50 38 30 10 30 10 Z" fill="#D97706"/>
//     <path d="M 30 22 C 30 22 18 42 18 51 C 18 58 23 64 30 64 C 37 64 42 58 42 51 C 42 42 30 22 30 22 Z" fill="#F59E0B"/>
//     <text x="65" y="42" font-family="Arial, sans-serif" font-weight="900" font-size="26" fill="#1E3A8A">SPIKE</text>
//     <text x="65" y="65" font-family="Arial, sans-serif" font-weight="800" font-size="20" fill="#D97706">LUBE CO.</text>
//   </g>
// </svg>
// `);

// // 2. الختم الافتراضي الثابت
// const DEFAULT_STAMP =
//   "data:image/svg+xml;utf8," +
//   encodeURIComponent(`
// <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
//   <circle cx="100" cy="100" r="90" fill="none" stroke="#1E40AF" stroke-width="3" stroke-dasharray="6,3"/>
//   <circle cx="100" cy="100" r="82" fill="none" stroke="#1E40AF" stroke-width="2"/>
//   <path id="circlePath" fill="none" stroke="none" d="M 25, 100 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
//   <text fill="#1E40AF" font-size="13" font-weight="bold" font-family="Arial">
//     <textPath href="#circlePath" startOffset="50%" text-anchor="middle">
//       ★ SPIKE LUBE CO. ★ CAIRO, EGYPT ★
//     </textPath>
//   </text>
//   <rect x="35" y="70" width="130" height="60" fill="#2563EB" opacity="0.08" rx="6"/>
//   <text x="100" y="92" font-family="Arial" font-size="13" font-weight="bold" fill="#1E40AF" text-anchor="middle">OFFICIAL SEAL</text>
//   <text x="100" y="110" font-family="Arial" font-size="11" font-weight="bold" fill="#1E40AF" text-anchor="middle">1 OCT 2026</text>
//   <path d="M 55 118 Q 100 132 145 118" stroke="#1E40AF" stroke-width="2" fill="none"/>
//   <text x="100" y="138" font-family="Arial" font-size="10" font-weight="bold" fill="#1E40AF" text-anchor="middle">EXPORT DIVISION</text>
// </svg>
// `);

export default function DynamicInvoicePage() {
  // const invoiceRef = useRef<HTMLDivElement>(null);

  // // 1. الصور
  // const [logoUrl, setLogoUrl] = useState<string>(DEFAULT_LOGO);
  // const [stampUrl, setStampUrl] = useState<string>(DEFAULT_STAMP);

  // // 2. البيانات الأساسية
  // const [invoiceNo, setInvoiceNo] = useState<string>("SL - 26036 R");
  // const [invoiceDate, setInvoiceDate] = useState<string>("1 OCT 2026");
  // const [clientName, setClientName] = useState<string>(
  //   "YOHANA ENTERPRISE PVT CO",
  // );
  // const [clientAddress, setClientAddress] = useState<string>(
  //   "22 WENDY DR\nBELVEDERE\nHARARE ZIMBABWE",
  // );

  // // 3. جدول المنتجات
  // const [items, setItems] = useState<InvoiceItem[]>([
  //   {
  //     id: "1",
  //     itemNo: "1",
  //     description: "SPIKELUBE ENGINE OIL SAE 50 BOX 5L*6",
  //     quantity: 1700,
  //     unit: "BOXES",
  //     unitPrice: 25.5,
  //   },
  //   {
  //     id: "2",
  //     itemNo: "3",
  //     description: "SPIKE LUBE GEAR OIL SAE 90 BOX 1L*12",
  //     quantity: 200,
  //     unit: "BOXES",
  //     unitPrice: 14,
  //   },
  //   {
  //     id: "3",
  //     itemNo: "2",
  //     description: "SPIKE LUBEATF TYPE A BOX 1L*12",
  //     quantity: 425,
  //     unit: "BOXES",
  //     unitPrice: 14,
  //   },
  // ]);

  //   // 4. التفاصيل
  //   const [infoText, setInfoText] = useState<string>(
  //     `TOTAL NET W. : 50.00 TON
  // TOTAL GROSS W. : 57.100 TON
  // LOADING PORT : ALL PORTS-EGYPT
  // DELIVERY TERM : EX WORK / BEIRA PORT SHIPMENT FINAL DESTINATION ZIMBABWE
  // Origin : Egypt
  // PAYMENT TERM : 100% IN ADVANCE

  // BANK DETAILS
  // BANK NAME : EXPORT DEVELOPMENT BANK OF EGYPT
  // BANK ADRESS: 10th of Ramadan
  // Swift code : EXDEEGCXRAM
  // IBAN: EG 8200610030020221380201021
  // FOR SPIKE LUBE CO.`,
  //   );

  //   // 5. الفوتر
  //   const [footerAddressAr, setFooterAddressAr] = useState<string>(
  //     "وحدة رقم ج 114 المجمعات الصغيرة والمتوسطة - المنطقة الجنوبية 6 مليون - العاشر من رمضان - الشرقية",
  //   );
  //   const [footerAddressEn, setFooterAddressEn] = useState<string>(
  //     "UNIT NO G114 - Small and medium complexes - Southern District 6 million - 10TH OF RAMADAN - AL SHARQIA",
  //   );
  //   const [footerContact, setFooterContact] = useState<string>(
  //     "EMAIL: INFO@SPIKELUBE.COM   WEB: WWW.SPIKELUBE.CO",
  //   );

  //   const handleImageChange = (
  //     e: ChangeEvent<HTMLInputElement>,
  //     setter: (url: string) => void,
  //   ) => {
  //     const file = e.target.files?.[0];
  //     if (file) {
  //       setter(URL.createObjectURL(file));
  //     }
  //   };

  //   const handleItemChange = (
  //     id: string,
  //     field: keyof InvoiceItem,
  //     value: string | number,
  //   ) => {
  //     setItems(
  //       items.map((item) =>
  //         item.id === id ? { ...item, [field]: value } : item,
  //       ),
  //     );
  //   };

  //   const addItem = () => {
  //     const newItem: InvoiceItem = {
  //       id: Date.now().toString(),
  //       itemNo: (items.length + 1).toString(),
  //       description: "صنف جديد",
  //       quantity: 1,
  //       unit: "BOXES",
  //       unitPrice: 0,
  //     };
  //     setItems([...items, newItem]);
  //   };

  //   const removeItem = (id: string) => {
  //     setItems(items.filter((item) => item.id !== id));
  //   };

  //   const handlePrint = useReactToPrint({
  //     contentRef: invoiceRef,
  //     documentTitle: `INVOICE_${invoiceNo.replace(/\s+/g, "_")}`,
  //   });

  //   const totalQuantity = items.reduce(
  //     (sum, item) => sum + (Number(item.quantity) || 0),
  //     0,
  //   );
  //   const totalAmount = items.reduce(
  //     (sum, item) =>
  //       sum + (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0),
  //     0,
  //   );

  return (
    <></>
    // <div className="min-h-screen bg-gray-100 p-4 lg:p-8 font-sans">
    //   <style>{`
    //     @media print {
    //       @page {
    //         size: A4 portrait;
    //         margin: 0;
    //       }
    //       body {
    //         margin: 0;
    //         -webkit-print-color-adjust: exact;
    //         print-color-adjust: exact;
    //       }
    //     }
    //   `}</style>

    //   <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
    //     {/* ===================== لوحة التحكم ===================== */}
    //     <div
    //       className="lg:col-span-5 bg-white p-6 rounded-xl shadow-md space-y-6 max-h-[90vh] overflow-y-auto"
    //       dir="rtl"
    //     >
    //       <div className="flex justify-between items-center border-b pb-3">
    //         <h2 className="text-xl font-bold text-gray-800">
    //           تعديل كافة بيانات الفاتورة
    //         </h2>
    //         <button
    //           onClick={() => handlePrint()}
    //           className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
    //         >
    //           🖨️ طباعة الفاتورة
    //         </button>
    //       </div>

    //       <div className="space-y-3 bg-gray-50 p-3 rounded-lg">
    //         <h3 className="font-bold text-sm text-gray-700">
    //           الصور (اللوجو والختم)
    //         </h3>
    //         <div>
    //           <label className="block text-xs text-gray-600 mb-1">
    //             تغيير اللوجو (Logo):
    //           </label>
    //           <input
    //             type="file"
    //             accept="image/*"
    //             onChange={(e) => handleImageChange(e, setLogoUrl)}
    //             className="text-xs w-full"
    //           />
    //         </div>
    //         <div>
    //           <label className="block text-xs text-gray-600 mb-1">
    //             تغيير الختم/التوقيع (Stamp):
    //           </label>
    //           <input
    //             type="file"
    //             accept="image/*"
    //             onChange={(e) => handleImageChange(e, setStampUrl)}
    //             className="text-xs w-full"
    //           />
    //         </div>
    //       </div>

    //       <div className="space-y-3 bg-gray-50 p-3 rounded-lg">
    //         <h3 className="font-bold text-sm text-gray-700">
    //           بيانات الفاتورة والعميل
    //         </h3>
    //         <div className="grid grid-cols-2 gap-2">
    //           <div>
    //             <label className="block text-xs text-gray-500">
    //               رقم الفاتورة
    //             </label>
    //             <input
    //               type="text"
    //               value={invoiceNo}
    //               onChange={(e) => setInvoiceNo(e.target.value)}
    //               className="w-full border rounded p-1.5 text-sm"
    //             />
    //           </div>
    //           <div>
    //             <label className="block text-xs text-gray-500">التاريخ</label>
    //             <input
    //               type="text"
    //               value={invoiceDate}
    //               onChange={(e) => setInvoiceDate(e.target.value)}
    //               className="w-full border rounded p-1.5 text-sm"
    //             />
    //           </div>
    //         </div>
    //         <div>
    //           <label className="block text-xs text-gray-500">
    //             اسم العميل (TO:)
    //           </label>
    //           <input
    //             type="text"
    //             value={clientName}
    //             onChange={(e) => setClientName(e.target.value)}
    //             className="w-full border rounded p-1.5 text-sm font-bold"
    //           />
    //         </div>
    //         <div>
    //           <label className="block text-xs text-gray-500">
    //             عنوان العميل
    //           </label>
    //           <textarea
    //             rows={2}
    //             value={clientAddress}
    //             onChange={(e) => setClientAddress(e.target.value)}
    //             className="w-full border rounded p-1.5 text-sm"
    //           />
    //         </div>
    //       </div>

    //       <div className="space-y-3 bg-gray-50 p-3 rounded-lg">
    //         <div className="flex justify-between items-center">
    //           <h3 className="font-bold text-sm text-gray-700">
    //             المنتجات / الأصناف
    //           </h3>
    //           <button
    //             onClick={addItem}
    //             className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
    //           >
    //             + إضافة صنف
    //           </button>
    //         </div>

    //         {items.map((item, index) => (
    //           <div
    //             key={item.id}
    //             className="border p-2 rounded bg-white space-y-2 text-xs"
    //           >
    //             <div className="flex justify-between items-center font-semibold">
    //               <span>الصنف #{index + 1}</span>
    //               <button
    //                 onClick={() => removeItem(item.id)}
    //                 className="text-red-500 hover:text-red-700"
    //               >
    //                 حذف
    //               </button>
    //             </div>
    //             <div className="grid grid-cols-3 gap-1">
    //               <input
    //                 type="text"
    //                 placeholder="رقم"
    //                 value={item.itemNo}
    //                 onChange={(e) =>
    //                   handleItemChange(item.id, "itemNo", e.target.value)
    //                 }
    //                 className="border p-1 rounded"
    //               />
    //               <input
    //                 type="text"
    //                 placeholder="الوحدة"
    //                 value={item.unit}
    //                 onChange={(e) =>
    //                   handleItemChange(item.id, "unit", e.target.value)
    //                 }
    //                 className="border p-1 rounded"
    //               />
    //               <input
    //                 type="number"
    //                 placeholder="الكمية"
    //                 value={item.quantity}
    //                 onChange={(e) =>
    //                   handleItemChange(
    //                     item.id,
    //                     "quantity",
    //                     Number(e.target.value),
    //                   )
    //                 }
    //                 className="border p-1 rounded"
    //               />
    //             </div>
    //             <input
    //               type="text"
    //               placeholder="الوصف"
    //               value={item.description}
    //               onChange={(e) =>
    //                 handleItemChange(item.id, "description", e.target.value)
    //               }
    //               className="border p-1 rounded w-full"
    //             />
    //             <div>
    //               <label className="text-[10px] text-gray-400">
    //                 سعر الوحدة (USD)
    //               </label>
    //               <input
    //                 type="number"
    //                 value={item.unitPrice}
    //                 onChange={(e) =>
    //                   handleItemChange(
    //                     item.id,
    //                     "unitPrice",
    //                     Number(e.target.value),
    //                   )
    //                 }
    //                 className="border p-1 rounded w-full"
    //               />
    //             </div>
    //           </div>
    //         ))}
    //       </div>

    //       <div className="space-y-2 bg-gray-50 p-3 rounded-lg">
    //         <h3 className="font-bold text-sm text-gray-700">
    //           نص التفاصيل والبنك (INFORMATION)
    //         </h3>
    //         <textarea
    //           rows={8}
    //           value={infoText}
    //           onChange={(e) => setInfoText(e.target.value)}
    //           className="w-full border rounded p-2 text-xs font-mono ltr text-left"
    //         />
    //       </div>

    //       <div className="space-y-2 bg-gray-50 p-3 rounded-lg">
    //         <h3 className="font-bold text-sm text-gray-700">
    //           العنوان والاتصال (أسفل الخط الأخضر)
    //         </h3>
    //         <div>
    //           <label className="block text-[11px] text-gray-500">
    //             العنوان بالعربية
    //           </label>
    //           <input
    //             type="text"
    //             value={footerAddressAr}
    //             onChange={(e) => setFooterAddressAr(e.target.value)}
    //             className="w-full border rounded p-1 text-xs"
    //           />
    //         </div>
    //         <div>
    //           <label className="block text-[11px] text-gray-500">
    //             العنوان بالإنجليزية
    //           </label>
    //           <input
    //             type="text"
    //             value={footerAddressEn}
    //             onChange={(e) => setFooterAddressEn(e.target.value)}
    //             className="w-full border rounded p-1 text-xs"
    //           />
    //         </div>
    //         <div>
    //           <label className="block text-[11px] text-gray-500">
    //             بيانات التواصل
    //           </label>
    //           <input
    //             type="text"
    //             value={footerContact}
    //             onChange={(e) => setFooterContact(e.target.value)}
    //             className="w-full border rounded p-1 text-xs"
    //           />
    //         </div>
    //       </div>
    //     </div>

    //     {/* ===================== المعاينة والورقة المطبوعة ===================== */}
    //     <div className="lg:col-span-7 flex justify-center">
    //       <div
    //         ref={invoiceRef}
    //         className="w-[210mm] min-h-[297mm] bg-white p-10 text-black font-sans shadow-xl border border-gray-200 relative text-left flex flex-col justify-between box-border"
    //         dir="ltr"
    //       >
    //         {/* المحتوى الرئيسي للفاتورة */}
    //         <div className="space-y-6">
    //           {/* الهيدر */}
    //           <div className="grid grid-cols-3 items-center border-b pb-4">
    //             <div className="flex items-center justify-start h-20">
    //               {logoUrl ? (
    //                 <img
    //                   src="image/1.jpeg"
    //                   alt="Logo"
    //                   className="max-h-20 max-w-full object-contain"
    //                 />
    //               ) : (
    //                 <div className="border-2 border-dashed border-gray-300 px-4 py-3 text-center text-gray-400 text-xs rounded w-44">
    //                   [اللوجو]
    //                 </div>
    //               )}
    //             </div>

    //             <div className="flex justify-center items-center">
    //               <div className="border-2 border-cyan-400 rounded-full px-10 py-2 text-xl font-black tracking-widest text-black text-center shadow-sm">
    //                 INVOICE
    //               </div>
    //             </div>

    //             <div className="flex flex-col items-end space-y-2">
    //               <div className="bg-[#E9D5FF] text-[#581C87] px-4 py-1.5 text-sm font-extrabold border border-[#D8B4FE] rounded-md min-w-[170px] text-center shadow-sm">
    //                 I NO.: {invoiceNo}
    //               </div>
    //               <div className="bg-[#F3E8FF] text-[#6B21A8] px-4 py-1 text-xs font-bold border border-[#E9D5FF] rounded-md min-w-[170px] text-center shadow-sm">
    //                 DATE: {invoiceDate}
    //               </div>
    //             </div>
    //           </div>

    //           {/* بيانات العميل (تم تكبير الخط) */}
    //           <div className="font-bold text-sm leading-snug text-gray-900 space-y-1">
    //             <span className="text-red-600 block font-black text-base">
    //               TO:
    //             </span>
    //             <div className="text-base font-extrabold">{clientName}</div>
    //             <div className="whitespace-pre-line font-medium text-gray-800 text-xs leading-relaxed">
    //               {clientAddress}
    //             </div>
    //           </div>

    //           {/* الجدول (تم تكبير الخطوط والمسافات) */}
    //           <table className="w-full border-2 border-black border-collapse text-xs">
    //             <thead>
    //               <tr className="bg-gray-300 border-b-2 border-black font-extrabold text-center text-xs">
    //                 <th className="border border-black p-2.5 w-12">item</th>
    //                 <th className="border border-black p-2.5 text-left">
    //                   PRODUCT DESCRIPTION
    //                 </th>
    //                 <th className="border border-black p-2.5 w-28">QUANTITY</th>
    //                 <th className="border border-black p-2.5 w-24">
    //                   UNIT PRICE
    //                   <br />
    //                   (USD)
    //                 </th>
    //                 <th className="border border-black p-2.5 w-28">
    //                   TOTAL PRICE
    //                   <br />
    //                   (USD)
    //                 </th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {items.map((item) => (
    //                 <tr
    //                   key={item.id}
    //                   className="font-bold text-center border-b border-black text-xs"
    //                 >
    //                   <td className="border border-black p-2.5">
    //                     {item.itemNo}
    //                   </td>
    //                   <td className="border border-black p-2.5 text-left font-bold text-gray-900">
    //                     {item.description}
    //                   </td>
    //                   <td className="border border-black p-2.5">
    //                     <span className="mr-1">{item.quantity}</span>
    //                     <span>{item.unit}</span>
    //                   </td>
    //                   <td className="border border-black p-2.5">
    //                     {(Number(item.unitPrice) || 0).toLocaleString("en-US", {
    //                       minimumFractionDigits: 1,
    //                     })}
    //                   </td>
    //                   <td className="border border-black p-2.5">
    //                     {(
    //                       (Number(item.quantity) || 0) *
    //                       (Number(item.unitPrice) || 0)
    //                     ).toLocaleString("en-US")}
    //                   </td>
    //                 </tr>
    //               ))}
    //               <tr className="bg-cyan-700 text-white font-extrabold text-sm border-t-2 border-black">
    //                 <td colSpan={2} className="border border-black p-2.5"></td>
    //                 <td className="border border-black p-2.5 text-center text-black bg-cyan-200">
    //                   {totalQuantity} {items[0]?.unit || ""}
    //                 </td>
    //                 <td className="border border-black p-2.5 text-center text-black bg-cyan-200">
    //                   Total Amount
    //                 </td>
    //                 <td className="border border-black p-2.5 text-center text-black bg-cyan-200 text-base">
    //                   {totalAmount.toLocaleString("en-US")}
    //                 </td>
    //               </tr>
    //             </tbody>
    //           </table>

    //           {/* مربع التفاصيل والختم (تم تكبير الخطوط وتوسيع المربع) */}
    //           <div className="relative border-2 border-black p-4 text-xs font-bold leading-relaxed text-gray-900 min-h-[180px]">
    //             <div className="absolute -top-3 left-4 bg-cyan-200 border border-black px-4 py-0.5 text-xs font-black">
    //               INFORMATION
    //             </div>

    //             <div className="whitespace-pre-line font-mono pt-1 text-xs leading-relaxed">
    //               {infoText}
    //             </div>

    //             {/* الختم */}
    //             <div className="absolute bottom-2 right-4 w-44 h-32 flex justify-center items-center pointer-events-none">
    //               {stampUrl ? (
    //                 <img
    //                   src="image/3.png"
    //                   alt="Stamp"
    //                   className="max-h-full max-w-full object-contain rotate-[-5deg] opacity-90"
    //                 />
    //               ) : (
    //                 <div className="border-2 border-blue-600 text-blue-600 border-dashed rounded p-2 text-center text-[10px] transform -rotate-6">
    //                   [مكان الختم / التوقيع]
    //                 </div>
    //               )}
    //             </div>
    //           </div>
    //         </div>

    //         {/* ================= الفوتر والخط الأخضر (مسافة متناسقة وقريبة) ================= */}
    //         <div className="pt-6 pb-2">
    //           <div className="border-b-2 border-lime-400 w-full mx-auto mb-3"></div>
    //           <div className="text-center text-xs font-extrabold text-gray-800 space-y-1 leading-snug">
    //             <p dir="rtl" className="text-xs">
    //               {footerAddressAr}
    //             </p>
    //             <p dir="ltr" className="tracking-tight text-[11px]">
    //               {footerAddressEn}
    //             </p>
    //             <p
    //               dir="ltr"
    //               className="text-gray-900 font-black text-xs pt-0.5"
    //             >
    //               {footerContact}
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
