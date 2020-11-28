import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ListingService } from '../listing.service';

interface Link {
  text: string;
  url: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  albumLinks: Link[] = [];

  constructor(
    private listingService: ListingService
  ) { }

  async ngOnInit(): Promise<void> {
    this.listingService.albumSubject.subscribe(albums =>
       this.albumLinks = albums.map((album) =>{
        return {
          text: album.name,
          url: `selected-album/${album.id}`
        }
      }) )
  }

}
