import { jwtDecode } from 'jwt-decode';
import { decode } from 'base-64';
global.atob = decode;

export const isValidJwt = (token: string): boolean => {
  try {
    const decoded = jwtDecode(token);

    if (!decoded) return false;

    // Compare the seconds to determine if the token expired.
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) return false;

    return true;
  } catch (e) {
    console.error('Invalid token');
    return false;
  }
};
