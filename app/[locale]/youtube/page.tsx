// app/[locale]/youtube/page.tsx
import GNB from "@/components/layout/GNB";
import { YoutubeIntegrationContent } from "@/features/youtube/components/youtube-integration-content";

export default function YoutubeIntegrationPage() {
  return (
    <div>
      <GNB/>
      <YoutubeIntegrationContent />
    </div>
  );
}
