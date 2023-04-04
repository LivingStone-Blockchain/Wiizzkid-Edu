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
          console.log(response)
          if (response.ok) {
            const data = await response.json();
console.log(data)
              // Update access token key-value pair in the object
            refreshedUser.tokens.access = data?.access;
             // Save the updated object back to localStorage
            window.localStorage.setItem('loggedWiizzikidUser', refreshedUser);
      } else {
        setRefreshError(true);
      }
    }
  }
}