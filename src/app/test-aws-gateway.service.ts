import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as aws4 from 'aws4';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from "./../environments/environment";

const opts: any = { 
  method: environment.api.method,
  host: environment.api.host, 
  path: environment.api.path, 
};

const credential = {
  accessKeyId: environment.credential.accessKeyId,
  secretAccessKey: environment.credential.secretAccessKey
};

@Injectable({
  providedIn: 'root'
})
export class TestAwsGatewayService {

  constructor(private httpClient: HttpClient) {
    console.log('Options before sign: ', opts);
    aws4.sign(opts, credential);
    console.log('Options after sign: ', opts);
  } 

  getData(): Observable<any> {
    return this.httpClient.get<any>('https://' + opts.host + opts.path, {
      headers: {
        'Authorization': opts.headers!['Authorization'] as string,
        'X-Amz-Date': opts.headers!['X-Amz-Date'] as string
      }
    }).pipe(
      map(response => JSON.parse(response.body))
    );
  }
}
