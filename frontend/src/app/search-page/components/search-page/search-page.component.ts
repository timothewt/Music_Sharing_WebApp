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

	artistsSearchResults: User[] = [];
	albumsSearchResults: Album[] = [];
	songsSearchResults: Song[] = [];
	searchType: string = "all";

	constructor(private apiService: APIService) { }

	ngOnInit(): void {}

	changeSearchType(type: string): void {
		this.searchType = type;
	}

	displaySearch(searchValue: string): void {
		if (this.searchType === "songs" || this.searchType === "all") {
			this.findSongs(searchValue);
		}
		if (this.searchType === "albums" || this.searchType === "all") {
			this.findAlbums(searchValue);
		}
		if (this.searchType === "artists" || this.searchType === "all") {
			this.findArtists(searchValue);
		}
	}

	public findArtists(searchValue: string): void {
		/*
		* This function should call the API service to find artists that match the search value
		* params: searchValue - the value to search for
		* return: void
		*/
		this.apiService.getUsers({limit: 5, mostPopular: true, searchedValue: searchValue}).subscribe(
			(response: any) => {
				this.artistsSearchResults = [];
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
				this.albumsSearchResults = [];
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
				this.songsSearchResults = [];
				for(let i = 0; i < response.length; i++) {
					let song = new Song().deserialize(response[i]);
					this.songsSearchResults.push(song);
				}
			}
		);
	}
}
