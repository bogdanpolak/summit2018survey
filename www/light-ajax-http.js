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
