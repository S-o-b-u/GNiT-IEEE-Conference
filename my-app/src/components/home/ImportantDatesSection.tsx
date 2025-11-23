import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import type { ImportantDate } from "@/lib/db/schema";
import { format, isPast, parseISO } from "date-fns";

interface ImportantDatesSectionProps {
  dates: ImportantDate[];
}

export function ImportantDatesSection({ dates }: ImportantDatesSectionProps) {
  if (!dates || dates.length === 0) {
    return null;
  }

  const sortedDates = [...dates].sort((a, b) => {
    try {
      return parseISO(a.date).getTime() - parseISO(b.date).getTime();
    } catch {
      return 0;
    }
  });

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="text-center mb-12">
          <h2
            className="text-3xl font-bold tracking-tight font-heading sm:text-4xl mb-4"
            data-testid="text-dates-heading"
          >
            Important Dates
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mark your calendar with these key deadlines and milestones
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {sortedDates.map((dateItem, index) => {
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
                className={`hover-elevate transition-all ${
                  isDatePast ? "opacity-60" : "border-l-4 border-l-primary"
                }`}
                data-testid={`card-date-${dateItem.id}`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-3 sm:min-w-[240px]">
                      <div
                        className={`p-3 rounded-lg ${
                          isDatePast ? "bg-muted" : "bg-primary/10"
                        }`}
                      >
                        <Calendar
                          className={`h-5 w-5 ${
                            isDatePast
                              ? "text-muted-foreground"
                              : "text-primary"
                          }`}
                        />
                      </div>
                      <div>
                        <p
                          className={`text-sm font-semibold font-heading ${
                            isDatePast
                              ? "text-muted-foreground"
                              : "text-foreground"
                          }`}
                          data-testid={`text-date-value-${dateItem.id}`}
                        >
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
                      <p
                        className={`text-base ${
                          isDatePast
                            ? "text-muted-foreground"
                            : "text-foreground font-medium"
                        }`}
                        data-testid={`text-date-description-${dateItem.id}`}
                      >
                        {dateItem.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
