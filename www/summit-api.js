const summitAPI = {
    apiSurveyUrl: "http://delphi.pl/zlot/zlot2019/api/survey/",
    votes: {
		serialCode: '',
		firstName: '',
		lastName: '',
        company: '',
        /* [{ "slot": String, "track": Number, "rating": Number }, ..] */
		data: [],
    },
    newVote: function  (slotName, trackNo, sessionRating) {
        const item = {slot:slotName, track:trackNo, rating:sessionRating};
        const url = this.apiSurveyUrl+this.votes.serialCode;
        AjaxHttpPost( url, item,
            resp=>console.log(resp),
            (status,resp) => {
                console.log(status,resp);
            }
        );
        // console.log('slot='+item.slot+', track='+item.track+', rating='+item.rating);
    },
    getVotes: function (onSuccess, onFailure) {
        const url = this.apiSurveyUrl+this.votes.serialCode;
        AjaxHttpGet (url,
            obj=>{
                this.votes.data = obj.data.results;
                this.votes.firstName = obj.data.firstName;
                this.votes.lastName = obj.data.lastName;
                this.votes.company = obj.data.company;
                onSuccess ();
            }, 
            (status,responseText) => 
                onFailure (status,responseText) );
    },
    getVotingResults: function (onSucces, onFailure) {
        AjaxHttpGet (this.apiSurveyUrl,
            obj => onSucces(obj.data.results),
            (status,responseText) => onFailure(status,responseText)
        );

    }
}

summitAPI.fillMockData1_DelphiSummit2019 = function () {
	this.votes.serialCode === '000-000';
	this.votes.firstName = 'Jan';
	this.votes.lastName = 'Kowalski';
	this.votes.company = 'Firma Jana';
	this.votes.data = [
		{ "slot": "cz1000", "track": 0, "rating": 6 },
		{ "slot": 'cz1200', "track": 1, "rating": 5 },
		{ "slot": 'cz1330', "track": 1, "rating": 6 },
		{ "slot": 'cz1600', "track": 1, "rating": 5 },
		{ "slot": 'cz1730', "track": 1, "rating": 6 },
		{ "slot": 'pt1000', "track": 2, "rating": 5 },
		{ "slot": 'pt1130', "track": 2, "rating": 6 },
		{ "slot": 'pt1300', "track": 2, "rating": 4 }];
	return true;
};
summitAPI.fillMockData2_DelphiSummit2019 = function () {
	this.votes.serialCode === 'BBBBB-CCCCC';
	this.votes.firstName = 'Adam';
	this.votes.lastName = 'Adamski';
	this.votes.company = "Adam's Company Ltd.";
	this.votes.data = [
		{ "slot": "cz1000", "track": 0, "rating": 5 },
		{ "slot": 'cz1200', "track": 2, "rating": 3 },
		{ "slot": 'cz1330', "track": 2, "rating": 6 }];
	return true;
};

