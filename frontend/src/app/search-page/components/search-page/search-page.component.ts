import { Component, OnInit} from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { User } from 'src/app/models/user';
import { Album } from 'src/app/models/album';
import { Song } from 'src/app/models/song';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  public artistsSearchResults: User[] = [];
  public albumsSearchResults: Album[] = [];
  public songsSearchResults: Song[] = [];

  constructor(private apiService: APIService) { }

  ngOnInit(): void {
  }

  displaySearch(searchValue: string): void {
    console.log(searchValue);
    this.artistsSearchResults = [];
    this.albumsSearchResults = [];
    this.songsSearchResults = [];
    
    //this.findArtists(searchValue);
    this.findAlbums(searchValue);
    this.findSongs(searchValue);
  }

  public findArtists(searchValue: string): void {
    /*
    * This function should call the API service to find artists that match the search value
    * params: searchValue - the value to search for
    * return: void
    */
    this.apiService.getUsers({limit: 5, mostPopular: true, searchedValue: searchValue}).subscribe(
      (response: any) => {
        for(let i = 0; i < response.length; i++) {
          let artist = new User().deserialize(response[i]);
          this.artistsSearchResults.push(artist);
        }
      }
    );
  }

  public findAlbums(searchValue: string): void {
    /*
    * This function should call the API service to find albums that match the search value
    * params: searchValue - the value to search for
    * return: void
    */
    this.apiService.getAlbums({limit: 5, mostPopular: true, searchedValue: searchValue}).subscribe(
      (response: any) => {
        for(let i = 0; i < response.length; i++) {
          let album = new Album().deserialize(response[i]);
          this.albumsSearchResults.push(album);
        }
      }
    );
  }

  public findSongs(searchValue: string): void {
    /*
    * This function should call the API service to find songs that match the search value
    * params: searchValue - the value to search for
    * return: void
    */
    this.apiService.getSongs({limit: 5, mostPopular: true, searchedValue: searchValue}).subscribe(
      (response: any) => {
        for(let i = 0; i < response.length; i++) {
          let song = new Song().deserialize(response[i]);
          this.songsSearchResults.push(song);
        }
      }
    );
  }



  
}
