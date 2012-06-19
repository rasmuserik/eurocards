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
    console.log(d.name);
    var Canvas = require('canvas')
      , Image = Canvas.Image
      , canvas = new Canvas(825,1125)
      , ctx = canvas.getContext('2d');

    // x: 40,785 +/-40 margin
    // y: 40,1085 +/-40 margin
    /*
    var template = new Image;
    template.src = fs.readFileSync('design/poker-card.png');
    ctx.drawImage(template, 0, 0, template.width, template.height);
    */
    ctx.fillStyle = '#888';
    ctx.fillRect(0,0,825,1125);
    ctx.fillStyle = '#fff';
    ctx.fillRect(40,40,745,1045);

    var map = new Image;
    map.src = fs.readFileSync('maps/' + d.id + '_large_locator.png');
    ctx.drawImage(map, 80, 180, 500, 400);
    
    ctx.fillStyle = '#000';
    ctx.fillRect(80,80,1000,100);
    ctx.fillStyle = '#fff';
    ctx.font = '60px Impact';
    ctx.fillText(d.name, 100, 150);

    var flag = new Image;
    flag.src = fs.readFileSync('flags/' + d.id + '-lgflag.png');
    ctx.drawImage(flag, 450, 160, 300, 300*flag.height/flag.width);

    fs.writeFileSync('out/'+d.id+'.png', canvas.toBuffer());
});

/* LAZY, just copied from StackOverflow */
function toTitleCase(str) { return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}); }

//console.log(countries);
