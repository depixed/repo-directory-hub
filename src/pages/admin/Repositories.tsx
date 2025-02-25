
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddRepositoryDialog } from "@/components/admin/AddRepositoryDialog";

export default function Repositories() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Repositories</h1>
          <p className="text-muted-foreground">
            Manage and moderate repository submissions
          </p>
        </div>
        <AddRepositoryDialog />
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Repository Management</CardTitle>
            <CardDescription>
              View and manage all repository submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground text-sm">
              No repositories found. Add one to get started.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
