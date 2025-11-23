'use client'
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { PageContent } from "@shared/schema";

export default function AdminContentEditor() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("call-for-paper");

  const { data: callForPaper, isLoading: loadingCFP } = useQuery<PageContent>({
    queryKey: ["/api/page-content", "call-for-paper"],
  });

  const { data: authorGuidelines, isLoading: loadingAG } = useQuery<PageContent>({
    queryKey: ["/api/page-content", "author-guidelines"],
  });

  const { data: paperTemplate, isLoading: loadingPT } = useQuery<PageContent>({
    queryKey: ["/api/page-content", "paper-template"],
  });

  const { data: paperSubmission, isLoading: loadingPS } = useQuery<PageContent>({
    queryKey: ["/api/page-content", "paper-submission"],
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<PageContent> }) =>
      apiRequest("PUT", `/api/page-content/${id}`, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/page-content", variables.id] });
      toast({ title: "Content Updated", description: "Page content has been successfully updated." });
    },
  });

  const handleSubmit = (pageId: string, title: string, content: string) => {
    updateMutation.mutate({
      id: pageId,
      data: { title, content },
    });
  };

  const renderEditor = (
    pageId: string,
    data: PageContent | undefined,
    isLoading: boolean,
    defaultTitle: string
  ) => {
    const [title, setTitle] = useState(data?.title || defaultTitle);
    const [content, setContent] = useState(data?.content || "");

    if (data && (title !== data.title || content !== data.content)) {
      setTitle(data.title);
      setContent(data.content);
    }

    return (
      <Card>
        <CardHeader>
          <CardTitle>{defaultTitle}</CardTitle>
          <CardDescription>
            Edit the content for this page
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground text-center py-8">Loading...</p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(pageId, title, content);
              }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor={`${pageId}-title`}>Page Title</Label>
                <Input
                  id={`${pageId}-title`}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={defaultTitle}
                  data-testid={`input-title-${pageId}`}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`${pageId}-content`}>Page Content</Label>
                <Textarea
                  id={`${pageId}-content`}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter the page content here..."
                  rows={15}
                  className="font-mono text-sm"
                  data-testid={`input-content-${pageId}`}
                />
                <p className="text-xs text-muted-foreground">
                  You can use plain text or simple formatting. Line breaks will be preserved.
                </p>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={updateMutation.isPending}
                  data-testid={`button-save-${pageId}`}
                >
                  {updateMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading mb-2">Page Content Editor</h1>
          <p className="text-muted-foreground">
            Manage content for key conference pages
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="call-for-paper">Call for Paper</TabsTrigger>
            <TabsTrigger value="author-guidelines">Author Guidelines</TabsTrigger>
            <TabsTrigger value="paper-template">Paper Template</TabsTrigger>
            <TabsTrigger value="paper-submission">Paper Submission</TabsTrigger>
          </TabsList>

          <TabsContent value="call-for-paper" className="mt-6">
            {renderEditor("call-for-paper", callForPaper, loadingCFP, "Call for Paper")}
          </TabsContent>

          <TabsContent value="author-guidelines" className="mt-6">
            {renderEditor("author-guidelines", authorGuidelines, loadingAG, "Author Guidelines")}
          </TabsContent>

          <TabsContent value="paper-template" className="mt-6">
            {renderEditor("paper-template", paperTemplate, loadingPT, "Paper Template")}
          </TabsContent>

          <TabsContent value="paper-submission" className="mt-6">
            {renderEditor("paper-submission", paperSubmission, loadingPS, "Paper Submission")}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
