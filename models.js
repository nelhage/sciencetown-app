MapData = new Meteor.Collection("map_data");
/*
 * {
 *   map: <string>,
 *   x: <int>,
 *   y: <int>,
 *   color: <string>,
 *   cost: <int>,
 *   code: <string>,
 *   name: <string>
 */

var OPEN_DELAY = 10*60;

var initialData = {"SCIENCE": [
"0       0       white 0 MADS Mad Science 101",

"1       0       blue  0 LASR Lasers",
"2       0       blue  0 LPOI Laser Pointers",
"3       0       blue  0 POWR Powerful Lasers",
"4	0	blue  0 MALV Malevolent Photons",
"5       0       blue  0 EVIL Evil Lasers",
"3	-1	blue  0 BMAJ Lasers in B major",
"2	1	blue  0 SCAN Laser Scanners",
"4	-1	blue  0 WARM Warmth",
"5       -1      blue  0 INFR Infrared Lasers",
"4       1       blue  0 LZOR Lazor Science",
"6       -2      blue  0 VOLU LASERVOLUTION",
"7       -2      blue  0 NLAS Nuclear Lasers",
"2	2	blue  0 ALAS Automated Lasers",

"0       1       purple 0 ROBO Robotics",
"0       2       purple 0 BEEP Bleep",
"0       3       purple 0 BOOP Bloop",
"0	4	purple 0 CARS Automotive Engineering",
"1       3       purple 0 SATI Satellite Imaging",
"1       4       purple 0 AUTO Automation",
"1       5       purple 0 LIMB Artificial Limbs",
"2       4       purple 0 GIGA Gigavolt Systems",
"-1	4	purple 0 MWAH MWAHAHA!",
"-1      5       purple 0 FLAM Flamethrowers",
"-1      6       purple 0 DBOT Death Bots",
"-2      6       purple 0 RCKT Rocketry",

"-1      1       orange 0 PHYS Physics",
"-2      2       orange 0 WAVE Waves",
"-3      3       orange 0 FIEL Field Theory",
"-2	3	orange 0 FRCE Forces",
"-2	4	orange 0 PBOT Physical Robots",
"-3	2	orange 0 ELEC Electronics",
"-5      5       orange 0 PART Particle Physics",
"-4      5       orange 0 NUKE Nuclear Engineering",
"-3      4       orange 0 FFLD Force Fields",
"-5      4       orange 0 ACOU Acoustics",
"-4      3       orange 0 LGHT Lightning",
"-4      2       orange 0 UBER Uberconductors",

"-1      0       yellow 0 CHEM Chemistry",
"-2      0       yellow 0 ATOM Atoms",
"-3      0       yellow 0 MOLE Molecules",
"-4	0	yellow 0 MICR Micro",
"-5      0       yellow 0 NANO Nano",
"-3	-1	yellow 0 MONO Monomers",
"-3	-2	yellow 0 AMIN Amino Acids",
"-4      -1      yellow 0 BIOP Bio-Polymers",
"-4      1       yellow 0 THER Thermo I",
"-5      1       yellow 0 SDEN Superdense Materials",
"-6      2       yellow 0 THR2 Thermo II",
"-2      -2      yellow 0 ORG1 Organic Chemistry I",
"-3      -3      yellow 0 ORG2 Organic Chemistry II",

"0       -1      green 0 BIOL Biology",
"0       -2      green 0 LIFE Life",
"0       -3      green 0 ANIM Animals",
"0	-4	green 0 HUM1 Human Biology I",
"0	-5	green 0 HUM2 Human Biology II",
"1       -5      green 0 COOK Cooking Humans",
"1	-2	green 0 AABD Absurd Abductions",
"1	-3	green 0 PITS Armpits",
"-1	-2	green 0 PEST No Pesticides Here",
"-1	-3	green 0 FREE Free-Range Brains",
"-2      -3      green 0 ENVS Environmental Science",
"-1      -4      green 0 NEUR Neuroscience I",
"-1      -5      green 0 NEU2 Neuroscience II",
"2       -5      green 0 PSYC Psychotropics",
"1       -4      green 0 ZOOL Zoölogy",

"1       -1      red   0 PARA Paranormal Science",
"2       -2      red   0 OOGA OOGA",
"3       -3      red   0 BOGA BOOGA",
"4	-4	red   0 8DIM The 8th Dimension",
"3	-4	red   0 SPOO Spooky Spells",
"4       -5      red   0 DIMT Dimensional Translation",
"5       -6      red   0 MYST Mystical Journeys",
"6       -5      red   0 GHO2 Ghostbusting II",
"5       -4      red   0 GHO1 Ghostbusting I",
"6       -4      red   0 RAYD Ray-diation therapy",
"4       -2      red   0 MODU Laser Modulation",
"7       -5      red   0 GHOS G.H.O.S.T.",
"4       -3      red   0 PCON Paranormal Containment",
"2       -4      red   0 FRSH Frightening Freshness",
],
    "FOOD": [
"0  0       white 0 FOOD Food 101",

"1  0       red   0 MET1 Meat I",
"2  0       red   0 MET2 Meat II",
"3  0       red   0 MET3 Meat III",
"4  0       red   0 STAK Steak",
"2  -1      red   0 JRKY Jerky",
"3  -1      red   0 MCNG McNuggets",
"4  -1      red   0 CHKN Chicken",
"3  1       red   0 CHZB Cheeseburger",
"5  -2      red   0 KYFC KFC",
"6  -3      red   0 BACO Bacon",
"2  2       red   0 JEWS Jews' Bane",

"0  1       blue  0 DRY1 Dairy I",
"0  2       blue  0 DRY2 Dairy II",
"0  3       blue  0 DRY3 Dairy III",
"1  2       blue  0 LCTS Lactose",
"1  3       blue  0 MCOW Milk Cow",
"1  4       blue  0 MILK Milk",
"-1 3       blue  0 SPRD Spreadable Cheese",
"-1 4       blue  0 CRMC Cream Cheese",
"-1 5       blue  0 ASGO Asiago",
"-1 6       blue  0 CMBR Camembert",
"-2 4       blue  0 BAGL Bagel w/ Cream Cheese",
"-2 6       blue  0 GRYR Gruyère",

"-1  1      yellow 0 GRN1 Grain I",
"-2  2      yellow 0 GRN2 Grain II",
"-3  3      yellow 0 GRN3 Grain III",
"-3  4      yellow 0 TRDL Toroidal Bread",
"-3  5      yellow 0 CUBC Cubic Bread",
"-3  6      yellow 0 FNDU Cheese Fondue",
"-4  3      yellow 0 SLCD Sliced Bread",
"-5  4      yellow 0 BGTT Baguette",
"-6  5      yellow 0 CBTT Ciabatta",
"-5  5      yellow 0 FCCA Foccacia",

"-1  0      green 0 VEG1 Vegetables I",
"-2  0      green 0 VEG2 Vegetables II",
"-3  0      green 0 VEG3 Vegetables III",
"-3  1      green 0 FLTV Flat Veggies",
"-4  1      green 0 LTTC Lettuce",
"-5  1      green 0 SALD Salad",
"-4  2      green 0 GRDN Garden Burger",
"-2  -1     green 0 PTAT Potato",
"-3  -1     green 0 ZUCC Zucchini",
"-2  -2     green 0 TMAT Tomato",

"0   -1     orange 0 FRT1 Fruit I",
"0   -2     orange 0 FRT2 Fruit II",
"0   -3     orange 0 FRT3 Fruit III",
"0   -4     orange 0 ORNG Oranges",
"-1  -2     orange 0 CHRR Cherries",
"-1  -4     orange 0 KMQT Kumquats",
"1   -3     orange 0 KIWI Kiwis",
"1   -4     orange 0 PEAR Pears",
"2   -4     orange 0 FRTR Fruit Tarts",
"2   -5     orange 0 APPL Apples",
"3   -6     orange 0 CRML Caramel Apples",

"1   -1     purple 0 OM01 Om",
"2   -2     purple 0 NOM1 Nom I",
"3   -3     purple 0 NOM2 Nom II",
"4   -3     purple 0 COCO Hot Cocoa",
"5   -3     purple 0 BCNC Bacon Chocolate",
"5   -4     purple 0 CHOC Chocolate",
"6   -5     purple 0 FDGS Fudge Sauce",
"7   -6     purple 0 FDGE Fudge",
"4   -4     purple 0 CNDY Candy",
"3   -4     purple 0 GMMI Gummi Worms",
"3   -5     purple 0 BRNT Burnt Sugar",
    ]};

if (Meteor.isServer) {
    Meteor.startup(function () {
        if (MapData.find().count() == 0)
            reloadData();
        sweep();
    });
}

function adminMode() {
    return !!Session.get("$admin");
}

function hexDist(x, y) {
    var dist = 0;
    while (x != 0 || y != 0) {
        dist++;
        if (x > 0 && y < 0) {
            x--;
            y++;
        } else if (x < 0 && y > 0) {
            x++;
            y--;
        } else if (x > 0) {
            x--;
        } else if (y > 0) {
            y--;
        } else if (x < 0) {
            x++;
        } else if (y < 0) {
            y++;
        }
    }
    return dist;
}

function open(x, y, who, at) {
    if (at === undefined)
        at = new Date().getTime() / 1000;
    var hex = MapData.findOne({x: x, y: y});
    if (hex === null)
        return hex;
    hex.opened.at = at;
    hex.opened.by = who;
    MapData.update(hex._id, hex);
    dfs(hex, at === 0 ? 0 : 1);
}

function dfs(hex, distance) {
    var q = [{x: hex.x, y: hex.y, d: distance}];
    while (q.length) {
        var e = q.pop()
        hex = MapData.findOne({x: e.x, y: e.y});
        if (!hex || hex.distance <= e.d)
            continue;
        hex.distance = e.d;
        MapData.update(hex._id, hex);
        q.push({x: e.x+1, y:e.y, d: e.d+1});
        q.push({x: e.x-1, y:e.y, d: e.d+1});
        q.push({x: e.x, y:e.y+1, d: e.d+1});
        q.push({x: e.x, y:e.y-1, d: e.d+1});
        q.push({x: e.x+1, y:e.y-1, d: e.d+1});
        q.push({x: e.x-1, y:e.y+1, d: e.d+1});
    }
}

function sweep() {
    console.log("Sweeping...");
    var when = (new Date().getTime() / 1000) - OPEN_DELAY;
    MapData.find({'opened.at': { '$lt': when }, distance: 1}).forEach(function (hex) {
        console.log("Sweeping: %s", hex.name);
        dfs(hex, 0);
    });
}

Meteor.startup(function() {
  if (Meteor.isServer) {
      Meteor.setInterval(sweep, 60*1000);
  }
});

function reloadData(which) {
    MapData.remove({});
    var costByDist = [0, 1, 3, 5, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7];
    var data = initialData[which] || initialData.SCIENCE;
    data.forEach(function (line) {
        var pieces = line.split(/\s+/);
        var x = parseInt(pieces[0]);
        var y = parseInt(pieces[1]);
        var hex = {
                x: x,
                y: y,
                color: pieces[2],
                cost: costByDist[hexDist(x, y)],
                code: pieces[4],
                name: pieces.slice(5).join(" "),
                opened: {
                    at: null,
                    by: null,
                },
                distance: 100
            };
            MapData.insert(hex);
        });
    open(0, 0, "-", 0);
}


function hex_top(hex) {
    return hex.x * -106 - hex.y * 53
}

function hex_left(hex) {
    return 92 * hex.y;
}

var characterMap = {
    "Dr. Forrester":    "forrester",
    "Bill Nye":         "bill",
    "Dr. Lecter":       "lecter",
    "Blofeld":          "blofeld",
    "Dr. Evil":         "evil",
    "Jekyll":           "jekyll",
    "Dexter":           "dexter",
    "Dr. Horrible":     "horrible",
    "Dr. Doom":         "doom",
    "Dr. T":            "dr. t",
    "Lex Luthor":       "luthor",
    "Dr. Frankenstein": "frankst",
    "Egon Spengler":    "spengler",
    "Dr. Claw":         "claw",
    "Dr. Mario":        "mario"
};

function timeAfter(date) {
    var now = new Date();
    if (now >= date)
        return true;
    var context = Meteor.deps.Context.current;
    if (context) {
        var timer = Meteor.setTimeout(function() {
                                          context.invalidate();
                                      }, date - now);
        context.onInvalidate(function() {
            Meteor.clearTimeout(timer);
        });
    }
    return false;
}

function timeBefore(date) {
    return !timeAfter(date);
}

if (Meteor.isServer) {
    Meteor.methods({
            reloadData: reloadData,
            sweep: sweep});
} else {
    Meteor.methods({sweep: function() {}});
}
