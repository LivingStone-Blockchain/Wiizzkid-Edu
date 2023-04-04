import { useState, useEffect, useContext } from 'react';
import { refreshTokenService } from '../services';
import { UserContext, UserContextType } from './../context/user.context'




const useTokenRefresh = () => {
    const [refreshedUser, setRefreshedUser] = useState<any>(JSON.parse(window.localStorage.getItem('loggedWiizzikidUser')!));
    const { setRefreshTokenError } = useContext(UserContext) as UserContextType; 
    
    useEffect(() => {
             
        if (!refreshedUser) {
            return;
          }

        //constantly reach endpoint for new token if expired
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
          } catch (error: any) {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
              setRefreshTokenError(true)
            }
          }
        }, 86400000); // Refresh the token every 24 hours
    
        return () => clearInterval(intervalId);
      }, [refreshedUser]); 

      return { refreshedUser };
    }
    
   // export default useTokenRefresh;