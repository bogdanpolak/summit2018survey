function buildSessionList (lang) {
	let list = [];
	SlotsDelphiDeveloperSummit2018.forEach( slot => {
		slot.sessions.forEach (ses => {
			if (ses.lang === lang) {
				list.push({
					id:slot.id+'-'+ses.track, 
					speaker:ses.speaker, 
					subject:ses.subject
				});
			}
		})
	});
	return list;
}

function generateResultTable (surveyDiv, votings, lang) {
	let sessions = buildSessionList(lang);
	const resultListDiv = document.createElement('div');
	resultListDiv.classList.add('result-table');
	sessions.forEach ( session => {
		const row = votings.find( row => (row.sessionid === session.id));
		if (row) {
			const resultDiv = document.createElement('div');
			resultDiv.classList.add('session');
			html = '<h3>'+session.speaker+' - '+session.subject+'</h3>';
			html += '<p>Głosów:'+row.counter+' Wynik: '+row.final+'</p>';
			resultDiv.innerHTML = html;
			resultListDiv.appendChild(resultDiv);
		}
	});
	surveyDiv.appendChild(resultListDiv);
}

/*
 * votings: [ {sessionid:String, counter: Integer, 
 *             ratingsum: Integer, balance: Integer, 
 *             avg: Number, final: Number} ]
 */
function generateResults (surveyDiv, votings) {
	surveyDiv.innerHTML = '';
	const mainDiv = document.createElement('div');
	mainDiv.classList.add('voting-results')
	const head1 = document.createElement('h1');
	head1.innerHTML = 'Wykładowca polskiej społeczności';
	mainDiv.appendChild(head1);
	generateResultTable (mainDiv, votings, 'pl');
	const head2 = document.createElement('h1');
	head2.innerHTML = 'Wykładowca zagraniczny';
	mainDiv.appendChild(head2);
	generateResultTable (mainDiv, votings, 'eng');
	surveyDiv.appendChild(mainDiv);
}

$( document ).ready( function() {
	const surveyDiv = document.getElementById('survey-results');
	surveyDiv.innerHTML = '<div class="text-center">Proszę czekać trwa ładowanie wyników głosowania ...</div>';
	AjaxHttpGet ('http://delphi.pl/zlot/zlot2018/api/survey/',
		obj=>{
			const votings = obj.data.results;
			generateResults(surveyDiv, votings);
		}, 
		(status,responseText) => {
			console.log('status:'+status, responseText);
			surveyDiv.innerHTML = '<div class="text-center">Błąd ładowania</div>';
		}
	);
});
