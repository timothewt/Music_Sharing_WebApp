export interface APIGetOptions {
	limit: number;
	offset?: number;
	mostPopular?: boolean;
	searchedValue?: string;
	artistId?: number;
	albumId?: number;
}
