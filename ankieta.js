summitSlots = [{
	id:'wt1030', date:'2018-06-19T10:00+02:00', duration:75,
	sessions: [
		{track:0, speaker:'Marco Cantu', subject:'Delphi: Whats New and Whats Coming'}]
}, {
	id:'wt1215', date:'2018-06-19T12:15+02:00', duration:75,
	sessions: [
		{track:1, speaker:'Stefan Glienke', subject:'Efficient data structures in Delphi'},
		{track:2, speaker:'Mikołaj Milewski', subject:'Jak APIć w Delphi?'}]
}, {
	id:'wt1445', date:'2018-06-19T14:45+02:00', duration:75,
	sessions: [
		{track:1, speaker:'Brian Long', subject:'IDE Productivity Tips'},
		{track:2, speaker:'Zdzisław Sroczyński', subject:'Automatyzacja aplikacji w Delphi - kuzyni i dalsza rodzina'}]
}, {
	id:'sr1000', date:'2018-06-20T10:00+02:00', duration:75,
	sessions: [
		{track:1, speaker:'Marco Cantu', subject:'VCL Applications on Windows 10'},
		{track:2, speaker:'Bogdan Polak', subject:'Migracja "dojrzałych" projektów VCL'}]
}, {
	id:'sr1130', date:'2018-06-20T11:30+02:00', duration:75,
	sessions: [
		{track:1, speaker:'Brian Long', subject:'How to Access the Android API'},
		{track:2, speaker:'Piotr Chlebek', subject:'Propagacja wsteczna błędu w sieciach neuronowych'}]
}, {
	id:'sr1300', date:'2018-06-20T13:00+02:00', duration:75,
	sessions: [
		{track:1, speaker:'Stefan Glienke', subject:'Software testing - DUnit, Mocks and TestInsight'},
		{track:2, speaker:'Mirosław Kardaś', subject:'Delphi dla elektronika'}]
}];
surveyResults = [
	{session:'wt1030', track:0, rating:5},
	{session:'sr1000', track:2, rating:3}, 
	{session:'sr1130', track:2, rating:6}
];

function getSessionRating (session, track, rating) {
	res = surveyResults.find(res => (res.session===session)&&(res.track===track));
	if (res)
		return res.rating;
}
function generateSlotInfo (slot) {
	const slotInfoDiv = document.createElement('div');
	slotInfoDiv.classList.add('col-md-2', 'text-center');
	const dt1 = new Date(slot.date);
	dt2 = new Date(dt1.valueOf()+slot.duration*60000);
	slotInfoDiv.innerHTML = 
		new Intl.DateTimeFormat('pl', 
			{ weekday: 'long', month: 'long', day: 'numeric'}).format(dt1)
		+' '+ new Intl.DateTimeFormat('pl', 
			{ hour: 'numeric', minute: 'numeric'}).format(dt1)
		+' - '+ new Intl.DateTimeFormat('pl', 
		{ hour: 'numeric', minute: 'numeric'}).format(dt2);
	return slotInfoDiv;
}
function generateSlotSessions (slotID, session, columnStyle) {
	const sessionDiv = document.createElement('div');
	sessionDiv.classList.add(columnStyle, 'session', 'text-center');
	sessionDiv.innerHTML = '<p class="mt-2 mb-0">'
		+session.subject+' - '+session.speaker
		+'</p>'
	const btnGroupDiv = document.createElement('div');
	btnGroupDiv.classList.add('btn-group', 'mr-2');
	btnGroupDiv.setAttribute('conferece-slot',slotID);
	btnGroupDiv.setAttribute('conferece-track',session.track);
	btnGroupDiv.setAttribute('role', 'group');
	// btnGroupDiv.setAttribute('aria-label','session info');
	html = '';
	const rating = getSessionRating(slotID, session.track);
	console.log (slotID, session.track, rating);
	for (let i = 0; i <= 6; i++) {
		if (i === rating)
			html += '<button type="button" class="btn btn-outline-primary active">'+i+'</button>';
		else
			html += '<button type="button" class="btn btn-outline-primary">'+i+'</button>';
	}
	btnGroupDiv.innerHTML = html;
	sessionDiv.appendChild (btnGroupDiv);
	return sessionDiv;
}
function generateSlot (surveyDiv, slot) {
	if (typeof slot === 'undefined' || slot.sessions === 'undefined' || !slot.sessions.length) 
		throw 'Incorrect slot structructure';
	const slotDiv = document.createElement('div');
	slotDiv.classList.add('row', 'slot');
	const infoDiv = generateSlotInfo (slot);
	slotDiv.appendChild (infoDiv);
	if (slot.sessions.length === 1) {
		const sessionDiv = generateSlotSessions(slot.id, slot.sessions[0],'col-md-10')
		slotDiv.appendChild (sessionDiv);
	} else {
		const session1Div = generateSlotSessions(slot.id, slot.sessions[0],'col-md-5');
		const session2Div = generateSlotSessions(slot.id, slot.sessions[1],'col-md-5');
		slotDiv.appendChild (session1Div);
		slotDiv.appendChild (session2Div);
	}
	surveyDiv.appendChild(slotDiv);
}
function generateSurvey (slots) {
	const surveyDiv = document.getElementById('summit-survey');
	slots.forEach( slot =>  generateSlot(surveyDiv, slot) );
}

function initSurvey () {
	$(".btn-group > .btn").click(function(){
		const sessionName = this.parentElement.getAttribute("conferece-slot");
		$('div[conferece-slot="'+sessionName+'"] > .btn').removeClass("active");
		/*
		this.parentElement.getElementsByClassName('btn').forEach(
			elem => $(elem).removeClass("active"));
		*/
		// $(".btn-group > .btn").removeClass("active");
		$(this).addClass("active");
		console.log(sessionName+'='+this.innerHTML);
	});
}

generateSurvey(summitSlots);
initSurvey ();

