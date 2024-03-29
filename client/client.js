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
    if (showAll()) {
        classes.push("visible");
    } else {
        var d = distance(this);
        if (d == 0) {
            classes.push('open');
        } else if (d == 1) {
            classes.push('visible');
        } else {
            classes.push('hidden');
        }
        if (d >= 1 && adminMode()) {
            classes.push('openable');
        }
        if (d == 1 && this.opened.by) {
            classes.push('pending');
        }
        if (Session.get('opening') &&
            Session.get('opening').code === this.code) {
            classes.push('opening');
        }
    }
    return classes.join(" ");
}

Template.hex.showCode = function() {
    return showAll() || distance(this) <= 1;
}

Template.hex.showWho = function() {
    if (!this.opened.at)
        return false;
    return timeBefore(new Date((this.opened.at + OPEN_DELAY) * 1000));
}

Template.hex.showCost = function() {
    return distance(this) > 0 || timeBefore(new Date((this.opened.at + OPEN_DELAY) * 1000));
}

Template.hex.events({
    'click .hex.openable': function () {
        Session.set('opening', this);
    }
});

function showAll() {
    return !!Session.get('$showall');
}

Template.adminpane.isadmin = function() {
    return adminMode();
}
Template.adminui.viewall = function() {
    return adminMode() && showAll();
}

Template.adminpane.events({
    'click #goadmin': function() {
        Session.set('$admin', true);
    },
    'click #closeadmin': function() {
        Session.set('$admin', false);
    },
});

Template.adminui.events({
    'click #showall': function() {
        Session.set('$showall', true);
    },
    'click #hideall': function() {
        Session.set('$showall', false);
    },
    'click #reset': function() {
        if (window.confirm("Really reset map data?")) {
            Meteor.call('reloadData');
            Session.set('opening', undefined);
        }
    },
    'click #sweep': function() {
        Meteor.call('sweep');
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