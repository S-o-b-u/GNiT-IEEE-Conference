"use client";
import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FileDown, FileText, CheckCircle2 } from "lucide-react";
import type { PageContent } from "@/lib/db/schema";
import { api } from "@/lib/api";

export default function PaperTemplate() {
  // FIX: Use api.pages.get with the specific slug
  const { data: pageData, isLoading } = useQuery<PageContent>({
    queryKey: ["pages", "paper-template"], 
    queryFn: () => api.pages.get("paper-template"), // Fetches specific CMS content
  });

  return (
    <PageLayout>
      <div className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1
              className="text-4xl font-bold tracking-tight font-heading sm:text-5xl mb-4"
              data-testid="text-page-title"
            >
              {pageData?.title || "Paper Template"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Download the official conference paper template and formatting
              guidelines
            </p>
          </div>

          {isLoading ? (
            <Card>
              <CardContent className="p-8">
                <Skeleton className="h-64 w-full" />
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileDown className="h-5 w-5 text-primary" />
                    Download Template
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {pageData?.content && (
                    <div
                      className="prose prose-lg max-w-none mb-6"
                      data-testid="text-page-content"
                    >
                      <div className="whitespace-pre-wrap leading-relaxed text-muted-foreground">
                        {pageData.content}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-2 hover-elevate">
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <FileText className="h-12 w-12 text-primary" />
                          <div>
                            <h3 className="font-semibold font-heading mb-2">
                              Microsoft Word Template
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              .docx format for MS Word 2016 or later
                            </p>
                          </div>
                          <Button
                            className="w-full"
                            data-testid="button-download-word"
                          >
                            <FileDown className="h-4 w-4 mr-2" />
                            Download Word Template
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 hover-elevate">
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <FileText className="h-12 w-12 text-primary" />
                          <div>
                            <h3 className="font-semibold font-heading mb-2">
                              LaTeX Template
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              .zip package with LaTeX source files
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            className="w-full"
                            data-testid="button-download-latex"
                          >
                            <FileDown className="h-4 w-4 mr-2" />
                            Download LaTeX Template
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Template Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        Use the provided template without modifying margins,
                        fonts, or formatting styles
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        Papers must be 6-8 pages in length, including all
                        figures, tables, and references
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        Ensure all fonts are embedded when generating the final
                        PDF submission
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">
                        Include author names and affiliations only in the
                        camera-ready version
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
