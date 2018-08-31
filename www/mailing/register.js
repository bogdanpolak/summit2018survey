function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function clickMailingListSubmit() {
    enteredEmail = $('#inputEmail').val();
    $('.span-email-addr').html(enteredEmail);
    isValid = validateEmail(enteredEmail);
    if (isValid) {
        $('#modalMailingRegistred').modal();
    } else {
        $('#modalInvalidEmail').modal();
    }
}
