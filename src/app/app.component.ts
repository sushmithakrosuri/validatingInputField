import { HttpClient } from '@angular/common/http';
import { Component ,OnInit} from '@angular/core';
import {FormGroup,FormControl,Validators,FormControlName} from '@angular/forms';
//import { customValidator } from './custom';
import { AbstractControl,ValidatorFn } from "@angular/forms";
import { map } from 'rxjs';
import { Post } from './posts.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'validatinginputfeild';
  form:FormGroup;
  blockedNumbersRegex = /[\d]/g;
  blockedCapitalLettersRegex = /[A-Z]/g;
  posts:Post[];
  constructor(
    private postService:PostService
   // private http:HttpClient)
  ){}
  ngOnInit(){
    this.form = new FormGroup({
      name: new FormControl('', 
      //[Validators.required,customValidator()]
      [Validators.pattern(/^[a-z]*$/),
      Validators.pattern(/^[^0-9]*$/),
      //Validators.pattern(/^[^A-Z]*$/),
      //Validators.pattern(),
      this.noSpaceValidator,
      this.nameValidator,
      this.noUppercaseValidator
    ]
      ),
      // /^((?!(.*[\^\$\.\|\?\*\+\(\)\[\]\{\}\\\/])).)*$/
      //'^[^!@#$%^&*(),.?":{}|<>]+$'
      // /^[^!@#$%^&*(),.?":{}|<>]+$/
      //^[a-zA-Z0-9 ]+$
      fullname: new FormControl(''),
    })

    this.getPosts();
  }

  onCreatePost(){
    //console.log(this.form.value)
     const postData:Post=this.form.value
     //this.http.post('https://angularreactiveforms-30421-default-rtdb.firebaseio.com/posts.json',postData)
    this.postService.createPosts(postData)
    .subscribe((response)=>{
       this.getPosts();
       
     })
  }
  
  getPosts(){
    //  this.http.get('https://angularreactiveforms-30421-default-rtdb.firebaseio.com/posts.json')
    //  .pipe(map((response:{[key:string]:Post})=>{
    //    let posts:Post[]=[];
    //    for (let key in response){
    //      posts.push({...response[key],key})
    //    }
    //    return posts;

    // }))
    this.postService.fetchPosts()
    .subscribe((response:Post[])=>{
       this.posts=response;
     })
  }

  onClearPosts(){
    this.postService.clearPosts();
    this.posts=[]
  }
  /*onInput(event: any) {
    const currentValue = event.target.value;
      //event.target.value = currentValue.replace(this.blockedCapitalLettersRegex, '');
      event.target.value = currentValue.replace(this.blockedNumbersRegex, '');
    }
    onInput1(event: any) {
      const currentValue = event.target.value ;
        event.target.value = currentValue.replace(this.blockedCapitalLettersRegex, '');
        //event.target.value = currentValue.replace(this.blockedNumbersRegex, '');
      }*/

    onInput(event:any) {
        //const regex=/[^a-z]/gi
        const regex = /[A-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
        event.target.value = event.target.value.replace(/[^a-z]/gi, '');
        if (regex.test(event.target.value)) {
          event.target.value = event.target.value.replace(regex, '');
          event.target.value = event.target.value;
        }
      }
  noSpaceValidator(control) {
    const hasSpace = control.value.indexOf(' ') >= 0;
    return hasSpace ? { spaceInInput: true } : null;
  }
   noUppercaseValidator(control) {
    const hasCap=/[A-Z]/.test(control.value)
     //const hasSpace = control.value==control.value.toUpperCase();
     return hasCap ? { CapitalInInput: true } : null;
   }
  
  // noUppercaseValidator(control: FormControl): { [key:string]: boolean } {
  //   const nameRegexp: RegExp = /^[^A-Z]*$/;
  //   if (control.value && nameRegexp.test(control.value)) {
  //     return { CapitalInInput: true };
  //  }
  //  return null;
  // }
  

  nameValidator(control: FormControl): { [key:string]: boolean } {
        const nameRegexp: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        if (control.value && nameRegexp.test(control.value)) {
          return { invalidName: true };
       }
       return null;
    }

     
      
      /*onInput(event:any) {
        const regex = /[^a-z]/gi;
        if (regex.test(event.target.value)) {
          // If the value contains any capital letters, numbers, special characters, or spaces,
          // remove them from the input field's value
          event.target.value = event.target.value.replace(regex, '');
        }
      }*/
  /*customValidator(): ValidatorFn {
    return (control: AbstractControl): { [key:string]: {message?} } | null => {
  
      if (!new RegExp(/^[^0-9]*$/).test(control.value)) {
        return {
          pattern1Error: {
            message: `Numbers not allowed`
          }
        };
      } 
  
      if (!new RegExp(/^[^A-Z]*$/).test(control.value)) {
        return {
          pattern2Error: {
            message: `Capital letters not allowed`
          }
        };
      } 
       
  
     return null;
    };
  }*/
}
