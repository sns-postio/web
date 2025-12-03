import { SocialCallbackContent } from "@/features/auth/components/social-callback-content";

export default function YoutubeCallbackPage() {
  return <SocialCallbackContent namespace="youtube.callbackPage" redirectPath="/youtube" />;
}
