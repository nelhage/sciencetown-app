Meteor.subscribe("map_data");

function distance(hex) {
    return Math.sqrt(hex.x*hex.x + hex.y*hex.y);
}

Template.map.hexes = function () {
    return MapData.find();
}

Template.hex.textColor = function() {
    return ""
    if (this.color === "blue" || this.color === "purple")
        return "#fff";
    else
        return "#000";
}

Template.hex.left = function () {
    return hex_left(this);
}

Template.hex.top = function () {
    return hex_top(this);
}

Template.hex.css_class = function() {
    var classes = ["color_" + this.color];
    var d = distance(this);
    if (d > 2) {
        classes.push('closed');
    } else {
        classes.push('open');
    }
    return classes.join(" ");
}

Template.hex.showCode = function() {
    return distance(this) <= 1;
}

Template.hex.showWho = function() {
    return false;
}

Template.hex.showCost = function() {
    return distance(this) > 0;
}
