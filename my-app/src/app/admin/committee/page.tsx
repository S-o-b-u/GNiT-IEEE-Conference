"use client";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { CommitteeMember, InsertCommitteeMember } from "@/lib/db/schema";

export default function AdminCommitteeManager() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<CommitteeMember | null>(
    null
  );
  const [formData, setFormData] = useState<InsertCommitteeMember>({
    name: "",
    affiliation: "",
    designation: "",
    committeeType: "advisory",
  });

  const { data: members, isLoading } = useQuery<CommitteeMember[]>({
    queryKey: ["/api/committee"],
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertCommitteeMember) =>
      apiRequest("POST", "/api/committee", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/committee"] });
      toast({
        title: "Member Added",
        description: "Committee member has been created.",
      });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CommitteeMember>;
    }) => apiRequest("PUT", `/api/committee/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/committee"] });
      toast({
        title: "Member Updated",
        description: "Committee member has been updated.",
      });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiRequest("DELETE", `/api/committee/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/committee"] });
      toast({
        title: "Member Deleted",
        description: "Committee member has been removed.",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      affiliation: "",
      designation: "",
      committeeType: "advisory",
    });
    setEditingMember(null);
    setIsDialogOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      updateMutation.mutate({ id: editingMember.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (member: CommitteeMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      affiliation: member.affiliation,
      designation: member.designation || "",
      committeeType: member.committeeType,
    });
    setIsDialogOpen(true);
  };

  const renderMembersList = (
    type: "advisory" | "organizing" | "tpc",
    title: string
  ) => {
    const filteredMembers =
      members?.filter((m) => m.committeeType === type) || [];

    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {filteredMembers.length} member
            {filteredMembers.length !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredMembers.length > 0 ? (
            <div className="space-y-3">
              {filteredMembers.map((member) => (
                <Card key={member.id} data-testid={`card-member-${member.id}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{member.name}</h3>
                        {member.designation && (
                          <p className="text-sm text-primary">
                            {member.designation}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground">
                          {member.affiliation}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(member)}
                          data-testid={`button-edit-member-${member.id}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteMutation.mutate(member.id)}
                          data-testid={`button-delete-member-${member.id}`}
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
              No members in this committee yet.
            </p>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold font-heading mb-2">
              Committee Members
            </h1>
            <p className="text-muted-foreground">
              Manage all conference committee members
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  resetForm();
                  setIsDialogOpen(true);
                }}
                data-testid="button-add-member"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingMember ? "Edit Member" : "Add New Member"}
                </DialogTitle>
                <DialogDescription>
                  Enter the committee member's details
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Dr. Jane Smith"
                      data-testid="input-member-name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="affiliation">Affiliation *</Label>
                    <Input
                      id="affiliation"
                      value={formData.affiliation}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          affiliation: e.target.value,
                        }))
                      }
                      placeholder="Stanford University"
                      data-testid="input-member-affiliation"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation (Optional)</Label>
                    <Input
                      id="designation"
                      value={formData.designation}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          designation: e.target.value,
                        }))
                      }
                      placeholder="Professor"
                      data-testid="input-member-designation"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="committeeType">Committee Type *</Label>
                    <Select
                      value={formData.committeeType}
                      onValueChange={(value: any) =>
                        setFormData((prev) => ({
                          ...prev,
                          committeeType: value,
                        }))
                      }
                    >
                      <SelectTrigger data-testid="select-committee-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="advisory">
                          Advisory Committee
                        </SelectItem>
                        <SelectItem value="organizing">
                          Organizing Committee
                        </SelectItem>
                        <SelectItem value="tpc">
                          Technical Program Committee
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit" data-testid="button-save-member">
                    {editingMember ? "Update" : "Create"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <p className="text-muted-foreground text-center py-8">Loading...</p>
        ) : (
          <Tabs defaultValue="advisory" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="advisory">Advisory</TabsTrigger>
              <TabsTrigger value="organizing">Organizing</TabsTrigger>
              <TabsTrigger value="tpc">TPC</TabsTrigger>
            </TabsList>
            <TabsContent value="advisory" className="mt-6">
              {renderMembersList("advisory", "Advisory Committee")}
            </TabsContent>
            <TabsContent value="organizing" className="mt-6">
              {renderMembersList("organizing", "Organizing Committee")}
            </TabsContent>
            <TabsContent value="tpc" className="mt-6">
              {renderMembersList("tpc", "Technical Program Committee")}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </AdminLayout>
  );
}
