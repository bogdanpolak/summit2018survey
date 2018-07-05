function Toast() {
    this.message = null;
    this.pos = 0;
}

/**
 * @static
 * @memberof Toast
 * @type {Array.<Toast>}
 */
Toast._toasts = [];

toastNr = 0;

function addToast(msg) {
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add("toast-box");
    const nr = toastNr % 4;
    toastNr++;
    div.style.bottom = 10+50*nr+ "px";
    document.body.appendChild(div);
    setTimeout(function () { 
        document.body.removeChild (div);
    }, 3000);
}
