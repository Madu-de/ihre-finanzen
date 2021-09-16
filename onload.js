// Check the LICENSE before you copy this code!
window.onload = function () {

    if (localStorage.getItem("mfnz:first") === "true") {

        account.log.create();

    } else if (localStorage.getItem("mfnz:first") === "false") {

        account.log.load();

    } else {

        localStorage.setItem("mfnz:first", "true");
        location.reload();

    }

}
// Check the LICENSE before you copy this code!