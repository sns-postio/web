import { SocialCallbackContent } from "@/features/auth/components/social-callback-content";

export default function InstagramCallbackPage() {
  return <SocialCallbackContent namespace="instagram.callbackPage" redirectPath="/instagram" />;
}
