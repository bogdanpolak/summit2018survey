const SurveyResults = {
	serialCode: '',
	data: [],
	getRating: function (session, track) {
		res = this.data.find(res => (res.session===session)&&(res.track===track));
		if (res)
			return res.rating
		else
			return null;
	},
	loadData: function (serialCode) {
		if (serialCode === '000-000') {
			this.data = [
				{ session: 'wt1030', track: 0, rating: 6 },
				{ session: 'wt1215', track: 1, rating: 5 },
				{ session: 'wt1445', track: 1, rating: 6 },
				{ session: 'sr1000', track: 1, rating: 5 },
				{ session: 'sr1130', track: 1, rating: 6 },
				{ session: 'sr1300', track: 2, rating: 4 }];
		} else {
			this.data = [
				{ session: 'wt1030', track: 0, rating: 5 },
				{ session: 'sr1000', track: 2, rating: 3 },
				{ session: 'sr1130', track: 2, rating: 6 }];
		}
		this.serialCode = serialCode;
		return true;
	}
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
	btnGroupDiv.setAttribute('conference-slot',slotID);
	btnGroupDiv.setAttribute('conference-track',session.track);
	btnGroupDiv.setAttribute('role', 'group');
	// btnGroupDiv.setAttribute('aria-label','session info');
	let html = '';
	for (let i = 0; i <= 6; i++) {
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
		const sessionName = this.parentElement.getAttribute("conference-slot");
		const trackNo = this.parentElement.getAttribute("conference-track");
		$('div[conference-slot="'+sessionName+'"] > .btn').removeClass("active");
		$(this).addClass("active");
		const sessionRating = this.innerHTML;
		const item = {session:sessionName,track:trackNo,rating:sessionRating};
		console.log('session='+item.session+', track='+item.track+', rating='+item.rating);
	});
}
function generateSurvey (id,slots) {
	const surveyDiv = document.getElementById(id);
	slots.forEach( slot =>  generateSlot(surveyDiv, slot) );
	addOnClickEvents();
}

function updateSlotsWithResults () {
	$('.btn-group > .btn').removeClass('active');
	SurveyResults.data.forEach ( res => {
		$(".btn-group[conference-slot='"+res.session
			+"'][conference-track="+res.track
			+"] > .btn:contains("+res.rating
			+")").addClass('active');
	} );
};

function toggleDisplaySection (id) {
	$('#'+id).toggle();
}

$( document ).ready( function() {
	const sectionAuthorizID = 'login';
	const sectionSurveyID = 'summit-survey'; 
	function ShowAll () {
		toggleDisplaySection (sectionAuthorizID);  // hide login section 
		toggleDisplaySection (sectionSurveyID);  // show survey section
		generateSurvey(sectionSurveyID,SlotsDelphiDeveloperSummit2018);
		// const serialCode = '000-000';
		const serialCode = 'ABCDE-FGHIJ';
		SurveyResults.loadData (serialCode);
		updateSlotsWithResults ();
	}
	ShowAll ();
});

