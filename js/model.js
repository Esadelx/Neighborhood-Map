var locations = ko.observableArray();

function ModelView() {
    this.showNav = ko.observable(true);
    this.clickMenu = function () {
        if (this.showNav() == true) this.showNav(false);
        else this.showNav(true);
    };

    this.keyword = ko.observable('');
    
    this.clickLocation = function (location) {
        markerClicked(markers[location.index]);
    }

    this.keyword.subscribe((function (keyword) {
        locations.removeAll();
        for (var p in markers) {
            if (markers[p].title.toLowerCase().includes(keyword.toLowerCase())) {
                locations.push({index:p, title:markers[p].title});
                markers[p].setVisible(true);
            }
            else markers[p].setVisible(false);
        }
    }));
      
}
ko.applyBindings(ModelView);