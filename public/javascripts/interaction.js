/**
 * Created by Bart on 22/11/2014.
 */
(function interactionInit(){

    var showReg = document.getElementById("showReg");

    showReg.addEventListener('click',function(e){
        e.preventDefault();
        document.getElementById('login').classList.toggle('toHideOrNotToHide');
        document.getElementById('register').classList.toggle('toHideOrNotToHide');
    });

/*
    var regBtn = document.getElementById('regBtn');

    regBtn.addEventListener('click',function(){
        document.getElementById('login').classList.toggle('toHideOrNotToHide');
        document.getElementById('register').classList.toggle('toHideOrNotToHide');
    });*/

    var forgotBtn = document.getElementById('showPass');
    forgotBtn.addEventListener('click',function(e){
        e.preventDefault();
        document.getElementById('login').classList.toggle('toHideOrNotToHide');
        document.getElementById('forgot').classList.toggle('toHideOrNotToHide');
    });


})();