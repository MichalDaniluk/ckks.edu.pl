export interface BlogItem {
	href:string;
	obrazek:string;
	nazwa:string;
	zajawka:string;
	tytul:string;
	pid:string;
	plik_duzy:string;
	body:string;
}

export type BlogItems = {
	items:BlogItem[];
}

export type BlogSection = {
	title:string;
	items:BlogItem[];
}
