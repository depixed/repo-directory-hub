
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@clerk/clerk-react';
import { useToast } from '@/components/ui/use-toast';

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { userId, isLoaded, isSignedIn } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    let isMounted = true;

    const checkAdminStatus = async () => {
      if (!userId || !isLoaded || !isSignedIn) {
        if (isMounted) {
          setIsAdmin(false);
          setLoading(false);
        }
        return;
      }

      try {
        const cleanUserId = userId.replace('user_', '');
        console.log('Auth State:', { userId, isLoaded, isSignedIn });
        console.log('Checking admin status for cleaned user ID:', cleanUserId);
        
        // First, verify the user exists in user_roles
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', cleanUserId)
          .single();

        if (roleError) {
          console.error('Error checking user_roles:', roleError);
          if (isMounted) {
            setIsAdmin(false);
            toast({
              title: "Error",
              description: "Failed to verify user role",
              variant: "destructive",
            });
          }
          return;
        }

        // Then check admin status through RPC
        const { data: adminStatus, error: adminError } = await supabase
          .rpc('is_admin', { 
            user_id: cleanUserId
          });

        if (!isMounted) return;

        if (adminError) {
          console.error('Error checking admin status:', adminError);
          toast({
            title: "Error",
            description: "Failed to verify admin status",
            variant: "destructive",
          });
          setIsAdmin(false);
        } else {
          console.log('Admin check result:', adminStatus);
          console.log('Role data:', roleData);
          setIsAdmin(!!adminStatus);
        }
      } catch (error) {
        if (!isMounted) return;
        console.error('Unexpected error:', error);
        setIsAdmin(false);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkAdminStatus();

    return () => {
      isMounted = false;
    };
  }, [userId, isLoaded, isSignedIn, toast]);

  return { isAdmin, loading };
};
