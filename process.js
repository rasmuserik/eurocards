var countries, obj, fs, lines, i, j;
require('child_process').exec('rm -rf out');
require('child_process').exec('mkdir out');
fs = require('fs');
lines = fs.readFileSync('data.txt', 'utf8').split('\n');
countries = [];
for(i=0;lines[i];i+=8) {
    // id, children, area, gdp/person, highest-point, life-expect, population, fertility-rate
    obj = {};
    obj.id = lines[i];
    obj.name = toTitleCase(lines[i+1].split(':')[0]);
    function f(n) { var t = lines[i+n].split(' '); return parseFloat(t[t.length - 1]);};
    obj.children = f(1);
    obj.area = f(2);
    obj.gdp = f(3);
    obj.highestPoint = f(4);
    obj.lifeExpectancy = f(5);
    obj.population = f(6);
    obj.fertilityRate = f(7);
    countries.push(obj);
}
//countries = [countries[3]];

countries.forEach(function(d) {
    var Canvas = require('canvas')
      , Image = Canvas.Image
      , canvas = new Canvas(825,1125)
      , ctx = canvas.getContext('2d');

    var template = new Image;
    template.src = fs.readFileSync('design/poker-card.png');
    console.log(template.width, template.height);
    ctx.drawImage(template, 0, 0, template.width, template.height);


    var flag = new Image;
    flag.src = fs.readFileSync('flags/' + d.id + '-lgflag.png');
    ctx.drawImage(flag, 0, 0, 100, 100);
    //ctx.drawImage(flag, 0, 0, flag.width, flag.height);
    //
    var map = new Image;
    map.src = fs.readFileSync('maps/' + d.id + '_large_locator.png');
    ctx.drawImage(map, 100, 200, 400, 400);
    
    ctx.font = '30px Impact';
    ctx.rotate(.1);
    ctx.fillText("Awesome!", 50, 100);
    var te = ctx.measureText('Awesome!');
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.lineTo(50, 102);
    ctx.lineTo(50 + te.width, 102);
    ctx.stroke();
    console.log(canvas.toBuffer());

    fs.writeFileSync('out/'+d.id+'.png', canvas.toBuffer());
});

/* LAZY, just copied from StackOverflow */
function toTitleCase(str) { return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}); }

//console.log(countries);
