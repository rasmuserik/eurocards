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

function num(n) {
    return addCommas(n);
}
function darkColor() {
    var colors = ['#900', '#090', '#009', '#055', '#505', '#550'];
    return colors[Math.random() * colors.length | 0];
}
function lightColor() {
    return "#fff";
    var colors = ['#800', '#080', '#008', '#088', '#808', '#880'];
    return colors[Math.random() * colors.length | 0];
}

countries.forEach(function(d) {
    console.log(d);
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
    ctx.fillStyle = '#fff';
    ctx.fillRect(0,0,825,1125);
    ctx.fillStyle = '#fff';
    ctx.fillRect(40,40,745,1045);

    var top = 90;
    var lpos = 125;
    var map = new Image;
    map.src = fs.readFileSync('maps/' + d.id + '_large_locator.png');
    ctx.drawImage(map, lpos, top + 100, 500, 400);
    
    ctx.fillStyle = '#000';
    ctx.fillRect(90,top,1000,100);
    ctx.fillStyle = lightColor();
    ctx.font = '60px Impact';
    ctx.fillText(d.name, lpos, top + 70);

    var flag = new Image;
    flag.src = fs.readFileSync('flags/' + d.id + '-lgflag.png');
    ctx.drawImage(flag, 455, top + 80, 280, 280*flag.height/flag.width);

    var basepos = top + 565;
    var step = 55;
    var pos = -1;
    var rpos = 700;
    ctx.fillStyle = '#000';
    ctx.font = '40px Sans-Serif';
    ctx.textAlign = 'left';

    ctx.fillStyle = '#000';
    ctx.fillText('Population:', lpos, basepos + step * ++pos);
    ctx.textAlign = 'right';
    ctx.fillText(num(d.population), rpos, basepos + step * pos);
    ctx.textAlign = 'left';

    ctx.fillStyle = '#800';
    ctx.fillText('Highest point:', lpos, basepos + step * ++pos);
    ctx.textAlign = 'right';
    ctx.fillText(num(d.highestPoint) + 'm', rpos, basepos + step * pos);
    ctx.textAlign = 'left';

    ctx.fillStyle = '#880';
    ctx.fillText('GDP per person:', lpos, basepos + step * ++pos);
    ctx.textAlign = 'right';
    ctx.fillText('$' + num(d.gdp), rpos, basepos + step * pos);
    ctx.textAlign = 'left';

    ctx.fillStyle = '#080';
    ctx.fillText('Life expectancy:', lpos, basepos + step * ++pos);
    ctx.textAlign = 'right';
    ctx.fillText(d.lifeExpectancy + '', rpos, basepos + step * pos);
    ctx.textAlign = 'left';

    ctx.fillStyle = '#088';
    ctx.fillText('Area per person:', lpos, basepos + step * ++pos);
    ctx.textAlign = 'right';
    ctx.fillText(num(1000000 * d.area / d.population | 0) + 'm²', rpos, basepos + step * pos);
    ctx.textAlign = 'left';

    ctx.fillStyle = '#008';
    ctx.fillText('Young (< 15 years):', lpos, basepos + step * ++pos);
    ctx.textAlign = 'right';
    ctx.fillText(d.children + '%', rpos, basepos + step * pos);
    ctx.textAlign = 'left';

    ctx.fillStyle = '#808';
    ctx.fillText('Children per woman:', lpos, basepos + step * ++pos);
    ctx.textAlign = 'right';
    ctx.fillText(d.fertilityRate, rpos, basepos + step * pos);
    ctx.textAlign = 'left';


    fs.writeFileSync('out/'+d.id+'.png', canvas.toBuffer());
});

/* LAZY, just copied from StackOverflow */
function toTitleCase(str) { return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}); }
/* LAZY, just copied from http://www.mredkj.com/javascript/numberFormat.html */
function addCommas(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}


//console.log(countries);
