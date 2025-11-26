// --------------------
// 사용자 정보
// --------------------
export interface User {
  email: string;
  accountType: string;
  planType: string;
}

// --------------------
// 요청(Request)
// --------------------

// 아이디 중복 확인 요청
export interface EmailCheckRequest {
  identifier: string;
}

// 유저 로그인 요청
export interface LoginRequest {
  identifier: string;
  password: string;
}

// 유저 회원가입 요청
export interface SignupRequest {
  identifier: string;
  password: string;
}

// 유저 인증 번호 발급 요청
export interface CodeRequest {
  email: string;
}

// 유저 인증 번호 인증 요청
export interface VerificationRequest {
  email: string;
  code: string;
}

// 임시 비밀번호 발급 요청 타입
export interface PasswordResetRequest {
  email: string;
}

// 비밀번호 변경 요청 타입
export interface PasswordChangeRequest {
  oldPassword: string;
  newPassword: string;
}

// --------------------
// 응답(Response)
// --------------------

// 로그인 / 회원가입 / 토큰 재발급 응답
export interface LoginResponse {
  accessToken: string;
  accountType: string;
  planType: string;
}

// 임시 비밀번호 발급 응답
export interface VerificationCodeData {
  code: number;
}
