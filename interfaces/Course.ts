export interface CourseElement {
	obrazek_trzy: string,
	obrazek?: string,
	href: string,
	kategoria: string,
	imie_nazwisko: string,
	miejscowosc: string,
	data_od: string,
	data_do:string,
	cena: string,
	firstprice: firstPrice,
	specjalizacja: string
	nazwa: string,
	zajawka:string
}

export interface SearchCourse {
	cena:number,
	href:string,
	kategoria:string
	menu:string,
	nazwa:string,
	obrazek:string
	obrazek_trzy:string
	specjalizacja:string,
	zajawka:string
}

export interface CategoryName {
	category:string
}

export interface CourseTitle {
	title:string
}

export enum firstPrice {
	YES = 'T',
	NO = 'N'
}

export enum YesNo {
	YES = 'Tak',
	NO = 'Nie'
}

export interface showPrice {
	firstprice:firstPrice,
	date:string,
	price:string,
}

export enum courseType {
	FIZJOTERAPIA = 'fizjo',
	TRENERSKIE = 'trenerskie',
	OSWIATA = 'oswiata',
	ONLINE = 'online',
	INSTRUKTORSKIE = 'instruktorskie',
	SPORT = 'sport',
	ALL = '',
	FIND = 'find'
}

export type InstructorItems = InstructorItem[];

export interface InstructorItem {
	zajawka?: string,
    nazwisko_sort?: string,
    imie_nazwisko: string,
    opis?: string,
    instruktor_id: number,
    menu?: string,
    group?: string,
}

export interface InstructorImage {
	instruktor_plik: number,
    instruktor_id: number,
    plik: string,
    glowne: YesNo,
    dodano: string,
    dodal: string
}

export type InstructorImages = InstructorImage[];

export interface IGroup {
	value: string,
    key: number,
    menu: string
}
export interface IPage {
	strona_id: number,
  name: string,
	sort: number,
	show: YesNo,
	href: string,
	title: string,
	body: string,
	obrazek: string,
	key: string,
	description: string,
	zajawka: string,
	dof: YesNo,
	obrazek_duzy: string
}

export interface CourseItem {
	kategoria: string,
    nazwa: string,
    cena: number,
    obrazek: string,
    obrazek_trzy: string,
    zajawka: string,
	menu: string,
    specjalizacja: string
	href: string,
	firstprice?:firstPrice,
	data_od?:string,
}

export interface Opinion {
	ankieta_absolwenta_id: number,
    kurs_osoba_uwagi: string,
    data_od: string,
    data_do: string,
    miejscowosc: string,
    nazwa: string
}

export interface INumbers {
	icon:any,
	info:string,
	num:number
}
