Meteor.subscribe("map_data");

function distance(hex) {
    return hex.distance;
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
        classes.push('hidden');
    } else {
        classes.push('visible');
    }
    if (d == 1) {
        classes.push('openable');
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

Template.hex.events({
    'click .hex.openable': function () {
        Session.set('opening', this);
    }
});

Template.opendialog.show = function() {
    return !!Session.get('opening');
}

Template.opendialog.code = function() {
    return Session.get('opening').code;
}

Template.opendialog.characters = function() {
    return Object.keys(characterMap).map(function (name) {
        return {
            name: name,
            charcode: characterMap[name]
        };
    });
}

Template.opendialog.events({
    'click input.cancel': function() {
        Session.set('opening', null);
        return false;
    },
    'click input.open': function() {
        var node = Session.get('opening');
        var who = document.getElementById('whoinput');
        open(node.x, node.y, who.selectedOptions[0].value);
        Session.set('opening', null);
        return false;
    }
});