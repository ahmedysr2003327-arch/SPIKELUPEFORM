import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!scriptUrl) {
      return NextResponse.json(
        { success: false, error: 'لم يتم ضبط GOOGLE_SCRIPT_URL في .env.local' },
        { status: 500 }
      );
    }

    // تجهيز الحقول بالترتيب المطابق لـ Google Sheets
    const payload = {
      fullName: body.fullName || '',
      phone: body.phone || '',
      whatsapp: body.whatsapp || '',
      email: body.email || '',
      company: body.company || '',
      address: body.address || '',
    };

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });

    const resText = await response.text();

    let data;
    try {
      data = JSON.parse(resText);
    } catch {
      data = { result: 'success' };
    }

    if (data.result === 'success') {
      return NextResponse.json({ success: true, message: 'تم حفظ البيانات بنجاح' });
    } else {
      return NextResponse.json(
        { success: false, error: data.error || 'حدث خطأ داخل السكربت' },
        { status: 500 }
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