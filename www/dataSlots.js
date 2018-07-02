// SlotsDelphiDeveloperSummit2018
// const summitSessions = new Sessions(2018);
const summitSessions = new Sessions(2019);

function Sessions(year) {
	if (year===2019) {
		this.data = [{
			id:'cz1000', date:'2019-06-06T10:15+02:00', duration:90,
			sessions: [
				{track:0, lang:'eng', speaker:'Speaker Embarcadero', subject:'Keynote wednesday'}]
		}, {
			id:'cz1200', date:'2019-06-06T12:00+02:00', duration:75,
			sessions: [
				{track:1, lang:'eng', speaker:'Guest One', subject:'Session subject A'},
				{track:2, lang:'pl', speaker:'Wykładowca Pierwszy', subject:'Temat wykładu A'}]
		}, {
			id:'cz1330', date:'2019-06-06T13:30+02:00', duration:75,
			sessions: [
				{track:1, lang:'eng', speaker:'Guest Two', subject:'Session subject B'},
				{track:2, lang:'pl', speaker:'Wykładowca Drugi', subject:'Temat wykładu B'}]
		}, {
			id:'cz1600', date:'2019-06-06T16:00+02:00', duration:75,
			sessions: [
				{track:1, lang:'eng', speaker:'Guest Three', subject:'Session subject C'},
				{track:2, lang:'pl', speaker:'Wykładowca Trzeci', subject:'Temat wykładu C'}]
		}, {
			id:'cz1730', date:'2019-06-06T17:30+02:00', duration:75,
			sessions: [
				{track:1, lang:'eng', speaker:'Guest Four', subject:'Session subject D'},
				{track:2, lang:'pl', speaker:'Wykładowca Czwarty', subject:'Temat wykładu D'}]
		}, {
			id:'pt1000', date:'2019-06-07T10:00+02:00', duration:75,
			sessions: [
				{track:1, lang:'eng', speaker:'Guest Five', subject:'Session subject E'},
				{track:2, lang:'pl', speaker:'Wykładowca Piąty', subject:'Temat wykładu E'}]
		}, {
			id:'pt1130', date:'2019-06-07T11:30+02:00', duration:75,
			sessions: [
				{track:1, lang:'eng', speaker:'Guest Six', subject:'Session subject F'},
				{track:2, lang:'pl', speaker:'Wykładowca Szósty', subject:'Temat wykładu F'}]
		}, {
			id:'pt1300', date:'2019-06-07T13:00+02:00', duration:75,
			sessions: [
				{track:1, lang:'eng', speaker:'Guest Seven', subject:'Session subject G'},
				{track:2, lang:'pl', speaker:'Wykładowca Siódmy', subject:'Temat wykładu G'}]
		}]
	} else if (year===2018) {
		this.data = [{
			id:'wt1030', date:'2018-06-19T10:00+02:00', duration:75,
			sessions: [
				{track:0, lang:'eng', speaker:'Marco Cantu', subject:'Delphi: Whats New and Whats Coming'}]
		}, {
			id:'wt1215', date:'2018-06-19T12:15+02:00', duration:75,
			sessions: [
				{track:1, lang:'eng', speaker:'Stefan Glienke', subject:'Efficient data structures in Delphi'},
				{track:2, lang:'pl', speaker:'Mikołaj Milewski', subject:'Jak APIć w Delphi?'}]
		}, {
			id:'wt1445', date:'2018-06-19T14:45+02:00', duration:75,
			sessions: [
				{track:1, lang:'eng', speaker:'Brian Long', subject:'IDE Productivity Tips'},
				{track:2, lang:'pl', speaker:'Zdzisław Sroczyński', subject:'Automatyzacja aplikacji w Delphi - kuzyni i dalsza rodzina'}]
		}, {
			id:'sr1000', date:'2018-06-20T10:00+02:00', duration:75,
			sessions: [
				{track:1, lang:'eng', speaker:'Marco Cantu', subject:'VCL Applications on Windows 10'},
				{track:2, lang:'pl', speaker:'Bogdan Polak', subject:'Migracja "dojrzałych" projektów VCL'}]
		}, {
			id:'sr1130', date:'2018-06-20T11:30+02:00', duration:75,
			sessions: [
				{track:1, lang:'eng', speaker:'Brian Long', subject:'How to Access the Android API'},
				{track:2, lang:'pl', speaker:'Piotr Chlebek', subject:'Propagacja wsteczna błędu w sieciach neuronowych'}]
		}, {
			id:'sr1300', date:'2018-06-20T13:00+02:00', duration:75,
			sessions: [
				{track:1, lang:'eng', speaker:'Stefan Glienke', subject:'Software testing - DUnit, Mocks and TestInsight'},
				{track:2, lang:'pl', speaker:'Mirosław Kardaś', subject:'Delphi dla elektronika'}]
		}]
	} else {
		this.data = [];
	}
}
