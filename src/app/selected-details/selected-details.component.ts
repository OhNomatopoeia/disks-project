import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from '../details.service';
import { ListingService } from '../listing.service';
import { Album, Track } from '../types';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-selected-details',
  templateUrl: './selected-details.component.html',
  styleUrls: ['./selected-details.component.css']
})
export class SelectedDetailsComponent implements OnInit {

  title: string ='';
  year: string = ' ';
  cover: string = '';
  genre: string[] = [];
  tracks: Track[] = [];
  videos: SafeResourceUrl[] = [];
  loading: boolean = false;

  private activeAlbum?: Album;

  constructor(private aRoute: ActivatedRoute,
    private listingService: ListingService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe(async (paramMap) => {
      const id = paramMap.get('albumId') || '';
      this.loading = true;
      this.activeAlbum = await this.listingService.getAlbumById(id);
      this.loading = false;
      this.title = this.activeAlbum.title;
      this.year = this.activeAlbum.year;
      this.cover = this.activeAlbum.cover;
      this.genre = this.activeAlbum.genre;
      this.tracks = this.activeAlbum.trackList;
      if (this.activeAlbum.video){
        this.videos = this.activeAlbum.video.map(video => this.sanitizer.bypassSecurityTrustResourceUrl(video));
      }
      
    });

  }

}
