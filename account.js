// Check the LICENSE before you copy this code!
let account = {


    log: {
        /* Hier werden alle Funktionen die mit dem Login zutun haben gespeichert. */
        create: function () {
            /* Diese Funktion wird nur ausgeführt, wenn man nochnie auf der Website war. */

            localStorage.setItem("mfnz:first", "false");
            account.data.konten = 0;
            localStorage.setItem("mfnz:konten", 0);

        },
        load: function () {
            /* Diese Funktion wird ausgeführt, wenn man auf die Seite nochmals drauf kommt. Sie lädt die zeigt die Konten an. */

            account.data.konten = Number(localStorage.getItem("mfnz:konten"));
            for (let i = 1; i <= account.data.konten * 500; i++) {

                try {
                    let konto = localStorage.getItem("konto: " + i);

                    konto = konto.split(", ");

                    $("body")[0].innerHTML += `

                    <div class="anzeige" onclick="account.konto.openEdit(` + i + `);">

                        <h2>` + konto[1] + `</h2>
                        <p>` + konto[0] + `</p>
                        <h1 id="stand">` + konto[2] + `€</h1>

                    </div>

                    `;
                } catch {


                }

            }
            localStorage.removeItem("mfnz:edit");

        }
    },
    konto: {
        /* Hier werden alle Funktionen für ein Konto gespeichert. */

        openMenu: function () {
            /* Mit dieser Funktion wird das Menü für die Erstellung eines Kontos erstellt. */

            $("body")[0].innerHTML += `
            
            <div id="body-overlay"></div>
            <div class="dialog" id="create-dialog">
                <a href="" role="button" id="dialog-schließen-button">x</a>
                <h1>Konto erstellen</h1>
                <label for="ownerName">Name des Besitzers:</label>
                <input type="text" name="ownerName" id="ownerName" autofocus>
                <br> <br>
                <label for="kontoName">Konto Anzeigename:</label>
                <input type="text" name="kontoName" id="kontoName" list="kontoNameVorschlag">
                <datalist id="kontoNameVorschlag">
                    <option value="Giro" />
                    <option value="Tagesgeld" />
                    <option value="Spar" />
                    <option value="Bargeld" />
                </datalist>
                <br> <br>
                <label for="kontoStand">Kontostand:</label>
                <input type="text" name="kontoStand" id="kontoStand" placeholder="00.00"> €
                <br> <br>
                <button onclick="account.konto.create();">Konto erstellen</button>
            </div>
            `;


        },
        closeMenu: function () {
            /* Mit dieser Funktion wird das aktive Menü eines Kontos geschlossen. */

            $("#body-overlay").remove();
            $("#create-dialog").remove();

        },
        openEdit: function (count) {
            /* Mit dieser Funktion wird das Menü für das Editieren eines Kontos erstellt. */

            localStorage.setItem("mfnz:edit", localStorage.getItem("konto: " + count) + ", " + count);
            let konto = localStorage.getItem("mfnz:edit");
            konto = konto.split(", ");
            $("body")[0].innerHTML += `
            
            <div id="body-overlay"></div>
            <div class="dialog" id="create-dialog">
                <a href="" role="button" id="dialog-schließen-button">x</a>
                <h1>Konto editieren</h1>
                <label for="ownerName">Name des Besitzers:</label>
                <input type="text" name="ownerName" id="ownerName" value="` + konto[0] + `">
                <br> <br>
                <label for="kontoName">Konto Anzeigename:</label>
                <input type="text" name="kontoName" id="kontoName" value="` + konto[1] + `">
                <br> <br>
                <label for="kontoStand">Kontostand:</label>
                <input type="text" name="kontoStand" id="kontoStand" placeholder="00.00" value="` + konto[2] + `"> €
                <br> <br>
                <button onclick="account.konto.save();">Speichern</button>
                <button onclick="account.konto.delete();">Konto löschen</button>
            </div>
            
            
            `;

        },
        create: function () {
            /* Mit dieser Funktion wird ein Konto erstellt. */

            let fehler = function () {
                alert("Fülle bitte alle Felder aus!");
            }
            if (ownerName.value === "") {

                fehler();

            } else {

                if (kontoName.value === "") {

                    fehler();

                } else {

                    if (kontoStand.value === "") {

                        fehler();

                    } else {

                        if (ownerName.value.length <= 20) {

                            if (kontoName.value.length <= 10) {

                                if (kontoStand.value.length <= 10) {

                                    let OwnerName = ownerName.value;
                                    let KontoName = kontoName.value;

                                    OwnerName = OwnerName.replace(",", "?");
                                    KontoName = KontoName.replace(",", "?");

                                    let money = kontoStand.value;
                                    money = money.replace(",", ".");

                                    if (Number(money) >= 0 || Number(money) <= 0) {

                                        let money = kontoStand.value;
                                        money = money.replace(",", ".");

                                        account.data.konten += 1;
                                        localStorage.setItem("mfnz:konten", account.data.konten);
                                        localStorage.setItem("konto: " + account.data.konten, OwnerName + ", " + KontoName + ", " + money);
                                        location.reload();

                                    } else {

                                        alert("Bitte gebe einen gültigen Kontostand an.");

                                    }

                                } else {

                                    alert("Ihr Kontostand ist zu hoch. (Es ist nur eine Länge von 10 Zeichen erlaubt)");

                                }

                            } else {

                                alert("Ihr Kontoname ist zu groß. (Es ist nur eine Länge von 10 Zeichen erlaubt)");

                            }
                        } else {

                            alert("Ihr Name ist zu groß!");

                        }
                    }

                }
            }
        },
        delete: function () {
            /* Mit dieser Funktion wird ein Konto gelöscht. */

            let konto = localStorage.getItem("mfnz:edit");
            konto = konto.split(", ");
            localStorage.removeItem("konto: " + konto[3]);


            location.reload();

        },
        save: function () {
            /* Mit dieser Funktion wird ein Konto gespeichert. */

            let fehler = function () {
                alert("Fülle bitte alle Felder aus!");
            }
            if (ownerName.value === "") {

                fehler();

            } else {

                if (kontoName.value === "") {

                    fehler();

                } else {

                    if (kontoStand.value === "") {

                        fehler();

                    } else {

                        if (ownerName.value.length <= 20) {

                            if (kontoName.value.length <= 10) {

                                if (kontoStand.value.length <= 10) {

                                    let OwnerName = ownerName.value;
                                    let KontoName = kontoName.value;

                                    OwnerName = OwnerName.replace(",", "?");
                                    KontoName = KontoName.replace(",", "?");

                                    let money = kontoStand.value;
                                    money = money.replace(",", ".");

                                    if (Number(money) >= 0 || Number(money) <= 0) {

                                        let money = kontoStand.value;
                                        money = money.replace(",", ".");

                                        let konto = localStorage.getItem("mfnz:edit");
                                        konto = konto.split(", ");

                                        localStorage.setItem("konto: " + konto[3], OwnerName + ", " + KontoName + ", " + money);

                                        location.reload();

                                    } else {

                                        alert("Bitte gebe einen gültigen Kontostand an.");

                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    data: {
        /* Hier werden alle Variablen die mit dem Account zusammen hängen gespeichert. */

        konten: 0

    }
}
// Check the LICENSE before you copy this code!