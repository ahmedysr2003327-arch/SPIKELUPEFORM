"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
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
} from "lucide-react";

interface FormData {
  fullName: string;
  phone: string;
  whatsapp: string;
  email: string;
  company: string;
  address: string;
}

export default function EventRegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    whatsapp: "",
    email: "",
    company: "",
    address: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
        setErrorMessage(result.error || "حدث خطأ أثناء حفظ البيانات.");
      }
    } catch (error) {
      console.error("خطأ أثناء الإرسال:", error);
      setErrorMessage(
        "تعذر الاتصال بالسيرفر. يرجى التثبت من اتصال الإنترنت والمحاولة مجدداً.",
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
    });
    setErrorMessage("");
    setIsSubmitted(false);
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-cairo"
      dir="rtl"
    >
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="blob blob-1 animate-float"></div>
        <div className="blob blob-2 animate-float"></div>
        <div className="blob blob-3 animate-float"></div>
      </div>

      <div className="relative w-full max-w-lg z-10">
        <div className="glass-panel rounded-3xl overflow-hidden relative transition-all duration-500">
          <div className="p-6 flex flex-col items-center justify-center border-b border-white/20">
            <Image
              src="/image/2.png"
              alt="الشعار"
              width={160}
              height={64}
              style={{ width: "auto", height: "64px" }}
              className="object-contain rounded-lg"
              priority
            />
            <p className="text-brand-gold text-sm mt-3 font-semibold tracking-wider text-center">
              سجل بيانات العملاء - SPIKELUBE
            </p>
          </div>

          <div className="p-8 sm:p-10">
            {!isSubmitted ? (
              <div className="transition-opacity duration-300">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-800">
                    تسجيل بيانات العميل
                  </h2>
                  <p className="text-slate-500 mt-2 text-sm">
                    يرجى تعبئة كافة الحقول لإضافتها فوراً إلى الشيت
                  </p>
                </div>

                {errorMessage && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-xl text-center font-semibold">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* اسم العميل */}
                  <div>
                    <label className="block text-sm font-semibold text-brand-blue mb-1 mr-1">
                      اسم العميل <span className="text-red-500">*</span>
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
                        className="glass-input w-full pl-4 pr-11 py-3 rounded-xl text-slate-800 placeholder-slate-400"
                        placeholder="الاسم الكامل"
                      />
                    </div>
                  </div>

                  {/* رقم الهاتف */}
                  <div>
                    <label className="block text-sm font-semibold text-brand-blue mb-1 mr-1">
                      رقم الهاتف <span className="text-red-500">*</span>
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
                        className="glass-input w-full pl-4 pr-11 py-3 text-left text-slate-800 placeholder-slate-400"
                        placeholder="010XXXXXXXX"
                      />
                    </div>
                  </div>

                  {/* رقم الواتساب */}
                  <div>
                    <label className="block text-sm font-semibold text-brand-blue mb-1 mr-1">
                      رقم الواتساب <span className="text-red-500">*</span>
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
                        className="glass-input w-full pl-4 pr-11 py-3 text-left text-slate-800 placeholder-slate-400"
                        placeholder="010XXXXXXXX"
                      />
                    </div>
                  </div>

                  {/* البريد الإلكتروني */}
                  <div>
                    <label className="block text-sm font-semibold text-brand-blue mb-1 mr-1">
                      البريد الإلكتروني
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
                        className="glass-input w-full pl-4 pr-11 py-3 text-left text-slate-800 placeholder-slate-400"
                        placeholder="example@domain.com"
                      />
                    </div>
                  </div>

                  {/* جهة العمل */}
                  <div>
                    <label className="block text-sm font-semibold text-brand-blue mb-1 mr-1">
                      جهة العمل
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
                        className="glass-input w-full pl-4 pr-11 py-3 rounded-xl text-slate-800 placeholder-slate-400"
                        placeholder="اسم الشركة أو المؤسسة"
                      />
                    </div>
                  </div>

                  {/* العنوان */}
                  <div>
                    <label className="block text-sm font-semibold text-brand-blue mb-1 mr-1">
                      العنوان
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
                        className="glass-input w-full pl-4 pr-11 py-3 rounded-xl text-slate-800 placeholder-slate-400"
                        placeholder="المدينة / الشارع"
                      />
                    </div>
                  </div>

                  {/* زر الإرسال */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full relative overflow-hidden bg-sky-500 hover:bg-[#111c38] text-white font-bold py-3.5 rounded-xl shadow-[0_10px_20px_-10px_rgba(26,43,86,0.5)] transition-all duration-300 transform hover:-translate-y-1 group disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            جاري الحفظ...
                          </>
                        ) : (
                          <>
                            حفظ البيانات
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center animate-fadeIn">
                <div className="mb-6 animate-scaleIn">
                  <div className="w-20 h-20 bg-brand-gold rounded-full flex items-center justify-center shadow-lg border-4 border-white/50">
                    <Check className="w-10 h-10 text-brand-blue stroke-[3]" />
                  </div>
                </div>

                <h2 className="text-2xl font-extrabold text-brand-blue mb-2">
                  تم الحفظ بنجاح!
                </h2>
                <p className="text-slate-600 text-sm mb-6">
                  تم إضافة بيانات العميل إلى سجل SPIKELUBE بنجاح
                </p>

                <button
                  type="button"
                  onClick={handleReset}
                  className="text-brand-blue hover:text-brand-gold font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2 border border-brand-blue/20 hover:border-brand-gold/40"
                >
                  <Plus className="w-5 h-5" /> إضافة عميل جديد
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
