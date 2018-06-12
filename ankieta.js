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
function addOnClickEvents () {
	$(".btn-group > .btn").click(function(){
		const sessionName = this.parentElement.getAttribute("conferece-slot");
		const trackNo = this.parentElement.getAttribute("conferece-track");
		$('div[conferece-slot="'+sessionName+'"] > .btn').removeClass("active");
		$(this).addClass("active");
		const sessionRating = this.innerHTML;
		console.log({session:sessionName,track:trackNo,rating:sessionRating});
	});
}
function generateSurvey (id,slots) {
	const surveyDiv = document.getElementById(id);
	slots.forEach( slot =>  generateSlot(surveyDiv, slot) );
	addOnClickEvents();
}

function toggleDisplaySection (id) {
	$('#'+id).toggle();
}

$( document ).ready( function() {
	function ShowAll () {
		toggleDisplaySection ('login');
		toggleDisplaySection ('summit-survey');
		generateSurvey('summit-survey',delphiDeveloperSummit2018Slots);
	}
	ShowAll ();
});

