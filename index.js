let row = document.getElementById("produits");

var request1 = new XMLHttpRequest();
request1.onreadystatechange = function(){
    if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
        var response =JSON.parse(this.response);
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

            row.appendChild(col);
            col.appendChild(card);

            card.appendChild(name);

            card.appendChild(p_img);
            p_img.appendChild(a_img);
            a_img.appendChild(img);

            card.appendChild(p_descr);

            card.appendChild(p_price);
        });
        
        }
};

request1.open("GET", "http://localhost:3000/api/cameras");
request1.send();




