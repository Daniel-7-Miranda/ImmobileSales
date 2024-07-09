function ParseObj(){
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
    
        localStorage.setItem("ImmobileSpecs",
            ObjStringfy(Obj))
    
    
    //localStorage.setItem("ImmobileSpecs","{Street 1,250,img}")

}

function LoadListing(){
    let ImSpecs = localStorage.getItem("ImmobileSpecs")
    //console.log(ImSpecs);

    let ObjTrunc = [{}];//[{}]
    let OBJindex = 0;
    let flagObjT= 0;
    
    let word = "";
    let flagWord = 0;
    
    
    //ObjTrunc[0].Name = "NAme"

    //console.log(ObjTrunc)
    
    for (let i = 0; i < ImSpecs.length; i++) {
        if(ImSpecs[i]==="{"){
            flagObjT=1;
            flagWord=1
        }
        /*
        if(ImSpecs[i]==="}"){
            ObjTrunc.push({});
            word="";
            OBJindex = OBJindex +1
        }
        */
       if(ObjTrunc[OBJindex]===undefined){
            ObjTrunc.push({});
            flagWord = 1;
            flagObjT=1;
       }
        if(flagWord === 1 && ImSpecs[i]===","){
            
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
            

            ObjTrunc.push({});
            OBJindex = OBJindex +1

            flagWord= 0;
        }
        if(ImSpecs[i]!== "{" && ImSpecs[i] !== "," && ImSpecs[i] !== "}"){
            word = word + ImSpecs[i]
        }


    }
    for (let i = 0; i < (ObjTrunc.length-1); i++) {
        let section = document.querySelector("section")

    let Delete = document.createElement("button")
    let div = document.createElement("div")
    let StreetName = document.createElement("p")
    let price = document.createElement("p")
    let Cnt = document.createElement("p")
    let img = document.createElement("img")

    Delete.innerHTML = "delete"
    Cnt.innerHTML= ObjTrunc[i].Cnt
    StreetName.innerHTML= ObjTrunc[i].Name
    price.innerHTML=ObjTrunc[i].Price
    img.src = ObjTrunc[i].Img

    div.appendChild(Delete);
    div.appendChild(Cnt)
    div.appendChild(StreetName)
    div.appendChild(price)
    div.appendChild(img)

    section.appendChild(div);


    Delete.addEventListener("click",()=>{
        let Obj = ParseObj()
        let Cnt =  Obj[i].Cnt
        
        
        if((Number(Cnt) -1)<0){
            Obj[i].Cnt = 0
            let QueryStr= "header + section div"
            //!!!!!!!!!!!!!!!!1
            for(j=0;j<i;j++){
            
                // "header + section " +!!!!! "div "!!!!!+ "div button + p"
    
               if(j!==i){
                QueryStr = QueryStr + " + div"
               }
            }
            let element = document.querySelector(QueryStr)
            element.remove();
            //div.remove
        }
        else{
            Cnt = Number(Cnt) -1
            Obj[i].Cnt = Cnt
        }

        StoreObj(Obj)
        //LoadListing();
        console.log(Obj[i].Cnt)

        QueryStr = "header + section div"
        for(j=0;j<i;j++){
            
            // "header + section " +!!!!! "div "!!!!!+ "div button + p"
            
            /*
            if(j===(i-1)){
                QueryStr = QueryStr + " button + p"
            }
            
            else{
                QueryStr = QueryStr + " + div"
            }
            */
           if(j!==i){
            QueryStr = QueryStr + " + div"
           }
        }
        console.log(QueryStr);
        //Second header + section div + div
        
        
        let Delete = document.querySelector(QueryStr + " button")
        let ShowCnt = document.querySelector(QueryStr + " button + p")//"header + section div button + p" // "header + section " +!!!!! "div "!!!!!+ "div button + p"
        let Name = document.querySelector(QueryStr + " button + p + p")
        let Price = document.querySelector(QueryStr + " button + p + p + p")

        let Img = document.querySelector(QueryStr + " button + p + p + p + img")
        
        Delete.innerHTML = "Delete"
        ShowCnt.innerHTML= Obj[i].Cnt;
        Name.innerHTML = Obj[i].Name;
        Price.innerHTML = Obj[i].Price;

        Img.src = Obj[i].Img;
        
        //console.log(Obj)
    })

        
    }
    //console.log(ObjTrunc)
  
}

window.addEventListener('load',()=>{
    LoadListing();
})