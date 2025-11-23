'use client'
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { ImportantDate, InsertImportantDate } from "@shared/schema";

export default function AdminDatesManager() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDate, setEditingDate] = useState<ImportantDate | null>(null);
  const [formData, setFormData] = useState<InsertImportantDate>({
    date: "",
    description: "",
  });

  const { data: dates, isLoading } = useQuery<ImportantDate[]>({
    queryKey: ["/api/important-dates"],
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertImportantDate) =>
      apiRequest("POST", "/api/important-dates", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/important-dates"] });
      toast({ title: "Date Added", description: "Important date has been created." });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ImportantDate> }) =>
      apiRequest("PUT", `/api/important-dates/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/important-dates"] });
      toast({ title: "Date Updated", description: "Important date has been updated." });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiRequest("DELETE", `/api/important-dates/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/important-dates"] });
      toast({ title: "Date Deleted", description: "Important date has been removed." });
    },
  });

  const resetForm = () => {
    setFormData({ date: "", description: "" });
    setEditingDate(null);
    setIsDialogOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDate) {
      updateMutation.mutate({ id: editingDate.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (date: ImportantDate) => {
    setEditingDate(date);
    setFormData({ date: date.date, description: date.description });
    setIsDialogOpen(true);
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold font-heading mb-2">Important Dates</h1>
            <p className="text-muted-foreground">
              Manage conference deadlines and key milestones
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { resetForm(); setIsDialogOpen(true); }} data-testid="button-add-date">
                <Plus className="h-4 w-4 mr-2" />
                Add Date
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingDate ? "Edit Date" : "Add New Date"}</DialogTitle>
                <DialogDescription>
                  Enter the date and description for this milestone
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      data-testid="input-date-value"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="e.g., Paper Submission Deadline"
                      data-testid="input-date-description"
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit" data-testid="button-save-date">
                    {editingDate ? "Update" : "Create"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Important Dates</CardTitle>
            <CardDescription>
              View and manage all conference dates
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-muted-foreground text-center py-8">Loading...</p>
            ) : dates && dates.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dates.map((date) => (
                    <TableRow key={date.id} data-testid={`row-date-${date.id}`}>
                      <TableCell className="font-medium">{date.date}</TableCell>
                      <TableCell>{date.description}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(date)}
                            data-testid={`button-edit-date-${date.id}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteMutation.mutate(date.id)}
                            data-testid={`button-delete-date-${date.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No important dates added yet. Click "Add Date" to create one.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
