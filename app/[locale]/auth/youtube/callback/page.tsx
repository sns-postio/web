import { Header } from "@/components/layout/header";
import { SocialCallbackContent } from "@/features/auth/components/social-callback-content";

export default function YoutubeCallbackPage() {
  return (
    <div>
      <Header/>
      <SocialCallbackContent namespace="youtube.callbackPage" redirectPath="/youtube" />
    </div>
  );
}
