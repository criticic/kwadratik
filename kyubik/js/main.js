/* This file is: script.js */

function getID(i) {
  return document.getElementById(i);
}
function getVal(i) {
  return getID(i).value;
}
function cuberoot(x) {
    var y = Math.pow(Math.abs(x), 1/3);
    return x < 0 ? -y : y;
}

function solveCubic() {
var a = parseInt( getVal("a") ),
    b = parseInt( getVal("b") ),
    c = parseInt( getVal("c") ),
    d = parseInt( getVal("d") );
    if (Math.abs(a) < 1e-8) { // Quadratic case, ax^2+bx+c=0
        a = b; b = c; c = d;
        if (Math.abs(a) < 1e-8) { // Linear case, ax+b=0
            a = b; b = c;
            if (Math.abs(a) < 1e-8) // Degenerate case
                return [];
            return [-b/a];
        }

        var D = b*b - 4*a*c;
        if (Math.abs(D) < 1e-8)
            return [-b/(2*a)];
        else if (D > 0)
            return [(-b+Math.sqrt(D))/(2*a), (-b-Math.sqrt(D))/(2*a)];
        return [];
    }

    // Convert to depressed cubic t^3+pt+q = 0 (subst x = t - b/3a)
    var p = (3*a*c - b*b)/(3*a*a);
    var q = (2*b*b*b - 9*a*b*c + 27*a*a*d)/(27*a*a*a);
    var roots;

    if (Math.abs(p) < 1e-8) { // p = 0 -> t^3 = -q -> t = -q^1/3
        roots = [cuberoot(-q)];
    } else if (Math.abs(q) < 1e-8) { // q = 0 -> t^3 + pt = 0 -> t(t^2+p)=0
        roots = [0].concat(p < 0 ? [Math.sqrt(-p), -Math.sqrt(-p)] : []);
    } else {
        var D = q*q/4 + p*p*p/27;
        if (Math.abs(D) < 1e-8) {       // D = 0 -> two roots
            roots = [-1.5*q/p, 3*q/p];
        } else if (D > 0) {             // Only one real root
            var u = cuberoot(-q/2 - Math.sqrt(D));
            roots = [u - p/(3*u)];
        } else {                        // D < 0, three roots, but needs to use complex numbers/trigonometric solution
            var u = 2*Math.sqrt(-p/3);
            var t = Math.acos(3*q/p/u)/3;  // D < 0 implies p < 0 and acos argument in [-1..1]
            var k = 2*Math.PI/3;
            roots = [u*Math.cos(t), u*Math.cos(t-k), u*Math.cos(t-2*k)];
        }
    }

    // Convert back from depressed cubic
    for (var i = 0; i < roots.length; i++)
        roots[i] -= b/(3*a);

    console.log(roots);
}
function solve() {
  var a = parseInt( getVal("a") ),
    b = parseInt( getVal("b") ),
    c = parseInt( getVal("c") );
  if ( isNaN(a) ) { a = 1; }
  if ( isNaN(b) ) { b = 0; }
  if ( isNaN(c) ) { c = 0; }
  var D = b*b - 4 * a * c;	
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
  if (D < 0) {
    nos.style.display = "block";
  } 
  else if (D == 0) {
    var S = -b / (2 * a);
    s1.innerHTML = S.toString();
  } 
  else {
    var S1 = ( -b + Math.sqrt(D) ) / (2 * a),
      S2 = ( -b - Math.sqrt(D) ) / (2 * a);
    s1.innerHTML = S1.toString();
    s2.innerHTML = S2.toString();
  }
}
var submitButton = document.getElementById("submit");
submitButton.onclick = function() {
  solveCubic();	
}
