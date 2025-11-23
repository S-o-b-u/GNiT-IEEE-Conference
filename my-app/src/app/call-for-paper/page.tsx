"use client";
import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText } from "lucide-react";
import type { PageContent } from "@shared/schema";

export default function CallForPaper() {
  const { data: content, isLoading } = useQuery<PageContent>({
    queryKey: ["/api/page-content", "call-for-paper"],
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
            <h1 className="text-4xl font-bold tracking-tight font-heading sm:text-5xl mb-4" data-testid="text-page-title">
              {content?.title || "Call for Paper"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We invite original research contributions addressing emerging trends in technology
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
                <div className="prose prose-lg max-w-none" data-testid="text-page-content">
                  {content?.content ? (
                    <div className="whitespace-pre-wrap leading-relaxed text-foreground">
                      {content.content}
                    </div>
                  ) : (
                    <div className="space-y-6 text-foreground">
                      <p>
                        We invite researchers, academicians, and industry professionals to submit 
                        original research papers on emerging trends in technology and related fields.
                      </p>
                      
                      <h3 className="text-xl font-semibold font-heading mt-8 mb-4">Topics of Interest</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>Artificial Intelligence and Machine Learning</li>
                        <li>Internet of Things and Smart Systems</li>
                        <li>Cloud Computing and Big Data Analytics</li>
                        <li>Cybersecurity and Privacy</li>
                        <li>Blockchain and Distributed Systems</li>
                        <li>Computer Vision and Image Processing</li>
                        <li>Natural Language Processing</li>
                        <li>Software Engineering and Development</li>
                      </ul>

                      <h3 className="text-xl font-semibold font-heading mt-8 mb-4">Submission Guidelines</h3>
                      <p className="text-muted-foreground">
                        All submissions must be original work and not under consideration elsewhere. 
                        Papers will undergo a rigorous peer-review process by our technical program committee.
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
