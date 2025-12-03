import { Header } from "@/components/layout/header";
import { SocialCallbackContent } from "@/features/auth/components/social-callback-content";

export default function InstagramCallbackPage() {
  return (
    <div>
      <Header />
      <SocialCallbackContent namespace="instagram.callbackPage" redirectPath="/instagram" />
    </div>
  );
}
