
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
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@clerk/clerk-react";

export function AddRepositoryDialog() {
  const [urls, setUrls] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { userId } = useAuth();

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

      // Process each repository URL
      const results = await Promise.all(
        urlList.map(async (url) => {
          // Basic validation for GitHub URL format
          if (!url.includes('github.com')) {
            return { url, success: false, error: 'Not a valid GitHub URL' };
          }

          // Extract repo name from URL
          // Format: https://github.com/owner/repo
          const urlParts = url.split('/');
          const repoName = urlParts[urlParts.length - 1] || 'Unknown Repository';
          
          // Insert repository into database
          const { data, error } = await supabase
            .from('repositories')
            .insert({
              name: repoName,
              url: url.trim(),
              submitter_id: userId ? userId.replace('user_', '') : null,
              is_approved: false // Requires admin approval
            });

          if (error) {
            console.error('Error adding repository:', error);
            return { url, success: false, error: error.message };
          }

          return { url, success: true };
        })
      );

      // Count successful and failed submissions
      const successful = results.filter(r => r.success).length;
      const failed = results.length - successful;

      // Show appropriate toast based on results
      if (successful > 0 && failed === 0) {
        toast({
          title: "Success",
          description: `Added ${successful} repositories successfully. They will be reviewed by an admin.`,
        });
        setUrls(""); // Clear the textarea on success
      } else if (successful > 0 && failed > 0) {
        toast({
          title: "Partial Success",
          description: `Added ${successful} repositories. ${failed} failed to add.`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to add repositories. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
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
