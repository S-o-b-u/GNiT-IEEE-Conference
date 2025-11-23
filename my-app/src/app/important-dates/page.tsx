"use client";
import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock } from "lucide-react";
import type { ImportantDate } from "@shared/schema";
import { format, isPast, parseISO } from "date-fns";

export default function ImportantDatesPage() {
  const { data: dates, isLoading } = useQuery<ImportantDate[]>({
    queryKey: ["/api/important-dates"],
  });

  const sortedDates = dates ? [...dates].sort((a, b) => {
    try {
      return parseISO(a.date).getTime() - parseISO(b.date).getTime();
    } catch {
      return 0;
    }
  }) : [];

  return (
    <PageLayout>
      <div className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight font-heading sm:text-5xl mb-4" data-testid="text-page-title">
              Important Dates
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Mark these key deadlines and milestones in your calendar
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          ) : sortedDates.length > 0 ? (
            <div className="space-y-4">
              {sortedDates.map((dateItem) => {
                let isDatePast = false;
                let formattedDate = dateItem.date;

                try {
                  const parsedDate = parseISO(dateItem.date);
                  isDatePast = isPast(parsedDate);
                  formattedDate = format(parsedDate, "MMMM dd, yyyy");
                } catch {
                  // Keep original date string if parsing fails
                }

                return (
                  <Card
                    key={dateItem.id}
                    className={`hover-elevate transition-all ${isDatePast ? 'opacity-60' : 'border-l-4 border-l-primary'}`}
                    data-testid={`card-date-${dateItem.id}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex items-center gap-3 sm:min-w-[240px]">
                          <div className={`p-3 rounded-lg ${isDatePast ? 'bg-muted' : 'bg-primary/10'}`}>
                            <Calendar className={`h-5 w-5 ${isDatePast ? 'text-muted-foreground' : 'text-primary'}`} />
                          </div>
                          <div>
                            <p className={`text-sm font-semibold font-heading ${isDatePast ? 'text-muted-foreground' : 'text-foreground'}`} data-testid={`text-date-value-${dateItem.id}`}>
                              {formattedDate}
                            </p>
                            {isDatePast && (
                              <Badge variant="outline" className="mt-1 text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                Completed
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex-1">
                          <p className={`text-base ${isDatePast ? 'text-muted-foreground' : 'text-foreground font-medium'}`} data-testid={`text-date-description-${dateItem.id}`}>
                            {dateItem.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Important dates will be announced soon. Please check back later.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
