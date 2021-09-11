// Check the LICENSE before you copy this code!
let account = {

    log: {
        create: function () {

            localStorage.setItem("mfnz:first", "false");
            account.data.konten = 0;
            localStorage.setItem("mfnz:konten", 0);

        },
        load: function () {

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

            $("#body-overlay").remove();
            $("#create-dialog").remove();

        },
        openEdit: function (count) {

            localStorage.setItem("mfnz:edit", localStorage.getItem("konto: " + count) + ", " + count);
            let konto = localStorage.getItem("mfnz:edit");
            konto = konto.split(", ");
            $("body")[0].innerHTML += `
            
            <div id="body-overlay"></div>
            <div class="dialog" id="create-dialog">
                <a href="" role="button" id="dialog-schließen-button">x</a>
                <h1>Konto editieren</h1>
                <label for="ownerName">Name des Besitzers:</label>
                <input type="text" name="ownerName" id="ownerName" value="`+ konto[0] + `">
                <br> <br>
                <label for="kontoName">Konto Anzeigename:</label>
                <input type="text" name="kontoName" id="kontoName" value="`+ konto[1] + `">
                <br> <br>
                <label for="kontoStand">Kontostand:</label>
                <input type="text" name="kontoStand" id="kontoStand" placeholder="00.00" value="`+ konto[2] + `"> €
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

                                        //HIER CONTENT!
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

            let konto = localStorage.getItem("mfnz:edit");
            konto = konto.split(", ");
            localStorage.removeItem("konto: " + konto[3]);

            let data = account.data.konten;

            if (account.data.konten != 1) {

                localStorage.setItem("mfnz:konten", 200);



            }

            data = account.data.konten - 1;
            localStorage.setItem("mfnz:konten", data);

            location.reload();

        },
        save: function () {

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

        konten: 0

    }
}
// Check the LICENSE before you copy this code!