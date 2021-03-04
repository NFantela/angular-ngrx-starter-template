import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UsersService} from './users.service';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { IRegularUser } from '../../models/regular-user.model';

const ITEMS:IRegularUser[] = [
    {userId: 'axaca12-asdaas', name: "John", lastName: "Doe", email: "john@doe.mail", isActive:true},
    {userId: 'aCCca13-asdaas', name: "Anita", lastName: "Goe", email: "anita@goe.mail", isActive:false},
];
 
function createRespponse<T>(body:T){
    return of(body );
}
class MockHttpClient {
    get(){
        return createRespponse([]);
    }
}

describe('UsersService', () => {
    let service: UsersService;
    let http: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers:[
                UsersService,
                {provide: HttpClient, useClass: MockHttpClient} // provide our fake HTTPClient
            ]
        });
        http = TestBed.inject(HttpClient);
        service = TestBed.inject(UsersService);
    });

    it('should get users', () => {
        spyOn(http, 'get').and.returnValue(createRespponse([...ITEMS]));
        
        service.getUsersFromDb().subscribe((users)=> {
            // test here
            expect(users.length).toBe(2);
            expect(users).toEqual(ITEMS); // this uses deep equality
        })
    })
})