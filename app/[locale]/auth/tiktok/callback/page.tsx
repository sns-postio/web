import { Header } from "@/components/layout/header";
import { SocialCallbackContent } from "@/features/auth/components/social-callback-content";

export default function TiktokCallbackPage() {
  return (
    <div>
      <Header />
      <SocialCallbackContent namespace="tiktok.callbackPage" redirectPath="/tiktok" />
    </div>
  );
}
