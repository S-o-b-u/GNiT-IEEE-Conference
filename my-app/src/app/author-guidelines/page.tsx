"use client";
import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen } from "lucide-react";
import type { PageContent } from "@/lib/db/schema";

export default function AuthorGuidelines() {
  const { data: content, isLoading } = useQuery<PageContent>({
    queryKey: ["/api/page-content", "author-guidelines"],
  });

  return (
    <PageLayout>
      <div className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1
              className="text-4xl font-bold tracking-tight font-heading sm:text-5xl mb-4"
              data-testid="text-page-title"
            >
              {content?.title || "Author Guidelines"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Important instructions for preparing and submitting your research
              paper
            </p>
          </div>

          {isLoading ? (
            <Card>
              <CardContent className="p-8">
                <Skeleton className="h-96 w-full" />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 md:p-12">
                <div
                  className="prose prose-lg max-w-none"
                  data-testid="text-page-content"
                >
                  {content?.content ? (
                    <div className="whitespace-pre-wrap leading-relaxed text-foreground">
                      {content.content}
                    </div>
                  ) : (
                    <div className="space-y-6 text-foreground">
                      <h3 className="text-xl font-semibold font-heading">
                        Manuscript Preparation
                      </h3>
                      <p className="text-muted-foreground">
                        All submissions must be written in English and follow
                        the conference formatting guidelines. Papers should be
                        original work that has not been published or submitted
                        elsewhere.
                      </p>

                      <h3 className="text-xl font-semibold font-heading mt-8">
                        Formatting Requirements
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>
                          Use the official conference template (available on the
                          Paper Template page)
                        </li>
                        <li>
                          Maximum paper length: 6-8 pages including references
                        </li>
                        <li>Font: Times New Roman, 10-point for body text</li>
                        <li>Single column format for initial submission</li>
                        <li>
                          Include all figures and tables within the manuscript
                        </li>
                      </ul>

                      <h3 className="text-xl font-semibold font-heading mt-8">
                        Submission Process
                      </h3>
                      <p className="text-muted-foreground">
                        Submit your paper through the online submission system.
                        Ensure all author information is complete and accurate.
                        Papers will undergo double-blind peer review.
                      </p>

                      <h3 className="text-xl font-semibold font-heading mt-8">
                        Originality and Ethics
                      </h3>
                      <p className="text-muted-foreground">
                        All submissions must be original work. Plagiarism in any
                        form is strictly prohibited. Authors must cite all
                        relevant prior work and clearly indicate their novel
                        contributions.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
