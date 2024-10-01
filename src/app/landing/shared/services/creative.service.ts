import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DOMAIN } from '../../../app.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreativeService {
  public GET_EXTRAS_BY_USER_NAME = `${DOMAIN}/getExtrasByUserName.php`;
  public PAYING = `${DOMAIN}/paying.php`;

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

  public payingPackage(
    id_user: number,
    id_extra: number,
    email_user: string,
    amount: string,
    description: string,
    question_answer: string,
    payment_name: string,
    note_fan: string,
    isPublic_note_fan: boolean,
    user_name: string,
    token: string
  ): Observable<any> {
    return this.httpClient
      .post(this.PAYING, {
        id_user: id_user,
        id_extra: id_extra,
        email_user: email_user,
        amount: amount,
        description: description,
        question_answer: question_answer,
        payment_name: payment_name,
        note_fan: note_fan,
        isPublic_note_fan: isPublic_note_fan,
        user_name: user_name,
        token: token,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
