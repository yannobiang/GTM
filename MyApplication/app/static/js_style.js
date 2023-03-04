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
  var pays = $("#pays option:selected");

  montPay[info[0].name] = info[0].value;
  montPay[pays[0].attributes.name.value] = pays[0].value;

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
      pays: montantPay.country,
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
    contents.style.width = "61%";

    image1.style.display = "block";
    image2.style.display = "block";

    image3.style.display = "block";
    image5.style.display = "block";
    image7.style.display = "block";
    image8.style.display = "block";
    image6.style.display = "block";
    image9.style.display = "block";
    //start();
  });
}

/*
if (acceuil.style.display != "none") {
  console.log("popo");
  setInterval(function () {
    var images = $("img");
    var min = 1;
    var max = images.length;
    var random = Math.floor(Math.random() * (max - min)) + min;
    for (let i = random; i < max; i++) {
      images[i].style.display = "none";
      images[i].style.transition = "5s";
      //images[random + 1].style.display = "none";
      //images[max].style.display = "none";
    }
    for (let j = 1; j <= random; j++) {
      images[j].style.display = "block";
      images[j].style.transition = "5s";
      //images[random + 1].style.display = "block";
      //images[max].style.display = "block";
    }
  }, 3000);
}
*/
if (send_button != null) {
  // start();
  send_button.addEventListener("click", () => {
    const pays = document.getElementById("pays").value;
    const expr = document.getElementById("montant").value;

    if (pays == "france" && eval(expr) > 3000 && expr.length > 0) {
      alert("Entrer un montant inferieur à 3000 € !");
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
    } else if (pays.length == 0 || expr.length == 0 || expr == 0) {
      alert("Choisis un pays et un montant");
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
    } else if (eval(expr) > 3200000 && pays == "gabon") {
      alert("Entrer un montant inferieur à 1 million de Franc CFA !");
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

      if (pays == "gabon") {
        /*commission un pour les transfert airtel */
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
            alert(
              "Veuillez entrer une somme inferieur à 3.5 millions de Franc CFA"
            );
        }

        /* ici le cas de la deuxieme commission */

        switch (true) {
          case eval(expr) > 0 && eval(expr) <= 100000:
            com2 = 3000;
            break;
          case eval(expr) > 100000 && eval(expr) <= 200000:
            com2 = 1500 + 3000;
            break;
          case eval(expr) > 200000 && eval(expr) <= 300000:
            com2 = eval(1500 * 2) + 3000;
            break;
          case eval(expr) > 300000 && eval(expr) <= 400000:
            com2 = eval(1500 * 3) + 3000;
            break;
          case eval(expr) > 400000 && eval(expr) <= 500000:
            com2 = eval(1500 * 4) + 3000;
            break;
          case eval(expr) > 500000 && eval(expr) <= 600000:
            com2 = eval(1500 * 5) + 3000;
            break;
          case eval(expr) > 600000 && eval(expr) <= 700000:
            com2 = eval(1500 * 6) + 3000;
            break;
          case eval(expr) > 700000 && eval(expr) <= 800000:
            com2 = eval(1500 * 7) + 3000;
            break;
          case eval(expr) > 800000 && eval(expr) <= 900000:
            com2 = eval(1500 * 8) + 3000;
            break;
          case eval(expr) > 900000 && eval(expr) <= 1000000:
            com2 = eval(1500 * 9) + 3000;
            break;
          case eval(expr) > 1000000 && eval(expr) <= 1100000:
            com2 = eval(1500 * 10) + 3000;
            break;
          case eval(expr) > 1100000 && eval(expr) <= 1200000:
            com2 = eval(1500 * 11) + 3000;
            break;
          case eval(expr) > 1200000 && eval(expr) <= 1300000:
            com2 = eval(1500 * 12) + 3000;
            break;
          case eval(expr) > 1300000 && eval(expr) <= 1400000:
            com2 = eval(1500 * 13) + 3000;
            break;
          case eval(expr) > 1400000 && eval(expr) <= 1500000:
            com2 = eval(1500 * 14) + 3000;
            break;
          case eval(expr) > 1500000 && eval(expr) <= 1600000:
            com2 = eval(1500 * 15) + 3000;
            break;
          case eval(expr) > 1600000 && eval(expr) <= 1700000:
            com2 = eval(1500 * 16) + 3000;
            break;
          case eval(expr) > 1700000 && eval(expr) <= 1800000:
            com2 = eval(1500 * 17) + 3000;
            break;
          case eval(expr) > 1800000 && eval(expr) <= 1900000:
            com2 = eval(1500 * 18) + 3000;
            break;
          case eval(expr) > 1900000 && eval(expr) <= 2000000:
            com2 = eval(1500 * 19) + 3000;
            break;
          case eval(expr) > 2000000:
            com2 = ((eval(expr) + 100000) / 100000) * 1500 + 3000;
            break;

          default:
            console.log("Je ne peux calculer la seconde commission");
        }
        airtelSansFrais = Math.round(eval(expr) + eval(com2)).toFixed(2);
        airAvecFrais = Math.round(eval(expr) + eval(com) + eval(com2)).toFixed(
          2
        );
        mainPropre = Math.round(eval(expr) + eval(com2)).toFixed(2);
        letitre.innerHTML =
          "Transfert de La France vers Le " +
          pays +
          " de " +
          expr +
          " Franc CFA";

        let informations = [
          {
            Type: "Airtel-sans-frais",
            "Montant-TTC en CFA": airtelSansFrais,
            "Montant-TTC en €": Math.round(
              eval(airtelSansFrais / euro)
            ).toFixed(2),
            "Total-commission en CFA": eval(com2),
            "Total-commission en €": Math.round(eval(com2) / euro).toFixed(2),
          },

          {
            Type: "Airtel-avec-frais",
            "Montant-TTC en CFA": airAvecFrais,
            "Montant-TTC en €": Math.round(eval(airAvecFrais / euro)).toFixed(
              2
            ),
            "Total-commission en CFA": eval(com) + eval(com2),
            "Total-commission en €": Math.round(
              eval(eval(com) / euro + eval(com2) / euro)
            ).toFixed(2),
          },

          {
            Type: "Récuperer en main",
            "Montant-TTC en CFA": mainPropre,
            "Montant-TTC en €": Math.round(eval(mainPropre) / euro).toFixed(2),
            "Total-commission en CFA": eval(com2),
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
      } else if (pays == "france") {
        switch (true) {
          case eval(expr) <= Math.round(1000 / euro).toFixed(2):
            com = Math.round(60 / euro).toFixed(2);
            break;
          case eval(expr) > Math.round(1000 / euro).toFixed(2) &&
            eval(expr) <= Math.round(5000 / euro).toFixed(2):
            com = Math.round(110 / euro).toFixed(2);
            break;
          case eval(expr) > Math.round(5000 / euro).toFixed(2) &&
            eval(expr) <= Math.round(10000 / euro).toFixed(2):
            com = Math.round(110 / euro).toFixed(2);
            break;

          case eval(expr) > Math.round(10000 / euro).toFixed(2) &&
            eval(expr) <= Math.round(20000 / euro).toFixed(2):
            com = Math.round(210 / euro).toFixed(2);
            break;

          case eval(expr) > Math.round(20000 / euro).toFixed(2) &&
            eval(expr) <= Math.round(30000 / euro).toFixed(2):
            com = Math.round(310 / euro).toFixed(2);
            break;

          case eval(expr) > Math.round(30000 / euro).toFixed(2) &&
            eval(expr) <= Math.round(40000).toFixed(2):
            com = Math.round(410 / euro).toFixed(2);
            break;

          case eval(expr) > Math.round(40000 / euro).toFixed(2) &&
            eval(expr) <= Math.round(60000 / euro).toFixed(2):
            com = Math.round(610 / euro).toFixed(2);
            break;

          case eval(expr) > Math.round(60000 / euro).toFixed(2) &&
            eval(expr) <= Math.round(100000 / euro).toFixed(2):
            com = Math.round(810 / euro).toFixed(2);
            break;

          case eval(expr) > Math.round(100000 / euro).toFixed(2) &&
            eval(expr) <= Math.round(500000 / euro).toFixed(2):
            com = Math.round(1550 / euro).toFixed(2);
            break;

          case eval(expr) > Math.round(500000 / euro).toFixed(2) &&
            eval(expr) <= Math.round(1000000 / euro).toFixed(2):
            com = Math.round(2600 / euro).toFixed(2);
            break;

          case eval(expr) > Math.round(1000000 / euro).toFixed(2) &&
            eval(expr) <= Math.round(2000000 / euro).toFixed(2):
            com = Math.round(3400 / euro).toFixed(2);
            break;

          default:
            alert("Veuillez entrer une somme inferieur à 3 000 €");
            break;
        }

        /* ici le cas de la deuxieme commission */
        switch (true) {
          case eval(expr) <= Math.round(eval(60000 / euro)).toFixed(2):
            com2 = Math.round(500 / euro).toFixed(2);

            break;
          case eval(expr) > Math.round(60000 / euro).toFixed(2) &&
            eval(expr) <= Math.round(90000 / euro).toFixed(2):
            com2 = Math.round(700 / euro).toFixed(2);

            break;
          case eval(expr) > Math.round(90000 / euro).toFixed(2) &&
            eval(expr) <= Math.round(120000 / euro).toFixed(2):
            com2 = Math.round(900 / euro).toFixed(2);
            break;

          case eval(expr) > Math.round(120000 / euro).toFixed(2) &&
            eval(expr) <= Math.round(150000 / euro).toFixed(2):
            com2 = Math.round(1100 / euro).toFixed(2);
            break;

          case eval(expr) > Math.round(150000 / euro).toFixed(2) &&
            eval(expr) <= Math.round(300000 / euro).toFixed(2):
            com2 = Math.round(1300 / euro).toFixed(2);
            break;

          case eval(expr) > Math.round(300000 / euro).toFixed(2) &&
            eval(expr) <= Math.round(400000 / euro).toFixed(2):
            com2 = Math.round(1500 / euro).toFixed(2);
            break;

          case eval(expr) > Math.round(400000 / euro).toFixed(2) &&
            eval(expr) <= Math.round(600000 / euro).toFixed(2):
            com2 = Math.round(1900 / euro).toFixed(2);
            break;

          case eval(expr) > Math.round(600000 / euro).toFixed(2) &&
            eval(expr) <= Math.round(1000000 / euro).toFixed(2):
            com2 = Math.round(2300 / euro).toFixed(2);
            break;

          case eval(expr) > Math.round(1000000 / euro).toFixed(2) &&
            eval(expr) <= Math.round(1500000 / euro).toFixed(2):
            com2 = Math.round(2700 / euro).toFixed(2);
            break;

          case eval(expr) > Math.round(1500000 / euro).toFixed(2) &&
            eval(expr) <= Math.round(2000000 / euro).toFixed(2):
            com2 = Math.round(3100 / euro).toFixed(2);
            break;

          case eval(expr) > Math.round(2000000 / euro).toFixed(2) &&
            eval(expr) <= Math.round(3000000 / euro).toFixed(2):
            com2 = Math.round(3500 / euro).toFixed(2);
            break;

          default:
            alert("Pas de transfert au dessus de 3000 €");
        }

        airtelSansFrais = Math.round(eval(expr) + eval(com2)).toFixed(2);
        airAvecFrais = Math.round(
          eval(expr) + (eval(com) + eval(0.25) + eval(com2))
        ).toFixed(2);
        mainPropre = Math.round(eval(expr) + eval(com2)).toFixed(2);

        letitre.innerHTML =
          "Transfert du Gabon vers La " + pays + " de " + expr + " €";

        let informations = [
          {
            Type: "Airtel-sans-frais",
            "Montant-TTC en €": airtelSansFrais,
            "Montant-TTC en CFA": Math.round(
              eval(airtelSansFrais * euro)
            ).toFixed(2),
            "Total-commission en €": eval(com2),
            "Total-commission en CFA": Math.round(eval(com2) * euro).toFixed(2),
          },

          {
            Type: "Airtel-avec-frais",
            "Montant-TTC en €": airAvecFrais,
            "Montant-TTC en CFA": Math.round(eval(airAvecFrais * euro)).toFixed(
              2
            ),
            "Total-commission en €": eval(com) + eval(com2),
            "Total-commission en CFA": Math.round(
              eval((eval(com) + eval(0.25)) * euro + eval(com2) * euro)
            ).toFixed(2),
          },

          {
            Type: "Récuperer en main",
            "Montant-TTC en €": mainPropre,
            "Montant-TTC en CFA": Math.round(eval(mainPropre) * euro).toFixed(
              2
            ),
            "Total-commission en €": eval(com2),
            "Total-commission en CFA": Math.round(eval(com2) * euro).toFixed(2),
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
  });
}

/* action periodique*/

/*
const checkout_public_key = '{{checkout_public_key}}'
const checkout_session_id = '{{checkout_session_id}}'
var stripe = Stripe(checkout_public_key);
const button = document.querySelector("#buy_now_btn");
button.addEventListener("click", (event) => {
  stripe
    .redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: checkout_session_id,
    })
    .then(function (result) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    });
});
/*
const button = document.querySelector('#buy_now_btn');
button.addEventListener('click', event => {
    fetch('/stripe_pay')
    .then((result) => { return result.json(); })
    .then((data) => {
        var stripe = Stripe(data.checkout_public_key);
        stripe.redirectToCheckout({
            // Make the id field from the Checkout Session creation API response
            // available to this file, so you can provide it as parameter here
            // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
            sessionId: data.checkout_session_id
        }).then(function (result) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `result.error.message`.
        });
    })
});
*/
