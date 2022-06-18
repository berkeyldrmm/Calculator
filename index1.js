class calculator{
    constructor(currentvalue,elements,calculated,isLastDataOperator){
        this.currentvalue=currentvalue;
        this.elements=elements;
        this.calculated=calculated;
        this.isLastDataOperator=isLastDataOperator
    }
    carpma_bolme(){
        for(let i=0;i<this.elements.length;i++){
            if(this.elements[i]=="×"){
                const sonuc=this.elements[i-1]*this.elements[i+1];
                this.elements.splice(i-1,3,sonuc);
                i-=1;
            }
            else if(this.elements[i]=="÷"){
                const sonuc=this.elements[i-1]/this.elements[i+1];
                this.elements.splice(i-1,3,sonuc);
                i-=1;
            }
        }
    this.toplama_cikarma();
    }
    toplama_cikarma(){
        if(this.elements[1]=="+"||this.elements[1]=="-"){
            if(this.elements[1]=="+"){
                const sonuc=this.elements[0]+this.elements[2];
                this.elements.splice(0,3,sonuc);
            }
            if(this.elements[1]=="-"){
                const sonuc=this.elements[0]-this.elements[2];
                this.elements.splice(0,3,sonuc);
            }
            toplama_cikarma();
        }
        else {
            this.modhesapla();
        }
    }
    modhesapla(){
        for(let i=0;i<this.elements.length;i++){
            if(this.elements[i]=="mod"){
                const sonuc=this.elements[i-1]%this.elements[i+1];
                this.elements.splice(i-1,3,sonuc);
            }
        };
        this.yuzdehesapla();
    }
    yuzdehesapla(){
        for(let i=0;i<this.elements.length;i++){
            if(this.elements[i]=="%"){
                const sonuc=(this.elements[i-1]/100)*this.elements[i+1];
                this.elements.splice(i-1,3,sonuc);
            }
        };
        document.getElementById("icekran").innerHTML=this.elements[0];
        this.calculated=true;
        this.displayresult
    }
    displayresult(){
        document.getElementById("icekran").innerHTML=this.elements[0];
        this.calculated=true;
    }
}

//PROCESSES
var calculate=new calculator("",[],false,false)

var buttons=[];
buttons=document.querySelectorAll(".btn");

buttons.forEach(button=>{
    button.addEventListener("click",()=>{
        if(calculate.isLastDataOperator==true&&button.classList.contains("operator")){
            calculate.elements.pop();
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
        if(calculate.calculated){
            document.getElementById("icekran").innerHTML="";
            calculate.elements=[];
            document.getElementById("icekran").innerHTML+=button.value;
        }
        calculate.currentvalue+=button.value;
        calculate.isLastDataOperator=false;
        calculate.calculated=false;
    }
    else{
        if(calculate.calculated){
            calculate.elements.push(button.value);
            calculate.calculated=false;
        }
        else {
            if(calculate.isLastDataOperator){
                calculate.elements.push(button.value);
                calculate.currentvalue="";
            }
            else{
                calculate.elements.push(Number(calculate.currentvalue));
                calculate.elements.push(button.value);
                calculate.currentvalue="";
            }
            }
            calculate.isLastDataOperator=true;
    }
    }
    else if(button.value=="="){
        if(calculate.currentvalue!==""){
            const value=Number(calculate.currentvalue);
            calculate.elements.push(value);
        }
        calculate.carpma_bolme();
        calculate.currentvalue="";
        calculate.isLastDataOperator=false;
    }
    else if(button.value=="AC"){
        calculate.elements=[];
        document.getElementById("icekran").innerHTML="";
        calculate.currentvalue="";
        calculate.isLastDataOperator=false;
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

        if(calculate.isLastDataOperator){
            calculate.elements.pop();
            calculate.isLastDataOperator=false;
        }
        else{
            if(calculate.calculated){
                let lastdata=Array.from(String(calculate.elements[0]));
                lastdata.pop();
                let newlastdata="";
                lastdata.forEach(element=>{
                    newlastdata+=element;
                });
                calculate.elements.splice(0,1,Number(newlastdata));
            }
            else{
                let lastdata=Array.from(calculate.currentvalue);
                lastdata.pop();
                let newlastdata="";
                lastdata.forEach(element=>{
                newlastdata+=element;
        })
            if(newlastdata!==""){
                calculate.currentvalue=newlastdata;
                calculate.isLastDataOperator=false;
        }
            else{
                calculate.elements.pop();
                calculate.currentvalue="";
                calculate.isLastDataOperator=true;
        }
            }
        }
    }
    console.log(calculate.currentvalue,calculate.elements,calculate.isLastDataOperator,calculate.calculated)
    })
});