import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import type { AlbumEntry, Album, Track, Video } from './types'

interface APIAlbum {
  title: string;
  id: string;
}

interface APIAlbumDetails{
  title: string;
  year: string;
  images: AlbumCover[];
  genres: string[];
  tracklist: Track[];
  videos: Video[];
}

interface AlbumCover {
  uri: string;
}


interface AlbumReleases{
  releases: APIAlbum[];
}

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  albumSubject: Subject<AlbumEntry[]> = new Subject();

  constructor() { }

  private adaptDetails (apiAlbum: APIAlbumDetails): Album {
    return {
      title: apiAlbum.title,
      year: apiAlbum.year,
      cover: apiAlbum.images[0].uri,
      genre: apiAlbum.genres,
      trackList: apiAlbum.tracklist,
      video: apiAlbum.videos?.map(video=> video.uri),
      }
  }

  private adaptAlbum(apiAlbum: APIAlbum): AlbumEntry {
    return {
      name: apiAlbum.title,
      id: apiAlbum.id,
    }
  }

  async getAlbuns(name: string): Promise <AlbumEntry[]>{
    const albumListRequest = await fetch(`https://disks-project.herokuapp.com/disks?artist=${name}`);
    const apiAlbuns = await albumListRequest.json() as AlbumReleases;
    const album = apiAlbuns.releases.map(this.adaptAlbum);
    this.albumSubject.next(album);
    return album;
  }

  async getAlbumById(id: string): Promise<Album> {
    const albumRequest = fetch(`https://disks-project.herokuapp.com/disk/${id}`)
    const album = await (await albumRequest).json() as APIAlbumDetails;
    return this.adaptDetails(album);
  }
}
