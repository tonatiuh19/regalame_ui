import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from '../../../app.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreativeService {
  public GET_EXTRAS_BY_USER_NAME = `${DOMAIN}/getExtrasByUserName.php`;

  constructor(private httpClient: HttpClient) {}

  public getExtrasByUserName(username: string): Observable<any> {
    return this.httpClient
      .post(this.GET_EXTRAS_BY_USER_NAME, {
        username: username,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
