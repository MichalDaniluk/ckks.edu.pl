export function getDateNow(): string {
	const currentDate = new Date();
	const cDay = currentDate.getDate();
	const cMonth = currentDate.getMonth() + 1;
	const cYear = currentDate.getFullYear();
	return cYear + "-" + cMonth + "-" + cDay;
}

/**
 * @param  {string} dateFrom
 * @param  {string} date
 * @param  {number} price
 * @returns first price format
 */
export function setFirstPriceFormat(dateFrom: string, date: string, price: number): string {

	if(dateLessDays(dateFrom, date, 60)) {
		return setPriceFormat(price);
	} else if (dateBeetwenDays(dateFrom, date, 60, 98 )) {
		return setPriceFormat(price - price * 0.1);
	} else if (dateBeetwenDays(dateFrom, date, 99, 130)) {
		return setPriceFormat(price - price * 0.15);
	} else if (dateMoreDays(dateFrom, date, 130)) {
		return setPriceFormat(price - price * 0.2);
	} else {
		return setPriceFormat(price);
	}
}

function prepareDate(dateFrom:string, dateTo:string, dateCheck:string) {
  const d1 = dateFrom.split('-');
  const d2 = dateTo.split('-');
  const c = dateCheck.split('-');

  const from = new Date( parseInt(d1[2]), parseInt(d1[1]) - 1, parseInt(d1[0])); // -1 because months are from 0 to 11
  const to = new Date( parseInt(d2[2]), parseInt(d2[1]) - 1, parseInt(d2[0]));
  const check = new Date(parseInt(c[2]), parseInt(c[1]) - 1, parseInt(c[0]));

  return { from, to, check };
}

export function howManyDays(dateFrom:string, dateTo:string):number {
  const date1 = new Date(dateFrom);
  const date2 = new Date(dateTo);
  const time_difference = date2.getTime() - date1.getTime();
  return Math.round(time_difference / (1000 * 60 * 60 * 24));
}

export function dateBeetwenDays(dateFrom:string, dateTo:string, dayFrom:number, dayTo:number):boolean {
	const days = howManyDays(dateFrom, dateTo);
	return dayFrom <= days && dayTo >= days ? true : false;
}

export function dateMoreDays(dateFrom:string, dateTo:string, dayTo:number):boolean {
  const days = howManyDays(dateFrom, dateTo);
  return dayTo < days ? true : false;
}

export function dateLessDays(dateFrom:string, dateTo:string, dayTo:number):boolean {
	const days = howManyDays(dateFrom, dateTo);
	return dayTo > days ? true : false;
}

export function dateBeetwenDates(dateFrom:string, dateTo:string, dateCheck:string):boolean {
  const d = prepareDate(dateFrom, dateTo, dateCheck);
  return d.check > d.from && d.check < d.to ? true : false;
}

export function dateMoreDates(dateFrom:string, dateTo:string, dateCheck:string):boolean {
  const d = prepareDate(dateFrom, dateTo, dateCheck);
  return d.check > d.to ? true : false;
}

/* get price format, without numbers after dot */
export function setPriceFormat(price:number):string {
	if (price >= 0) {
		if( price.toString().includes('.') ) {
			return Math.floor(price).toString() + ' PLN';
		}
		else return price.toString()+' PLN';
  } else {
    return '0 PLN';
  }
}

/**
 * @param  {string} data_od Date when course is starting from
 * @param  {string} data_do Date when course is ending
 * @returns string  Date in the required format
 */
export function setDateTermFormat(data_od:string, data_do:string):string {

	try {
		if (!data_od || !data_do) {
			return '';
		}

	const d1 = data_od.split('-');
	const d2 = data_do.split('-');


  const _od = d1[2]
    .replace('01', '1')
    .replace('02', '2')
    .replace('03', '3')
    .replace('04', '4')
    .replace('05', '5')
    .replace('06', '6')
    .replace('07', '7')
    .replace('08', '8')
    .replace('09', '9');
  const _do = d2[2]
    .replace('01', '1')
    .replace('02', '2')
    .replace('03', '3')
    .replace('04', '4')
    .replace('05', '5')
    .replace('06', '6')
    .replace('07', '7')
    .replace('08', '8')
    .replace('09', '9');

  const _miesiac_od = d1[1];
  const _miesiac_do = d2[1];

  const _rok_od = d1[0];
  const _rok_do = d2[0];

  const _miesiac_pl = {
    '01': 'stycznia',
    '02': 'lutego',
    '03': 'marca',
    '04': 'kwietnia',
    '05': 'maja',
    '06': 'czerwca',
    '07': 'lipca',
    '08': 'sierpnia',
    '09': 'września',
    '10': 'października',
    '11': 'listopada',
    '12': 'grudnia',
  };

  let _result = '';

  if (_od == _do && _miesiac_od == _miesiac_do && _rok_od == _rok_do) {
    _result = _od + ' ' + _miesiac_pl[_miesiac_od] + ' ' + _rok_od;
  } else if (_od !== _do && _miesiac_od == _miesiac_do && _rok_od == _rok_do) {
    _result = _od + '-' + _do + ' ' + _miesiac_pl[_miesiac_od] + ' ' + _rok_od;
  } else if (_od == _do && _miesiac_od == _miesiac_do && _rok_od !== _rok_do) {
    _result =
      _od +
      ' ' +
      _miesiac_pl[_miesiac_od] +
      ' ' +
      _rok_od +
      ' - ' +
      _do +
      ' ' +
      _miesiac_pl[_miesiac_do] +
      ' ' +
      _rok_do;
  } else if (_miesiac_od != _miesiac_do && _rok_od == _rok_do) {
    _result =
      _od +
      ' ' +
      _miesiac_pl[_miesiac_od] +
      ' - ' +
      _do +
      ' ' +
      _miesiac_pl[_miesiac_do] +
      ' ' +
      _rok_do;
  } else if (_miesiac_od != _miesiac_do && _rok_od !== _rok_do) {
    _result =
      _od +
      ' ' +
      _miesiac_pl[_miesiac_od] +
      ' ' +
      _rok_od +
      ' - ' +
      _do +
      ' ' +
      _miesiac_pl[_miesiac_do] +
      ' ' +
      _rok_do;
  } else {
    _result = '';
  }

  return _result;

} catch(error) {
	return error;
}
}
/**
 * @param  {string=''} path Path to file
 * @returns string | null Last part of path string, is file name
 */
export function getFileNameFromPath(path:string):string|null {
	if ( path === undefined || path === '' || path === null || path.includes('..') ) return null;
	if( !path.includes("/") ) return path;
	return path.split(/[/]+/).pop() || null;
}
/**
 * Asynchronic function to get data from url where is json resource
 * @param  {string} url URL to json
 * @returns  Promise
 */
export async function getData(url:string): Promise<any> {
	const response = await fetch(url);
	return await response.json();
}
/**
 * Function changes polish letters to latin letters
 * @param  {string} word Polish words with polish letters
 * @returns string Words without polish letters
 */
export function polishLettersToLatin(word:string):string {
	if (!word || typeof word !== 'string') {
		return '';
	}
	return word
        .replace(/\s+/g, '-')
        .replace(/ł+/g, 'l')
        .replace(/ó+/g, 'o')
        .replace(/ą+/g, 'a')
        .replace(/ś+/g, 's')
        .replace(/ć+/g, 'c')
        .replace(/ę+/g, 'e')
        .replace(/ź+/g, 'z')
        .replace(/z+/g, 'z')
        .replace(/ń+/g, 'n')
		.replace(/ż+/g, 'z');
}

export function validateEmail(email:string):boolean {
	const regularExpression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regularExpression.test(String(email).toLowerCase());
}

export function generateInstructorImagePath(name:string): string {
	return `/o/instruktor/${polishLettersToLatin(name || '')}.jpg`;
}



export const getRequest = (url:string) => {
	return fetch(url);
};

export  function fetchData<T>(url:string): Promise<T> {
	return getRequest(url)
	.then(res => res.json()
	.catch(err => err.message));
}

export const isEquivalent = (a, b) => {
	const aProps = Object.getOwnPropertyNames(a);
	const bProps = Object.getOwnPropertyNames(b);

  if (aProps.length != bProps.length) {
    return false;
  }

  for (let i = 0; i < aProps.length; i++) {
    const propName = aProps[i];

    if (a[propName] !== b[propName]) {
      return false;
    }
	}
	return true;
};

export const isObject = (object: unknown): boolean => {
	return !!object && typeof object === 'object';
};
