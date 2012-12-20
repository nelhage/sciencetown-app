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

var initialData = [
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
];

Meteor.startup(function () {
    if (MapData.find().count())
        return;
    initialData.forEach (function (line) {
        var pieces = line.split(/\s+/);
        var hex = {
            x: parseInt(pieces[0]),
            y: parseInt(pieces[1]),
            color: pieces[2],
            cost: parseInt(pieces[3]),
            code: pieces[4],
            name: pieces.slice(5).join(" ")
        };
        MapData.insert(hex);
    })
});


function hex_top(hex) {
    return hex.x * -106 - hex.y * 53
}

function hex_left(hex) {
    return 92 * hex.y;
}

