import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class ServerServiceService {
  constructor(private http: HttpClient) {}

  //created a seperate server to run node
  serverUrl: string = "http://localhost:3000/";

  getRams() {
    return this.http.get(this.serverUrl + 'api/get/rams')
      .pipe(map((res) => {res;
        return res;
      }));
  }

  editRams(row_obj){
    return this.http.post(this.serverUrl + 'api/edit/rams', row_obj)
    .pipe(map((res) => {res;
    console.log("logging edits" + row_obj)
    return row_obj;
    }));
  }

}
