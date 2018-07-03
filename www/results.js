/*
 * votingResults: [ 
 *    { sessionid:String,   counter: Integer, 
 *      ratingsum: Integer,   factor: Integer, 
 *      avgRating Number,   finalRating: Number } ]
 */
function buildSessionList (lang, votingResults) {
	let list = [];
	summitSessions.data.forEach( slot => {
		slot.sessions.forEach (session => {
			const sessionid = slot.id+'-'+session.track;
			if (session.lang === lang) {
				const row = votingResults.find( row => (row.sessionid === sessionid));
				list.push({
					id: sessionid, 
					speaker: session.speaker, 
					subject: session.subject,
					counter: (row ? row.counter : 0),
					ratingsum: (row ? row.ratingsum : 0),
					factor: (row ? row.factor : 0),
					avgRating: (row ? row.avgRating : 0),
					finalRating: (row ? row.finalRating : 0)
				});
			}
		})
	});
	list.sort ( (s1,s2) => s2.finalRating - s1.finalRating );
	return list;
}

function generateHtmlSessionList (session) {
	const sessionDiv = document.createElement('div');
	sessionDiv.classList.add('session');
	html = '<h3>'+session.speaker+' - '+session.subject+'</h3>';
	html += '<p>';
	html += 'Głosów:'+session.counter;
	html += ' &nbsp; &nbsp; Wynik: '+session.finalRating;
	html += '</p>';
	html += '<p style="color:#d0a080;font-style: italic;font-size:0.8em;">';
	html += 'Średnia: '+session.avgRating;
	html += ' &nbsp; &nbsp; Modyfik: '+session.factor+'%';
	html += '</p>';
	sessionDiv.innerHTML = html;
	return sessionDiv;
}

function generateHtmlVotingResults (sessions, title) {
	const mainDiv = document.createElement('div');
	mainDiv.classList.add('voting-results')
	mainDiv.innerHTML = '<h1>'+title+'</h1>';
	sessions.forEach ( session => {
		const div = generateHtmlSessionList (session);
		mainDiv.appendChild(div);
	});
	return mainDiv;
}

function generateHtml (surveyDiv, votingResults) {
	// ---
	const sessionsPl = buildSessionList('pl', votingResults);
	const div1 = generateHtmlVotingResults(sessionsPl, 'Wykładowcy polskiej społeczności' );
	surveyDiv.appendChild(div1);
	// ---
	const sessionsEng = buildSessionList('eng', votingResults);
	const div2 = generateHtmlVotingResults(sessionsEng, 'Zagraniczni zaproszeni wykładowcy' );
	surveyDiv.appendChild(div2);
}

function onDocumentReady() {
	const surveyDiv = document.getElementById('survey-results');
	surveyDiv.innerHTML = '<div class="text-center">Proszę czekać trwa ładowanie wyników głosowania ...</div>';
	summitAPI.getVotingResults (
		votingResults => {
			surveyDiv.innerHTML = '';
			generateHtml (surveyDiv, votingResults);
		}, 
		(status,responseText) => {
			surveyDiv.innerHTML = '<div class="text-center">Błąd ładowania</div>';
			console.log('status:'+status, responseText);
		}
	);
}

$( document ).ready( onDocumentReady );
