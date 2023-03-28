import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Post } from './posts.model';
import { map } from 'rxjs';

@Injectable({providedIn:'root'})
export class PostService{
    constructor(private http:HttpClient){

    }
    fetchPosts(){
     return   this.http.get('https://angularreactiveforms-30421-default-rtdb.firebaseio.com/posts.json')
      .pipe(map((response)=>{
        let posts:Post[]=[];
        for (let key in response){
          posts.push({...response[key],key})
        }
        return posts;
 
      }))
     

    }
    createPosts(PostData:Post){
    return this.http.post('https://angularreactiveforms-30421-default-rtdb.firebaseio.com/posts.json',PostData)
     

    }
    clearPosts(){
        return this.http.delete('https://angularreactiveforms-30421-default-rtdb.firebaseio.com/posts.json')
         .subscribe((response)=>{
            console.log(response)
         })
    
        }

}