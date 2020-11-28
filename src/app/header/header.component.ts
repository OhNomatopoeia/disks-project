import { Component, OnInit } from '@angular/core';
import { ListingService } from '../listing.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  albumSearch;
  loading: boolean = false;

  constructor(
    private listingService: ListingService,
    private formBuilder: FormBuilder,
  ) {
    this.albumSearch = this.formBuilder.group({
      artist: '',
    });
   }

  ngOnInit(): void {
  }
  
  async getAlbum(name:string): Promise<void>{
    this.loading = true;
    await this.listingService.getAlbuns(name);
    this.loading = false;
  }
}
