# Full Login
Shows the user a login form with both possibilities: login with username and
password or login anonymously with a nickname.

![FullLogin](/cescobarresi/candy-plugins/raw/master/full-login/screenshot.png)

## Usage
To enable full-login you have to include its javascript code:

```HTML
<script type="text/javascript" src="candy/libs/libs.min.js"></script>
<script type="text/javascript" src="candy/candy.min.js"></script>
<script type="text/javascript" src="candyshop/full-login/full-login.js"></script>
```

Call it's init method after Candy has been initialized:

```JavaScript
//Init Candy
Candy.init('/http-bind/');

//Init FullLogin with the url to the jabber server, as in
CandyShop.FullLogin.init('servername');

// Then connect, without giving the servername
Candy.Core.connect();

```

## Warning
This plugin overwrites the Candy.View.Pane.Chat.Modal.showLoginForm function.
Therefore it may not work with newer versions of Candy with out adjustments.
