import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtDecoderService {

  constructor() { }

  public decodeToken(token: string) {
    const decodedToekn = jwtDecode(token);
    
    return decodedToekn;
  }
}
