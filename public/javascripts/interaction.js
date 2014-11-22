/**
 * Created by Bart on 22/11/2014.
 */
(function interactionInit(){

    var showReg = document.getElementById("showReg");
    var regBtn = document.getElementById('regBtn');

    showReg.addEventListener('click',function(e){
        e.preventDefault();
        document.getElementById('login').classList.toggle('toHideOrNotToHide');
        document.getElementById('register').classList.toggle('toHideOrNotToHide');
    });
    regBtn.addEventListener('click',function(){
        document.getElementById('login').classList.toggle('toHideOrNotToHide');
        document.getElementById('register').classList.toggle('toHideOrNotToHide');
    });

})();