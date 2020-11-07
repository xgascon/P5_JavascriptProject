// Récupération de l'identifiant du produit d'après l'adresse URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

// Définition des constantes
const camera_name = document.getElementById("camera_name");
const camera_img = document.getElementById("camera_img");
const camera_desc = document.getElementById("camera_desc");
const camera_lenses = document.getElementById("camera_lenses");
const camera_price = document.getElementById("camera_price");
const clic = document.getElementById("clic");

// Requête pour récupérer les éléments du produit à partir de l'API
var request2 = new XMLHttpRequest();
request2.onreadystatechange = function(){
    if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
        var response =JSON.parse(this.response);
        camera_name.innerHTML = response.name;
        camera_img.src = response.imageUrl;
        camera_desc.innerHTML = response.description;
        camera_price.innerHTML = "Prix : "+Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(response.price/100);    
        let lenses = response.lenses;

        // Boucle pour créer une option de la liste déroulante pour chaque lentille
        lenses.forEach(lense => {
            let option_lense = document.createElement("option");
            option_lense.setAttribute("value", lense);
            option_lense.innerHTML = lense;
            
            camera_lenses.appendChild(option_lense);

        })        
    }
};

request2.open("GET", "http://oc-p5-api.herokuapp.com/api/cameras/"+id);
request2.send();

// Réaction au clic du bouton "Ajouter au panier"
clic.addEventListener('click', function() {

    // Si absence de choix dans la liste déroulante, alerte faite auprès de l'utilisateur 
    if(camera_lenses.value === '') {
    alert("Veuillez renseigner l'information Lentilles !");
    camera_lenses.style.border = "2px solid #FF0000";

    // Si choix fait dans la liste déroulante, identifiant du produit mis dans le localStorage
    } else {        
        if(typeof localStorage!='undefined') {
            let idArray = [];   
            
            // Si le localStorage contient déjà une info (panier déjà rempli)
            if(localStorage.getItem("products")) {
                idArray = JSON.parse(localStorage.getItem("products"));
                addId(id, idArray);              
                alert("Produit supplémentaire ajouté à votre Panier !");   
                window.location.href = "panier.html";
                
            // Si le localStorage ne contient aucune info (panier vide)
            } else { 
                addId(id, idArray);
                alert("Produit ajouté dans votre Panier !"); 
                window.location.href = "panier.html";                                 
            }
            
            // Fonction pour ajouter un produit au localStorage (au panier)
            function addId(id, idArray) {
                idArray.push(id);
                localStorage.setItem("products", JSON.stringify(idArray)); 
            }
        } else {
            alert("Navigateur trop ancien pour cette fonctionnalité !")
        }
    }
});






  
