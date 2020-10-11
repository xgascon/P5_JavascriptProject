if(typeof localStorage!='undefined') {

    const id_panier = document.getElementById("id-panier");
    const clear = document.getElementById("clear");  
    const total_panier = document.getElementById("total");
    const contact_button = document.getElementById("contact_button");   
    const firstName = document.getElementById("firstName"); 
    const lastName = document.getElementById("lastName");
    const city = document.getElementById("city");
    const address = document.getElementById("address");
    const email = document.getElementById("email");

    if(localStorage.getItem("products")) {
        var id_json = [localStorage.getItem("products")];
        var id = JSON.parse(id_json);
    
        let products = localStorage.getItem("products");
        let contact = {"firstName": firstName.value,
        "lastName": lastName.value,
        "city": city,
        "address": address,
        "email": email.value};
        
        const data = {"products": products, 
        "contact": contact};
        
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
                    
                    // function priceAddition(){
                        
                        // for(let i=1; i<=id.length; i++){
                        //     let totalPrice+i = [Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(response.price/100)];
                        //     // totalPrice.push(Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(response.price/100));
                        //     console.log(totalPrice)
    
                        // }
                        
                        // for(const unitPrice of totalPrice){
                        //     console.log(unitPrice+unitPrice);
                        // }
    
                    // }
    
                    // for(const unitPrice of totalPrice){
                    //     console.log(unitPrice);
                                    
                    total_panier.innerHTML = "Vous avez "+id.length+" produit(s) dans votre panier, pour un total de ";
                    // };
                }            
            }
    
            request3.open("GET", "http://localhost:3000/api/cameras/"+item);  
            request3.send();        
        
        })   
    
    
    
        // var request4 = new XMLHttpRequest();
        // request4.onreadystatechange = function(){
        //     if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
        //         var response =JSON.parse(this.response);                                         
                   
                       
    
        //     }            
        // }
    
        // request4.open("GET", "http://localhost:3000/api/cameras/"+item);  
        // request4.send();
    
        
        
    
        clear.addEventListener('click', function(){
            localStorage.clear();
            window.location.reload();
        });
    
        contact_button.addEventListener('click', function(event){
            var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(firstName.value === '' || lastName.value === '' || city.value === '' || address.value === '' || email.value === '') {
                alert("Veuillez renseigner tous les champs Contact !");
                firstName.style.border = "2px solid #FF0000";
                lastName.style.border = "2px solid #FF0000";
                city.style.border = "2px solid #FF0000";
                address.style.border = "2px solid #FF0000";
                email.style.border = "2px solid #FF0000";
                event.preventDefault();
            } else if(!emailRegExp.test(email.value)) {                       
                alert("Veuillez renseigner une adresse e-mail valide ! ");
                event.preventDefault();            
            } else {
                // var request4 = new XMLHttpRequest();
                // request4.open("POST", "http://localhost:3000/api/cameras/");
                // request4.setRequestHeader("Content-Type","application/json");
                // request.send(JSON.stringify(data));
                // localStorage.clear();
                // window.location.reload();
                alert("ok");
                console.log(contact);
                event.preventDefault(); 
            }         
            
        });
    
        // contact_button.addEventListener('click', function(event){
        //     var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        //     if(!emailRegExp.test(email.value)) {
        //         alert("Veuillez renseigner une adresse e-mail valide ! ");
        //         event.preventDefault();
        //     } else {
                // var request4 = new XMLHttpRequest();
                // request4.open("POST", "http://localhost:3000/api/cameras/");
                // request4.setRequestHeader("Content-Type","application/json");
                // request.send(JSON.stringify(data));
            // }
            
        // });
        
        
    
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
        total_panier.innerHTML = "Votre panier est vide";
    }    

} else {
    alert("Navigateur trop ancien pour cette fonctionnalité !")
}








