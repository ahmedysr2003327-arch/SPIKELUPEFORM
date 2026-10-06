import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. قراءة متغير البيئة (يدعم الإثنين في حال التغيير مستقبلاً)
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL || process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

    if (!scriptUrl) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'لم يتم العثور على رابط Google Script في متغيرات البيئة (GOOGLE_SCRIPT_URL)' 
        },
        { status: 500 }
      );
    }

    // 2. تجهيز البيانات المطلوبة (تمت إضافة businessType و notes هنا)
    const payload = {
      fullName: body.fullName || '',
      phone: body.phone || '',
      whatsapp: body.whatsapp || '',
      businessType: body.businessType || '', // <-- حقل طبيعة العمل
      email: body.email || '',
      company: body.company || '',
      address: body.address || '',
      notes: body.notes || '',               // <-- حقل الملاحظات
    };

    // 3. إرسال الطلب إلى Google Apps Script
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
      cache: 'no-store', // منع Next.js من عمل Cache للطلب
    });

    if (!response.ok) {
      throw new Error(`فشل الاتصال بـ Google Script (رمز الحالة: ${response.status})`);
    }

    const resText = await response.text();

    // 4. معالجة الرد القادم من Google Apps Script
    let data;
    try {
      data = JSON.parse(resText);
    } catch {
      // إذا كان الرد ليس JSON ولكنه أرجع نصاً ناجحاً
      data = { result: resText.includes('Error') ? 'error' : 'success' };
    }

    if (data.result === 'success' || data.status === 'success') {
      return NextResponse.json({ 
        success: true, 
        message: 'تم حفظ البيانات بنجاح' 
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: data.error || data.message || 'حدث خطأ أثناء حفظ البيانات في Google Sheets' 
        },
        { status: 400 }
      );
    }

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'تعذر الاتصال بالسيرفر';

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}