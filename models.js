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

function hex_left(hex) {
    return hex.x * -106 - hex.y * 53
}

function hex_top(hex) {
    return 92 * hex.y;
}
