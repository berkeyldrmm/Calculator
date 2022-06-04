var buttons=[];
buttons=document.querySelectorAll(".btn");

var currentvalue="";
var hesapla=[];
var calculated=false;
var isLastDataOperator=false;
buttons.forEach(button=>{
    button.addEventListener("click",()=>{
        console.log(button.classList);
        if(isLastDataOperator==true&&button.classList.contains("operator")){
            hesapla.pop();
            let mevcutekran=document.getElementById("icekran").innerHTML;
            let mevcutekranverileri=Array.from(mevcutekran);
            mevcutekranverileri.pop();
            let newcontent="";
            mevcutekranverileri.forEach(veri=>{
                newcontent+=veri;
            });
            document.getElementById("icekran").innerHTML=newcontent;
        }
        if(button.value!=="="&&button.value!=="AC"&&button.value!=="<--"){
                document.getElementById("icekran").innerHTML+=button.value;
        if(!button.classList.contains("operator")){
            if(calculated){
                document.getElementById("icekran").innerHTML="";
                hesapla=[];
                document.getElementById("icekran").innerHTML+=button.value;
            }
            currentvalue+=button.value;
            isLastDataOperator=false;
            calculated=false;
        }
        else{
            if(calculated){
                hesapla.push(button.value);
                calculated=false;
            }
            else {
                if(isLastDataOperator){
                    hesapla.push(button.value);
                    currentvalue="";
                }
                else{
                    hesapla.push(Number(currentvalue));
                    hesapla.push(button.value);
                    currentvalue="";
                }
                }
            isLastDataOperator=true;
        }
        }
        else if(button.value=="="){
            if(currentvalue!==""){
                const value=Number(currentvalue);
                hesapla.push(value);
            }
            carpma_bolme();
            currentvalue="";
            isLastDataOperator=false;
        }
        else if(button.value=="AC"){
            hesapla=[];
            document.getElementById("icekran").innerHTML="";
            currentvalue="";
            isLastDataOperator=false;
        }
        else{
            let mevcutekran=document.getElementById("icekran").innerHTML;
            let mevcutekranverileri=Array.from(mevcutekran);
            mevcutekranverileri.pop();
            let newcontent="";
            mevcutekranverileri.forEach(veri=>{
                newcontent+=veri;
            });
            document.getElementById("icekran").innerHTML=newcontent;
            console.log(mevcutekranverileri);

            if(isLastDataOperator){
                hesapla.pop();
                isLastDataOperator=false;
            }
            else{
                if(calculated){
                    let lastdata=Array.from(String(hesapla[0]));
                    lastdata.pop();
                    let newlastdata="";
                    lastdata.forEach(element=>{
                        newlastdata+=element;
                    });
                    hesapla.splice(0,1,Number(newlastdata));
                }
                else{
                    let lastdata=Array.from(currentvalue);
                    lastdata.pop();
                    let newlastdata="";
                    lastdata.forEach(element=>{
                    newlastdata+=element;
            })
                if(newlastdata!==""){
                    currentvalue=newlastdata;
                    isLastDataOperator=false;
            }
                else{
                    hesapla.pop();
                    currentvalue="";
                    isLastDataOperator=true;
            }
                }
            }
        }
    });
});

function carpma_bolme(){
    for(let i=0;i<hesapla.length;i++){
        if(hesapla[i]=="×"){
            const sonuc=hesapla[i-1]*hesapla[i+1];
            hesapla.splice(i-1,3,sonuc);
            i-=1;
        }
        else if(hesapla[i]=="÷"){
            const sonuc=hesapla[i-1]/hesapla[i+1];
            hesapla.splice(i-1,3,sonuc);
            i-=1;
        }
    }
toplama_cikarma();
}

function toplama_cikarma(){
    if(hesapla[1]=="+"||hesapla[1]=="-"){
        if(hesapla[1]=="+"){
            const sonuc=hesapla[0]+hesapla[2];
            hesapla.splice(0,3,sonuc);
        }
        if(hesapla[1]=="-"){
            const sonuc=hesapla[0]-hesapla[2];
            hesapla.splice(0,3,sonuc);
        }
        toplama_cikarma();
    }
    else {
        modhesapla();
    }
}

function modhesapla(){
    for(let i=0;i<hesapla.length;i++){
        if(hesapla[i]=="mod"){
            const sonuc=hesapla[i-1]%hesapla[i+1];
            hesapla.splice(i-1,3,sonuc);
        }
    };
    yuzdehesapla();
}

function yuzdehesapla(){
    for(let i=0;i<hesapla.length;i++){
        if(hesapla[i]=="%"){
            const sonuc=(hesapla[i-1]/100)*hesapla[i+1];
            hesapla.splice(i-1,3,sonuc);
        }
    };
    displayresult();
}

function displayresult(){
    document.getElementById("icekran").innerHTML=hesapla[0];
    calculated=true;
}