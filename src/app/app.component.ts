import { Component, OnInit, inject } from '@angular/core';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { HttpClient } from '@angular/common/http';
import { TrueManga } from '../classes/Mangas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  trueMangaArr: TrueManga[] = [];

  constructor(private http: HttpClient, private bottomSheet: MatBottomSheet) {}

  ngOnInit() {
    this.http
      .get<TrueManga[]>('https://klk-api.herokuapp.com/mangas')
      .subscribe((res: any) => {
        res.forEach((manga: any) => {
          const object: TrueManga = new TrueManga(
            manga.Datos,
            manga.Personal,
            manga.Tags,
            manga.tipo,
            manga.apiID,
            manga._id
          );
          this.trueMangaArr.push(object);
        });
      });
  }

  leer(manga: TrueManga): void {
    this.bottomSheet.open(BottomSheetComponent, {
      data: { manga },
    });
  }
}
