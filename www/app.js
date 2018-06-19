const SurveyData = {
	serialCode: '',
	data: [],
	getRating: function (slot, track) {
		res = this.data.find(res => (res.slot===slot)&&(res.track===track));
		if (res)
			return res.rating
		else
			return null;
	},
	fillMockSurvey1: function () {
		this.serialCode === '000-000';
		this.data = [
			{ slot: 'wt1030', track: 0, rating: 6 },
			{ slot: 'wt1215', track: 1, rating: 5 },
			{ slot: 'wt1445', track: 1, rating: 6 },
			{ slot: 'sr1000', track: 1, rating: 5 },
			{ slot: 'sr1130', track: 1, rating: 6 },
			{ slot: 'sr1300', track: 2, rating: 4 }];
		return true;
	},
	fillMockSurvey2: function () {
		this.serialCode === 'BBBBB-CCCCC';
		this.data = [
			{ slot: 'wt1030', track: 0, rating: 5 },
			{ slot: 'sr1000', track: 2, rating: 3 },
			{ slot: 'sr1130', track: 2, rating: 6 }];
		return true;
	}
}
var GlobalSerialCode;

function generateSurveHeader (surveyDiv) {
	const slotDiv = document.createElement('div');
	slotDiv.classList.add('row', 'survey-header');
	// append h1 with participant first and last name
	const nameHeader = document.createElement('h1');
	nameHeader.classList.add('col-md-12');
	nameHeader.innerHTML = SurveyData.firstName+' '+SurveyData.lastName;
	slotDiv.appendChild(nameHeader);
	// append h2 with participant comapny
	const companyHeader = document.createElement('h2');
	companyHeader.classList.add('col-md-12');
	companyHeader.innerHTML = SurveyData.company;
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
function generateSlotSessions (slotID, session, columnStyle) {
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
	[1, 2, 3, 4, 5, 6].forEach( i =>
		html += '<button type="button" class="btn btn-outline-primary">'+i+'</button>'
	);
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
		const slotName = this.parentElement.getAttribute("conference-slot");
		const trackNo = this.parentElement.getAttribute("conference-track");
		$('div[conference-slot="'+slotName+'"] > .btn').removeClass("active");
		$(this).addClass("active");
		const sessionRating = this.innerHTML;
		const item = {slot:slotName,track:trackNo,rating:sessionRating};
		AjaxHttpPost('http://delphi.pl/zlot/zlot2018/api/survey/'+SurveyData.serialCode,
			item,
			resp=>console.log(resp),
			(status,resp)=>console.log(status,resp)
		);
		// console.log('slot='+item.slot+', track='+item.track+', rating='+item.rating);
	});
}
function generateSurvey (id,slots) {
	const surveyDiv = document.getElementById(id);
	generateSurveHeader(surveyDiv);
	slots.forEach( slot =>  generateSlot(surveyDiv, slot) );
	addOnClickEvents();
}

function updateSlotsWithResults () {
	$('.btn-group > .btn').removeClass('active');
	SurveyData.data.forEach ( res => {
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
		SurveyData.serialCode = serialCode;
		if (enableOnClick) {
			$('#btnAuth').toggleClass('btn-primary btn-outline-secondary');
			enableOnClick = false;
			const sectionAuthorizID = 'login';
			const sectionSurveyID = 'summit-survey'; 
			AjaxHttpGet ('http://delphi.pl/zlot/zlot2018/api/survey/'+SurveyData.serialCode,
				obj=>{
					SurveyData.data = obj.data.results;
					SurveyData.firstName = obj.data.firstName;
					SurveyData.lastName = obj.data.lastName;
					SurveyData.company = obj.data.company;
					toggleDisplaySection (sectionAuthorizID);  // hide login section 
					toggleDisplaySection (sectionSurveyID);  // show survey section
					generateSurvey(sectionSurveyID, SlotsDelphiDeveloperSummit2018);
					updateSlotsWithResults ();
					enableOnClick = true;
					$('#btnAuth').toggleClass('btn-outline-secondary btn-primary');
				}, 
				(status,responseText)=>{
					// invalid serial number
					if (status === 401) {
						$('#serialInvalidModal').modal()
					} else {
						console.log('status:'+status, responseText);
						const msg = getAPIResponseErrorMessage(responseText);
					}
					enableOnClick = true;
					$('#btnAuth').toggleClass('btn-outline-secondary btn-primary');
				} 
			);
		}
	}
}

$( document ).ready( function() {
	$('#serial').keypress(function (event) {
		if (event.which == 13) {
			doAuthorize();
		}
	});
	/*
	SurveyData.mockSurveyDateInitilize ();
	toggleDisplaySection ('summit-survey');  // show survey section
	generateSurvey(sectionSurveyID, SlotsDelphiDeveloperSummit2018);
	updateSlotsWithResults ();
	*/
});

