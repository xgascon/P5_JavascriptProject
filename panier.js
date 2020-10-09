if(typeof localStorage!='undefined') {

    var id_json = [localStorage.getItem("products")];
    var id = JSON.parse(id_json);

    const id_panier = document.getElementById("id-panier");
    const clear = document.getElementById("clear");  
    const total_panier = document.getElementById("total");
    const contact_button = document.getElementById("contact_button");   
    const firstName = document.getElementById("firstName"); 
    const lastName = document.getElementById("lastName");
    const city = document.getElementById("city");
    const address = document.getElementById("address");
    const email = document.getElementById("email");

    
    
    id.forEach(item => {
     
        let itemList = document.createElement("li");
        
        itemList.innerHTML = "Référence : "+item;            
        
        let itemPhoto_p = document.createElement("p");
        let itemPhoto = document.createElement("img");
        let itemName = document.createElement("div");
        let itemPrice = document.createElement("p");

        id_panier.appendChild(itemList);

        itemList.appendChild(itemPhoto_p);
        itemList.appendChild(itemName);
        itemList.appendChild(itemPrice);
        
        itemPhoto_p.appendChild(itemPhoto);
    
        var request3 = new XMLHttpRequest();
        request3.onreadystatechange = function(){
            if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
                var response =JSON.parse(this.response);                                         
                
                itemPhoto.setAttribute("src", response.imageUrl);
                itemPhoto.setAttribute("alt", "camera "+response.name);
                itemPhoto.setAttribute("width", "10%");                  
                itemName.innerHTML = response.name;                        
                itemPrice.innerHTML = "Prix : "+Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(response.price/100);          
    
            }            
        }

        request3.open("GET", "http://localhost:3000/api/cameras/"+item);  
        request3.send();        
    
    })   

    var request4 = new XMLHttpRequest();
    request4.onreadystatechange = function(){
        if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
            var response =JSON.parse(this.response);                                         
               
            total_panier.innerHTML = "Vous avez "+id.length+" produit(s) dans votre panier, pour un total de "+id_panier.firstChild.innerHTML;        

        }            
    }

    request4.open("GET", "http://localhost:3000/api/cameras/"+item);  
    request4.send();

    
    

    clear.addEventListener('click', function(){
        localStorage.clear();
        window.location.reload();
    });

    contact_button.addEventListener('click', function(event){
        if(firstName.value === '' || lastName.value === '' || city.value === '' || address.value === '' || email.value === '') {
            alert("Veuillez renseigner tous les champs Contact !");
            firstName.style.border = "2px solid #FF0000";
            lastName.style.border = "2px solid #FF0000";
            city.style.border = "2px solid #FF0000";
            address.style.border = "2px solid #FF0000";
            email.style.border = "2px solid #FF0000";
            event.preventDefault();
        } else {
        }

    });

    contact_button.addEventListener('click', function(event){
        var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(!emailRegExp.test(email.value)) {
            alert("Veuillez renseigner une adresse e-mail valide ! ");
            event.preventDefault();
        } else {
            
        }
        
    });
    
    

    // email.addEventListener("input", function (event) {
    //     // Chaque fois que l'utilisateur saisit quelque chose
    //     // on vérifie la validité du champ e-mail.
    //     if (email.validity.valid) {
    //       // S'il y a un message d'erreur affiché et que le champ
    //       // est valide, on retire l'erreur
    //       error.innerHTML = ""; // On réinitialise le contenu
    //       error.className = "error"; // On réinitialise l'état visuel du message
    //     }
    //   }, false);


} else {
    alert("Navigateur trop ancien pour cette fonctionnalité !")
}


// return \b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b.test(value);
// #^[a-zA-Z-]+@[a-zA-Z-]+\.[a-zA-Z]{2,6}$#
