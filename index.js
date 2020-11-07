// Définition de constantes
const row = document.getElementById("produits");

// Requête grâce à une fonction avec Promesse pour créer la liste des produits avec leurs infos issus de l'API
let retrieveAPI = function (url) {
    // On renvoie une promesse qui prend en paramètre une fonction 
    // avec 2 paramètres, le callback de succès et d'erreur
    return new Promise(function (resolve, reject) {
      let request1 = new XMLHttpRequest()
      request1.open('GET', url, true)
      request1.onreadystatechange = function () {
        if (request1.readyState == XMLHttpRequest.DONE) { 
           if(request1.status == 200)
             resolve(request1.responseText)
           else
             reject(request1)
        }
      };
      request1.send(null)
    })
}
  
// L'appel à la fonction
retrieveAPI('https://oc-p5-api.herokuapp.com/api/cameras')
.then(function (response1) {

var response = JSON.parse(response1);

// Boucle générant des éléments renfermant les infos de l'API
response.forEach(produit => {
    let col = document.createElement("div");
    col.className = "col-12 col-md-6 mx-auto";
    let card = document.createElement("div");
    card.className = "card shadow my-4 py-4";

    let name = document.createElement("h2");
    name.className = "card-title text-center";
    name.innerHTML = produit.name;

    let p_img = document.createElement("p");
    p_img.className = "card-text text-center";
    let a_img = document.createElement("a");
    a_img.setAttribute("href", "produits.html?id="+produit._id);
    a_img.setAttribute("target", "_blank");
    a_img.className = "stretched-link";
    let img = document.createElement("img");
    img.setAttribute("src", produit.imageUrl);
    img.setAttribute("alt", "camera "+produit.name);
    img.setAttribute("width", "60%");            

    let p_descr = document.createElement("p");
    p_descr.className = "card-text text-center mx-2 font-italic";
    p_descr.innerHTML = produit.description; 

    let p_price = document.createElement("p");
    p_price.className = "card-text text-center mx-2";
    p_price.innerHTML = "Prix : "+Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(produit.price/100);

    // Imbrication des éléments dans la page web
    row.appendChild(col);
    col.appendChild(card);

    card.appendChild(name);

    card.appendChild(p_img);
    p_img.appendChild(a_img);
    a_img.appendChild(img);

    card.appendChild(p_descr);

    card.appendChild(p_price);
});

}).catch(function (request1) {
console.log("Erreur de réponse du serveur");
});