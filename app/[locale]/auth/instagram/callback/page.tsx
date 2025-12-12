import GNB from "@/components/layout/GNB";
import { SocialCallbackContent } from "@/features/auth/components/social-callback-content";

export default function InstagramCallbackPage() {
  return (
    <div>
      <GNB />
      <SocialCallbackContent namespace="instagram.callbackPage" redirectPath="/instagram" />
    </div>
  );
}
