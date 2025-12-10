"use client";

import { useRouter } from "next/navigation";

interface LocaleParams {
  params: { locale: "ko" | "en" };
}

export default function PrivacyPage({ params }: LocaleParams) {
  const router = useRouter();
  const { locale } = params;

  return (
    <div role="main">
      {/* Header */}
      <header className="w-full border-b border-neutral-200 bg-white sticky top-0 z-50 flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2"></div>
        <h2 className="text-sm font-medium">
          {locale === "ko" ? "개인정보처리방침 (전문)" : "Privacy Policy"}
        </h2>
        <button
          onClick={() => router.push(`/${locale}`)}
          aria-label={locale === "ko" ? "홈으로 이동" : "Go to Home"}
          className="flex items-center gap-1 text-sm text-neutral-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 26 26"
            fill="none"
          >
            <path
              d="M12.9997 13.8666V22.5332M12.9997 3.8999L4.33301 10.4604V22.5332H21.6663V10.672L12.9997 3.8999Z"
              stroke="black"
            />
          </svg>
        </button>
      </header>

      {/* Content */}
      <main className="flex justify-center px-4 py-10">
        <section className="w-full max-w-[780px] text-[13px] leading-relaxed text-neutral-800">
          {locale === "ko" ? <KoreanPrivacy /> : <EnglishPrivacy />}
        </section>
      </main>
    </div>
  );
}

function KoreanPrivacy() {
  return (
    <div className="clause__paragraph">
      <p className="mb-6">
        <strong>리로드(LeeLoad)</strong> (이하 “회사”)는 이용자의 개인정보를 중요시하며, 「개인정보
        보호법」 및 관련 법령을 준수합니다. 본 개인정보처리방침은 회사가 운영하는 웹사이트 및
        서비스(이하 “서비스”) 이용과 관련하여 개인정보의 수집, 이용, 보관, 파기에 관한 내용을
        명시합니다.
      </p>

      <p className="mb-4 text-[15px] font-semibold">1. 적용 범위</p>
      <p>
        본 개인정보 처리방침은 대한민국 법령(개인정보 보호법, 정보통신망법 등)을 우선적으로
        따릅니다.
      </p>
      <p>
        다만, 서비스 이용자가 유럽연합(EU), 미국 캘리포니아주 등 개인정보 보호 관련 법령이 강화된
        국가/지역에서 서비스를 이용하는 경우, 해당 지역 법령(GDPR, CCPA 등)에 따른 추가적인 권리
        보장 및 절차가 적용될 수 있습니다.
      </p>

      <p className="mt-6 mb-4 text-[15px] font-semibold">2. 수집하는 개인정보 항목</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>회원가입/로그인: 이메일 주소, 비밀번호</li>
        <li>
          유료 서비스 결제 시:
          <p>
            - 결제 수단 정보: 카드사명, 카드번호 일부(일부 결제 수단에 한함), 휴대폰 번호, 통신사
            정보, 계좌 이체 정보 등
          </p>
          <p>- 결제 승인 정보: 결제 금액, 거래 일시, 승인번호</p>
          <p>- 결제/정기결제 운영 정보: 결제 ID, 결제용 토큰(빌링키), 구독 상태, 갱신/해지 기록</p>
        </li>
        <li>
          금융정보 직접 저장 불가 안내:
          <p>
            ※ 회사는 신용카드 번호 전체, 유효기간, CVC/CVV, 은행 계좌번호 등 결제 관련 민감한
            금융정보를 직접 저장하지 않습니다.
          </p>
          <p>
            모든 결제는 결제대행사(PG사)의 암호화된 시스템을 통해 처리되며, 회사는 PG사가 제공하는
            결제 승인 정보, 거래 ID, 결제용 토큰(빌링키) 등 서비스 운영에 필요한 최소한의 정보만
            보관합니다.
          </p>
        </li>
        <li>
          SNS API 연동:
          <p>- 프로필 정보: 사용자 ID, 계정명, 프로필 이미지, 액세스 토큰</p>
          <p>- 콘텐츠/데이터: 게시글, 동영상, 이미지, 댓글</p>
          <p>- 통계 정보: 조회수, 좋아요, 댓글 수, 공유 수 등</p>
        </li>
        <li>서비스 이용 중 자동 수집: IP 주소, 브라우저/OS 정보, 쿠키·세션, 서비스 이용 로그</li>
      </ul>

      <p className="mt-6 mb-4 text-[15px] font-semibold">3. 개인정보 이용 목적</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>회원 식별 및 계정 관리</li>
        <li>유료 서비스 제공에 따른 요금 정산, 결제 및 환불 처리</li>
        <li>구매/결제 기록 및 증빙 자료 보관 (세법 및 전자상거래법 준수)</li>
        <li>SNS 통합 관리 기능 제공</li>
        <li>분석 및 인사이트 제공</li>
        <li>서비스 운영 및 고객 지원</li>
        <li>법적 의무 준수</li>
        <li>마케팅 및 광고에 이용</li>
      </ul>

      <p className="mt-6 mb-4 text-[15px] font-semibold">4. 보관 및 파기</p>
      <p>회원 탈퇴 또는 목적 달성 시 지체 없이 파기합니다.</p>
      <p>이용자는 다음과 같은 권리를 행사할 수 있습니다:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>개인정보 열람요구</li>
        <li>오류 등의 정정 요구</li>
        <li>삭제 요구</li>
        <li>처리정지 요구</li>
      </ul>
      <p>법령에 따라 일정 기간 보관할 수 있습니다.</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>계약/청약철회 기록: 5년</li>
        <li>결제/재화 공급 기록: 5년</li>
        <li>소비자 불만/분쟁 기록: 3년</li>
        <li>접속 로그: 3개월</li>
      </ul>
      <p>전자금융거래법 준수 안내:</p>
      <p>
        회사는 전자금융거래법에 따라 <strong>결제·거래 기록을 5년간 보관</strong>하며, 이용자는 해당
        기록의 열람을 요청할 수 있습니다.
      </p>
      <p>
        ※ 단, 단, 회사는 서비스 개선 및 통계·분석 목적으로 개인 식별이 불가능한 가명·익명 정보는
        회원 탈퇴 이후에도 보관·활용할 수 있습니다.
      </p>

      <p className="mt-6 mb-4 text-[15px] font-semibold">5. 개인정보 처리 위탁</p>
      <p>회사는 서비스 운영을 위해 다음과 같이 개인정보 처리를 위탁할 수 있습니다.</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>클라우드 인프라 (AWS, Azure, GCP) → 데이터 보관/시스템 운영</li>
        <li>결제대행사(PG사) – PayPal: 신용카드·계좌이체 등 결제 처리, 승인 및 정기 결제 운영</li>
        <li>메시지 발송 서비스 → 이메일, 푸시 알림 발송</li>
        <li>데이터 분석 서비스 → 서비스 이용 패턴 분석</li>
      </ul>

      <p className="mt-6 mb-4 text-[15px] font-semibold">6. 개인정보 국외 이전</p>
      <p>개인정보는 글로벌 클라우드 서버(미국, 일본, 싱가포르 등)에 이전될 수 있습니다.</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          이전 항목: 계정 정보, 서비스 로그, 연동된 SNS 데이터,{" "}
          <strong>결제 승인 정보(결제 시스템 위탁 시)</strong>
        </li>
        <li>이전 국가: 미국, 일본, 싱가포르</li>
        <li>이전 방법: SSL/TLS 기반 암호화 통신</li>
        <li>이전 목적: 데이터 보관 및 운영</li>
      </ul>
      <p>
        <strong>
          또한 유료 서비스 결제 제공을 위해 아래와 같이 개인정보가 국외로 이전될 수 있습니다.
        </strong>
      </p>

      <p className="mt-5 text-[14px] font-semibold">▸ PayPal Holdings, Inc. (미국)</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>이전 항목: 결제 승인 정보, 거래 ID, 이메일, IP, 결제 토큰 등</li>
        <li>이전 목적: 결제 처리 및 정기결제 운영</li>
        <li>이전 방법: SSL/TLS 암호화 전송</li>
      </ul>

      <p className="mt-6 mb-4 text-[15px] font-semibold">7. 쿠키 및 추적 기술</p>
      <p>쿠키를 통해 로그인 세션 유지, 맞춤형 콘텐츠 제공, 광고 효율 측정 등을 수행합니다.</p>
      <p>
        브라우저 설정을 통해 쿠키 저장을 거부하거나 삭제할 수 있으며, 이 경우 일부 서비스 이용에
        제한이 있을 수 있습니다.
      </p>

      <p className="mt-6 mb-4 text-[15px] font-semibold">8. 개인정보 보호 조치</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>비밀번호 암호화 저장</li>
        <li>SSL/TLS 암호화 통신 적용</li>
        <li>접근 권한 최소화</li>
        <li>정기적인 보안 점검</li>
        <li>임직원 보안 교육 강화</li>
      </ul>

      <p className="mt-6 mb-4 text-[15px] font-semibold">9. 이용자의 권리</p>
      <p>이용자는 언제든 개인정보 열람, 정정, 삭제, 처리 정지, 회원 탈퇴를 요청할 수 있습니다.</p>

      <p className="mt-5 mb-5">
        <strong>유료 서비스 이용자는 결제 및 구매 내역 열람·정정을 요청할 수 있습니다.</strong>
      </p>

      <p className="text-[14px] font-semibold">정기결제(구독 서비스) 이용자의 추가 권리</p>
      <p>
        이용자는 구독 서비스의 자동 갱신을 원하지 않을 경우
        <strong>서비스 내 ‘구독 해지’ 기능</strong>을 통해 언제든지 자동결제를 중단할 수 있습니다.
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>해지 요청 시 즉시 처리됩니다.</li>
        <li>다음 결제일부터 자동결제가 진행되지 않습니다.</li>
        <li>이미 결제된 금액의 환불은 관련 법령 및 회사 환불 정책에 따라 처리됩니다.</li>
        <li>EU 이용자(GDPR): 열람권, 삭제권, 이동권, 처리 제한권 등 보장</li>
        <li>미국 캘리포니아 이용자(CCPA): 개인정보 판매 거부권, 열람·삭제 요청권 보장</li>
      </ul>

      <p className="mt-6 mb-4 text-[15px] font-semibold">10. 제3자 제공</p>
      <p>회사는 원칙적으로 개인정보를 제3자에게 제공하지 않습니다.</p>
      <p>다만 법령에 따라 수사기관이나 법원의 요청이 있는 경우 예외적으로 제공할 수 있습니다.</p>

      <p className="mt-6 mb-4 text-[15px] font-semibold">11. 준거법 및 관할권</p>
      <p>본 방침은 대한민국 법률을 우선 적용합니다.</p>
      <p>해외 이용자에게는 해당 지역의 법률(GDPR, CCPA 등)에 따른 추가 권리가 보장됩니다.</p>
      <p>분쟁 발생 시 회사 본사 소재지를 관할하는 법원을 제1심 관할 법원으로 합니다.</p>

      <p className="mt-6 mb-4 text-[15px] font-semibold">12. 개인정보 처리방침의 변경 및 고지</p>
      <p>회사는 법령 개정 또는 서비스 정책 변경 시 개인정보 처리방침을 수정할 수 있습니다.</p>
      <p>개정 시 홈페이지 공지를 통해 이용자가 변경 내용을 쉽게 확인할 수 있도록 안내합니다.</p>

      <p className="mt-6 mb-4 text-[15px] font-semibold">13. 개인정보 보호 책임자</p>
      <table className="w-full border border-neutral-300 text-[13px]">
        <tbody>
          <tr className="border-b border-neutral-300">
            <td className="p-2 w-1/3 font-semibold">책임자</td>
            <td className="p-2">이승렬</td>
          </tr>
          <tr className="border-b border-neutral-300">
            <td className="p-2">이메일</td>
            <td className="p-2">
              <a href="mailto:admin@postio.site" className="text-blue-600 underline">
                admin@postio.site
              </a>
            </td>
          </tr>
          <tr>
            <td className="p-2">주소</td>
            <td className="p-2">서울특별시 동일로 227길 25 1109동 905호</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function EnglishPrivacy() {
  return (
    <div className="clause__paragraph">
      <h1 className="text-[15px] font-semibold mb-2">Privacy Policy</h1>

      <h2 className="mt-4 font-semibold">1. Scope of Application</h2>
      <p>
        This Privacy Policy is primarily governed by the laws of the Republic of Korea (e.g., the
        Personal Information Protection Act and the Act on Promotion of Information and
        Communications Network Utilization).
      </p>
      <p>
        However, if you access our services from jurisdictions with enhanced data protection
        regulations—such as the European Union (under GDPR) or the State of California (under
        CCPA)—you may be entitled to additional rights and protections in accordance with those
        local laws.
      </p>

      <h2 className="mt-6 font-semibold">2. Personal Data We Collect</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <strong>Sign-up/Login:</strong> Email address, password
        </li>
        <li>
          <strong>SNS API Integration:</strong>
          <ul className="list-disc pl-5 space-y-1">
            <li>Profile Information: User ID, account name, profile image, access token</li>
            <li>Content/Data: Posts, videos, images, comments</li>
            <li>Analytics: Views, likes, comments, shares, and related engagement metrics</li>
          </ul>
        </li>
        <li>
          <strong>Automatically Collected Data:</strong> IP address, browser/OS information, cookies
          and session data, service usage logs
        </li>
      </ul>

      <h2 className="mt-6 font-semibold">3. Purpose of Use</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>User identification and account management</li>
        <li>Providing integrated SNS management features</li>
        <li>Delivering analytics and insights</li>
        <li>Service operation and customer support</li>
        <li>Compliance with legal obligations</li>
        <li>Marketing and advertising purposes</li>
      </ul>

      <h2 className="mt-6 font-semibold">4. Retention and Deletion</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          We promptly delete personal data once its purpose has been fulfilled or upon account
          deletion.
        </li>
        <li>
          Users may request:
          <ul className="list-disc pl-5">
            <li>Access to their personal data</li>
            <li>Correction of inaccuracies</li>
            <li>Deletion of data</li>
            <li>Suspension of processing</li>
          </ul>
        </li>
        <li>
          Certain records may be retained as required by law:
          <ul className="list-disc pl-5">
            <li>Contract and cancellation records: 5 years</li>
            <li>Payment and supply records: 5 years</li>
            <li>Consumer complaints and dispute records: 3 years</li>
            <li>Access logs: 3 months</li>
          </ul>
        </li>
        <li>
          Data that has been <strong>pseudonymized or anonymized</strong> so that individuals cannot
          be identified may continue to be retained and used for service improvement, analytics, and
          statistical purposes.
        </li>
      </ul>

      <h2 className="mt-6 font-semibold">5. Outsourcing of Personal Data Processing</h2>
      <p>
        We may entrust the processing of personal data to trusted third-party service providers,
        including but not limited to:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Cloud infrastructure (AWS, Azure, GCP) → Data storage and system operation</li>
        <li>Messaging services → Email and push notifications</li>
        <li>Data analytics services → Usage pattern analysis</li>
      </ul>

      <h2 className="mt-6 font-semibold">6. Cross-Border Data Transfers</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Data Transferred: Account information, service logs, linked SNS data</li>
        <li>Destination Countries: United States, Japan, Singapore</li>
        <li>Method: Secure transfer using encryption (SSL/TLS)</li>
        <li>Purpose: Data storage and system operation</li>
        <li>Recipients: AWS, Microsoft, Google, and similar providers</li>
      </ul>

      <h2 className="mt-6 font-semibold">7. Cookies and Tracking Technologies</h2>
      <p>
        We use cookies to maintain login sessions, provide personalized content, and measure
        advertising effectiveness. You can manage or disable cookies through your browser settings.
        Please note, however, that some features of the service may not function properly if cookies
        are disabled.
      </p>

      <h2 className="mt-6 font-semibold">8. Data Protection Measures</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Passwords are stored in encrypted form</li>
        <li>Communications are secured with SSL/TLS encryption</li>
        <li>Access rights are strictly limited</li>
        <li>Regular security checks and employee training are conducted</li>
      </ul>

      <h2 className="mt-6 font-semibold">9. User Rights</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <strong>EU Users (GDPR):</strong> Right of access, right to erasure, right to data
          portability, right to restrict processing, right to object to automated decision-making
        </li>
        <li>
          <strong>California Users (CCPA):</strong> Right to opt out of the sale of personal data,
          right to access, and right to deletion
        </li>
      </ul>

      <h2 className="mt-6 font-semibold">10. Disclosure to Third Parties</h2>
      <p>
        We do not share personal data with third parties except when required by law or upon lawful
        request by investigative authorities or courts.
      </p>

      <h2 className="mt-6 font-semibold">11. Governing Law and Jurisdiction</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>This Privacy Policy is primarily governed by the laws of the Republic of Korea.</li>
        <li>
          For overseas users, additional rights under local laws (e.g., GDPR, CCPA) will also apply.
        </li>
        <li>
          In case of disputes, the court with jurisdiction over our company’s principal office shall
          be the court of first instance.
        </li>
      </ul>

      <h2 className="mt-6 font-semibold">12. Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time in accordance with changes in laws,
        regulations, or company practices. In the event of significant changes, we will notify users
        via our website and ensure that updated terms are easily accessible.
      </p>

      <h2 className="mt-6 font-semibold">13. Contact Information</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <strong>Data Protection Officer:</strong> Seung Ryeol Lee
        </li>
        <li>
          <strong>Email:</strong>{" "}
          <a href="mailto:admin@postio.site" className="text-blue-600 underline">
            admin@postio.site
          </a>
        </li>
        <li>
          <strong>Address:</strong> #905, Building 1109, 25, Dongil-ro 227-gil, Seoul, Republic of
          Korea
        </li>
      </ul>
    </div>
  );
}
