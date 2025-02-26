
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@clerk/clerk-react';
import { useToast } from '@/components/ui/use-toast';

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { userId } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!userId) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        console.log('Checking admin status for user:', userId);
        const { data, error } = await supabase
          .rpc('is_admin', { 
            user_id: userId
          });

        if (error) {
          console.error('Error checking admin status:', error);
          toast({
            title: "Error",
            description: "Failed to verify admin status",
            variant: "destructive",
          });
          setIsAdmin(false);
        } else {
          console.log('Admin check result:', data);
          setIsAdmin(!!data);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      checkAdminStatus();
    } else {
      setIsAdmin(false);
      setLoading(false);
    }

    return () => {
      // Cleanup
      setIsAdmin(false);
      setLoading(true);
    };
  }, [userId, toast]);

  return { isAdmin, loading };
};
