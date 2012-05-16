var CandyShop = (function(self) {return self;}(CandyShop || {}));
CandyShop.FullLogin = (function(self, Candy, Strophe, $) {
    self.init = function(host){
        // Save this for anonymous login.
        self.host = host;
    } 			

    Candy.View.Pane.Chat.Modal.showLoginForm = function(message, presetJid) {
    Candy.View.Pane.Chat.Modal.show((message ? message : '') + Mustache.to_html(CandyShop.FullLogin.Template.Login.form, {
        _labelUsername: $.i18n._('labelUsername'),
        _labelPassword: $.i18n._('labelPassword'),
        _labelNickname: $.i18n._('labelNickname'),
        _loginSubmit: $.i18n._('loginSubmit'),
        displayPassword: !Candy.Core.isAnonymousConnection(),
        displayUsername: Candy.Core.isAnonymousConnection() || !presetJid,
        presetJid: presetJid ? presetJid : false
    }));
    $('#login-form').children()[0].focus();

    // register submit handler
    $('#login-form').submit(function(event) {
        var username = $('#username').val(),
            password = $('#password').val(),
            nickname = $('#nickname').val();
        if (nickname == ''){
        //if (!Candy.Core.isAnonymousConnection()) {
            // guess the input and create a jid out of it
            var jid = Candy.Core.getUser() && username.indexOf("@") < 0 ?
                username + '@' + Strophe.getDomainFromJid(Candy.Core.getUser().getJid()) : username;

            if(jid.indexOf("@") < 0 && !Candy.Core.getUser()) {
                Candy.View.Pane.Chat.Modal.showLoginForm($.i18n._('loginInvalid'));
            } else {
                //Candy.View.Pane.Chat.Modal.hide();
                Candy.Core.connect(jid, password);
            }
        } else { // anonymous login
            Candy.Core.connect(CandyShop.FullLogin.host, null, nickname);
        }
        return false;});
    }
    return self;
})(CandyShop.FullLogin || {}, Candy, Strophe, jQuery);
CandyShop.FullLogin.Template = (function (self) {
    self.Login = {
        form: '<form method="post" id="login-form" class="login-form">'
        + '{{#displayUsername}}<label for="username">{{_labelUsername}}</label><input type="text" id="username" name="username"/>{{/displayUsername}}'
        + '{{#presetJid}}<input type="hidden" id="username" name="username" value="{{presetJid}}"/>{{/presetJid}}'
        + '{{#displayPassword}}<label for="password">{{_labelPassword}}</label><input type="password" id="password" name="password" />{{/displayPassword}}'
        + '<label>or</label><label for="nickname">{{_labelUsername}}</label><input type="text" id="nickname" name="nickname"/>'
        + '<input type="submit" class="button" value="{{_loginSubmit}}" /></form>'
}
    return self;
})(CandyShop.FullLogin.Template || {});
