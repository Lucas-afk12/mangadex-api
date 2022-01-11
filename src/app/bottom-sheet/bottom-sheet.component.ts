import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { HttpClient } from '@angular/common/http';
import { TrueManga } from '../../classes/Mangas';

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
  trueManga: TrueManga;
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public manga: any,
    private http: HttpClient
  ) {}
  ngOnInit() {
    this.trueManga = this.manga.manga;
    console.log(this.trueManga);
  }
}
