// Check the LICENSE before you copy this code!
let account = {

    log: {
        create: function () {

            localStorage.setItem("mfnz:first", "false");
            account.data.konten = [];
            localStorage.setItem("mfnz:konten", JSON.stringify([]));

        },
        load: function () {

            account.data.konten = JSON.parse(localStorage.getItem("mfnz:konten"));

            for (let i = 0; i < account.data.konten.length; i++) {
                const konto = account.data.konten[i];
                try {
                    $("body")[0].innerHTML += `

                    <div class="anzeige" onclick="account.konto.openEdit(` + i + `);">

                        <h2>` + konto[0] + `</h2>
                        <p>` + konto[1] + `</p>
                        <h1 id="stand">` + konto[2] + `€</h1>

                    </div>
                    `;
                } catch {
                    console.error("Ein Fehler ist bei dem laden der Konten aufgelaufen. \n function account.log.load()");
                }
            }
        }
    },
    konto: {

        openMenu: function () {

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
                    <option value="Girokonto" />
                    <option value="Tagesgeldkonto" />
                    <option value="Spargeldkonto" />
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

            $("#body-overlay").remove();
            $("#create-dialog").remove();

        },
        openEdit: function (count) {

            let edit = JSON.parse(localStorage.getItem("mfnz:konten"));
            edit = edit[count];
            localStorage.setItem("mfnz:edit", edit + "," + count);

            $("body")[0].innerHTML += `
            
            <div id="body-overlay"></div>
            <div class="dialog" id="create-dialog">
                <a href="" role="button" id="dialog-schließen-button">x</a>
                <h1>Konto editieren</h1>
                <label for="ownerName">Name des Besitzers:</label>
                <input type="text" name="ownerName" id="ownerName" value="` + edit[1] + `">
                <br> <br>
                <label for="kontoName">Konto Anzeigename:</label>
                <input type="text" name="kontoName" id="kontoName" value="` + edit[0] + `">
                <br> <br>
                <label for="kontoStand">Kontostand:</label>
                <input type="text" name="kontoStand" id="kontoStand" placeholder="00.00" value="` + edit[2] + `"> €
                <br> <br>
                <button onclick="account.konto.save();">Speichern</button>
                <button onclick="account.konto.delete();">Konto löschen</button>
            </div>
            
            
            `;

        },
        create: function () {

            let fehler = function () {
                alert("Fülle bitte alle Felder aus!");
            }
            if (ownerName.value !== "" && kontoName.value !== "" && kontoStand.value !== "") {

                if (ownerName.value.length <= 45) {

                    if (kontoName.value.length <= 25) {

                        if (kontoStand.value.length <= 20) {

                            let OwnerName = ownerName.value;
                            let KontoName = kontoName.value;

                            OwnerName = OwnerName.replace(",", "?");
                            KontoName = KontoName.replace(",", "?");

                            let money = kontoStand.value;
                            money = money.replace(",", ".");

                            if (Number(money) >= 0 || Number(money) <= 0) {

                                account.data.konten.push([KontoName, OwnerName, money]);
                                localStorage.setItem("mfnz:konten", JSON.stringify(account.data.konten));
                                location.reload();

                            } else {

                                alert("Bitte gebe einen gültigen Kontostand an.");

                            }

                        } else {

                            alert("Ihr Kontostand ist zu hoch. (Es ist nur eine Länge von 20 Zeichen erlaubt)");

                        }

                    } else {

                        alert("Ihr Kontoname ist zu groß. (Es ist nur eine Länge von 25 Zeichen erlaubt)");

                    }
                } else {

                    alert("Ihr Name ist zu groß! (Es ist nur eine Länge von 45 Zeichen erlaubt)");

                }

            } else {

                fehler();

            }
        },
        delete: function () {
            let edit = localStorage.getItem("mfnz:edit");
            edit = edit.split(",");
            let konten = JSON.parse(localStorage.getItem("mfnz:konten"));
            konten = konten.filter(item => {
                return konten.indexOf(item) != edit[3];
            });
            localStorage.setItem("mfnz:konten", JSON.stringify(konten));
            location.reload();
        },
        save: function () {

            let fehler = function () {
                alert("Fülle bitte alle Felder aus!");
            }
            if (ownerName.value !== "" && kontoName.value !== "" && kontoStand.value !== "") {

                if (ownerName.value.length <= 45) {

                    if (kontoName.value.length <= 25) {

                        if (kontoStand.value.length <= 20) {

                            let OwnerName = ownerName.value;
                            let KontoName = kontoName.value;

                            OwnerName = OwnerName.replace(",", "?");
                            KontoName = KontoName.replace(",", "?");

                            let money = kontoStand.value;
                            money = money.replace(",", ".");

                            if (Number(money) >= 0 || Number(money) <= 0) {

                                let edit = localStorage.getItem("mfnz:edit");
                                edit = edit.split(",");

                                let konten = JSON.parse(localStorage.getItem("mfnz:konten"));
                                console.log(konten);

                                console.log(konten[edit[3]]);

                                konten[edit[3]] = [KontoName, OwnerName, money];

                                localStorage.setItem("mfnz:konten", JSON.stringify(konten));

                                //localStorage.setItem("konto: " + konto[3], OwnerName + ", " + KontoName + ", " + money);

                                location.reload();

                            } else {

                                alert("Bitte gebe einen gültigen Kontostand an.");

                            }
                        } else {

                            alert("Ihr Kontostand ist zu hoch. (Es ist nur eine Länge von 20 Zeichen erlaubt)");

                        }

                    } else {

                        alert("Ihr Kontoname ist zu groß. (Es ist nur eine Länge von 25 Zeichen erlaubt)");

                    }
                }  else {

                    alert("Ihr Name ist zu groß! (Es ist nur eine Länge von 45 Zeichen erlaubt)");

                }

            } else {

                fehler();

            }

        }
    },
    data: {

        konten: 0

    }
}
// Check the LICENSE before you copy this code!