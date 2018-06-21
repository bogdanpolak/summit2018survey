
function generateResultTable (votings) {
	const surveyDiv = document.getElementById('summit-survey');
	surveyDiv.innerHTML = 'Miejsce na wyniki';
}

$( document ).ready( function() {
	AjaxHttpGet ('http://delphi.pl/zlot/zlot2018/api/survey/',
	obj=>{
		const votings = obj.data.results;
		generateResultTable(votings);
	}, 
	(status,responseText)=>{
		console.log('status:'+status, responseText);
	} 
});
