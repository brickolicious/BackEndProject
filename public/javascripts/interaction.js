/**
 * Created by Bart on 22/11/2014.
 */

(function interactionInit(){

    var showReg = document.getElementById("showReg");

    if(showReg != null) {
        showReg.addEventListener('click', function (e) {
            e.preventDefault();
            document.getElementById('login').classList.toggle('toHideOrNotToHide');
            document.getElementById('register').classList.toggle('toHideOrNotToHide');
            return false;
        });
    }

    var regBtn = document.getElementById('regBtn');

    regBtn.addEventListener('click',function(){
        document.getElementById('login').classList.toggle('toHideOrNotToHide');
        document.getElementById('register').classList.toggle('toHideOrNotToHide');
    });

    var showLogin = document.getElementById('showLogin');

    if(showLogin != null && showLogin != undefined){

        showLogin.addEventListener('click',function(e){
            e.preventDefault();
            document.getElementById('forgot').classList.toggle('toHideOrNotToHide');
            document.getElementById('login').classList.toggle('toHideOrNotToHide');
        });


    }


    var showRegLogin = document.getElementById('showRegLogin');

    showRegLogin.addEventListener('click',function(e){
        e.preventDefault();
        document.getElementById('register').classList.toggle('toHideOrNotToHide');
        document.getElementById('login').classList.toggle('toHideOrNotToHide');
        return false;
    });




})();