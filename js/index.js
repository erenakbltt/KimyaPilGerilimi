var secilenMetaller = []
var secimSayaci = 0;
var potansiyeller = []
var EPSILON = 0.000001;

function kucuktur(A, B, Epsilon) {
    Epsilon = Epsilon || EPSILON;
    return (A - B < Epsilon) && (Math.abs(A - B) > Epsilon);
}
function buyuktur(A, B, Epsilon) {
    Epsilon = Epsilon || EPSILON;
    return (A - B > Epsilon) && (Math.abs(A - B) > Epsilon);
}
function icindeAra() {
    var input = document.getElementById("ara");
    var filter = input.value.toLowerCase();
    var nodes = document.getElementsByClassName('birElement');
  
    for (i = 0; i < nodes.length; i++) {
      if (nodes[i].innerText.toLowerCase().includes(filter)) {
        nodes[i].style.display = "block";
      } else {
        nodes[i].style.display = "none";
      }
    }
}
function metalGetir() {
    $.getJSON("tepkimePot.json", function (data) {
        $.each(data, function (index, metalList) {
           console.log(metalList.length);
            for ( i = 0; i < metalList.length; i++) {
                var elementContainer = document.getElementById("cozelti1List")
                console.log(metalList[i])

                elementContainer.innerHTML = elementContainer.innerHTML +  "<div class='birElement' id='1c"+i+"' onclick='elementSec2(this.id)' containerID='1' t1='"+metalList[i][1]+"' t2='"+metalList[i][2]+"' v='"+metalList[i][3]+"' >"+metalList[i][1]+"</div>";
            }
            for ( i = 0; i < metalList.length; i++) {
                var elementContainer = document.getElementById("cozelti2List")
                console.log(metalList[i])
                elementContainer.innerHTML = elementContainer.innerHTML +  "<div class='birElement' id='2c"+i+"' onclick='elementSec2(this.id)' containerID='2' t1='"+metalList[i][1]+"' t2='"+metalList[i][2]+"' v='"+metalList[i][3]+"' >"+metalList[i][1]+"</div>";
            }
        });
    });
}
function elementSec(id){
    var devam = false
    console.log(id)
    if(secimSayaci <= 1){
        document.getElementById("elementBaslik").innerHTML = "İkinci elementi seçin"
        var t1 = document.getElementById(id).getAttribute("t1");
        var t2 = document.getElementById(id).getAttribute("t2");
        var v = document.getElementById(id).getAttribute("v");
        document.getElementById("secilenler").innerHTML = document.getElementById("secilenler").innerHTML+ "<p><div style='float:left' id='secim"+secimSayaci+"'> <div style='float:left'id='secim"+secimSayaci+"T1'> "+ t1 +" -> </div> <divstyle='float:left' id='secim"+secimSayaci+"T2'>  " + t2 +" </div> <div id='secim"+secimSayaci+"v'> E°="+ v +" </div> </div>"
        potansiyeller.push(parseFloat(v))
        console.log(potansiyeller)
        if(secimSayaci == 1){
            devam = true
        }
        secimSayaci++
    }
  

    console.log(potansiyeller)

}
function hesapDurumKontrol() {
    var state1 = document.getElementById("cbk1").getAttribute("state")
    var state2 = document.getElementById("cbk2").getAttribute("state")
    console.log(state1+state2)
    if(state1 != "false" && state2 != "false" ){
        return true;
    }else{
        return false;
    }
}
function elementSec2(id) {
    element = document.getElementById(id);
    var v = element.getAttribute("v");

    console.log(element)
    console.log("\n\n\n\n\n\n\n\n")
    console.log("gelen id: " + id+" ContainerID: "+element.getAttribute("containerID"));
    console.log("t1: "+element.getAttribute("t1")+"\nt2: "+element.getAttribute("t2")+"\nv: "+element.getAttribute("v")+"n\n\n\n\n\n")
    document.getElementById("cbk"+element.getAttribute("containerID")).innerHTML = element.getAttribute("t1");
    document.getElementById("cbk"+element.getAttribute("containerID")).setAttribute("state", element.getAttribute("v"))
    potansiyeller.push(parseFloat(v))

    if(hesapDurumKontrol() == true){
        triggerCalculate()
    }
    listeKapat("cozelti"+element.getAttribute("containerID")+"List")

}
function triggerCalculate() {
    var state1 = document.getElementById("cbk1").getAttribute("state")
    var state2 = document.getElementById("cbk2").getAttribute("state")
    if(buyuktur(potansiyeller[0], potansiyeller[1])){
        //alert("v'si "+ potansiyeller[1]+ "olan element yükseltgenmedir. bu yüzden yeni değeri: "+-potansiyeller[1])
        potansiyeller[1] = -potansiyeller[1]
        var floatTop = potansiyeller[0] + potansiyeller[1]
        document.getElementById("elektrotType1").innerHTML = "Anot"
        document.getElementById("elektrotType2").innerHTML = "Katot"
        document.getElementById("vMetreVal").innerHTML     = floatTop
        //"<p> Anot:"+document.getElementById("secim0").innerHTML+"E°= "+potansiyeller[1]+"<p>Katot:"+document.getElementById("secim1").innerHTML+"E°="+potansiyeller[0]+"<p><b>Standart Potansiyel:"+ floatTop.toFixed(2)
    }else if(buyuktur(potansiyeller[1], potansiyeller[0])){
        //alert("v'si "+ potansiyeller[0]+ "olan element yükseltgenmedir. bu yüzden yeni değeri: "+-potansiyeller[0])
        potansiyeller[0] = -potansiyeller[0]
        var floatTop = potansiyeller[0] + potansiyeller[1]
        document.getElementById("elektrotType1").innerHTML = "Katot"
        document.getElementById("elektrotType2").innerHTML = "Anot"
        document.getElementById("vMetreVal").innerHTML     = floatTop 
    }else{
        alert("hata")
        console.log(potansiyeller[0]+ "-"+ potansiyeller[1])
    }
}//5055828062
function t_riggerCalculate(){
    document.getElementById("elementBaslik").innerHTML = "Sonuc"
    document.getElementById("elementKutusu").style.display = "none"
    document.getElementById("ara").style.display = "none"
    if(buyuktur(potansiyeller[0], potansiyeller[1])){
        //alert("v'si "+ potansiyeller[1]+ "olan element yükseltgenmedir. bu yüzden yeni değeri: "+-potansiyeller[1])
        potansiyeller[1] = -potansiyeller[1]
        var floatTop = potansiyeller[0] + potansiyeller[1]
        document.getElementById("secilenler").innerHTML = document.getElementById("secilenler").innerHTML+ "<p> Anot:"+document.getElementById("secim0").innerHTML+"E°= "+potansiyeller[1]+"<p>Katot:"+document.getElementById("secim1").innerHTML+"E°="+potansiyeller[0]+"<p><b>Standart Potansiyel:"+ floatTop.toFixed(2);
    }else if(buyuktur(potansiyeller[1], potansiyeller[0])){
        //alert("v'si "+ potansiyeller[0]+ "olan element yükseltgenmedir. bu yüzden yeni değeri: "+-potansiyeller[0])
        potansiyeller[0] = -potansiyeller[0]
        var floatTop = potansiyeller[0] + potansiyeller[1]
        document.getElementById("secilenler").innerHTML = document.getElementById("secilenler").innerHTML+ "<p> Anot:"+document.getElementById("secim1").innerHTML+"E°= "+potansiyeller[0]+"<p>Katot:"+document.getElementById("secim0").innerHTML+"E°="+potansiyeller[1]+"<p><b>Standart Potansiyel:"+ floatTop.toFixed(2);
 
    }else{
        alert("hata")
        console.log(potansiyeller[0]+ "-"+ potansiyeller[1])
    }
}
function listShow(id) {
    console.log(id)
    document.getElementById("cozelti"+id+"List").style.display = "block";
}

function listeKapat(id){
    var id = id.replace("Kapat", "");
    console.log(id)
    document.getElementById(id).style.display = "none"
}

