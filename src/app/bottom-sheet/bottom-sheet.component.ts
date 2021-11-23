import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { TrueManga_interface } from '../app.component';
import { HttpClient } from '@angular/common/http';

interface volumes {
  chapters: chapters;
  volume: string;
}

interface chapters {
  id: string;
  chapter: string;
}

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css'],
})
export class BottomSheetComponent implements OnInit {
  a: any;
  mangaInfo: TrueManga_interface;
  chapter: any[] = [];
  trueChapter: volumes[] = [];

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public manga: any,
    private http: HttpClient
  ) {
    this.a = manga;
    this.mangaInfo = this.a.manga;
  }

  ngOnInit(): void {
    this.http
      .get<volumes[]>(
        `https://api.mangadex.org/manga/${this.mangaInfo.id}/aggregate`
      )
      .subscribe((res: any) => {
        this.chapter.push(res.volumes);
        console.log(this.chapter);
        this.Arrayfix();
      });
  }

  Arrayfix() {
    for (let a of this.chapter) {
      let cnt = Object.keys(a).length;
      for (let x = 0; x <= cnt; x++) {
        if (a['none'] != undefined) {
          this.trueChapter.push(a['none']);
        }

        if (a[x] != undefined) {
          this.trueChapter.push(a[x]);
        }
      }
    }
    console.log(this.trueChapter);
  }
}
