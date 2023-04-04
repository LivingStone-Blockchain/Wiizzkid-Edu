import { useState, useEffect, useContext } from 'react';
import { refreshTokenService } from '../services';
import { UserContext, UserContextType } from './../context/user.context'
import jwtDecode from 'jwt-decode';



type DecodedToken =  {
  sub: string;
  exp: number;
  iat: number;
}


const useTokenRefresh = () => {
    const [refreshedUser, setRefreshedUser] = useState<any>(JSON.parse(window.localStorage.getItem('loggedWiizzikidUser')!));
    const { setRefreshTokenError } = useContext(UserContext) as UserContextType; 
    
    useEffect(() => {
             
        if (refreshedUser) {
          const decodedToken = jwtDecode(refreshedUser.tokens.access) as DecodedToken;
          const currentTime = Date.now() / 1000;


           //constantly reach endpoint for new token if expired
          const intervalId = setInterval(async () => {

          if (decodedToken.exp < currentTime) {
            const payload = {
              refresh:  refreshedUser.tokens.refresh
          }
            const response  = await refreshTokenService.refreshToken(payload);
            console.log(response)
            if (response.ok) {
              const data = await response.json();

                // Update access token key-value pair in the object
              refreshedUser.tokens.access = data?.access;
               // Save the updated object back to localStorage
              window.localStorage.setItem('loggedWiizzikidUser', refreshedUser);
              setRefreshedUser(refreshedUser);
            } else {
              setRefreshTokenError(true);
            }
          }
        /*try {
          
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
        }*/
      }, 300000); // Refresh the token every 24 hours
  
      return () => clearInterval(intervalId);

          }   

      }, []); 

      return { refreshedUser };
    }
    
    export default useTokenRefresh;


