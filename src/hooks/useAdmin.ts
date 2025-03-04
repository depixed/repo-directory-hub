
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@clerk/clerk-react';
import { useToast } from '@/components/ui/use-toast';

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { userId, isLoaded } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    let isMounted = true;

    const checkAdminStatus = async () => {
      if (!userId || !isLoaded) {
        if (isMounted) {
          setIsAdmin(false);
          setLoading(false);
        }
        return;
      }

      try {
        const cleanUserId = userId.replace('user_', '');
        console.log('Checking admin status for user:', userId);
        console.log('Clean user ID (without prefix):', cleanUserId);
        
        const { data: adminStatus, error } = await supabase
          .rpc('is_admin', { 
            user_id: cleanUserId
          });

        if (!isMounted) return;

        if (error) {
          console.error('Error checking admin status:', error);
          console.error('Error details:', {
            message: error.message,
            hint: error.hint,
            details: error.details
          });
          toast({
            title: "Error",
            description: "Failed to verify admin status",
            variant: "destructive",
          });
          setIsAdmin(false);
        } else {
          console.log('Admin check result:', adminStatus);
          setIsAdmin(!!adminStatus);
        }
      } catch (error) {
        if (!isMounted) return;
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Only check admin status if we have a userId and auth is loaded
    if (isLoaded) {
      if (userId) {
        checkAdminStatus();
      } else {
        setIsAdmin(false);
        setLoading(false);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [userId, isLoaded, toast]);

  return { isAdmin, loading };
};
