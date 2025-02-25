
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function AddRepositoryDialog() {
  const [urls, setUrls] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAddRepositories = async () => {
    setLoading(true);
    try {
      const urlList = urls.split("\n").filter(url => url.trim());
      
      if (urlList.length === 0) {
        toast({
          title: "Error",
          description: "Please enter at least one GitHub repository URL",
          variant: "destructive",
        });
        return;
      }

      // TODO: Implement GitHub API integration
      console.log("Processing URLs:", urlList);
      
      toast({
        title: "Success",
        description: `Added ${urlList.length} repositories successfully`,
      });
      setUrls("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add repositories",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2" />
          Add Repository
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Repositories</DialogTitle>
          <DialogDescription>
            Enter GitHub repository URLs (one per line) or upload a CSV file
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Textarea
            placeholder="https://github.com/owner/repo
https://github.com/owner/another-repo"
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            className="min-h-[200px]"
          />
          <div className="flex justify-between">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Upload CSV
            </Button>
            <Button onClick={handleAddRepositories} disabled={loading}>
              {loading ? "Processing..." : "Add Repositories"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
