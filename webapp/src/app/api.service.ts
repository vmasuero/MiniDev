import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':  'application/json'})
  };

 

  constructor(private http: HttpClient) { 

  }

  push_data(data) {
    const data_post = {'word': data}
    console.log('enviado')
    console.log( JSON.stringify(data_post) )
    return  this.http.post('putword', JSON.stringify(data_post), this.httpOptions)
  }


  save_word(data) {
    const data_post = {'word': data}
    console.log('enviado to save')
    console.log( JSON.stringify(data_post) )
    return  this.http.post('/redis/saveword', JSON.stringify(data_post), this.httpOptions)
  }

  async get_words() {
    console.log('enviado to get words')
    const result = await this.http.post('/redis/getwords', {}, this.httpOptions).toPromise()

    return result
    
  }

  async clear_words() {
    console.log('Clar words')
    const result = await this.http.post('/redis/clearwords', {}, this.httpOptions).toPromise()

    return result
    
  }
}
