/*
 * Login Form Module
 * 
 * - Show/Hide using jqHoverIntent
 * - Show/Hide using anchor click and input blur
 */

define(['jquery', 'jqHoverIntent'], function($) {

    var loginForm = null;
    var mouseOut  = true;

    function showLoginForm()
    {
        loginForm.fadeIn('fast');
        $('input:visible:first', loginForm).focus();
        // if handler was triggered by the anchor click, then the mouse is out
        mouseOut = $(this).is('a');
        return false;
    }

    function hideLoginForm()
    {
        // avoid hide if form is focused/active
        if (!$(document.activeElement).is($('input, a', loginForm))) {
            loginForm.fadeOut();
        }
        mouseOut = true;
        return false;
    }

    function mayHideLoginForm()
    {
        // when form loses focus, hide only if mouse is out
        if (mouseOut) {
            setTimeout(hideLoginForm, 108);
        }
    }

    function init()
    {
        loginForm = $('#login-form');

        // if form started visible, we won't hide/show it
        if (loginForm.is(':visible')) {
            return $('#email').focus();
        }

        $('#show-login').hoverIntent({
            over: showLoginForm,
            out: hideLoginForm,
            timeout: 360
        });

        $('#show-login > a').click(showLoginForm);

        $('input, a', loginForm).blur(mayHideLoginForm);
    }

    $(init);

    return {};
});
