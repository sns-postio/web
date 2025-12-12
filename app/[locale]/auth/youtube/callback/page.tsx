import GNB from "@/components/layout/GNB";
import { SocialCallbackContent } from "@/features/auth/components/social-callback-content";

export default function YoutubeCallbackPage() {
  return (
    <div>
      <GNB/>
      <SocialCallbackContent namespace="youtube.callbackPage" redirectPath="/youtube" />
    </div>
  );
}
