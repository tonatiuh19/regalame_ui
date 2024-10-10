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
  public INSERT_NEW_EXTRA = `${DOMAIN}/insertNewExtra.php`;
  public UPDATE_EXTRA = `${DOMAIN}/updateExtra.php`;
  public DEACTIVATE_EXTRA = `${DOMAIN}/deActivateExtra.php`;

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
    payment_type: string,
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
        payment_type: payment_type,
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

  public insertNewExtra(
    id_user: number,
    title: string,
    description: string,
    confirmation: string,
    limit_slots: number,
    price: number,
    question: string,
    subsciption: boolean
  ): Observable<any> {
    return this.httpClient
      .post(this.INSERT_NEW_EXTRA, {
        id_user: id_user,
        title: title,
        description: description,
        confirmation: confirmation,
        limit_slots: limit_slots,
        price: price,
        question: question,
        subsciption: subsciption,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  public updateExtra(
    id_extra: number,
    title: string,
    description: string,
    confirmation: string,
    limit_slots: number,
    price: number,
    question: string,
    subsciption: boolean
  ): Observable<any> {
    return this.httpClient
      .post(this.UPDATE_EXTRA, {
        id_extra: id_extra,
        title: title,
        description: description,
        confirmation: confirmation,
        limit_slots: limit_slots,
        price: price,
        question: question,
        subsciption: subsciption,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  public deActivateExtra(id_extra: number): Observable<any> {
    return this.httpClient
      .post(this.DEACTIVATE_EXTRA, {
        id_extra: id_extra,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
