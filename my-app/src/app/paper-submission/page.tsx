"use client";
import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Upload, ExternalLink, AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { PageContent } from "@shared/schema";

export default function PaperSubmission() {
  const { data: content, isLoading } = useQuery<PageContent>({
    queryKey: ["/api/page-content", "paper-submission"],
  });

  return (
    <PageLayout>
      <div className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <Upload className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight font-heading sm:text-5xl mb-4" data-testid="text-page-title">
              {content?.title || "Paper Submission"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Submit your research paper through our online submission portal
            </p>
          </div>

          {isLoading ? (
            <Card>
              <CardContent className="p-8">
                <Skeleton className="h-96 w-full" />
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Before You Submit</AlertTitle>
                <AlertDescription>
                  Please ensure your paper follows all formatting guidelines and is prepared using 
                  the official conference template before submission.
                </AlertDescription>
              </Alert>

              <Card>
                <CardHeader>
                  <CardTitle>Submission Portal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {content?.content && (
                    <div className="prose prose-lg max-w-none mb-6" data-testid="text-page-content">
                      <div className="whitespace-pre-wrap leading-relaxed text-muted-foreground">
                        {content.content}
                      </div>
                    </div>
                  )}

                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
                    <Upload className="h-16 w-16 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-semibold font-heading mb-2">Submit Your Paper</h3>
                    <p className="text-muted-foreground mb-6">
                      All submissions are handled through our online submission system
                    </p>
                    <Button size="lg" className="gap-2" data-testid="button-submit-portal">
                      Go to Submission Portal
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Submission Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        Paper is formatted according to the conference template
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        All author information is complete and accurate
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        References are properly formatted and complete
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        Paper has been proofread for grammar and spelling errors
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        All figures and tables are clear and properly labeled
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        PDF file size is under the maximum limit (10 MB)
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Review Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    All submissions will undergo a rigorous double-blind peer review process. 
                    Each paper will be reviewed by at least two experts in the field. Authors 
                    will be notified of the review decision via email. Accepted papers must be 
                    revised according to reviewers' comments and submitted in camera-ready format 
                    by the specified deadline.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
