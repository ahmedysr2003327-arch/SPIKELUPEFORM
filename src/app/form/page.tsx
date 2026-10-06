"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import BusinessTypeSelect from "../component/BusinessTypeSelect";
import {
  User,
  Smartphone,
  MessageSquare,
  Mail,
  Building2,
  MapPin,
  ArrowLeft,
  Check,
  Plus,
  Loader2,
  FileText,
} from "lucide-react";

interface FormData {
  fullName: string;
  phone: string;
  whatsapp: string;
  email: string;
  company: string;
  address: string;
  businessType: string;
  notes: string;
}

export default function EventRegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    whatsapp: "",
    email: "",
    company: "",
    address: "",
    businessType: "",
    notes: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.businessType) {
      setErrorMessage(
        "يرجى اختيار طبيعة العمل / Please select business nature",
      );
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubmitted(true);
      } else {
        setErrorMessage(
          result.error || "حدث خطأ أثناء حفظ البيانات / Error saving data.",
        );
      }
    } catch (error) {
      console.error("خطأ أثناء الإرسال:", error);
      setErrorMessage(
        "تعذر الاتصال بالسيرفر. يرجى التثبت من اتصال الإنترنت والمحاولة مجدداً / Connection failed.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      phone: "",
      whatsapp: "",
      email: "",
      company: "",
      address: "",
      businessType: "",
      notes: "",
    });
    setErrorMessage("");
    setIsSubmitted(false);
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-cairo background-color: #fafbfc;
    background-image:
      radial-gradient(at 10% 10%, rgba(252, 203, 5, 0.18) 0px, transparent 45%),
      radial-gradient(at 90% 15%, rgba(26, 43, 86, 0.12) 0px, transparent 50%),
      radial-gradient(at 85% 85%, rgba(252, 203, 5, 0.12) 0px, transparent 45%),
      radial-gradient(at 15% 90%, rgba(26, 43, 86, 0.08) 0px, transparent 50%);"
      dir="rtl"
    >
      <div className="relative w-full max-w-lg z-10">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl relative border border-white/20">
          {/* الهيدر والشعار */}
          <div className="p-6 flex flex-col items-center justify-center border-b border-slate-100">
            <Image
              src="/image/2.png"
              alt="Logo / الشعار"
              width={160}
              height={64}
              style={{ width: "auto", height: "64px" }}
              className="object-contain rounded-lg"
              priority
            />
            <p className="text-amber-400 text-sm mt-3 font-semibold tracking-wider text-center">
              سجل بيانات - SPIKELUBE
              <span className="block text-xs font-normal opacity-80 mt-0.5">
                Registration Log - SPIKELUBE
              </span>
            </p>
          </div>

          <div className="p-8 sm:p-10">
            {!isSubmitted ? (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-800">
                    تسجيل بيانات / Customer Registration
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* اسم العميل */}
                  <div className="relative z-10">
                    <label className="block text-sm font-semibold text-slate-700 mb-1 mr-1">
                      اسم العميل / Full Name{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                        <User className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="w-full pl-4 pr-11 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="الاسم الكامل / Full Name"
                      />
                    </div>
                  </div>

                  {/* رقم الهاتف */}
                  <div className="relative z-10">
                    <label className="block text-sm font-semibold text-slate-700 mb-1 mr-1">
                      رقم الهاتف / Phone Number{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <input
                        type="tel"
                        required
                        dir="ltr"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full pl-4 pr-11 py-3 text-left rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="010XXXXXXXX"
                      />
                    </div>
                  </div>

                  {/* رقم الواتساب */}
                  <div className="relative z-10">
                    <label className="block text-sm font-semibold text-slate-700 mb-1 mr-1">
                      رقم الواتساب / WhatsApp Number{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <input
                        type="tel"
                        required
                        dir="ltr"
                        value={formData.whatsapp}
                        onChange={(e) =>
                          setFormData({ ...formData, whatsapp: e.target.value })
                        }
                        className="w-full pl-4 pr-11 py-3 text-left rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="010XXXXXXXX"
                      />
                    </div>
                  </div>

                  {/* طبيعة العمل */}
                  <div className="relative z-30">
                    <BusinessTypeSelect
                      value={formData.businessType}
                      onChange={(val) =>
                        setFormData({ ...formData, businessType: val })
                      }
                    />
                  </div>

                  {/* البريد الإلكتروني */}
                  <div className="relative z-10">
                    <label className="block text-sm font-semibold text-slate-700 mb-1 mr-1">
                      البريد الإلكتروني / Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-5 h-5" />
                      </div>
                      <input
                        type="email"
                        dir="ltr"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full pl-4 pr-11 py-3 text-left rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="example@domain.com"
                      />
                    </div>
                  </div>

                  {/* جهة العمل */}
                  <div className="relative z-10">
                    <label className="block text-sm font-semibold text-slate-700 mb-1 mr-1">
                      جهة العمل / Company Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        className="w-full pl-4 pr-11 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="اسم الشركة أو المؤسسة / Company Name"
                      />
                    </div>
                  </div>

                  {/* العنوان */}
                  <div className="relative z-10">
                    <label className="block text-sm font-semibold text-slate-700 mb-1 mr-1">
                      العنوان / Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        className="w-full pl-4 pr-11 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder="المدينة / الشارع - City / Street"
                      />
                    </div>
                  </div>

                  {/* الملاحظات */}
                  <div className="relative z-10">
                    <label className="block text-sm font-semibold text-slate-700 mb-1 mr-1">
                      الملاحظات / Notes
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                        <FileText className="w-5 h-5" />
                      </div>
                      <textarea
                        rows={3}
                        value={formData.notes}
                        onChange={(e) =>
                          setFormData({ ...formData, notes: e.target.value })
                        }
                        className="w-full pl-4 pr-11 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                        placeholder="أدخل أي ملاحظات إضافية... / Any additional notes..."
                      />
                    </div>
                  </div>
                  {errorMessage && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-xl text-center font-semibold">
                      {errorMessage}
                    </div>
                  )}
                  {/* زر الإرسال */}
                  <div className="pt-4 relative z-10">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-blue-950 hover:bg-blue-900 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          جاري الحفظ... / Saving...
                        </>
                      ) : (
                        <>
                          حفظ البيانات / Save Data
                          <ArrowLeft className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-10 h-10 text-white stroke-[3]" />
                  </div>
                </div>

                <h2 className="text-2xl font-extrabold text-slate-800 mb-2">
                  تم الحفظ بنجاح!
                  <span className="block text-lg font-normal text-slate-600 mt-1">
                    Saved Successfully!
                  </span>
                </h2>
                <p className="text-slate-600 text-sm mb-6">
                  تم إضافة بيانات SPIKELUBE بنجاح
                </p>

                <button
                  type="button"
                  onClick={handleReset}
                  className="text-slate-800 font-bold py-2 px-6 rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" /> ذاهب الي الرئيسية / Go to Home
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
