function AjaxHttpGet (url, onDataLoded, onFailure) {
	var xmlhttp = new XMLHttpRequest();
	const IS_ASYNC = true;
	xmlhttp.open('GET', url, IS_ASYNC); 
	xmlhttp.onreadystatechange = function () {
		const RS_DONE = 4;
		if (xmlhttp.readyState === RS_DONE) {
			if(xmlhttp.status === 200)
				onDataLoded (JSON.parse(xmlhttp.responseText))
			else
				onFailure (xmlhttp.status,xmlhttp.responseText);
		}
	};
	xmlhttp.send(null);
}

function AjaxHttpPost (url, jsonData, onSuccess, onFailure) {
	var xmlhttp = new XMLHttpRequest();
	const IS_ASYNC = true;
	xmlhttp.open('POST', url, IS_ASYNC); 
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.onreadystatechange = function () {
		const RS_DONE = 4;
		if (xmlhttp.readyState === RS_DONE) {
			if(xmlhttp.status === 200)
				onSuccess (JSON.parse(xmlhttp.responseText))
			else
				onFailure (xmlhttp.status,xmlhttp.responseText);
		}
	};
	xmlhttp.send(JSON.stringify(jsonData));
}