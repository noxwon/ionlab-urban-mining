export interface LeadPayload {
  name: string;
  org: string;
  email: string;
  type: string;
  note?: string;
  source?: string;
}

export interface SendEmailResult {
  success: boolean;
  id?: string;
  error?: string;
}

/**
 * 공통 리드 및 IR/데모 신청 이메일 전송 클라이언트 함수
 * Cloudflare Pages Function (/api/send-email)을 통해 보안 전송
 */
export async function sendLeadEmail(payload: LeadPayload): Promise<SendEmailResult> {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as { success?: boolean; id?: string; error?: string };

    if (response.ok && data.success) {
      return { success: true, id: data.id };
    }

    return {
      success: false,
      error: data.error || `서버 에러 응답 (${response.status})`,
    };
  } catch (err: unknown) {
    console.error("이메일 발송 요청 오류:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "네트워크 연결 중 오류가 발생했습니다.",
    };
  }
}
