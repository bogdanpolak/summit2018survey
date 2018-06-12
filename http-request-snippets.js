// --- XMLHttpRequest.readyState values:
/*
	UNSENT=0: Client has been created. open() not called yet.
	OPENED=1: open() has been called.
	HEADERS_RECEIVED=2: send() has been called, and headers and status are available.
	LOADING=3: Downloading; responseText holds partial data.
	DONE=4: The operation is complete.
*/

// --- XMLHttpRequest.readyState example
/*
	var xhr = new XMLHttpRequest();
	console.log('UNSENT', xhr.readyState); // readyState will be 0
	xhr.open('GET', '/api', true);
	console.log('OPENED', xhr.readyState); // readyState will be 1
	xhr.onprogress = function () {
		console.log('LOADING', xhr.readyState); // readyState will be 3
	};
	xhr.onload = function () {
		console.log('DONE', xhr.readyState); // readyState will be 4
	};
	xhr.send(null);
*/

// --- XMLHttpRequest.readyState example
/*
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.send(JSON.stringify({name:"John Rambo", time:"2pm"}));
*/

function AjaxHttpGet (url, onDataLoded, onReqeustError) {
	var req = new XMLHttpRequest();
	const IS_ASYNC = true;
	req.open('GET', url, IS_ASYNC); 
	req.onreadystatechange = function (aEvt) {
		const RS_DONE = 4;
		if (req.readyState === RS_DONE) {
			if(req.status === 200)
				onDataLoded (JSON.parse(req.responseText))
			else
				onReqeustError (req);
		}
	};
	req.send(null);
}

AjaxHttpGet ('http://delphi.pl/experiments/shop/api/products/56',
	obj=>console.log(obj), req=>console.log(req) );