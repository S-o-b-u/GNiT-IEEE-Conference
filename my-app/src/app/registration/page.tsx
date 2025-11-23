"use client";
import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreditCard, CheckCircle2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { RegistrationFee } from "@/lib/db/schema";

export default function Registration() {
  const { data: fees, isLoading } = useQuery<RegistrationFee[]>({
    queryKey: ["/api/registration-fees"],
  });

  const sortedFees = fees
    ? [...fees].sort((a, b) => (a.order || 0) - (b.order || 0))
    : [];

  return (
    <PageLayout>
      <div className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1
              className="text-4xl font-bold tracking-tight font-heading sm:text-5xl mb-4"
              data-testid="text-page-title"
            >
              Registration
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Registration fees and payment information for ICETT-2026
            </p>
          </div>

          <div className="space-y-8">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important Notice</AlertTitle>
              <AlertDescription>
                At least one author of each accepted paper must register and
                attend the conference for the paper to be included in the
                proceedings.
              </AlertDescription>
            </Alert>

            {isLoading ? (
              <Card>
                <CardContent className="p-8">
                  <Skeleton className="h-64 w-full" />
                </CardContent>
              </Card>
            ) : sortedFees.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Registration Fees</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-semibold">
                            Category
                          </TableHead>
                          <TableHead className="font-semibold">
                            Indian Delegates
                          </TableHead>
                          <TableHead className="font-semibold">
                            International Delegates
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sortedFees.map((fee) => (
                          <TableRow
                            key={fee.id}
                            data-testid={`row-fee-${fee.id}`}
                          >
                            <TableCell
                              className="font-medium"
                              data-testid={`text-category-${fee.id}`}
                            >
                              {fee.category}
                            </TableCell>
                            <TableCell
                              data-testid={`text-indian-fee-${fee.id}`}
                            >
                              {fee.indianFee}
                            </TableCell>
                            <TableCell
                              data-testid={`text-international-fee-${fee.id}`}
                            >
                              {fee.internationalFee}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <CreditCard className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Registration fee details will be announced soon.
                  </p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Registration Includes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Access to all technical sessions and keynote presentations
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Conference kit including proceedings and materials
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Refreshments and lunch during conference days
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Certificate of participation
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Networking opportunities with researchers and industry
                      experts
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How to Register</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Registration will open once the paper acceptance notifications
                  are sent. Registered participants will receive a confirmation
                  email with payment instructions and further details about the
                  conference.
                </p>
                <div className="pt-4">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto"
                    data-testid="button-register-now"
                  >
                    Register Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
