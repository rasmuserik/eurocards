var countries, obj, fs, lines, i, j;
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

/* LAZY, just copied from StackOverflow */
function toTitleCase(str) { return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}); }

console.log(countries);
