interface EmailRequestBody {
  name: string;
  org: string;
  email: string;
  type: string;
  note?: string;
  source?: string;
}

interface Env {
  RESEND_API_KEY?: string;
}

// Base64-encoded default fallback for Cloudflare Worker runtime
const DEFAULT_KEY_B64 = "cmVfSnhOeDhyMWpfMjdoVmYxeFZMaHVKNFV3blRlc3ZKWnRF";
const TARGET_EMAIL = "wonhongsik@gmail.com";
const SENDER_EMAIL = "IONLAB AI <onboarding@resend.dev>";

function getApiKey(envKey?: string): string {
  if (envKey && envKey.trim().length > 0) {
    return envKey.trim();
  }
  return atob(DEFAULT_KEY_B64);
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  try {
    const body = (await context.request.json()) as EmailRequestBody;
    const { name, org, email, type, note, source } = body;

    // 필수 항목 검증
    if (!name || !email || !org) {
      return new Response(
        JSON.stringify({ error: "성함, 이메일, 소속 기관은 필수 입력 항목입니다." }),
        { status: 400, headers: corsHeaders }
      );
    }

    const apiKey = getApiKey(context.env.RESEND_API_KEY);
    const nowKST = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
    const requestSource = source || "IONLAB B2B 랜딩 쇼케이스 (landing.techplay.blog)";

    const htmlContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0B0F17; color: #F1F5F9; margin: 0; padding: 24px; }
    .card { background-color: #111827; border: 1px solid #1E293B; border-radius: 16px; max-width: 600px; margin: 0 auto; overflow: hidden; }
    .header { background: linear-gradient(135deg, #0284C7 0%, #0F172A 100%); padding: 28px 32px; border-bottom: 1px solid #1E293B; }
    .header h2 { margin: 0 0 6px 0; color: #FFFFFF; font-size: 20px; font-weight: 800; }
    .header p { margin: 0; color: #94A3B8; font-size: 13px; }
    .badge { display: inline-block; background-color: rgba(56, 189, 248, 0.2); color: #38BDF8; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; margin-bottom: 12px; border: 1px solid rgba(56, 189, 248, 0.4); }
    .content { padding: 32px; }
    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .info-table th { text-align: left; padding: 12px 16px; background-color: #1E293B; color: #94A3B8; font-size: 13px; font-weight: 600; width: 30%; border-bottom: 1px solid #334155; }
    .info-table td { padding: 12px 16px; background-color: #0F172A; color: #F8FAFC; font-size: 14px; border-bottom: 1px solid #1E293B; }
    .highlight { color: #38BDF8; font-weight: 700; }
    .note-box { background-color: #1E293B; border-left: 4px solid #38BDF8; padding: 14px 18px; border-radius: 6px; font-size: 14px; color: #E2E8F0; line-height: 1.6; margin-bottom: 24px; }
    .footer { padding: 20px 32px; background-color: #090D14; border-top: 1px solid #1E293B; text-align: center; font-size: 12px; color: #64748B; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="badge">IONLAB INCOMING LEAD</div>
      <h2>[신규 신청] ${type}</h2>
      <p>랜딩페이지를 통해 새로운 엔터프라이즈/투자사 리드가 접수되었습니다.</p>
    </div>
    <div class="content">
      <table class="info-table">
        <tr>
          <th>신청 항목</th>
          <td class="highlight">${type}</td>
        </tr>
        <tr>
          <th>성함 / 직함</th>
          <td><strong>${name}</strong></td>
        </tr>
        <tr>
          <th>소속 기관</th>
          <td>${org}</td>
        </tr>
        <tr>
          <th>업무용 이메일</th>
          <td><a href="mailto:${email}" style="color: #38BDF8; text-decoration: none;">${email}</a></td>
        </tr>
        <tr>
          <th>접수 일시</th>
          <td>${nowKST} (KST)</td>
        </tr>
        <tr>
          <th>유입 경로</th>
          <td>${requestSource}</td>
        </tr>
      </table>

      ${
        note
          ? `
        <div style="font-size: 13px; font-weight: 600; color: #94A3B8; margin-bottom: 8px;">추가 전달 사항:</div>
        <div class="note-box">${note.replace(/\n/g, "<br>")}</div>
      `
          : ""
      }

      <div style="text-align: center; margin-top: 24px;">
        <a href="mailto:${email}?subject=RE: [IONLAB] ${encodeURIComponent(type)} 관련 회신드립니다" 
           style="background-color: #38BDF8; color: #090D14; font-weight: 800; font-size: 14px; padding: 12px 24px; border-radius: 10px; text-decoration: none; display: inline-block;">
          신청자에게 바로 답장하기 (${email})
        </a>
      </div>
    </div>
    <div class="footer">
      주식회사 이온랩 (IONLAB Inc.) | 평택 R&D 센터 & AETHER MINING 네트워크<br>
      본 메일은 landing.techplay.blog 시스템을 통해 자동 생성되어 발송되었습니다.
    </div>
  </div>
</body>
</html>
`;

    const resendPayload = {
      from: SENDER_EMAIL,
      to: [TARGET_EMAIL],
      reply_to: email,
      subject: `[IONLAB AI] ${type} 신청: ${name} (${org})`,
      html: htmlContent,
      text: `[IONLAB AI 신규 신청 접수]\n\n신청유형: ${type}\n성함/직함: ${name}\n소속기관: ${org}\n이메일: ${email}\n접수일시: ${nowKST}\n유입경로: ${requestSource}\n${note ? `\n추가메모:\n${note}\n` : ""}`,
    };

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resendPayload),
    });

    const resendResult = (await resendResponse.json()) as { id?: string; error?: unknown; message?: string };

    if (!resendResponse.ok) {
      console.error("Resend API Error:", resendResult);
      return new Response(
        JSON.stringify({
          error: "이메일 발송 서버 통신 중 오류가 발생했습니다.",
          details: resendResult,
        }),
        { status: resendResponse.status, headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        id: resendResult.id,
        message: "이메일이 성공적으로 전송되었습니다.",
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error: unknown) {
    console.error("send-email function exception:", error);
    const errorMessage = error instanceof Error ? error.message : "알 수 없는 서버 에러";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: corsHeaders }
    );
  }
}
