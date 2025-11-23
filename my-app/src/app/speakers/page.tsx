import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Mic, Linkedin } from "lucide-react";
import type { Speaker } from "@shared/schema";

export default function Speakers() {
  const { data: speakers, isLoading } = useQuery<Speaker[]>({
    queryKey: ["/api/speakers"],
  });

  return (
    <PageLayout>
      <div className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Mic className="h-8 w-8 text-primary" />
              </div>
            </div>

            <h1
              className="text-4xl font-bold tracking-tight font-heading sm:text-5xl mb-4"
              data-testid="text-page-title"
            >
              Keynote Speakers
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Distinguished experts and thought leaders from around the world
            </p>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex flex-wrap justify-center gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-full md:w-1/2 lg:w-1/3 flex justify-center"
                >
                  <Card>
                    <CardContent className="p-6 w-full max-w-sm">
                      <Skeleton className="h-64 w-full" />
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : speakers && speakers.length > 0 ? (
            /* Speakers List */
            <div className="flex flex-wrap justify-center gap-8">
              {speakers.map((speaker) => (
                <div
                  key={speaker.id}
                  className="w-full md:w-1/2 lg:w-1/3 flex justify-center"
                >
                  <Card
                    className="hover-elevate transition-shadow w-full max-w-sm"
                    data-testid={`card-speaker-${speaker.id}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center space-y-4">
                        {/* Avatar */}
                        <Avatar className="h-48 w-48 border-4 border-border">
                          <AvatarImage
                            src={speaker.imageUrl}
                            alt={speaker.name}
                          />
                          <AvatarFallback className="text-4xl font-semibold bg-primary/10 text-primary">
                            {speaker.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>

                        {/* Title */}
                        {speaker.title && (
                          <Badge
                            variant="secondary"
                            className="text-xs"
                            data-testid={`badge-speaker-title-${speaker.id}`}
                          >
                            {speaker.title}
                          </Badge>
                        )}

                        {/* Info */}
                        <div className="space-y-2 w-full">
                          <h3
                            className="text-xl font-semibold font-heading"
                            data-testid={`text-speaker-name-${speaker.id}`}
                          >
                            {speaker.name}
                          </h3>

                          <p
                            className="text-sm font-medium text-primary"
                            data-testid={`text-speaker-designation-${speaker.id}`}
                          >
                            {speaker.designation}
                          </p>

                          <p
                            className="text-sm text-muted-foreground"
                            data-testid={`text-speaker-affiliation-${speaker.id}`}
                          >
                            {speaker.affiliation}
                          </p>
                        </div>

                        {/* Bio */}
                        {speaker.bio && (
                          <p
                            className="text-sm text-muted-foreground leading-relaxed pt-2 border-t w-full"
                            data-testid={`text-speaker-bio-${speaker.id}`}
                          >
                            {speaker.bio}
                          </p>
                        )}

                        {/* LinkedIn */}
                        {speaker.linkedinUrl && (
                          <a
                            href={speaker.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors"
                            data-testid={`link-speaker-linkedin-${speaker.id}`}
                            aria-label={`${speaker.name}'s LinkedIn profile`}
                          >
                            <Linkedin className="h-5 w-5 text-primary hover:text-primary/80 transition-colors" />
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <Card>
              <CardContent className="p-12 text-center">
                <Mic className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Keynote speakers will be announced soon. Please check back
                  later.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
