$('#RegisterForm').on('submit', function(){
    let email = $('#RegisterForm-email').val()
    let vatNumber = $('#RegisterForm-vat-number').val();

    if(email == '' || vatNumber == '') {
        return;
    }

    let key = window.btoa(email + '_vat_number_register')
    let value = window.btoa(vatNumber);
    localStorage.setItem(key, value);
})

$('.account-form').on('submit', function(){
    let selectedTabs = $(this).attr('id');

    if (selectedTabs == 'RegisterForm') {
        selectedTabs = 1;
    } else {
        selectedTabs = 0;
    }

    localStorage.setItem('currentTabs', selectedTabs);
})