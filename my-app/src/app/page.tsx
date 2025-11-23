"use client";
import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "@/components/layout/PageLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { SpeakersSection } from "@/components/home/SpeakersSection";
import { ImportantDatesSection } from "@/components/home/ImportantDatesSection";
import { AboutSection } from "@/components/home/AboutSection";
import { Skeleton } from "@/components/ui/skeleton";
import type { GeneralSettings, Speaker, ImportantDate } from "@shared/schema";

export default function Home() {
  const { data: settings, isLoading: settingsLoading } = useQuery<GeneralSettings>({
    queryKey: ["/api/settings"],
  });

  const { data: speakers, isLoading: speakersLoading } = useQuery<Speaker[]>({
    queryKey: ["/api/speakers"],
  });

  const { data: dates, isLoading: datesLoading } = useQuery<ImportantDate[]>({
    queryKey: ["/api/important-dates"],
  });

  return (
    <PageLayout>
      {settingsLoading ? (
        <div className="py-20">
          <Skeleton className="h-64 w-full" />
        </div>
      ) : (
        <HeroSection
          eventTitle={settings?.eventTitle}
          eventSubtitle={settings?.eventSubtitle}
          eventDates={settings?.eventDates}
          eventLocation={settings?.eventLocation}
          eventMode={settings?.eventMode}
        />
      )}

      {speakersLoading ? (
        <div className="py-16">
          <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      ) : speakers && speakers.length > 0 ? (
        <SpeakersSection speakers={speakers} />
      ) : null}

      {datesLoading ? (
        <div className="py-16 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      ) : dates && dates.length > 0 ? (
        <ImportantDatesSection dates={dates} />
      ) : null}

      <AboutSection publicationInfo={settings?.publicationInfo} />
    </PageLayout>
  );
}