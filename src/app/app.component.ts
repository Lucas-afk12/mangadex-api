import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//interfaces


//estructura del manga

class TrueManga {
  id:string
  attributes:MangaData
  relationships:Array<Relaciones>
  imagen:string

  constructor(){}


  get image() {
    return this.imagen
  }
  
  set image(data:string) {
    this.imagen = data;
  }
  
  
}



  //datos del manga

interface MangaData {
  contentRating:string
  createdAt:string,
  description:Descripcion,
  title: Title,
  publicationDemographic:string

}

 

      //sup partes de mangadata

interface Descripcion {
  en:string
}

interface Title {
  en:string
}

  //Relaciones

interface Relaciones{
  attributes:Atributo
}


      //datos de las relaciones

interface Atributo{
  fileName:string
}


//componente


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit  {

    imagen: string 
    mangas:any
    trueManga : TrueManga[] = []

    constructor(private http: HttpClient) {
    }
    
    ngOnInit(){

      this.http.get<TrueManga>("https://api.mangadex.org/manga?includes[]=cover_art&limit=100"
      )
      .subscribe( res => 
        {
          this.mangas = res
          this.trueManga = this.mangas.data
          this.instcover()
        })
      }

      instcover() 
      {
        for (let manga of this.trueManga){

          for(let relaciones of manga.relationships){     

            if (relaciones.attributes != undefined){
              
              this.imagen=`https://uploads.mangadex.org/covers/${manga.id}/${relaciones.attributes.fileName}.512.jpg`
              manga.image=this.imagen
            }
      
    }}

      }

      Ondetail(data:any){
       console.log(data) 
      }
      

}
