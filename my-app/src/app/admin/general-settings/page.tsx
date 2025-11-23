'use client'
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { GeneralSettings } from "@shared/schema";

export default function AdminGeneralSettings() {
  const { toast } = useToast();
  const { data: settings, isLoading } = useQuery<GeneralSettings>({
    queryKey: ["/api/settings"],
  });

  const [formData, setFormData] = useState<Partial<GeneralSettings>>({});

  const updateMutation = useMutation({
    mutationFn: (data: Partial<GeneralSettings>) =>
      apiRequest("PUT", "/api/settings", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings"] });
      toast({
        title: "Settings Updated",
        description: "General settings have been successfully updated.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const handleChange = (field: keyof GeneralSettings, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <Card>
          <CardContent className="p-8">
            <Skeleton className="h-96 w-full" />
          </CardContent>
        </Card>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading mb-2">General Settings</h1>
          <p className="text-muted-foreground">
            Manage the main conference information displayed on the website
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Conference Details</CardTitle>
              <CardDescription>
                Update the core information about your conference
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="eventTitle">Event Title</Label>
                <Input
                  id="eventTitle"
                  defaultValue={settings?.eventTitle}
                  onChange={(e) => handleChange("eventTitle", e.target.value)}
                  placeholder="e.g., 2nd International Conference on Emerging Trends in Technology"
                  data-testid="input-event-title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventSubtitle">Event Subtitle</Label>
                <Input
                  id="eventSubtitle"
                  defaultValue={settings?.eventSubtitle}
                  onChange={(e) => handleChange("eventSubtitle", e.target.value)}
                  placeholder="e.g., Department of Computer Science and Engineering, GNIT"
                  data-testid="input-event-subtitle"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eventDates">Event Dates</Label>
                  <Input
                    id="eventDates"
                    defaultValue={settings?.eventDates}
                    onChange={(e) => handleChange("eventDates", e.target.value)}
                    placeholder="e.g., February 15-16, 2026"
                    data-testid="input-event-dates"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventMode">Event Mode</Label>
                  <Input
                    id="eventMode"
                    defaultValue={settings?.eventMode}
                    onChange={(e) => handleChange("eventMode", e.target.value)}
                    placeholder="e.g., Hybrid Mode"
                    data-testid="input-event-mode"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventLocation">Event Location</Label>
                <Input
                  id="eventLocation"
                  defaultValue={settings?.eventLocation}
                  onChange={(e) => handleChange("eventLocation", e.target.value)}
                  placeholder="e.g., Guru Nanak Institute of Technology"
                  data-testid="input-event-location"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organizingDepartment">Organizing Department</Label>
                <Input
                  id="organizingDepartment"
                  defaultValue={settings?.organizingDepartment}
                  onChange={(e) => handleChange("organizingDepartment", e.target.value)}
                  placeholder="e.g., Department of Computer Science and Engineering"
                  data-testid="input-organizing-dept"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="publicationInfo">Publication Information</Label>
                <Textarea
                  id="publicationInfo"
                  defaultValue={settings?.publicationInfo}
                  onChange={(e) => handleChange("publicationInfo", e.target.value)}
                  placeholder="Information about conference proceedings and publications"
                  rows={4}
                  data-testid="input-publication-info"
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={updateMutation.isPending}
                  data-testid="button-save-settings"
                >
                  {updateMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </AdminLayout>
  );
}
