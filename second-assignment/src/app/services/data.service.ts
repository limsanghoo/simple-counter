import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

    constructor(private http: HttpClient) { }

    public getJSON(): Promise<any> {
        return this.http.get("./assets/data.json").toPromise();
    }


}
