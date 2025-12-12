import GNB from "@/components/layout/GNB";
import { SocialCallbackContent } from "@/features/auth/components/social-callback-content";

export default function TiktokCallbackPage() {
  return (
    <div>
      <GNB />
      <SocialCallbackContent namespace="tiktok.callbackPage" redirectPath="/tiktok" />
    </div>
  );
}
