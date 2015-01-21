document.addEventListener("DOMContentLoaded", function(){
    
    addButtonListeners();
    
    var totalValue = 0;

var dynamicScript = document.createElement('script');
    dynamicScript.addEventListener('load', drawGraphs);
    
var theBody = document.querySelector('#theBody');
    dynamicScript.setAttribute('src', 'js/cheese.js');
    theBody.appendChild(dynamicScript); 
    
function setDefaultStyles(){
    context.strokeStyle = "#000";	//colour of the lines
    context.lineWidth = 3;
    context.font = "normal 14pt sans-serif";
    context.fillStyle = "#FFF";	//colour of the text
    context.textAlign = "left";
}
 
function drawGraphs(){
    makePie();
    makeLine();
}
    
function makePie(){
    canvas = document.querySelector('#pieGraphCanvas');
    context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    setDefaultStyles();
    var orderedValues = [];
    
for (var i=0; i<cheese.segments.length; i++){
    orderedValues.push(cheese.segments[i].value);
}
orderedValues.sort(function(a,b) {
    return a-b;
})
    var cx = canvas.width/2;
    var cy = canvas.height/2;
    var radius = 100;
    var currentAngle = 0;
    var totalValue = 0;
    for (var i = 0;i<cheese.segments.length; i++){
        totalValue += cheese.segments[i].value;
    }
    for(var i=0; i<cheese.segments.length; i++){
    var percent = cheese.segments[i].value/totalValue;
    var useRadius = radius;
    if (cheese.segments[i].value == orderedValues[orderedValues.length-1]){
        useRadius = .9 * radius;
    }else if (cheese.segments[i].value == orderedValues[0]){
        useRadius = 1.1 * radius;
    }
    var endAngle = currentAngle + (percent *(Math.PI * 2));
        context.moveTo(cx,cy);
        context.beginPath();
        context.fillStyle = cheese.segments[i].color
        context.arc(cx, cy, useRadius, currentAngle, endAngle, false);
        context.lineTo(cx,cy)
        context.fill();
        context.save();
        context.translate(cx,cy);
        context.strokeStyle = '#FFF';
        context.lineWidth = 2;
        context.beginPath();
        var midAngle = (currentAngle + endAngle)/2;
        context.moveTo(0,0);
        var dx = Math.cos(midAngle) * (0.5 * useRadius);
        var dy = Math.sin(midAngle) * (0.5 * useRadius);
        context.moveTo(dx, dy);
        var dx = Math.cos(midAngle) * (useRadius + 30);
        var dy = Math.sin(midAngle) * (useRadius + 30);
        context.lineTo(dx, dy);
        context.stroke();
        dx = Math.cos(midAngle)*(useRadius +60);
        dy = Math.sin(midAngle) * (useRadius + 60);
        context.textAlign = 'center';
        context.font = '10pt sans-serif';
        context.fillText(cheese.segments[i].label, dx, dy);
        context.restore();
        currentAngle = endAngle;
    
    }
}
    
function makeNumbers(){
    canvas = document.querySelector('#pieGraphCanvas');
    context = canvas.getContext('2d');
    context.clearRect(0,0, canvas.width, canvas.height);
    setDefaultStyles();
    total = 0;
    var xpos = 80;
    var ypos = 80;
    context.font = '14pt sans-serif';
    context.fillStyle = '#ffce00';
    context.fillText('Cheeses', xpos, ypos);
    context.font = '10pt sans-serif';
    for(var i=0; i<cheese.segments.length; i++){
        total += cheese.segments[i].value;
        ypos += 40;
        context.fillStyle = cheese.segments[i].color
        context.fillText(cheese.segments[i].label, xpos, ypos);
    }
    ypos = 80;
    xpos += 200; 
    context.fillText('Percentage', xpos, ypos);
    context.font = '10pt sans-serif';
    for(var i=0; i<cheese.segments.length; i++){
        ypos += 40;
        var percent = (parseInt(cheese.segments[i].value/total * 10000))/100;
        context.fillStyle = cheese.segments[i].color;
        context.fillText(percent.toString(), xpos, ypos);
        
    }
};
    
function makeLine(){
    canvas = document.querySelector('#otherGraphCanvas');
    context = canvas.getContext('2d');
    context.clearRect(0,0, canvas.width, canvas.height);
    setDefaultStyles();
    context.strokeStyle = '#ffce00';
    context.font = '10pt sans-serif';
    for (var i=0; i<cheese.segments.length; i++){
        totalValue += cheese.segments[i].value
    }
    var points = cheese.segments.length;
    var offsetX = 45;
    var offsetY = 300;
    var spaceBetween = ((canvas.width - offsetX)/points);
    var graphHeight = 300;
    var x = 0 + offsetX;
    var y = offsetY - (graphHeight * (cheese.segments[0]/totalValue));
    context.moveTo(x,y);
    context.beginPath();
    for(var i=0; i<cheese.segments.length; i++){
        context.fillStyle = cheese.segments[i].color
        var percent = cheese.segments[i].value / totalValue;
        y = offsetY - (graphHeight * (cheese.segments[i].value/totalValue));
        context.lineTo(x,y);
        
        var label = Math.round(percent * 100).toString();
        if(percent <= .2){
            context.fillText(label, x-5, y -35);
            context.textAlign = 'center';
            context.fillText(cheese.segments[i].label, x-5, y-55);
        }else{
            context.fillText(label, x-5, y +35);
            context.textAlign = 'center';
            context.fillText(cheese.segments[i].label, x-5, y+55);
        }
        x = x + spaceBetween;
}
    context.stroke();
    context.strokeStyle = '#ffce00';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(offsetX, canvas.height-graphHeight);
    context.lineTo(offsetX, graphHeight);
    context.lineTo(canvas.width-offsetX, graphHeight);
    context.stroke();
    totalValue = 0;
};
    
function makeVis(){
    canvas = document.querySelector('#otherGraphCanvas');
    context = canvas.getContext('2d');
    context.clearRect(0,0, canvas.width, canvas.height);
    setDefaultStyles();
    total = 0;
    var xpos = 40;
    var ypos = 40;
    context.font = 'italic 14pt sans-serif';
    context.fillStyle = '#ffce00';
    context.fillText('Cheeses by Font Size', xpos, ypos);
    for(var i=0; i<cheese.segments.length; i++){
        
        var fontSize = Math.round(cheese.segments[i].value) + 'pt sans-serif';
        if (cheese.segments[i].value > 10){
            fontSize = Math.round(cheese.segments[i].value) + 'pt sans-serif';
        }else{
            fontSize = 'normal 10pt sans-serif';
        }
        
        context.font = fontSize;
        total += cheese.segments[i].value;
        ypos += 55;
        context.fillStyle = cheese.segments[i].color
        context.fillText(cheese.segments[i].label + ": " +                     Math.round(cheese.segments[i].value), xpos, ypos);
    }
};
    
function addButtonListeners(){
  document.querySelector("#numberBtn").addEventListener("click", makeNumbers);
  document.querySelector("#pieBtn").addEventListener("click", makePie);
  document.querySelector("#lineBtn").addEventListener("click", makeLine);
  document.querySelector("#visBtn").addEventListener("click", makeVis);
}    
});

