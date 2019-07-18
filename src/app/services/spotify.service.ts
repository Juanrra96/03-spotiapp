import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable()
export class SpotifyService {

  constructor( private http: HttpClient) { 
    console.log('Spotify service listo');
 }

  getQuery( query: string ){ 
    
    const url = `https://api.spotify.com/v1/${ query }`;
    
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQCaU6iLWS6Py4xHyljzsRmH5IxWp6aCt0n54f9jFmw0TrkTRsczp5kQ67nwo3NPmOgTeM23agOn3L5eVKw'
    });

    return this.http.get(url, { headers });
  }

  getNewReleases(){

  //  const headers = new HttpHeaders({
  //    'Authorization': 'Bearer BQDbo1q08xjgb3iklWuieMkCd5_b9AM6Ptgv9d-bPCF75TMC0vVNpNMjGjIGYTHPgYVlj6ObZJ_u-FV06WA'
  //  });

   return this.getQuery('browse/new-releases')
            .pipe( map( data =>{
            return data['albums'].items;
             } ) );
  
  }


  getArtistas( termino: string){
  
  return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
           .pipe( map(data =>{
            return data['artists'].items;
            }));
  }
 

  getArtista( id: string){
  
    return this.getQuery(`artists/${id}`);
             //.pipe( map(data =>{
             //return data['artists'].items;
             // }));
    }

    getTopTracks( id: string){
  
      return this.getQuery(`artists/${id}/top-tracks?country=us`)
               .pipe( map(data =>{
               return data['tracks']
               }));
      }
  

}


 


