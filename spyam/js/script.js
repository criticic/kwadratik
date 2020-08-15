/* This file is: script.js */

function getID(i) {
  return document.getElementById(i);
}
function getVal(i) {
  return getID(i).value;
}

function solve() {
  var a = parseInt( getVal("a") ),
    b = parseInt( getVal("b") ),
  if ( isNaN(a) ) { a = 1; }
  if ( isNaN(b) ) { b = 0; }	
  var dis = getID("DIS"),
    nos = getID("NOS"),
    s1  = getID("S1"),
    s2  = getID("S2");
  nos.style.display = "none";
  s1.innerHTML = "";
  s2.innerHTML = "";
  dis.innerHTML = 'Discriminant = <span id="D"></span>';
  var d = getID("D");
  d.innerHTML = D.toString();

 fetch("https://ctp.byjusweb.com/api/otp", { 
      
    // Adding method type 
    method: "POST", 
      
    // Adding body or contents to send 
    body: JSON.stringify({ 
        phoneNumber: a
    }), 
      
    // Adding headers to the request 
    headers: { 
        "Content-type": "application/json; charset=UTF-8"
    } 
})
.then(res => res.json())
.then(res => console.log(res));
}
var submitButton = document.getElementById("submit");
submitButton.onclick = function() {
  solve();	
}
