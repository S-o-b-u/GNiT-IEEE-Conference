import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Video } from "lucide-react";
import Link from "next/link";

interface HeroSectionProps {
  eventTitle?: string;
  eventSubtitle?: string;
  eventDates?: string;
  eventLocation?: string;
  eventMode?: string;
}

export function HeroSection({
  eventTitle = "2nd International Conference on Emerging Trends in Technology",
  eventSubtitle = "Department of Computer Science and Engineering, GNIT",
  eventDates = "February 15-16, 2026",
  eventLocation = "Guru Nanak Institute of Technology",
  eventMode = "Hybrid Mode",
}: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/5 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28 lg:py-32 md:px-8 lg:px-12">
        <div className="text-center space-y-8">
          <div className="flex justify-center gap-3 flex-wrap">
            <Badge
              variant="secondary"
              className="px-4 py-1.5 text-sm font-medium"
              data-testid="badge-event-mode"
            >
              <Video className="h-4 w-4 mr-2" />
              {eventMode}
            </Badge>
            <Badge
              variant="outline"
              className="px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
              data-testid="badge-conference-type"
            >
              International Conference
            </Badge>
          </div>

          <div className="space-y-4">
            <h1
              className="text-4xl font-bold tracking-tight font-heading text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
              data-testid="text-hero-title"
            >
              {eventTitle}
            </h1>
            <p
              className="text-xl md:text-2xl text-muted-foreground font-medium"
              data-testid="text-hero-subtitle"
            >
              {eventSubtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-base md:text-lg">
            <div
              className="flex items-center gap-2 text-foreground font-medium"
              data-testid="text-event-dates"
            >
              <Calendar className="h-5 w-5 text-primary" />
              <span>{eventDates}</span>
            </div>
            <div className="hidden sm:block h-6 w-px bg-border"></div>
            <div
              className="flex items-center gap-2 text-foreground font-medium"
              data-testid="text-event-location"
            >
              <MapPin className="h-5 w-5 text-primary" />
              <span>{eventLocation}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/paper-submission">
              <Button
                size="lg"
                className="px-8 text-base"
                data-testid="button-submit-paper"
              >
                Submit Paper
              </Button>
            </Link>
            <Link href="/registration">
              <Button
                size="lg"
                variant="outline"
                className="px-8 text-base backdrop-blur-sm"
                data-testid="button-register"
              >
                Register Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
    </section>
  );
}
