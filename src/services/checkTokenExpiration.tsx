import jwtDecode from 'jwt-decode';
import { refreshTokenService } from '../services';


type DecodedToken =  {
    sub: string;
    exp: number;
    iat: number;
  }

export const checkTokenExpiration = async (setRefreshError: (value: React.SetStateAction<boolean>) => void) => {
  const refreshedUser = JSON.parse(window.localStorage.getItem('loggedWiizzikidUser')!);


  if (refreshedUser) {
    const decodedToken = jwtDecode(refreshedUser.tokens.access) as DecodedToken;
    const currentTime = Date.now() / 1000;
    
    if (decodedToken.exp < currentTime) {
        const payload = {
            refresh:  refreshedUser.tokens.refresh
        }
          const response  = await refreshTokenService.refreshToken(payload);
          if (response.access) {
            
              // Update access token key-value pair in the object
            refreshedUser.tokens.access = response?.access;
             // Save the updated object back to localStorage
            window.localStorage.setItem('loggedWiizzikidUser', JSON.stringify(refreshedUser));
      } else {
        console.log("error")
        setRefreshError(true);
      }
    }
  }
}