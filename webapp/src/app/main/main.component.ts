import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service'



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  test = 'cuec'
  word = ''
  words = []
  @Input() wordIn: string;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    
  }

  

  pushword(data) {
    console.log(data)
    this.api.push_data(data).subscribe( (res) => this.word = res['crypted'])
  }

  saveword() {
    this.api.save_word(this.word).subscribe( (res) => console.log(res))
  }

  getwords(){
    this.api.get_words().then( res => {
      console.log(res['words'])
      this.words = res['words']
    });
  }

  clearwords(){
    this.api.clear_words().then( res => {
      console.log(res)
  });
}




}
