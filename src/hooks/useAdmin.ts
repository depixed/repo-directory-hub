
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
        console.log('Starting admin check for user ID:', userId);
        
        // Try all possible user ID formats
        const formats = [
          userId, // Original Clerk ID
          userId.replace('user_', ''), // Cleaned ID
        ];
        
        // Try each format until one works
        let isUserAdmin = false;
        for (const id of formats) {
          console.log('Trying ID format:', id);
          const { data, error } = await supabase.rpc('is_admin', { user_id: id });
          
          if (!error && data === true) {
            console.log('Admin found with ID:', id);
            isUserAdmin = true;
            break;
          }
        }
        
        // If still not admin, try with email as last resort
        if (!isUserAdmin) {
          try {
            console.log('Trying email lookup as last resort');
            const token = await getToken();
            const response = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
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
                console.log('Checking admin with email:', email);
                const { data, error } = await supabase.rpc('is_admin', { user_id: email });
                
                if (!error && data === true) {
                  console.log('Admin found with email:', email);
                  isUserAdmin = true;
                }
              }
            }
          } catch (emailError) {
            console.error('Error checking admin with email:', emailError);
          }
        }

        if (isMounted) {
          console.log('Final admin status:', isUserAdmin);
          setIsAdmin(isUserAdmin);
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error in admin check process:', error);
          setIsAdmin(false);
          setLoading(false);
        }
      }
    };

    if (isLoaded) {
      checkAdminStatus();
    }

    return () => {
      isMounted = false;
    };
  }, [userId, isLoaded, getToken]);

  return { isAdmin, loading };
};
