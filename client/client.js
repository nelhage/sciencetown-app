Meteor.subscribe("map_data");

Template.map.hexes = function () {
    return MapData.find();
}

Template.hex.textColor = function() {
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
