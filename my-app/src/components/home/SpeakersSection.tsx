import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Linkedin } from "lucide-react";
import type { Speaker } from "@shared/schema";

interface SpeakersSectionProps {
  speakers: Speaker[];
}

export function SpeakersSection({ speakers }: SpeakersSectionProps) {
  if (!speakers || speakers.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight font-heading sm:text-4xl mb-4" data-testid="text-speakers-heading">
            Keynote Speakers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Distinguished experts and thought leaders from around the world
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {speakers.map((speaker) => (
            <div key={speaker.id} className="flex-1 min-w-64 flex justify-center">
              <Card className="hover-elevate transition-shadow w-full max-w-sm" data-testid={`card-speaker-${speaker.id}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <Avatar className="h-40 w-40 border-4 border-border">
                      <AvatarImage src={speaker.imageUrl} alt={speaker.name} />
                      <AvatarFallback className="text-3xl font-semibold bg-primary/10 text-primary">
                        {speaker.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    
                    {speaker.title && (
                      <Badge variant="secondary" className="text-xs" data-testid={`badge-speaker-title-${speaker.id}`}>
                        {speaker.title}
                      </Badge>
                    )}

                    <div className="space-y-2 w-full">
                      <h3 className="text-xl font-semibold font-heading" data-testid={`text-speaker-name-${speaker.id}`}>
                        {speaker.name}
                      </h3>
                      <p className="text-sm font-medium text-primary" data-testid={`text-speaker-designation-${speaker.id}`}>
                        {speaker.designation}
                      </p>
                      <p className="text-sm text-muted-foreground" data-testid={`text-speaker-affiliation-${speaker.id}`}>
                        {speaker.affiliation}
                      </p>
                    </div>

                    {speaker.bio && (
                      <p className="text-sm text-muted-foreground leading-relaxed pt-2 border-t w-full" data-testid={`text-speaker-bio-${speaker.id}`}>
                        {speaker.bio}
                      </p>
                    )}

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
      </div>
    </section>
  );
}
