/**
*   Settings View
*/

'use strict';

var app = require('../../app');

var Settings = Backbone.View.extend({

    el: '.content',

    // Compiled template
    template: JST['client/templates/account/settings<% if (jsTemplate === 'handlebars') { %>.hbs<% } else if (jsTemplate === 'underscore') { %>.jst<% } else if (jsTemplate === 'jade') { %><% } %>'],

    // Delegated events
    events: {
        'submit #profile-form': 'formInfo',
        'submit #password-form': 'formPassword',
        'submit #delete-form': 'formDelete',
    },

    // Code that runs when View is initialized
    initialize: function() {
        this.render();
    },

    formInfo: function(e) {
        e.preventDefault();
        var $form = $(e.currentTarget);
        app.user.updateSettings($form, {
            success: function(res) {
                app.user.set({
                    email: res.user.email,
                    firstName: res.user.firstName,
                    lastName: res.user.lastName
                });
            }
        });
    },

    formPassword: function(e) {
        e.preventDefault();
        var $form = $(e.currentTarget);
        app.user.updatePassword($form);
    },

    formDelete: function(e) {
        e.preventDefault();
        app.user.destroy({
            success: function(res) {
                app.user.logout();
                Backbone.history.navigate('/', {trigger: true});
            },
            complete: function(res) {
                app.messages.showMessages(res.responseJSON);
            }
        });
    },

    render: function() {
        this.$el.html(this.template({
            user: app.user.toJSON()
        }));
        return this;
    }

});

module.exports = Settings;
