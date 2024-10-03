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
  public UPDATE_EXTRA_BY_ID = `https://garbrix.com/regalame/api/updateExtraById.php`;
  public GET_PAYMENTS_BY_USER_ID = `${DOMAIN}/getPaymentsByUserId.php`;
  public GET_USER_CATEGORIES = `${DOMAIN}/getUserCategories.php`;
  public UPDATE_USER_BY_ID = `${DOMAIN}/updateUserByUserId.php`;
  public UPDATE_USER_PAYMENT_BY_ID = `${DOMAIN}/updateUserPaymentByUserId.php`;

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

  public updateExtraById(
    id_extra: number,
    about: string,
    confirmation: string,
    price: string,
    picture: File
  ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('id_extra', id_extra.toString());
    formData.append('about', about);
    formData.append('confirmation', confirmation);
    formData.append('price', price);
    formData.append('picture', picture);

    return this.httpClient.post(this.UPDATE_EXTRA_BY_ID, formData).pipe(
      map((response) => {
        return response;
      })
    );
  }

  public getPaymentsByUserId(id_user: number): Observable<any> {
    return this.httpClient
      .post(this.GET_PAYMENTS_BY_USER_ID, {
        id_user: id_user,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  public getUserCategories(): Observable<any> {
    return this.httpClient.post(this.GET_USER_CATEGORIES, {}).pipe(
      map((response) => {
        return response;
      })
    );
  }

  public updateUserByUserId(
    id_user: number,
    name: string,
    last_name: string,
    phone: string,
    categories: any
  ): Observable<any> {
    return this.httpClient
      .post(this.UPDATE_USER_BY_ID, {
        id_user: id_user,
        name: name,
        last_name: last_name,
        phone: phone,
        categories: categories,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  public updateUserPaymentByUserId(
    id_user: number,
    id_users_payment_type: number,
    value: string,
    place: string
  ): Observable<any> {
    return this.httpClient
      .post(this.UPDATE_USER_PAYMENT_BY_ID, {
        id_user: id_user,
        id_users_payment_type: id_users_payment_type,
        value: value,
        place: place,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
