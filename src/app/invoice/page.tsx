"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import { useReactToPrint } from "react-to-print";

export interface InvoiceItem {
  id: string;
  itemNo: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
}

export default function DynamicInvoicePage() {
  const invoiceRef = useRef<HTMLDivElement>(null);

  // 1. رفع الصور (اللوجو والختم)
  const [logoUrl, setLogoUrl] = useState<string>("");
  const [stampUrl, setStampUrl] = useState<string>("");

  // 2. بيانات الفاتورة المباشرة القابلة للتعديل
  const [invoiceNo, setInvoiceNo] = useState<string>("SL - 26036 R");
  const [invoiceDate, setInvoiceDate] = useState<string>("1 OCT 2026");
  const [clientName, setClientName] = useState<string>(
    "YOHANA ENTERPRISE PVT CO",
  );
  const [clientAddress, setClientAddress] = useState<string>(
    "22 WENDY DR\nBELVEDERE\nHARARE ZIMBABWE",
  );

  // 3. جدول المنتجات
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: "1",
      itemNo: "1",
      description: "SPIKELUBE ENGINE OIL SAE 50 BOX 5L*6",
      quantity: 1700,
      unit: "BOXES",
      unitPrice: 25.5,
    },
    {
      id: "2",
      itemNo: "3",
      description: "SPIKE LUBE GEAR OIL SAE 90 BOX 1L*12",
      quantity: 200,
      unit: "BOXES",
      unitPrice: 14,
    },
    {
      id: "3",
      itemNo: "2",
      description: "SPIKE LUBEATF TYPE A BOX 1L*12",
      quantity: 425,
      unit: "BOXES",
      unitPrice: 14,
    },
  ]);

  // 4. نص الملاحظات والبيانات البنكية (نص حر متعدد الأسطر)
  const [infoText, setInfoText] = useState<string>(
    `TOTAL NET W. : 50.00 TON
TOTAL GROSS W. : 57.100 TON
LOADING PORT : ALL PORTS-EGYPT
DELIVERY TERM : EX WORK / BEIRA PORT SHIPMENT FINAL DESTINATION ZIMBABWE
Origin : Egypt
PAYMENT TERM : 100% IN ADVANCE
BANK DETAILS
BANK NAME : EXPORT DEVELOPMENT BANK OF EGYPT
BANK ADRESS: 10th of Ramadan
Swift code : EXDEEGCXRAM
IBAN: EG 8200610030020221380201021
FOR SPIKE LUBE CO.`,
  );

  // إدارة الصور
  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    setter: (url: string) => void,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setter(URL.createObjectURL(file));
    }
  };

  // إضافة/تعديل/حذف الأصناف
  const handleItemChange = (
    id: string,
    field: keyof InvoiceItem,
    value: any,
  ) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      itemNo: (items.length + 1).toString(),
      description: "صنف جديد",
      quantity: 1,
      unit: "BOXES",
      unitPrice: 0,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // الطباعة
  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: `INVOICE_${invoiceNo.replace(/\s+/g, "_")}`,
  });

  // الحسابات
  const totalQuantity = items.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0,
  );
  const totalAmount = items.reduce(
    (sum, item) =>
      sum + (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0),
    0,
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ===================== لوحة التحكم الكاملة ===================== */}
        <div
          className="lg:col-span-5 bg-white p-6 rounded-xl shadow-md space-y-6 max-h-[90vh] overflow-y-auto"
          dir="rtl"
        >
          <div className="flex justify-between items-center border-b pb-3">
            <h2 className="text-xl font-bold text-gray-800">
              تعديل كافة بيانات الفاتورة
            </h2>
            <button
              onClick={() => handlePrint()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
            >
              🖨️ طباعة الفاتورة
            </button>
          </div>

          {/* الصور */}
          <div className="space-y-3 bg-gray-50 p-3 rounded-lg">
            <h3 className="font-bold text-sm text-gray-700">
              الصور (اللوجو والختم)
            </h3>
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                رفع اللوجو (Logo):
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, setLogoUrl)}
                className="text-xs w-full"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                رفع الختم/التوقيع (Stamp):
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, setStampUrl)}
                className="text-xs w-full"
              />
            </div>
          </div>

          {/* البيانات الأساسية */}
          <div className="space-y-3 bg-gray-50 p-3 rounded-lg">
            <h3 className="font-bold text-sm text-gray-700">
              بيانات الفاتورة والعميل
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-500">
                  رقم الفاتورة
                </label>
                <input
                  type="text"
                  value={invoiceNo}
                  onChange={(e) => setInvoiceNo(e.target.value)}
                  className="w-full border rounded p-1.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500">التاريخ</label>
                <input
                  type="text"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="w-full border rounded p-1.5 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500">
                اسم العميل (TO:)
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full border rounded p-1.5 text-sm font-bold"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500">
                عنوان العميل
              </label>
              <textarea
                rows={2}
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                className="w-full border rounded p-1.5 text-sm"
              />
            </div>
          </div>

          {/* جدول المنتجات */}
          <div className="space-y-3 bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-gray-700">
                المنتجات / الأصناف
              </h3>
              <button
                onClick={addItem}
                className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
              >
                + إضافة صنف
              </button>
            </div>

            {items.map((item, index) => (
              <div
                key={item.id}
                className="border p-2 rounded bg-white space-y-2 text-xs"
              >
                <div className="flex justify-between items-center font-semibold">
                  <span>الصنف #{index + 1}</span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    حذف
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <input
                    type="text"
                    placeholder="رقم"
                    value={item.itemNo}
                    onChange={(e) =>
                      handleItemChange(item.id, "itemNo", e.target.value)
                    }
                    className="border p-1 rounded"
                  />
                  <input
                    type="text"
                    placeholder="الوحدة"
                    value={item.unit}
                    onChange={(e) =>
                      handleItemChange(item.id, "unit", e.target.value)
                    }
                    className="border p-1 rounded"
                  />
                  <input
                    type="number"
                    placeholder="الكمية"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(
                        item.id,
                        "quantity",
                        Number(e.target.value),
                      )
                    }
                    className="border p-1 rounded"
                  />
                </div>
                <input
                  type="text"
                  placeholder="الوصف"
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(item.id, "description", e.target.value)
                  }
                  className="border p-1 rounded w-full"
                />
                <div>
                  <label className="text-[10px] text-gray-400">
                    سعر الوحدة (USD)
                  </label>
                  <input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) =>
                      handleItemChange(
                        item.id,
                        "unitPrice",
                        Number(e.target.value),
                      )
                    }
                    className="border p-1 rounded w-full"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* نص الشحن والبنك */}
          <div className="space-y-2 bg-gray-50 p-3 rounded-lg">
            <h3 className="font-bold text-sm text-gray-700">
              نص التفاصيل والبنك (INFORMATION)
            </h3>
            <textarea
              rows={8}
              value={infoText}
              onChange={(e) => setInfoText(e.target.value)}
              className="w-full border rounded p-2 text-xs font-mono ltr text-left"
            />
          </div>
        </div>

        {/* ===================== المعاينة والاسطنبة المطبوعة ===================== */}
        <div className="lg:col-span-7 flex justify-center">
          <div
            ref={invoiceRef}
            className="w-[210mm] min-h-[297mm] bg-white p-10 text-black font-sans shadow-xl border border-gray-200 relative text-left"
            dir="ltr"
          >
            {/* الهيدر */}
            {/* Header (Logo & Invoice Title & Info) - محاذاة دقيقة ومضبوطة */}
            <div className="grid grid-cols-3 items-center mb-8 border-b pb-4">
              {/* 1. الجهة اليسرى: اللوجو */}
              <div className="flex items-center justify-start h-20">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt="Logo"
                    className="max-h-20 max-w-full object-contain"
                  />
                ) : (
                  <div className="border-2 border-dashed border-gray-300 px-4 py-3 text-center text-gray-400 text-xs rounded w-48">
                    [مكاني اللوجو]
                  </div>
                )}
              </div>

              {/* 2. المنتصف: كلمة INVOICE */}
              <div className="flex justify-center items-center">
                <div className="border-2 border-cyan-400 rounded-full px-10 py-1.5 text-xl font-bold tracking-widest text-black text-center shadow-sm">
                  INVOICE
                </div>
              </div>

              {/* 3. الجهة اليمنى: رقم وتاريخ الفاتورة */}
              <div className="flex flex-col items-end space-y-2">
                <div className="bg-[#E9D5FF] text-[#581C87] px-4 py-1.5 text-sm font-bold border border-[#D8B4FE] rounded-md min-w-[170px] text-center shadow-sm">
                  I NO.: {invoiceNo}
                </div>
                <div className="bg-[#F3E8FF] text-[#6B21A8] px-4 py-1 text-xs font-bold border border-[#E9D5FF] rounded-md min-w-[170px] text-center shadow-sm">
                  DATE: {invoiceDate}
                </div>
              </div>
            </div>

            {/* بيانات العميل */}
            <div className="mb-6 font-bold text-sm leading-tight text-gray-900">
              <span className="text-red-600 block mb-1 font-extrabold">
                TO:
              </span>
              <div>{clientName}</div>
              <div className="whitespace-pre-line font-normal text-gray-800">
                {clientAddress}
              </div>
            </div>

            {/* الجدول */}
            <table className="w-full border-2 border-black border-collapse text-xs mb-6">
              <thead>
                <tr className="bg-gray-300 border-b-2 border-black font-bold text-center">
                  <th className="border border-black p-2 w-12">item</th>
                  <th className="border border-black p-2 text-left">
                    PRODUCT DESCRIPTION
                  </th>
                  <th className="border border-black p-2 w-28">QUANTITY</th>
                  <th className="border border-black p-2 w-24">
                    UNIT PRICE
                    <br />
                    (USD)
                  </th>
                  <th className="border border-black p-2 w-28">
                    TOTAL PRICE
                    <br />
                    (USD)
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="font-bold text-center border-b border-black"
                  >
                    <td className="border border-black p-2">{item.itemNo}</td>
                    <td className="border border-black p-2 text-left font-semibold">
                      {item.description}
                    </td>
                    <td className="border border-black p-2">
                      <span className="mr-1">{item.quantity}</span>
                      <span>{item.unit}</span>
                    </td>
                    <td className="border border-black p-2">
                      {(Number(item.unitPrice) || 0).toLocaleString("en-US", {
                        minimumFractionDigits: 1,
                      })}
                    </td>
                    <td className="border border-black p-2">
                      {(
                        (Number(item.quantity) || 0) *
                        (Number(item.unitPrice) || 0)
                      ).toLocaleString("en-US")}
                    </td>
                  </tr>
                ))}
                {/* الإجمالي */}
                <tr className="bg-cyan-700 text-white font-extrabold text-sm border-t-2 border-black">
                  <td colSpan={2} className="border border-black p-2"></td>
                  <td className="border border-black p-2 text-center text-black bg-cyan-200">
                    {totalQuantity} {items[0]?.unit || ""}
                  </td>
                  <td className="border border-black p-2 text-center text-black bg-cyan-200">
                    Total Amount
                  </td>
                  <td className="border border-black p-2 text-center text-black bg-cyan-200 text-base">
                    {totalAmount.toLocaleString("en-US")}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* مربع التفاصيل والختم */}
            <div className="relative border-2 border-black p-3 text-xs font-bold leading-relaxed text-gray-900 min-h-[160px]">
              <div className="absolute -top-3 left-4 bg-cyan-200 border border-black px-4 py-0.5 text-xs font-bold">
                INFORMATION
              </div>

              <div className="whitespace-pre-line font-mono pt-1">
                {infoText}
              </div>

              {/* الختم */}
              <div className="absolute bottom-2 right-4 w-44 h-32 flex justify-center items-center pointer-events-none">
                {stampUrl ? (
                  <img
                    src={stampUrl}
                    alt="Stamp"
                    className="max-h-full max-w-full object-contain rotate-[-5deg] opacity-90"
                  />
                ) : (
                  <div className="border-2 border-blue-600 text-blue-600 border-dashed rounded p-2 text-center text-[10px] transform -rotate-6">
                    [مكان الختم / التوقيع]
                  </div>
                )}
              </div>
            </div>

            <div className="mt-12 border-b-2 border-lime-400 w-3/4 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
