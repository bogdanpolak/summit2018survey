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

function mergeSessionListAndVotingList (sessions, votings) {
	let merged = [];
	sessions.forEach ( session => {
		session2 = session;
		const row = votings.find( row => (row.sessionid === session.id));
		if (row) {
			session2.counter = row.counter;
			session2.ratingsum = row.ratingsum;
			session2.factor = row.factor;
			session2.avgRating = row.avgRating;
			session2.finalRating = row.finalRating;
		} else {
			session2.counter = 0;
			session2.ratingsum = 0;
			session2.factor = 0;
			session2.avgRating = 0;
			session2.finalRating = 0;
		}
		merged.push (session2);
	});
	return merged;
};


function generateHtmlSessionList (resultDiv, votings, lang) {
	const sessions1 = buildSessionList(lang);
	const sessions2 = mergeSessionListAndVotingList (sessions1, votings);
	sessions2.sort ( (s1,s2) => s2.finalRating - s1.finalRating );
	sessions2.forEach ( session => {
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
		resultDiv.appendChild(sessionDiv);
	});
}

/*
 * votings: [ {sessionid:String, counter: Integer, 
 *             ratingsum: Integer, factor: Integer, 
 *             avgRating Number, finalRating: Number} ]
 */
function generateHtmlVotingResults (votings, opts) {
	const mainDiv1 = document.createElement('div');
	mainDiv1.classList.add('voting-results')
	const head1 = document.createElement('h1');
	head1.innerHTML = opts.description;
	mainDiv1.appendChild(head1);
	generateHtmlSessionList (mainDiv1, votings, opts.category);
	return mainDiv1;
}

$( document ).ready( function() {
	const surveyDiv = document.getElementById('survey-results');
	surveyDiv.innerHTML = '<div class="text-center">Proszę czekać trwa ładowanie wyników głosowania ...</div>';
	AjaxHttpGet ('http://delphi.pl/zlot/zlot2018/api/survey/',
		obj=>{
			const votings = obj.data.results;
			surveyDiv.innerHTML = '';
			const div1 = generateHtmlVotingResults(votings,
				{ category:'pl', description:'Wykładowcy polskiej społeczności' }
			);
			surveyDiv.appendChild(div1);
			const div2 = generateHtmlVotingResults(votings,
				{ category:'eng', description:'Zagraniczni zaproszeni wykładowcy' }
			);
			surveyDiv.appendChild(div2);
		}, 
		(status,responseText) => {
			console.log('status:'+status, responseText);
			surveyDiv.innerHTML = '<div class="text-center">Błąd ładowania</div>';
		}
	);
});
