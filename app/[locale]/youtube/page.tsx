// app/[locale]/youtube/page.tsx
import { Header } from "@/components/layout/header";
import { YoutubeIntegrationContent } from "@/features/youtube/components/youtube-integration-content";

export default function YoutubeIntegrationPage() {
  return (
    <div>
      <Header/>
      <YoutubeIntegrationContent />
    </div>
  );
}
