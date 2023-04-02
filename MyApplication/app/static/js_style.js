const toggleButton = document.querySelector(".menu");

const field = document.querySelector("fieldset");
const navList = document.querySelector(".nav-list");
const cont2_ex = document.querySelector(".cont2-ex");
const body = document.querySelector("body");
const letitre = document.getElementById("trans-title");
const usermail = document.getElementById("usermail");
const choose = document.querySelector(".choose");
const column1 = document.querySelector(".column1");
const send_button = document.querySelector(".estimer");
const acceuil = document.querySelector(".acceuil");
const paint = document.querySelector(".paint");
const contents = document.querySelector(".contents");
const estimateur = document.querySelector(".result-estimer");
const cancel = document.getElementById("cancel");

const image1 = document.querySelector(".img1");
const image2 = document.querySelector(".img2");
const image3 = document.querySelector(".img3");
const image5 = document.querySelector(".image5");
const image7 = document.querySelector(".img7");
const image8 = document.querySelector(".img8");
const image6 = document.querySelector(".img6");
const image9 = document.querySelector(".img9");
const france = document.getElementById("france");
const gabon = document.getElementById("gabon");

const cont1 = document.querySelector(".cont1");
const cont3 = document.querySelector(".cont3");
const cont2 = document.querySelector(".cont2");
//const tarif = document.getElementById("tarif");

const bulle = document.getElementById("bubble");
const delice = document.getElementById("delice");

function hrefFunction() {
  windows.location.href = window.location;
}

function montantant_pays() {
  var montPay = {};
  var info = $("#montant");
  var payso = $("#paysO option:selected");
  var paysd = $("#paysD option:selected");

  montPay[info[0].name] = info[0].value;
  montPay[payso[0].attributes.name.value] = payso[0].value;
  montPay[paysd[0].attributes.name.value] = paysd[0].value;

  return montPay;
}

function getButRadio() {
  var popo = $("input");
  var ButRadio = {};
  popo.get().forEach((element) => {
    if (element.type == "radio") {
      if (element.checked == true) {
        console.log(element);
        ButRadio[element.name] = element.value;
      }
    }
  });
  return ButRadio;
}

function post_estimate() {
  var mail = $("#usermail").val();
  var leChoix = getButRadio();
  var montantPay = montantant_pays();
  $.ajax({
    type: "POST",
    data: {
      montant: montantPay.montant,
      pays_origine: montantPay.country_origine,
      pays_destination: montantPay.country_destination,
      choix: leChoix.choisir,
      transfert: leChoix.choixTrans,
      email: mail,
    },
    //dataType: "json",
  }).done(function (data) {
    window.location.href = "/validation?montant=" + data;
  });
}

function test() {
  var leChoix = getButRadio();
  var montantPay = montantant_pays();
  console.log(leChoix);
  console.log(montantPay);
}

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

// function calcul des commissions airtel money

function commissionAirtel(expr) {
  switch (true) {
    case eval(expr) <= 1000:
      com = 60;
      break;
    case eval(expr) > 1000 && eval(expr) <= 5000:
      com = 110;
      break;
    case eval(expr) > 5000 && eval(expr) <= 10000:
      com = 110;
      break;

    case eval(expr) > 10000 && eval(expr) <= 20000:
      com = 210;
      break;

    case eval(expr) > 20000 && eval(expr) <= 30000:
      com = 310;
      break;

    case eval(expr) > 30000 && eval(expr) <= 40000:
      com = 410;
      break;

    case eval(expr) > 40000 && eval(expr) <= 60000:
      com = 610;
      break;

    case eval(expr) > 60000 && eval(expr) <= 100000:
      com = 810;
      break;

    case eval(expr) > 100000 && eval(expr) <= 500000:
      com = 1550;
      break;

    case eval(expr) > 500000 && eval(expr) <= 1000000:
      com = 2600;
      break;

    case eval(expr) > 1000000 && eval(expr) <= 2000000:
      com = 3400;
      break;
    case eval(expr) > 2000000 && eval(expr) < 3500000:
      com = ((eval(expr) + 500000) / 500000) * 500 + 3400;
      break;

    default:
      alert("Veuillez entrer une somme inferieur à 3.5 millions de Franc xfa");
  }
  return com;
}

// function calcul commission du transfert
function commissionTransfertxfa(expr) {
  if (eval(expr) < 100000) {
    commi = 7000;
  } else {
    commi = 7000 + (eval(expr) / 100000) * 2400;
  }
  return commi;
}

function commissionTransferteuro(expr) {
  if (eval(expr) <= 9.14) {
    commi = 1;
  } else {
    commi = Math.round(eval((eval(expr) * 45) / (4.57 * 656) + 1.5)).toFixed(2);
  }
  return commi;
}

// Function to start setInterval call
function start() {
  intervalID = setInterval(function () {
    var images = $("img");
    var min = 1;
    var max = images.length;
    var random = Math.floor(Math.random() * (max - min)) + min;

    for (let i = random; i < max; i++) {
      if (images[i].classList[0].includes("img")) {
        images[i].style.display = "none";
        images[i].style.transition = "5s";
      }
      //images[random + 1].style.display = "none";
      //images[max].style.display = "none";
    }
    for (let j = 1; j <= random; j++) {
      if (images[j].classList[0].includes("img")) {
        images[j].style.display = "block";
        images[j].style.transition = "5s";
      }
      //images[random + 1].style.display = "block";
      //images[max].style.display = "block";
    }
  }, 3000);
}

// Function to stop setInterval call
function stop() {
  clearInterval(intervalID);
}

toggleButton.addEventListener("click", () => {
  navList.classList.toggle("active");
});

if (cancel != null) {
  cancel.addEventListener("click", () => {
    /* modification */

    letitre.style.display = "none";
    usermail.style.display = "none";
    acceuil.style.display = "flex";
    estimateur.style.display = "none";
    cont2.style.display = "none";
    cont2_ex.style.display = "none";
    cont3.style.display = "none";
    field.style.display = "none";
    bulle.style.display = "block";
    paint.style.width = "auto";
    paint.style.height = "auto";
    contents.style.display = "flex";
    contents.style.width = "61%";

    image1.style.display = "block";
    image2.style.display = "block";

    image3.style.display = "block";
    image5.style.display = "block";
    image7.style.display = "block";
    image8.style.display = "block";
    image6.style.display = "block";
    image9.style.display = "block";
    const tailScreen = window.screen.width;
    if (tailScreen <= 432) {
      footer.style.bottom = "74px";
    }
    //start();
  });
}

if (send_button != null) {
  start();
  send_button.addEventListener("click", () => {
    const paysO = document.getElementById("paysO").value;
    const paysD = document.getElementById("paysD").value;
    const expr = document.getElementById("montant").value;

    if (paysO == "france" && eval(expr) > 4000 && expr.length > 0) {
      alert("Entrer un montant inferieur à 4000 € !");
      estimateur.style.display = "none";
      usermail.style.display = "none";
      cont2.style.display = "none";
      cont2_ex.style.display = "none";
      field.style.display = "none";
      cont3.style.display = "none";
      acceuil.style.display = "block";
      letitre.style.display = "none";
      paint.style.width = "auto";
      acceuil.style.height = "340px";
      contents.style.width = "65%";

      // images
      image1.style.display = "block";
      image2.style.display = "block";

      image3.style.display = "block";
      image5.style.display = "block";
      image7.style.display = "block";
      image8.style.display = "block";
      image6.style.display = "block";
      image9.style.display = "block";
    } else if (
      paysD.length == 0 ||
      paysO.length == 0 ||
      expr.length == 0 ||
      expr == 0
    ) {
      alert(
        "Choisis un pays de destination /n un pays d'origine et un montant"
      );
      estimateur.style.display = "none";
      cont2.style.display = "none";
      usermail.style.display = "none";
      cont2_ex.style.display = "none";
      field.style.display = "none";
      cont2_ex.style.fontStretch = "condensed";
      cont2_ex.style.flexWrap = "wrap";
      cont3.style.display = "none";
      acceuil.style.display = "block";
      acceuil.style.height = "340px";
      letitre.style.display = "none";
      paint.style.width = "auto";
      paint.style.height = "auto";
      contents.style.width = "65%";
      start();

      // images

      image1.style.display = "block";
      image2.style.display = "block";

      image3.style.display = "block";
      image5.style.display = "block";
      image7.style.display = "block";
      image8.style.display = "block";
      image6.style.display = "block";
      image9.style.display = "block";
    } else if (eval(expr) > 3200000 && paysO == "gabon") {
      alert("Entrer un montant inferieur à 3.2 million de Franc xfa !");
      letitre.style.display = "none";
      estimateur.style.display = "none";
      usermail.style.display = "none";
      acceuil.style.display = "block";
      acceuil.style.height = "340px";
      cont2.style.display = "none";
      cont2_ex.style.display = "none";
      field.style.display = "none";
      cont3.style.display = "none";
      paint.style.width = "auto";
      paint.style.height = "auto";
      contents.style.width = "65%";

      // images

      image1.style.display = "block";
      image2.style.display = "block";

      image3.style.display = "block";
      image5.style.display = "block";
      image7.style.display = "block";
      image8.style.display = "block";
      image6.style.display = "block";
      image9.style.display = "block";
      start();
    } else {
      const tailleEcran = window.screen.width;
      console.log(tailleEcran);
      if (tailleEcran > 432) {
        //====================== ajout de condition sur responsive ==================================

        /*cont1.style.flexDirection = "column";*/
        field.style.display = "flex";
        acceuil.style.display = "none";
        cont2.style.display = "flex";
        cont2_ex.style.display = "flex";
        usermail.style.display = "block";
        cont2.style.flexDirection = "column";
        cont2_ex.style.flexDirection = "column";
        cont2.style.color = "white";
        cont2_ex.style.color = "white";
        cont2.style.fontWeight = "bold";
        cont2_ex.style.fontWeight = "bold";
        cont2.style.margin = "10px 5px 20px 2px";
        cont2_ex.style.margin = "10px 5px 20px 2px";
        cont3.style.display = "flex";
        cont3.style.flexDirection = "row";
        cont3.style.justifyContent = "center;";
        estimateur.style.display = "block";
        letitre.style.display = "block";
        paint.style.width = "65%";
        contents.style.width = "35%";

        // images

        image1.style.display = "none";
        image2.style.display = "none";
        image3.style.display = "none";
        image5.style.display = "none";
        image7.style.display = "none";
        image8.style.display = "none";
        image6.style.display = "none";
        image9.style.display = "none";

        // fin add images

        const euro = 656;
        let com = 0;
        let com2 = 0;
        let airtelSansFrais = 0;
        let mainPropre = 0;
        let airAvecFrais = 0;
        // l argent est entre dans la devise du pays du paysD
        if (paysO == "gabon" && paysD == "france") {
          /*commission un pour les transfert airtel */
          // la somme est directement saisie en xfa
          com = commissionAirtel(expr);
          /* ici le cas de la deuxieme commission */
          com2 = commissionTransfertxfa(expr);

          airtelSansFrais = Math.round(eval(expr) + eval(com2)).toFixed(2);
          airAvecFrais = Math.round(
            eval(expr) + eval(com) + eval(com2)
          ).toFixed(2);
          mainPropre = Math.round(eval(expr) + eval(com2)).toFixed(2);
          letitre.innerHTML =
            "Transfert de La " +
            paysO +
            " vers Le " +
            paysD +
            " de " +
            expr +
            " xfa";

          let informations = [
            {
              Type: "Airtel-sans-frais",
              "Montant-TTC en xfa": Math.round(airtelSansFrais).toFixed(2),
              "Montant-TTC en €": Math.round(
                eval(airtelSansFrais / euro)
              ).toFixed(2),
              "Total-commission en xfa": eval(com2),
              "Total-commission en €": Math.round(eval(com2) / euro).toFixed(2),
            },

            {
              Type: "Airtel-avec-frais",
              "Montant-TTC en xfa": Math.round(airAvecFrais).toFixed(2),
              "Montant-TTC en €": Math.round(eval(airAvecFrais / euro)).toFixed(
                2
              ),
              "Total-commission en xfa": eval(com) + eval(com2),
              "Total-commission en €": Math.round(
                eval(eval(com) / euro + eval(com2) / euro)
              ).toFixed(2),
            },

            {
              Type: "Récuperer en main",
              "Montant-TTC en xfa": Math.round(mainPropre).toFixed(2),
              "Montant-TTC en €": Math.round(eval(mainPropre) / euro).toFixed(
                2
              ),
              "Total-commission en xfa": eval(com2),
              "Total-commission en €": Math.round(eval(com2) / euro).toFixed(2),
            },
          ];
          const table = document.querySelector("table");
          if (table.rows.length == 0) {
            console.log("je suis vide");
            let data = Object.keys(informations[0]);
            generateTableHead(table, data);
            generateTable(table, informations);
          } else {
            console.log("je ne suis donc plus vide");
          }
        } else if (paysD == "gabon" && paysO == "france") {
          // le montant est saisi en euro
          expr_xfa = eval(eval(expr) * 656);

          com_xfa = commissionAirtel(expr_xfa);
          com = eval(com_xfa / 656);
          com2 = commissionTransferteuro(expr);

          airtelSansFrais = Math.round(eval(expr) + eval(com2)).toFixed(2);
          airAvecFrais = Math.round(
            eval(expr) + (eval(com) + eval(0.25) + eval(com2))
          ).toFixed(2);
          mainPropre = Math.round(eval(expr) + eval(com2)).toFixed(2);

          letitre.innerHTML =
            "Transfert du " +
            paysO +
            " vers La " +
            paysD +
            " de " +
            expr +
            " €";

          let informations = [
            {
              Type: "Airtel-sans-frais",
              "Montant-TTC en €": Math.round(airtelSansFrais).toFixed(2),
              "Montant-TTC en xfa": Math.round(
                eval(airtelSansFrais * euro)
              ).toFixed(2),
              "Total-commission en €": eval(com2),
              "Total-commission en xfa": Math.round(eval(com2) * euro).toFixed(
                2
              ),
            },

            {
              Type: "Airtel-avec-frais",
              "Montant-TTC en €": Math.round(airAvecFrais).toFixed(2),
              "Montant-TTC en xfa": Math.round(
                eval(airAvecFrais * euro)
              ).toFixed(2),
              "Total-commission en €": eval(com) + eval(com2),
              "Total-commission en xfa": Math.round(
                eval(eval(com) * euro + eval(com2) * euro)
              ).toFixed(2),
            },

            {
              Type: "Récuperer en main",
              "Montant-TTC en €": mainPropre,
              "Montant-TTC en xfa": Math.round(eval(mainPropre) * euro).toFixed(
                2
              ),
              "Total-commission en €": eval(com2),
              "Total-commission en xfa": Math.round(eval(com2) * euro).toFixed(
                2
              ),
            },
          ];
          const table = document.querySelector("table");
          if (table.rows.length == 0) {
            console.log("je suis vide");
            let data = Object.keys(informations[0]);
            generateTableHead(table, data);
            generateTable(table, informations);
          } else {
            console.log("je ne suis donc plus vide");
          }
        } else if (paysO == "france" && paysD == "france") {
          // le montant est saisi en euro
          com2 = commissionTransferteuro(expr);
          airtelSansFrais = Math.round(eval(expr) + eval(com2)).toFixed(2);
          letitre.innerHTML =
            "Transfert du " +
            paysO +
            " vers La " +
            paysD +
            " de " +
            expr +
            " €";

          let informations = [
            {
              Type: "Airtel-sans-frais",
              "Montant-TTC en €": "Unavailable",
              "Montant-TTC en xfa": "Unavailable",
              "Total-commission en €": "Unavailable",
            },

            {
              Type: "Envoie d'argent",
              "Montant-TTC en €": airtelSansFrais,
              "Total-commission en xfa": "Unavaible",
              "Total-commission en €": eval(com2),
            },
          ];
          const table = document.querySelector("table");

          if (table.rows.length == 0) {
            console.log("je suis vide");
            let data = Object.keys(informations[0]);
            generateTableHead(table, data);
            generateTable(table, informations);
          } else {
            console.log("je ne suis donc plus vide");
          }
        } else if (paysD == "gabon" && paysO == "gabon") {
          /*commission un pour les transfert airtel */
          // la somme est directement saisie en xfa
          com = commissionAirtel(expr);
          /* ici le cas de la deuxieme commission */
          com2 = commissionTransfertxfa(expr);

          airtelSansFrais = Math.round(eval(expr) + eval(com2)).toFixed(2);
          airAvecFrais = Math.round(
            eval(expr) + eval(com) + eval(com2)
          ).toFixed(2);
          mainPropre = Math.round(eval(expr) + eval(com2)).toFixed(2);
          letitre.innerHTML =
            "Transfert de La " +
            paysO +
            " vers Le " +
            paysD +
            " de " +
            expr +
            " xfa";

          let informations = [
            {
              Type: "Airtel-sans-frais",
              "Montant-TTC en xfa": Math.round(airtelSansFrais).toFixed(2),
              "Total-commission en xfa": eval(com2),
            },

            {
              Type: "Airtel-avec-frais",
              "Montant-TTC en xfa": Math.round(airAvecFrais).toFixed(2),

              "Total-commission en xfa": eval(com) + eval(com2),
            },

            {
              Type: "Récuperer en main",
              "Montant-TTC en xfa": Math.round(mainPropre).toFixed(2),
              "Total-commission en xfa": eval(com2),
            },
          ];
          const table = document.querySelector("table");
          if (table.rows.length == 0) {
            console.log("je suis vide");
            let data = Object.keys(informations[0]);
            generateTableHead(table, data);
            generateTable(table, informations);
          } else {
            console.log("je ne suis donc plus vide");
          }
        }
        stop();

        //===================== fin d'ajout condition sur responsive ================================
      } else if (tailleEcran <= 432) {
        const footer = document.querySelector("footer");
        const table_estimation = document.getElementById("table-estimation");
        table_estimation.style.backgroundColor = "#77b5fe";
        footer.style.bottom = "-200px";
        paint.style.width = "100%";
        contents.style.display = "none";
        /*cont1.style.flexDirection = "column";*/
        field.style.display = "flex";
        acceuil.style.display = "none";
        cont2.style.display = "flex";
        cont2_ex.style.display = "flex";
        usermail.style.display = "block";
        cont2.style.flexDirection = "column";
        cont2_ex.style.flexDirection = "column";
        cont2.style.color = "white";
        cont2_ex.style.color = "white";
        cont2.style.fontWeight = "bold";
        cont2_ex.style.fontWeight = "bold";
        cont2.style.margin = "10px 5px 20px 2px";
        cont2_ex.style.margin = "10px 5px 20px 2px";
        cont3.style.display = "flex";
        cont3.style.flexDirection = "row";
        cont3.style.justifyContent = "center;";
        estimateur.style.display = "block";
        letitre.style.display = "block";

        // images

        image1.style.display = "none";
        image2.style.display = "none";
        image3.style.display = "none";
        image5.style.display = "none";
        image7.style.display = "none";
        image8.style.display = "none";
        image6.style.display = "none";
        image9.style.display = "none";

        // fin add images

        const euro = 656;
        let com = 0;
        let com2 = 0;
        let airtelSansFrais = 0;
        let mainPropre = 0;
        let airAvecFrais = 0;

        // l argent est entre dans la devise du paysO
        if (paysO == "gabon" && paysD == "france") {
          /*commission un pour les transfert airtel */
          // la somme est directement saisie en xfa
          com = commissionAirtel(expr);
          /* ici le cas de la deuxieme commission */
          com2 = commissionTransfertxfa(expr);

          airtelSansFrais = Math.round(eval(expr) + eval(com2)).toFixed(2);
          airAvecFrais = Math.round(
            eval(expr) + eval(com) + eval(com2)
          ).toFixed(2);
          mainPropre = Math.round(eval(expr) + eval(com2)).toFixed(2);
          letitre.innerHTML =
            "Transfert de La " +
            paysO +
            " vers Le " +
            paysD +
            " de " +
            expr +
            " xfa";

          let informations = [
            {
              Type: "Airtel-sans-frais",
              "Montant-TTC en xfa": Math.round(airtelSansFrais).toFixed(2),
              "Montant-TTC en €": Math.round(
                eval(airtelSansFrais / euro)
              ).toFixed(2),
              "Total-commission en xfa": eval(com2),
            },

            {
              Type: "Airtel-avec-frais",
              "Montant-TTC en xfa": Math.round(airAvecFrais).toFixed(2),
              "Montant-TTC en €": Math.round(eval(airAvecFrais / euro)).toFixed(
                2
              ),
              "Total-commission en xfa": eval(com) + eval(com2),
            },

            {
              Type: "Récuperer en main",
              "Montant-TTC en xfa": Math.round(mainPropre).toFixed(2),
              "Montant-TTC en €": Math.round(eval(mainPropre) / euro).toFixed(
                2
              ),
              "Total-commission en xfa": eval(com2),
            },
          ];
          const table = document.querySelector("table");
          if (table.rows.length == 0) {
            console.log("je suis vide");
            let data = Object.keys(informations[0]);
            generateTableHead(table, data);
            generateTable(table, informations);
          } else {
            console.log("je ne suis donc plus vide");
          }
        } else if (paysD == "gabon" && paysO == "france") {
          // le montant est saisi en euro
          expr_xfa = eval(eval(expr) * 656);

          com_xfa = commissionAirtel(expr_xfa);
          com = eval(com_xfa / 656);
          com2 = commissionTransferteuro(expr);

          airtelSansFrais = Math.round(eval(expr) + eval(com2)).toFixed(2);
          airAvecFrais = Math.round(
            eval(expr) + (eval(com) + eval(0.25) + eval(com2))
          ).toFixed(2);
          mainPropre = Math.round(eval(expr) + eval(com2)).toFixed(2);

          letitre.innerHTML =
            "Transfert du " +
            paysO +
            " vers La " +
            paysD +
            " de " +
            expr +
            " €";

          let informations = [
            {
              Type: "Airtel-sans-frais",
              "Montant-TTC en €": Math.round(airtelSansFrais).toFixed(2),
              "Montant-TTC en xfa": Math.round(
                eval(airtelSansFrais * euro)
              ).toFixed(2),
              "Total-commission en €": eval(com2),
            },

            {
              Type: "Airtel-avec-frais",
              "Montant-TTC en €": Math.round(airAvecFrais).toFixed(2),
              "Montant-TTC en xfa": Math.round(
                eval(airAvecFrais * euro)
              ).toFixed(2),
              "Total-commission en €": eval(com) + eval(com2),
            },

            {
              Type: "Récuperer en main",
              "Montant-TTC en €": mainPropre,
              "Montant-TTC en xfa": Math.round(eval(mainPropre) * euro).toFixed(
                2
              ),
              "Total-commission en €": eval(com2),
            },
          ];
          const table = document.querySelector("table");
          if (table.rows.length == 0) {
            console.log("je suis vide");
            let data = Object.keys(informations[0]);
            generateTableHead(table, data);
            generateTable(table, informations);
          } else {
            console.log("je ne suis donc plus vide");
          }
        } else if (paysO == "france" && paysD == "france") {
          // le montant est saisi en euro
          com2 = commissionTransferteuro(expr);
          airtelSansFrais = Math.round(eval(expr) + eval(com2)).toFixed(2);
          letitre.innerHTML =
            "Transfert du " +
            paysO +
            " vers La " +
            paysD +
            " de " +
            expr +
            " €";

          let informations = [
            {
              Type: "Airtel-sans-frais",
              "Montant-TTC en €": "Unavailable",
              "Total-commission en €": "Unavailable",
            },

            {
              Type: "Envoie d'argent",
              "Montant-TTC en €": airtelSansFrais,
              "Total-commission en €": eval(com2),
            },
          ];
          const table = document.querySelector("table");

          if (table.rows.length == 0) {
            console.log("je suis vide");
            let data = Object.keys(informations[0]);
            generateTableHead(table, data);
            generateTable(table, informations);
          } else {
            console.log("je ne suis donc plus vide");
          }
        } else if (paysD == "gabon" && paysO == "gabon") {
          /*commission un pour les transfert airtel */
          // la somme est directement saisie en xfa
          com = commissionAirtel(expr);
          /* ici le cas de la deuxieme commission */
          com2 = commissionTransfertxfa(expr);

          airtelSansFrais = Math.round(eval(expr) + eval(com2)).toFixed(2);
          airAvecFrais = Math.round(
            eval(expr) + eval(com) + eval(com2)
          ).toFixed(2);
          mainPropre = Math.round(eval(expr) + eval(com2)).toFixed(2);
          letitre.innerHTML =
            "Transfert de La " +
            paysO +
            " vers Le " +
            paysD +
            " de " +
            expr +
            " xfa";

          let informations = [
            {
              Type: "Airtel-sans-frais",
              "Montant-TTC en xfa": Math.round(airtelSansFrais).toFixed(2),
              "Total-commission en xfa": eval(com2),
            },

            {
              Type: "Airtel-avec-frais",
              "Montant-TTC en xfa": Math.round(airAvecFrais).toFixed(2),

              "Total-commission en xfa": eval(com) + eval(com2),
            },

            {
              Type: "Récuperer en main",
              "Montant-TTC en xfa": Math.round(mainPropre).toFixed(2),
              "Total-commission en xfa": eval(com2),
            },
          ];
          const table = document.querySelector("table");
          if (table.rows.length == 0) {
            console.log("je suis vide");
            let data = Object.keys(informations[0]);
            generateTableHead(table, data);
            generateTable(table, informations);
          } else {
            console.log("je ne suis donc plus vide");
          }
        }
        stop();
      }
    }
  });
}
