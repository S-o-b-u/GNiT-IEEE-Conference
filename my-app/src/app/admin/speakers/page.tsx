'use client'
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { Speaker, InsertSpeaker } from "@shared/schema";

export default function AdminSpeakersManager() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null);
  const [formData, setFormData] = useState<InsertSpeaker>({
    name: "",
    affiliation: "",
    designation: "",
    title: "",
    imageUrl: "",
    bio: "",
  });

  const { data: speakers, isLoading } = useQuery<Speaker[]>({
    queryKey: ["/api/speakers"],
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertSpeaker) =>
      apiRequest("POST", "/api/speakers", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/speakers"] });
      toast({ title: "Speaker Added", description: "Speaker has been created successfully." });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Speaker> }) =>
      apiRequest("PUT", `/api/speakers/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/speakers"] });
      toast({ title: "Speaker Updated", description: "Speaker has been updated successfully." });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiRequest("DELETE", `/api/speakers/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/speakers"] });
      toast({ title: "Speaker Deleted", description: "Speaker has been removed." });
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      affiliation: "",
      designation: "",
      title: "",
      imageUrl: "",
      bio: "",
    });
    setEditingSpeaker(null);
    setIsDialogOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSpeaker) {
      updateMutation.mutate({ id: editingSpeaker.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (speaker: Speaker) => {
    setEditingSpeaker(speaker);
    setFormData({
      name: speaker.name,
      affiliation: speaker.affiliation,
      designation: speaker.designation,
      title: speaker.title || "",
      imageUrl: speaker.imageUrl,
      bio: speaker.bio || "",
    });
    setIsDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold font-heading mb-2">Keynote Speakers</h1>
            <p className="text-muted-foreground">
              Manage the list of conference speakers
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { resetForm(); setIsDialogOpen(true); }} data-testid="button-add-speaker">
                <Plus className="h-4 w-4 mr-2" />
                Add Speaker
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingSpeaker ? "Edit Speaker" : "Add New Speaker"}</DialogTitle>
                <DialogDescription>
                  Enter the speaker's details and photo URL
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Dr. John Doe"
                      data-testid="input-speaker-name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation *</Label>
                    <Input
                      id="designation"
                      value={formData.designation}
                      onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value }))}
                      placeholder="Professor and Dean"
                      data-testid="input-speaker-designation"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="affiliation">Affiliation *</Label>
                    <Input
                      id="affiliation"
                      value={formData.affiliation}
                      onChange={(e) => setFormData(prev => ({ ...prev, affiliation: e.target.value }))}
                      placeholder="Massachusetts Institute of Technology"
                      data-testid="input-speaker-affiliation"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Title (Optional)</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Chief Guest, Keynote Speaker"
                      data-testid="input-speaker-title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="imageUrl">Photo URL *</Label>
                    <Input
                      id="imageUrl"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                      placeholder="https://example.com/photo.jpg"
                      data-testid="input-speaker-image"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio (Optional)</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Brief biography of the speaker"
                      rows={3}
                      data-testid="input-speaker-bio"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit" data-testid="button-save-speaker">
                    {editingSpeaker ? "Update" : "Create"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Speakers</CardTitle>
            <CardDescription>
              View and manage all keynote speakers
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-muted-foreground text-center py-8">Loading...</p>
            ) : speakers && speakers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {speakers.map((speaker) => (
                  <Card key={speaker.id} data-testid={`card-speaker-${speaker.id}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={speaker.imageUrl} alt={speaker.name} />
                          <AvatarFallback>{speaker.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">{speaker.name}</h3>
                          <p className="text-sm text-primary">{speaker.designation}</p>
                          <p className="text-sm text-muted-foreground truncate">{speaker.affiliation}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(speaker)}
                            data-testid={`button-edit-speaker-${speaker.id}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteMutation.mutate(speaker.id)}
                            data-testid={`button-delete-speaker-${speaker.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No speakers added yet. Click "Add Speaker" to create one.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
