import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Award, Globe } from "lucide-react";

interface AboutSectionProps {
  publicationInfo?: string;
}

export function AboutSection({ publicationInfo }: AboutSectionProps) {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight font-heading sm:text-4xl mb-4" data-testid="text-about-heading">
                About the Conference
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  The 2nd International Conference on Emerging Trends in Technology (ICETT-2026) 
                  serves as a premier platform for researchers, academics, and industry professionals 
                  to present their latest research findings and innovations.
                </p>
                <p className="mt-4">
                  This conference aims to foster collaboration, knowledge exchange, and networking 
                  among participants from diverse backgrounds, promoting advancements in computer 
                  science and engineering.
                </p>
              </div>
            </div>

            {publicationInfo && (
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Publication Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-publication-info">
                    {publicationInfo}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="hover-elevate transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-heading">Expert Speakers</h3>
                  <p className="text-sm text-muted-foreground">
                    Renowned researchers and industry leaders sharing their insights
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-heading">Global Network</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect with peers and experts from around the world
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-heading">Quality Publications</h3>
                  <p className="text-sm text-muted-foreground">
                    Peer-reviewed proceedings in prestigious journals
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold font-heading">Best Paper Awards</h3>
                  <p className="text-sm text-muted-foreground">
                    Recognition for outstanding research contributions
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
