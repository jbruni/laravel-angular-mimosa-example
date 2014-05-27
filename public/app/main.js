/*
 * Main JavaScript entry point
 * 
 * - Support master layout
 */

require(['jquery', 'helper/utils', 'login/login'], function($, utils) {

    $(function() {
        $('button.close').click(function() {
            $(this).closest('.alert').slideUp();
        });

        utils.preload([
            'menu/home_hover.png',
            'menu/como_funciona_hover.png',
            'menu/assine_hover.png',
            'menu/duvidas_hover.png',
            'menu/contato_hover.png',
            'login/bg_menu_dropdown.png',
            'login/campo_email.png',
            'login/campo_senha.png',
            'footer/facebook_icon_hover.png',
            'directives/select_hover.png'
        ]);
    });

});
