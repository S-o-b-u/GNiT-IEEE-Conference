import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users } from "lucide-react";
import type { CommitteeMember } from "@shared/schema";

export default function Committee() {
  const { data: members, isLoading } = useQuery<CommitteeMember[]>({
    queryKey: ["/api/committee"],
  });

  const advisoryMembers = members?.filter(m => m.committeeType === "advisory") || [];
  const organizingMembers = members?.filter(m => m.committeeType === "organizing") || [];
  const tpcMembers = members?.filter(m => m.committeeType === "tpc") || [];

  const renderCommitteeSection = (title: string, committeeMembers: CommitteeMember[], testIdPrefix: string) => {
    if (committeeMembers.length === 0) return null;

    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-heading">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {committeeMembers.map((member) => (
              <Card key={member.id} className="hover-elevate transition-shadow" data-testid={`${testIdPrefix}-${member.id}`}>
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold font-heading text-lg" data-testid={`text-member-name-${member.id}`}>
                      {member.name}
                    </h3>
                    {member.designation && (
                      <p className="text-sm text-primary font-medium" data-testid={`text-member-designation-${member.id}`}>
                        {member.designation}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground" data-testid={`text-member-affiliation-${member.id}`}>
                      {member.affiliation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <PageLayout>
      <div className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Users className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight font-heading sm:text-5xl mb-4" data-testid="text-page-title">
              Committee
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the dedicated team behind ICETT-2026
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="p-8">
                    <Skeleton className="h-64 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {renderCommitteeSection("Advisory Committee", advisoryMembers, "card-advisory")}
              {renderCommitteeSection("Organizing Committee", organizingMembers, "card-organizing")}
              {renderCommitteeSection("Technical Program Committee", tpcMembers, "card-tpc")}

              {members && members.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Committee information will be available soon.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
