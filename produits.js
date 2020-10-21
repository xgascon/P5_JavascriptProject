const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

const camera_name = document.getElementById("camera_name");
const camera_img = document.getElementById("camera_img");
const camera_desc = document.getElementById("camera_desc");
const camera_lenses = document.getElementById("camera_lenses");
const camera_price = document.getElementById("camera_price");

const clic = document.getElementById("clic");

var request2 = new XMLHttpRequest();
request2.onreadystatechange = function(){
    if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
        var response =JSON.parse(this.response);
        camera_name.innerHTML = response.name;
        camera_img.src = response.imageUrl;
        camera_desc.innerHTML = response.description;
        camera_price.innerHTML = "Prix : "+Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(response.price/100);
        
        let lenses = response.lenses;
        lenses.forEach(lense => {
            let option_lense = document.createElement("option");
            option_lense.setAttribute("value", lense);
            option_lense.innerHTML = lense;
            
            camera_lenses.appendChild(option_lense);

        })
        
    }
};

request2.open("GET", "http://localhost:3000/api/cameras/"+id);
request2.send();


clic.addEventListener('click', function() {

    if(camera_lenses.value === '') {
    alert("Veuillez renseigner l'information Lentilles !");
    camera_lenses.style.border = "2px solid #FF0000";
    } else {
        
        if(typeof localStorage!='undefined') {
            let idArray = [];            
            if(localStorage.getItem("products")) {
                idArray = JSON.parse(localStorage.getItem("products"));
                addId(id, idArray);              
                alert("Produit supplémentaire ajouté à votre Panier !");   
                window.location.href = "panier.html";             
            } else { 
                addId(id, idArray);
                alert("Produit ajouté dans votre Panier !"); 
                window.location.href = "panier.html";                                 
            }
            
            function addId(id, idArray) {
                idArray.push(id);
                localStorage.setItem("products", JSON.stringify(idArray)); 
            }
        } else {
            alert("Navigateur trop ancien pour cette fonctionnalité !")
        }
    }
});






  
