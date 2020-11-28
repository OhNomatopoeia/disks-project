import { Component, OnInit } from '@angular/core';
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
    const albums = await this.listingService.getAlbuns();

    this.albumLinks = albums.map((album) =>{
      return {
        text: album.name,
        url: `selected-album/${album.id}`
      }
    });
  }

}
