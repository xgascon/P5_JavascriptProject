if(typeof localStorage!='undefined') {

    // Définition des constantes 
    const orderId = document.getElementById("orderId");
    const orderId_title = document.getElementById("orderId_title");
    const totalPrice = document.getElementById("totalPrice");
    const totalPrice_title = document.getElementById("totalPrice_title");
    const remerciement = document.getElementById("remerciement");

    // Affichage du n° commade et prix total
    if(localStorage.getItem("orderId")){
        orderId.innerHTML = localStorage.getItem("orderId");
        totalPrice.innerHTML = Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(localStorage.getItem("totalPrice"));    
    
    // Si commande non effectuée alors message de redirection et disparition d'éléments inutiles
    } else {
        orderId.remove();
        totalPrice_title.remove();
        totalPrice.remove();
        remerciement.remove();
        
        orderId_title.innerHTML = "Votre commande est vide, ";
        orderId_title.className = "card-text mx-2 my-4 text-center";

        let a_accueil = document.createElement("a");
        a_accueil.setAttribute("href", "index.html");
        a_accueil.innerHTML = "revenez sur la page d'accueil en cliquant ici"

        orderId_title.appendChild(a_accueil);
    }
    
    // Vider le localStoage entièrement 
    localStorage.clear();

} else {
    alert("Navigateur trop ancien pour cette fonctionnalité !")
}

