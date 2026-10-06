"use client";

import React, { forwardRef } from "react";

export interface InvoiceItem {
  id: string | number;
  name: string;
  quantity: number;
  price: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  companyName: string;
  clientName: string;
  items: InvoiceItem[];
  taxRate: number; // نسبة الضريبة مثلاً 0.14
}

interface Props {
  data: InvoiceData;
}

export const InvoicePrint = forwardRef<HTMLDivElement, Props>(
  ({ data }, ref) => {
    const subtotal = data.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );
    const tax = subtotal * data.taxRate;
    const total = subtotal + tax;

    return (
      <div
        ref={ref}
        dir="rtl"
        className="p-8 bg-white text-black font-sans max-w-3xl mx-auto border border-gray-200 rounded-lg print:border-none print:shadow-none shadow-sm"
      >
        {/* رأس الفاتورة */}
        <div className="flex justify-between items-start border-b border-gray-200 pb-6 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">فاتورة مبيعات</h1>
            <p className="text-sm text-gray-500 mt-1">
              رقم الفاتورة: #{data.invoiceNumber}
            </p>
            <p className="text-sm text-gray-500">التاريخ: {data.date}</p>
          </div>
          <div className="text-left">
            <h2 className="text-xl font-bold text-gray-900">
              {data.companyName}
            </h2>
            <p className="text-sm text-gray-500">
              السجل التجاري / الرقم الضريبي
            </p>
          </div>
        </div>

        {/* تفاصيل العميل */}
        <div className="mb-8 bg-gray-50 p-4 rounded-md">
          <h3 className="text-sm font-semibold text-gray-600 mb-1">
            فاتورة إلى:
          </h3>
          <p className="text-lg font-bold text-gray-800">{data.clientName}</p>
        </div>

        {/* جدول المنتجات */}
        <table className="w-full text-right border-collapse mb-6">
          <thead>
            <tr className="border-b-2 border-gray-300 bg-gray-100 text-gray-700">
              <th className="p-3">#</th>
              <th className="p-3">الصنف / الخدمة</th>
              <th className="p-3 text-center">الكمية</th>
              <th className="p-3 text-left">السعر</th>
              <th className="p-3 text-left">الإجمالي</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="p-3 text-gray-500">{index + 1}</td>
                <td className="p-3 font-medium text-gray-800">{item.name}</td>
                <td className="p-3 text-center">{item.quantity}</td>
                <td className="p-3 text-left">
                  {item.price.toLocaleString()} ج.م
                </td>
                <td className="p-3 text-left font-semibold">
                  {(item.quantity * item.price).toLocaleString()} ج.م
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* الإجماليات */}
        <div className="flex justify-end mt-6">
          <div className="w-64 space-y-2">
            <div className="flex justify-between text-gray-600 text-sm">
              <span>المجموع الفرعي:</span>
              <span>{subtotal.toLocaleString()} ج.م</span>
            </div>
            <div className="flex justify-between text-gray-600 text-sm">
              <span>الضريبة ({data.taxRate * 100}%):</span>
              <span>{tax.toLocaleString()} ج.م</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t border-gray-300 pt-2 text-gray-900">
              <span>المبلغ الإجمالي:</span>
              <span>{total.toLocaleString()} ج.م</span>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

InvoicePrint.displayName = "InvoicePrint";
