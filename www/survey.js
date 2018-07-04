const survey = {
	mockVersion: 1,
	htmlDivID: {
		auth: 'login',
		main: 'summit-survey',
	}
}

function generateHtmlSurveHeader (surveyDiv) {
	const slotDiv = document.createElement('div');
	slotDiv.classList.add('row', 'survey-header');
	// append h1 with participant first and last name
	const nameHeader = document.createElement('h1');
	nameHeader.classList.add('col-md-12');
	nameHeader.innerHTML = summitAPI.votes.firstName+' '+summitAPI.votes.lastName;
	slotDiv.appendChild(nameHeader);
	// append h2 with participant comapny
	const companyHeader = document.createElement('h2');
	companyHeader.classList.add('col-md-12');
	companyHeader.innerHTML = summitAPI.votes.company;
	slotDiv.appendChild(companyHeader);
	surveyDiv.appendChild(slotDiv);
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
function generateHtmlSession (slotID, session, columnStyle) {
	const sessionDiv = document.createElement('div');
	sessionDiv.classList.add(columnStyle, 'session', 'text-center');
	const SessionInfoPar = document.createElement('p');
	SessionInfoPar.classList.add('session-info');
	SessionInfoPar.innerHTML = session.subject+' - '+session.speaker;
	sessionDiv.appendChild (SessionInfoPar);
	
	const btnGroupDiv = document.createElement('div');
	btnGroupDiv.classList.add('btn-group', 'mr-2');
	btnGroupDiv.setAttribute('conference-slot',slotID);
	btnGroupDiv.setAttribute('conference-track',session.track);
	btnGroupDiv.setAttribute('role', 'group');
	let html = '';
	btnGroupDiv.innerHTML = html;
	[1, 2, 3, 4, 5, 6].forEach( i => {
		const btn = document.createElement('button');
		btn.classList.add('btn', 'btn-outline-primary');
		btn.type = 'button';
		btn.innerHTML = i;
		btnGroupDiv.appendChild (btn);
		btn.onclick = function(){
			// "this" equal clicked button HTML object
			const btngroup = this.parentElement;
			const slotName = btngroup.getAttribute("conference-slot");
			const trackNo = btngroup.getAttribute("conference-track");
			const sessionRating = this.innerHTML;
			summitAPI.newVote (slotName, trackNo, sessionRating);
			$('div[conference-slot="'+slotName+'"] > .btn').removeClass("active");
			$(this).addClass("active");
		};
	});
	sessionDiv.appendChild (btnGroupDiv);
	return sessionDiv;
}
function generateHtmlConferenceSlot (surveyDiv, slot) {
	if (typeof slot === 'undefined' || slot.sessions === 'undefined' || !slot.sessions.length) 
		throw 'Incorrect slot structructure';
	const slotDiv = document.createElement('div');
	slotDiv.classList.add('row', 'slot');
	const infoDiv = generateSlotInfo (slot);
	slotDiv.appendChild (infoDiv);
	if (slot.sessions.length === 1) {
		const sessionDiv = generateHtmlSession(slot.id, slot.sessions[0],'col-md-10')
		slotDiv.appendChild (sessionDiv);
	} else {
		const session1Div = generateHtmlSession(slot.id, slot.sessions[0],'col-md-5');
		const session2Div = generateHtmlSession(slot.id, slot.sessions[1],'col-md-5');
		slotDiv.appendChild (session1Div);
		slotDiv.appendChild (session2Div);
	}
	surveyDiv.appendChild(slotDiv);
}
function generateHtmlSurvey (id, slots) {
	const surveyDiv = document.getElementById(survey.htmlDivID.main);
	generateHtmlSurveHeader(surveyDiv);
	summitSessions.data.forEach( slot =>  
		generateHtmlConferenceSlot(surveyDiv, slot) );
	addOnClickEvents();
}

function updateSlotsWithResults () {
	$('.btn-group > .btn').removeClass('active');
	summitAPI.votes.data.forEach ( res => {
		$(".btn-group[conference-slot='"+res.slot
			+"'][conference-track="+res.track
			+"] > .btn:contains("+res.rating
			+")").addClass('active');
	} );
};

function toggleDisplaySection (id) {
	$('#'+id).toggle();
}

let enableOnClick = true;

function getAPIResponseErrorMessage(responseText){
	try {
		response = JSON.parse(responseText);
		return response.message;
	} catch (e) {
		return "Unrecognized API error. See console log for more details";
	}
};

function doAuthorize() {
	let serialCode = $('#serial').val();
	if (serialCode !== '') {
		summitAPI.votes.serialCode = serialCode;
		if (enableOnClick) {
			$('#btnAuth').toggleClass('btn-primary btn-outline-secondary');
			enableOnClick = false;
			summitAPI.getVotes (
				function onSuccess () {
					enableOnClick = true;
					$('#btnAuth').toggleClass('btn-outline-secondary btn-primary');
					toggleDisplaySection (survey.htmlDivID.auth);  // hide login section 
					toggleDisplaySection (survey.htmlDivID.main);  // show survey section
					generateHtmlSurvey ();
					updateSlotsWithResults ();
				},
				function onFailure (status,responseText) {
					enableOnClick = true;
					$('#btnAuth').toggleClass('btn-outline-secondary btn-primary');
					if (status === 401) {
						$('#modalInvalidSerial').modal()
					} else {
						console.log('status:'+status, responseText);
						// const msg = getAPIResponseErrorMessage(responseText);
					}
				}
			);
		}
	}
}

$( document ).ready( function() {
	if (survey.mockVersion === 1) {
		summitAPI.fillMockData1_DelphiSummit2019 ();
		toggleDisplaySection (survey.htmlDivID.auth);  // hide login section 
		toggleDisplaySection ('summit-survey');  // show survey section
		generateHtmlSurvey(survey.htmlDivID.main, summitSessions.data);
		updateSlotsWithResults ();
	} else if (survey.mockVersion === 2) {
		summitAPI.fillMockData2_DelphiSummit2019 ();
		toggleDisplaySection (survey.htmlDivID.auth);  // hide login section 
		toggleDisplaySection ('summit-survey');  // show survey section
		generateHtmlSurvey(survey.htmlDivID.main, summitSessions.data);
		updateSlotsWithResults ();
	} else {
		$('#serial').keypress(function (event) {
			if (event.which == 13) {
				doAuthorize();
			}
		});
	}
});

