import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IRegularUser } from '../../models/regular-user.model';

@Injectable()
export class UsersService {

    constructor(@Inject(HttpClient) private readonly _http:HttpClient){}

    getUsersFromDb():Observable<IRegularUser[]>{
        return of([
            {userId: 'axaca12-asdaas', name: "John", lastName: "Doe", email: "john@doe.mail", isActive:true},
            {userId: 'aCCca13-asdaas', name: "Anita", lastName: "Goe", email: "anita@goe.mail", isActive:false},
        ]);
    }

}