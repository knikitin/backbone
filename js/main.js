var g = {};
var menu;
$(function () {
    var ListMenu = Backbone.View.extend({
        el: $('#content'),
        events: {
            'click #menu': 'reloadMenu'
        },

        initialize: function () {
            _.bindAll(this, 'render', 'reloadMenu');
            this.render();
        },

        render: function () {
            $(this.el).append("<button id='menu'>Загрузить меню</button>");
            $(this.el).append("<ul class='menu'></ul>");
        },

        reloadMenu: function () {
            $.ajax({
                dataType: 'json',
                url: '/core.php',
                success: function (data) {
                    g = data;
                    menu = '';
                    $.each(data, function (index, value) {
                        menu += '<li><a href="#' + value + '">' + index + '</a></li>';
                    });
                    $('.menu').html(menu);
                }
            });
        }

    });

    var Router = Backbone.Router.extend({
        routes: {
            ":name(/*params)": "load", // запуск определенного меню
            "": "start" // Пустой hash-тэг
        },

        load: function (name, params) {
            console.log(name);
            console.log(params);

            $('#content > #menu').click();
        },

        start: function () {
            console.log('start');
        }
    });

    var router = new Router();
    var listMenu = new ListMenu();

    Backbone.history.start();  // Запускаем HTML5 History push
})
