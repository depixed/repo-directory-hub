
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@clerk/clerk-react';
import { useToast } from '@/components/ui/use-toast';

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { userId, isLoaded, getToken } = useAuth();
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
        // Try different user ID formats
        // 1. First try with the original Clerk user ID
        let adminStatus = await checkAdminWithId(userId);
        
        if (!adminStatus) {
          // 2. Try with the cleaned user ID (without 'user_' prefix)
          const cleanUserId = userId.replace('user_', '');
          adminStatus = await checkAdminWithId(cleanUserId);
        }
        
        if (!adminStatus) {
          // 3. Try with the user's email as a fallback
          const token = await getToken();
          const response = await fetch('https://api.clerk.dev/v1/users/' + userId, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            const email = userData.email_addresses?.[0]?.email_address;
            if (email) {
              adminStatus = await checkAdminWithId(email);
            }
          }
        }

        if (!isMounted) return;
        
        console.log('Final admin check result:', adminStatus);
        setIsAdmin(!!adminStatus);
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

    const checkAdminWithId = async (id: string) => {
      console.log('Checking admin status for ID:', id);
      const { data, error } = await supabase
        .rpc('is_admin', { 
          user_id: id 
        });

      if (error) {
        console.error('Error checking admin status with ID:', id, error);
        return false;
      }
      
      console.log('Admin check result for ID:', id, data);
      return !!data;
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
  }, [userId, isLoaded, getToken, toast]);

  return { isAdmin, loading };
};
