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
    "0 0 white 0 MDSA Mad Science 101",
    "1 0 blue 1 LASA Laser Science I",
    "2 0 blue 2 LASB Laser Science II",
    "3 0 blue 3 LASC Laser Science III",
    "0 -1 green 1 BIOA Biology I",
    "0 -2 green 2 BIOB Biology II",
    "0 -3 green 3 BIOC Biology III",
    "-1 0 yellow 1 CHEA Chemistry I",
    "-2 0 yellow 2 CHEB Chemistry II",
    "-3 0 yellow 3 CHEC Chemistry III",
    "-2 -1 yellow 3 ORGA Organic Chemistry I",
    "-1 -1 yellow 2 BCHA Biochemistry I",
    "-1 -2 green 3 HBIA Human Biology I",
    "-1 -4 green 6 HBIB Human Biology II",
    "-1 1 orange 1 PHYA Physics I",
    "-2 2 orange 2 PHYB Physics II",
    "-3 3 orange 3 PHYC Physics III",
    "0 1 purple 1 ROBA Robotics I",
    "0 2 purple 2 ROBB Robotics II",
    "0 3 purple 3 ROBC Robotics III",
    "-1 3 purple 3 HROB Human-Robot Interaction",
    "1 -1 red 1 PARA Paranormal Science I",
    "2 -2 red 2 PARB Paranormal Science II",
    "3 -3 red 3 PARC Paranormal Science III",
    "4 -3 red 4 CONT Paranormal Containment",
    "-2 1 orange 2 THRA Thermo I",
    "1 1 blue 2 DTHB Death Bots",
    "-1 2 purple 2 RCKT Rocketry",
    "2 -1 red 2 GHOA Ghostbusting I",
    "4 -4 green 4 GHOB Ghostbusting II",
    "4 -1 blue 4 LZRS Lazor Science",
    "1 -3 green 3 ENVA Environmental Science I",
    "-6 2 orange 8 NANO Nanotech",
    "-4 3 orange 4 NUKA Nuclear Engineering I",
    "-5 2 orange 6 PART Particle Physics",
    "-4 1 yellow 4 UCON Uberconductors",
    "-2 -2 yellow 4 DENS Superdense Materials",
    "2 -4 green 4 ZOOL Zoology",
    "-3 2 orange 3 ACOA Acoustics I",
    "1 2 purple 3 AUTO Automation",
    "-1 -3 green 4 ENVB Environmental Science II",
    "0 -4 green 4 ANAT Anatomy",
    "-5 4 orange 6 FORC Force Fields",
    "3 -4 green 4 NEUA Neuroscience I",
    "3 -5 green 6 PSYC Psychotropics",
    "-4 4 orange 4 THRB Thermo II",
    "-2 4 purple 4 PROS Prosthetic Limbs",
    "3 1 blue 4 LSRF Laser Refraction",
    "3 2 blue 6 LSRS Laser Guns",
    "4 2 blue 8 LSRC Laser Cannons",
    "4 -2 red 4 GSCM Ghost Compression",
    "2 2 purple 4 ELCA Electronics I",
    "-3 -1 yellow 4 BCHB Biochemistry II",
    "3 3 purple 8 ELCB Electronics II",
    "5 -1 blue 6 LSRG Laser Guidance Systems",
    "-5 1 yellow 6 POLY Polymers",
    "0 4 purple 4 CARA Automotive Engineering I",
    "6 -6 red 8 DIMN Dimensional Translation",
    "-1 6 purple 8 CARB Automotive Engineering II",
    "-1 7 purple 11 CARC Automotive Engineering III",
    "3 -6 green 8 NEUB Neuroscience II",
    "-3 -2 yellow 6 ORGB Organic Chemistry II",
    "-5 3 orange 6 ACOB Acoustics II",
    "-2 -4 green 8 PHER Pheromones",
    "-4 6 orange 8 NUKB Nuclear Engineering II",
    "-5 7 orange 11 NKLS Nuclear Lasers",
    "5 -3 red 6 PHAS Phasers",
    "-5 5 orange 6 SURV Surveying",
];

Meteor.startup(function () {
    if (MapData.find().count())
        return;
    initialData.forEach (function (line) {
        var pieces = line.split(" ");
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

