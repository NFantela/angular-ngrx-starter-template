import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { IAuthUser } from '../auth-store/models/auth-user';

const DEMO_AUTH_USER:IAuthUser = {
    email:'master-admin@gmail.com',
    name: 'Master',
    lastName:'Blaster'
}

@Injectable({providedIn: 'root'})
export class AuthService{

    loginUser(email:string, password:string):Observable<IAuthUser> {
        
        const observable = new Observable<IAuthUser>((observer)=> {
            if(email && password){
                observer.next(DEMO_AUTH_USER)
            } else {
                observer.error(new Error("missing data"))
            }
        })
        return observable;

    }

    registerUser({email, password}:{email:string, password:string, name:string}){
        return this.loginUser(email, password);
    }

}