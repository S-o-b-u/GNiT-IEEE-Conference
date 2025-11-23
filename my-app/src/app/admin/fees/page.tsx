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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { RegistrationFee, InsertRegistrationFee } from "@/lib/db/schema";

export default function AdminFeesManager() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFee, setEditingFee] = useState<RegistrationFee | null>(null);
  const [formData, setFormData] = useState<InsertRegistrationFee>({
    category: "",
    indianFee: "",
    internationalFee: "",
    order: 0,
  });

  const { data: fees, isLoading } = useQuery<RegistrationFee[]>({
    queryKey: ["/api/registration-fees"],
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertRegistrationFee) =>
      apiRequest("POST", "/api/registration-fees", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/registration-fees"] });
      toast({
        title: "Fee Added",
        description: "Registration fee category has been created.",
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
      data: Partial<RegistrationFee>;
    }) => apiRequest("PUT", `/api/registration-fees/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/registration-fees"] });
      toast({
        title: "Fee Updated",
        description: "Registration fee has been updated.",
      });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiRequest("DELETE", `/api/registration-fees/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/registration-fees"] });
      toast({
        title: "Fee Deleted",
        description: "Registration fee has been removed.",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      category: "",
      indianFee: "",
      internationalFee: "",
      order: 0,
    });
    setEditingFee(null);
    setIsDialogOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFee) {
      updateMutation.mutate({ id: editingFee.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (fee: RegistrationFee) => {
    setEditingFee(fee);
    setFormData({
      category: fee.category,
      indianFee: fee.indianFee,
      internationalFee: fee.internationalFee,
      order: fee.order || 0,
    });
    setIsDialogOpen(true);
  };

  const sortedFees = fees
    ? [...fees].sort((a, b) => (a.order || 0) - (b.order || 0))
    : [];

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold font-heading mb-2">
              Registration Fees
            </h1>
            <p className="text-muted-foreground">
              Manage conference registration fee structure
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  resetForm();
                  setIsDialogOpen(true);
                }}
                data-testid="button-add-fee"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Fee Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingFee ? "Edit Fee" : "Add New Fee Category"}
                </DialogTitle>
                <DialogDescription>
                  Enter the registration fee details for this category
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category Name *</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      placeholder="e.g., Academic, Student, Industry"
                      data-testid="input-fee-category"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="indianFee">Indian Delegate Fee *</Label>
                    <Input
                      id="indianFee"
                      value={formData.indianFee}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          indianFee: e.target.value,
                        }))
                      }
                      placeholder="₹10,000"
                      data-testid="input-indian-fee"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="internationalFee">
                      International Delegate Fee *
                    </Label>
                    <Input
                      id="internationalFee"
                      value={formData.internationalFee}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          internationalFee: e.target.value,
                        }))
                      }
                      placeholder="$200"
                      data-testid="input-international-fee"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="order">Display Order</Label>
                    <Input
                      id="order"
                      type="number"
                      value={formData.order}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          order: parseInt(e.target.value) || 0,
                        }))
                      }
                      placeholder="0"
                      data-testid="input-fee-order"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit" data-testid="button-save-fee">
                    {editingFee ? "Update" : "Create"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Fee Categories</CardTitle>
            <CardDescription>
              View and manage all registration fee categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-muted-foreground text-center py-8">
                Loading...
              </p>
            ) : sortedFees.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Indian Delegates</TableHead>
                    <TableHead>International Delegates</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedFees.map((fee) => (
                    <TableRow key={fee.id} data-testid={`row-fee-${fee.id}`}>
                      <TableCell className="font-medium">
                        {fee.category}
                      </TableCell>
                      <TableCell>{fee.indianFee}</TableCell>
                      <TableCell>{fee.internationalFee}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(fee)}
                            data-testid={`button-edit-fee-${fee.id}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteMutation.mutate(fee.id)}
                            data-testid={`button-delete-fee-${fee.id}`}
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
                No fee categories added yet. Click "Add Fee Category" to create
                one.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
