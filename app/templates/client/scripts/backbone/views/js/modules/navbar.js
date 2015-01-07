/**
*   Navbar View
*/

'use strict';

var App = App || {};
App.Views = App.Views || {};

App.Views.Navbar = Backbone.View.extend({

    el: '.main-nav',

    // Compiled template
    template: JST['client/templates/modules/navbar<% if (jsTemplate === 'handlebars') { %>.hbs<% } else if (jsTemplate === 'underscore') { %>.jst<% } else if (jsTemplate === 'jade') { %><% } %>'],

    // Delegated events
    events: {
        'click #logoutLink': 'handleLogout'
    },

    // Code that runs when View is initialized
    initialize: function() {
        // Re-render template when data changes
        this.listenTo(App.user, 'change', this.render);
        this.render();
    },

    handleLogout: function(e) {
        e.preventDefault();
        App.user.logout();
    },

    render: function() {
        this.$el.html(this.template({
            loggedIn: App.user.get('loggedIn'),
            user: App.user.toJSON()
        }));
        return this;
    }

});
