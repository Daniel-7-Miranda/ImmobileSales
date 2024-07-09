let Divs = document.querySelectorAll("section + section div")

let selector = "section + section"
let plus = " + "
/*
let Name = document.querySelector("section + section")
//console.log(selector)

console.log(Name.textContent)
*/

function LoadListing(){
    let ImSpecs = localStorage.getItem("ImmobileSpecs")
    

    let ObjTrunc = [];
    let OBJindex = 0;
    let flagObjT= 0;
    
    let word = "";
    let flagWord = 0;
    
    
    //ObjTrunc[0].Name = "NAme"

    //console.log(ObjTrunc)

    
    for (let i = 0; i < ImSpecs.length; i++) {
        //console.log(ImSpecs[i])
    
        if(ImSpecs[i]!== "{" && ImSpecs[i] !== "," && ImSpecs[i] !== "}"){
            
            word = word + ImSpecs[i]
            
        }
        if(ImSpecs[i]==="{"){
            //ObjTrunc.push({});
            flagObjT=1;
            flagWord=1
        }
        if(flagWord === 1 && ImSpecs[i]===","){
            ObjTrunc.push({});
            ObjTrunc[OBJindex].Name = word;
            word="";
            flagWord= 2;
        }
        else if(flagWord === 2 && ImSpecs[i]===","){
            ObjTrunc[OBJindex].Price = word;
            word="";
            flagWord= 3;
        }
        else if(flagWord === 3 && ImSpecs[i]===","){
            ObjTrunc[OBJindex].Img = word;
            word="";
            flagWord= 4;
        }
        else if(flagWord === 4 && ImSpecs[i]==="}"){
            ObjTrunc[OBJindex].Cnt = word;
            word="";
            

            
            OBJindex = OBJindex +1

            flagWord= 0;
            
        }
        
       
        //console.log(ObjTrunc)

    }
    


  /*
    let section = document.querySelector("section")
    let div = document.createElement("div")
    let StreetName = document.createElement("p")
    let price = document.createElement("p")
    let img = document.createElement("img")

    let listings = JSON.parse(localStorage.getItem('ImmobileSpecs'));

    console.log(listings);

    StreetName.innerHTML= listings.street
    price.innerHTML=listings.price
    img.src = listings.image

div.appendChild(StreetName)
div.appendChild(price)
div.appendChild(img)

section.appendChild(div);

console.log(`Values: ${StreetName} ${price} ${img}`)
*/

return ObjTrunc
}

function IsNewObject(Obj){

    for (let i = 0; i < LoadListing().length; i++) {
         
        if(LoadListing()[i].Name === Obj.Name &&
        LoadListing()[i].Price === Obj.Price &&
        LoadListing()[i].Img === Obj.Img){
            return false
        }
        
    }
    return true

}

function WhereRepeats(Obj){
    for (let i = 0; i < LoadListing().length; i++) {
         
        if(LoadListing()[i].Name === Obj.Name &&
        LoadListing()[i].Price === Obj.Price &&
        LoadListing()[i].Img === Obj.Img){
            return i
        }
        
    }
    return null
}

function ObjStringfy(Obj){
    let stringfiedObj= ""
    //"{um,dois,tres}{um,dois,tres}{um,dois,tres}"
    for (let i = 0; i < Obj.length; i++) {
        stringfiedObj = stringfiedObj + "{"
        stringfiedObj = stringfiedObj + `${Obj[i].Name}`
        stringfiedObj = stringfiedObj + ","
        stringfiedObj = stringfiedObj + `${Obj[i].Price}`
        stringfiedObj = stringfiedObj + ","
        stringfiedObj = stringfiedObj + `${Obj[i].Img}`
        stringfiedObj = stringfiedObj + ","
        stringfiedObj = stringfiedObj + `${Obj[i].Cnt}`
        stringfiedObj = stringfiedObj + "}"

        
        
    }
    //console.log(Obj[0].Name)
    return stringfiedObj;
}


function StoreObj(Obj){
    
    let cnt = Obj.Cnt

    if(IsNewObject(Obj)){
        if(Obj.Cnt === undefined){
            cnt = 0;
            Obj.Cnt = cnt + 1;
        }
        let NewObj = LoadListing()
        NewObj.push(Obj)
        localStorage.setItem("ImmobileSpecs",
            ObjStringfy(NewObj))
    }
    else{
        let NewObj = LoadListing()
        NewObj[WhereRepeats(Obj)].Cnt = Number(NewObj[WhereRepeats(Obj)].Cnt) + 1;


        localStorage.setItem("ImmobileSpecs",
            ObjStringfy(NewObj))
    }
    
    
    //localStorage.setItem("ImmobileSpecs","{Street 1,250,img}")

}
for (let i = 0; i < Divs.length; i++) {
    if(i===0){
        selector = selector + " div"
    }
    else{
        selector = selector + plus + "div"
    }
    


    let Name = document.querySelector(selector + " p")
    let price = document.querySelector(selector + " p + p")
    let img = document.querySelector(selector + " img")
    let button = document.querySelector(selector + " button")

    /*
    button.addEventListener('click', ()=>{
        console.log(Name.textContent)
        console.log(price.textContent)
        console.log(img.src)
    })
    */

    
    button.addEventListener('click', ()=>{
        StoreObj({Name:Name.textContent,Price:price.textContent,Img:img.src});
        //FirstPage/images/img4.jpg
        //FirstPage\images\img4.jpg
        //localStorage.setItem("ImmobileSpecs","{Street 4,295€/month,../images/img4.jpg,7}")
        //localStorage.setItem("ImmobileSpecs","")
    //console.log(`Values: ${Name.textContent} ${price.textContent} ${img.src}`)
        window.location.href = '../listingPage/listingPage.html';
    }
)


    //console.log(Name.textContent)
    
  /*  
    let price =  Divs.querySelector("p + p")
    let img = Divs[i].querySelector("img")
    let button = Divs[i].querySelector("button")

    button.addEventListener('click',Listings(price.textContent,Name.textContent,"_"))
*/
}
