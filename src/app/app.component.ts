import {Component, OnInit, inject} from '@angular/core';
import {BottomSheetComponent} from './bottom-sheet/bottom-sheet.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {HttpClient} from '@angular/common/http';
import {AUTO_STYLE} from '@angular/animations';

//estructura del manga

export class TrueManga_interface {
  id: string = '';
  attributes: MangaData;
  relationships: Array<Relaciones>;
  imagen: string = '';
  auto: string | undefined = '';
  type: string = '';

  constructor(id: string) {
    this.id = id;
  }

  get image() {
    return this.imagen;
  }

  set image(data: string) {
    this.imagen = data;
  }

  set autor(data: string | undefined) {
    this.auto = data;
  }
}

//datos del manga

interface MangaData {
  contentRating: string;
  createdAt: string;
  status: string;
  description: Descripcion;
  title: Title;
  publicationDemographic: string;
}

interface Descripcion {
  en: string;
}

interface Title {
  en: string;
}

//Relaciones

interface Relaciones {
  attributes: Atributo;
}

interface Atributo {
  fileName: string;
  name: string;
}

//componente

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  imagen: string;
  mangas: any;
  trueManga: TrueManga_interface[] = [];

  constructor(private http: HttpClient, private bottomSheet: MatBottomSheet) {}

  ngOnInit() {
    for (let i = 4; i < 6; i++) {
      this.http
        .get<TrueManga_interface>(
          `https://api.mangadex.org/manga?includes[]=cover_art&includes[]=author&limit=100&offset=5${i}00`
        )
        .subscribe((res:any) => {
          this.trueManga.push(res.data);
          this.trueManga = this.trueManga.flat(1);
          console.log(this.trueManga)
          this.instcover();
        });
    }
  }

  instcover() {
    for (let manga of this.trueManga) {
      for (let relaciones of manga.relationships) {
        if (relaciones.attributes != undefined) {
          this.imagen = `https://uploads.mangadex.org/covers/${manga.id}/${relaciones.attributes.fileName}.256.jpg`;
          manga.image = this.imagen;

          if (relaciones.attributes.name !== undefined) {
            manga.autor = relaciones.attributes.name;
          }
        }
      }
    }
  }

  leer(manga: TrueManga_interface): void {
    this.bottomSheet.open(BottomSheetComponent, {
      data: { manga },
    });
  }
}
