import { useState, useEffect } from 'react';
import { refreshTokenService } from '../services';
import { toast } from 'react-hot-toast';





const useTokenRefresh = () => {
    const [refreshedUser, setRefreshedUser] = useState<any>(JSON.parse(window.localStorage.getItem('loggedWiizzikidUser')!));

    
    useEffect(() => {
             
        if (!refreshedUser) {
            return;
          }

        const intervalId = setInterval(async () => {
            const payload = {
                refresh:  refreshedUser.tokens.refresh
            }
          try {
            // Make a request to the backend to refresh the token
            const newAccessToken  = await refreshTokenService.refreshToken(payload);
            
            // Update access token key-value pair in the object
            refreshedUser.tokens.access = newAccessToken?.access;



            // Save the updated object back to localStorage
            window.localStorage.setItem(
                'loggedWiizzikidUser', JSON.stringify(refreshedUser)
            );
            setRefreshedUser(refreshedUser);
          } catch (error) {
            toast.error(<span className="text-sm">Session expired. Please login!</span>, { duration: 5000 });
          }
        }, 60000); // Refresh the token every 60 seconds
    
        return () => clearInterval(intervalId);
      }, []); 

      return { refreshedUser };
    }
    
    export default useTokenRefresh;


