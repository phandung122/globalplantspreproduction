$( document ).ready(function() {
    saveVatNumberAfterRegister()
});

function saveVatNumberAfterRegister()
{
    if(!window.customerHub) {
        return;
    }
    let customerHub = window.customerHub;
    let customer = window.customerInfo; // see theme.liquid
    let email = customer.email;
    let vatNumber = customer.vatNumber ?? null;
    let key = window.btoa(email + '_vat_number_register'); //see customers-register.js

    if(vatNumber) {
        localStorage.removeItem(key);
        return;
    }

    let vatLocalStorage = localStorage.getItem(key);
    if(vatLocalStorage) {
        
        vatLocalStorage = window.atob(vatLocalStorage);
        console.log('atob', vatLocalStorage);

        setVatField(vatLocalStorage)
        showLoadingOnVatField()
        let data = {
            shop: customerHub.myshopify,
            customerId: customerHub.customer_id,
            namespace: 'customer_hub',
            hash: customerHub.hash,
            'metafield[vat][single_line_text_field]': vatLocalStorage
        }

        $.ajax({
            url: "/a/customerhub/account/update-profile",
            type: "POST",
            data:  data,
            success: function (response) {
                localStorage.removeItem(key);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                setVatField(vatLocalStorage)
                localStorage.removeItem(key);
                triggerProfileSave()
            },
            complete: function() {
                hideLoadingOnVatField()
            }
        });
    
    }
}

function setVatField(vatNumber) {
    let vatInput = $('input[name="metafield[vat][single_line_text_field]"]');
    if(vatInput.length > 0) {
        vatInput.val(vatNumber);
    }
}

function triggerProfileSave() {
    let vatInput = $('input[name="metafield[vat][single_line_text_field]"]');
    var form = vatInput.length > 0 ? $(vatInput[0].form) : null;
    if(form) {
        form.submit()
    }
}
