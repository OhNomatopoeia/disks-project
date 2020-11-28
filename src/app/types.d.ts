interface AlbumEntry  {
    name: string;
    id: string;
}

interface Album{
    title: string;
    year: string;
    cover: string;
    genre: string[];
    trackList: Track[];
    video: string[];
}

interface Video{
    uri: string;
}

interface Track {
    title: string;
    duration: string;
    position: string;
  }

export type { AlbumEntry, Album, Track, Video }