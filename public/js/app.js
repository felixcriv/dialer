(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
;
(function() {
    'use strict';

    var _evnt = require('./eventHandlerDetector');
    var _notification = require('./notificationPermission');
    var _phoneNumber = require('./phoneNumber');
    var _data = require('./dataSync');

    var sendButton = document.getElementById('send'),
        phoneNumberInput = document.getElementById('phoneNumber'),
        list = document.getElementById('list'),
        listBody = document.getElementById('listBody');


    _notification.checkNotificationPermission();

    var eventHandler = {

        buttonClick: function buttonClick(e) {

            var target = _evnt.eventHandlerDetector(phoneNumberInput, e);
            var phone = target.value;
            var phoneWithAreaCode = _phoneNumber.numberWithAreaCode(phone);
            var areaCodes = _phoneNumber.areaCode();

            if (_phoneNumber.isTollFreeNumber(phone) > -1) {

                _data.save(phoneWithAreaCode, 'Toll-Free', 1);

            } else if (_phoneNumber.isValid(phone)) {

                areaCodes.get('+1' + phoneWithAreaCode, function(err, data) {
                    if (!err) {
                        _data.save(phoneWithAreaCode, data.state, 1)
                    }
                });

            } else {
                alert('Invalid phone number');
            }

            target.value = "";
            return false;
        },

        enterKey: function enterKey(e) {

            if (!e) e = window.event;
            var keyCode = e.keyCode || e.which;

            if (keyCode == '13') {
                this.buttonClick(e);
            }
        }
    };

    phoneNumberInput.onkeypress = eventHandler.enterKey.bind(eventHandler);
    sendButton.addEventListener('click', eventHandler.buttonClick.bind(eventHandler), false);

})();
},{"./dataSync":6,"./eventHandlerDetector":8,"./notificationPermission":9,"./phoneNumber":10}],2:[function(require,module,exports){
"use strict";

var __ = require( 'doublescore' );
var data = require( './data.json' );

var AreaCodes = function() {

};

AreaCodes.prototype.get = function( phoneNumber, done ) {

	phoneNumber = phoneNumber.replace( /^\+?[10]/, '' ).replace( /[^0-9]/g, '' ).match( /^([0-9]{3})/ );

	if ( !phoneNumber ) {
		done( new Error( 'phone number not valid' ) );
		return;
	}

	phoneNumber = phoneNumber[ 1 ];

	if ( data.hasOwnProperty( phoneNumber ) ) {
		done( null, __( data[ phoneNumber ] ).clone() );
		return;
	}

	done( new Error( 'not found' ) );

};

AreaCodes.prototype.getAll = function( done ) {

	done( null, __( data ).clone() );

};

module.exports = AreaCodes;

},{"./data.json":3,"doublescore":4}],3:[function(require,module,exports){
module.exports={
	"201": {
		"city": "bayonne",
		"state": "new jersey"
	},
	"202": {
		"city": "washington",
		"state": "district of columbia"
	},
	"203": {
		"city": "bridgeport",
		"state": "connecticut"
	},
	"204": {
		"city": "brandon",
		"state": "manitoba"
	},
	"205": {
		"city": "birmingham",
		"state": "alabama"
	},
	"206": {
		"city": "seattle",
		"state": "washington"
	},
	"207": {
		"city": "portland",
		"state": "maine"
	},
	"208": {
		"city": "boise",
		"state": "idaho"
	},
	"209": {
		"city": "lodi",
		"state": "california"
	},
	"210": {
		"city": "san antonio",
		"state": "texas"
	},
	"212": {
		"city": "new york city",
		"state": "new york"
	},
	"213": {
		"city": "los angeles",
		"state": "california"
	},
	"214": {
		"city": "dallas",
		"state": "texas"
	},
	"215": {
		"city": "levittown",
		"state": "pennsylvania"
	},
	"216": {
		"city": "cleveland",
		"state": "ohio"
	},
	"217": {
		"city": "champaign",
		"state": "illinois"
	},
	"218": {
		"city": "duluth",
		"state": "minnesota"
	},
	"219": {
		"city": "gary",
		"state": "indiana"
	},
	"224": {
		"city": "arlington heights",
		"state": "illinois"
	},
	"225": {
		"city": "baton rouge",
		"state": "louisiana"
	},
	"226": {
		"city": "kitchener",
		"state": "ontario"
	},
	"227": {
		"city": "silver spring",
		"state": "maryland"
	},
	"228": {
		"city": "biloxi",
		"state": "mississippi"
	},
	"229": {
		"city": "albany",
		"state": "georgia"
	},
	"231": {
		"city": "grant",
		"state": "michigan"
	},
	"234": {
		"city": "akron",
		"state": "ohio"
	},
	"239": {
		"city": "cape coral",
		"state": "florida"
	},
	"240": {
		"city": "aspen hill",
		"state": "maryland"
	},
	"242": {
		"city": "freeport",
		"state": ""
	},
	"246": {
		"city": "bridgetown",
		"state": ""
	},
	"248": {
		"city": "farmington hills",
		"state": "michigan"
	},
	"249": {
		"city": "sault ste. marie",
		"state": "ontario"
	},
	"251": {
		"city": "mobile",
		"state": "alabama"
	},
	"252": {
		"city": "elizabeth city",
		"state": "north carolina"
	},
	"253": {
		"city": "kent",
		"state": "washington"
	},
	"254": {
		"city": "eastland",
		"state": "texas"
	},
	"256": {
		"city": "decatur",
		"state": "alabama"
	},
	"260": {
		"city": "fort wayne",
		"state": "indiana"
	},
	"262": {
		"city": "kenosha",
		"state": "wisconsin"
	},
	"264": {
		"city": "st. john's",
		"state": ""
	},
	"267": {
		"city": "levittown",
		"state": "pennsylvania"
	},
	"268": {
		"city": "st. john's",
		"state": ""
	},
	"269": {
		"city": "allegan",
		"state": "michigan"
	},
	"270": {
		"city": "bowling green",
		"state": "kentucky"
	},
	"274": {
		"city": "green bay",
		"state": "wisconsin"
	},
	"276": {
		"city": "danville",
		"state": "virginia"
	},
	"278": {
		"city": "ann arbor",
		"state": "michigan"
	},
	"281": {
		"city": "baytown",
		"state": "texas"
	},
	"283": {
		"city": "cincinnati",
		"state": "ohio"
	},
	"284": {
		"city": "road town",
		"state": ""
	},
	"289": {
		"city": "brampton",
		"state": "ontario"
	},
	"301": {
		"city": "aspen hill",
		"state": "maryland"
	},
	"302": {
		"city": "dover",
		"state": "delaware"
	},
	"303": {
		"city": "aurora",
		"state": "colorado"
	},
	"304": {
		"city": "charleston",
		"state": "west virginia"
	},
	"305": {
		"city": "miami",
		"state": "florida"
	},
	"306": {
		"city": "regina",
		"state": "saskathcewan"
	},
	"307": {
		"city": "casper",
		"state": "wyoming"
	},
	"308": {
		"city": "kearney",
		"state": "nebraska"
	},
	"309": {
		"city": "bloomington",
		"state": "illinois"
	},
	"310": {
		"city": "los angeles",
		"state": "california"
	},
	"312": {
		"city": "chicago",
		"state": "illinois"
	},
	"313": {
		"city": "dearborn",
		"state": "michigan"
	},
	"314": {
		"city": "florissant",
		"state": "missouri"
	},
	"315": {
		"city": "syracuse",
		"state": "new york"
	},
	"316": {
		"city": "wichita",
		"state": "kansas"
	},
	"317": {
		"city": "indianapolis",
		"state": "indiana"
	},
	"318": {
		"city": "bossier city",
		"state": "louisiana"
	},
	"319": {
		"city": "cedar rapids",
		"state": "iowa"
	},
	"320": {
		"city": "alexandria",
		"state": "minnesota"
	},
	"321": {
		"city": "melbourne",
		"state": "florida"
	},
	"323": {
		"city": "los angeles",
		"state": "california"
	},
	"325": {
		"city": "abilene",
		"state": "texas"
	},
	"330": {
		"city": "akron",
		"state": "ohio"
	},
	"331": {
		"city": "aurora",
		"state": "illinois"
	},
	"334": {
		"city": "auburn",
		"state": "alabama"
	},
	"336": {
		"city": "greensboro",
		"state": "north carolina"
	},
	"337": {
		"city": "lafayette",
		"state": "louisiana"
	},
	"339": {
		"city": "lynn",
		"state": "massachusetts"
	},
	"340": {
		"city": "charlotte amalie",
		"state": ""
	},
	"341": {
		"city": "oakland",
		"state": "california"
	},
	"343": {
		"city": "ottawa",
		"state": "ontario"
	},
	"345": {
		"city": "george town",
		"state": ""
	},
	"347": {
		"city": "bronx",
		"state": "new york"
	},
	"351": {
		"city": "haverhill",
		"state": "massachusetts"
	},
	"352": {
		"city": "gainesville",
		"state": "florida"
	},
	"360": {
		"city": "bellingham",
		"state": "washington"
	},
	"361": {
		"city": "corpus christi",
		"state": "texas"
	},
	"364": {
		"city": "owensboro",
		"state": "kentucky"
	},
	"369": {
		"city": "santa rosa",
		"state": "california"
	},
	"380": {
		"city": "columbus",
		"state": "ohio"
	},
	"385": {
		"city": "ogden",
		"state": "utah"
	},
	"386": {
		"city": "daytona beach",
		"state": "florida"
	},
	"401": {
		"city": "cranston",
		"state": "rhode island"
	},
	"402": {
		"city": "columbus",
		"state": "nebraska"
	},
	"403": {
		"city": "calgary",
		"state": "alberta"
	},
	"404": {
		"city": "atlanta",
		"state": "georgia"
	},
	"405": {
		"city": "midwest city",
		"state": "oklahoma"
	},
	"406": {
		"city": "billings",
		"state": "montana"
	},
	"407": {
		"city": "altamonte springs",
		"state": "florida"
	},
	"408": {
		"city": "gilroy",
		"state": "california"
	},
	"409": {
		"city": "beaumont",
		"state": "texas"
	},
	"410": {
		"city": "annapolis",
		"state": "maryland"
	},
	"412": {
		"city": "pittsburgh",
		"state": "pennsylvania"
	},
	"413": {
		"city": "chicopee",
		"state": "massachusetts"
	},
	"414": {
		"city": "milwaukee",
		"state": "wisconsin"
	},
	"415": {
		"city": "san francisco",
		"state": "california"
	},
	"416": {
		"city": "toronto",
		"state": "ontario"
	},
	"417": {
		"city": "springfield",
		"state": "missouri"
	},
	"418": {
		"city": "levis",
		"state": "quebec"
	},
	"419": {
		"city": "toledo",
		"state": "ohio"
	},
	"423": {
		"city": "chattanooga",
		"state": "tennessee"
	},
	"424": {
		"city": "beverly hills",
		"state": "california"
	},
	"425": {
		"city": "bellevue",
		"state": "washington"
	},
	"430": {
		"city": "longview",
		"state": "texas"
	},
	"432": {
		"city": "midland",
		"state": "texas"
	},
	"434": {
		"city": "lynchburg",
		"state": "virginia"
	},
	"435": {
		"city": "cedar city",
		"state": "utah"
	},
	"438": {
		"city": "montreal",
		"state": "quebec"
	},
	"440": {
		"city": "cleveland",
		"state": "ohio"
	},
	"441": {
		"city": "pembroke",
		"state": ""
	},
	"442": {
		"city": "apple valley",
		"state": "california"
	},
	"443": {
		"city": "baltimore",
		"state": "maryland"
	},
	"445": {
		"city": "philadelphia",
		"state": "pennsylvania"
	},
	"447": {
		"city": "champaign",
		"state": "illinois"
	},
	"450": {
		"city": "brossard",
		"state": "quebec"
	},
	"458": {
		"city": "eugene",
		"state": "oregon"
	},
	"464": {
		"city": "cicero",
		"state": "illinois"
	},
	"469": {
		"city": "carrollton",
		"state": "texas"
	},
	"470": {
		"city": "atlanta",
		"state": "georgia"
	},
	"473": {
		"city": "st. george's",
		"state": ""
	},
	"475": {
		"city": "bridgeport",
		"state": "connecticut"
	},
	"478": {
		"city": "macon",
		"state": "georgia"
	},
	"479": {
		"city": "fayetteville",
		"state": "arkansas"
	},
	"480": {
		"city": "chandler",
		"state": "arizona"
	},
	"484": {
		"city": "allentown",
		"state": "pennsylvania"
	},
	"501": {
		"city": "little rock",
		"state": "arkansas"
	},
	"502": {
		"city": "louisville",
		"state": "kentucky"
	},
	"503": {
		"city": "beaver",
		"state": "oregon"
	},
	"504": {
		"city": "kenner",
		"state": "louisiana"
	},
	"505": {
		"city": "albuquerque",
		"state": "new mexico"
	},
	"506": {
		"city": "fredricton",
		"state": "new brunswick"
	},
	"507": {
		"city": "austin",
		"state": "minnesota"
	},
	"508": {
		"city": "cambridge",
		"state": "massachusetts"
	},
	"509": {
		"city": "kennewick",
		"state": "washington"
	},
	"510": {
		"city": "alameda",
		"state": "california"
	},
	"512": {
		"city": "austin",
		"state": "texas"
	},
	"513": {
		"city": "cincinnati",
		"state": "ohio"
	},
	"514": {
		"city": "montreal",
		"state": "quebec"
	},
	"515": {
		"city": "ames",
		"state": "iowa"
	},
	"516": {
		"city": "freeport",
		"state": "new york"
	},
	"517": {
		"city": "charlotte",
		"state": "michigan"
	},
	"518": {
		"city": "albany",
		"state": "new york"
	},
	"519": {
		"city": "kitchener",
		"state": "ontario"
	},
	"520": {
		"city": "casas adobes",
		"state": "arizona"
	},
	"530": {
		"city": "chico",
		"state": "california"
	},
	"531": {
		"city": "omaha",
		"state": "nebraska"
	},
	"534": {
		"city": "eau claire",
		"state": "wisconsin"
	},
	"540": {
		"city": "blacksburg",
		"state": "virginia"
	},
	"541": {
		"city": "bend",
		"state": "oregon"
	},
	"551": {
		"city": "bayonne",
		"state": "new jersey"
	},
	"557": {
		"city": "st. louis",
		"state": "missouri"
	},
	"559": {
		"city": "clovis",
		"state": "california"
	},
	"561": {
		"city": "boca raton",
		"state": "florida"
	},
	"562": {
		"city": "bellflower",
		"state": "california"
	},
	"563": {
		"city": "davenport",
		"state": "iowa"
	},
	"564": {
		"city": "seattle",
		"state": "washington"
	},
	"567": {
		"city": "toledo",
		"state": "ohio"
	},
	"570": {
		"city": "scranton",
		"state": "pennsylvania"
	},
	"571": {
		"city": "alexandria",
		"state": "virginia"
	},
	"573": {
		"city": "columbia",
		"state": "missouri"
	},
	"574": {
		"city": "elkhart",
		"state": "indiana"
	},
	"575": {
		"city": "alamogordo",
		"state": "new mexico"
	},
	"579": {
		"city": "terrebone",
		"state": "quebec"
	},
	"580": {
		"city": "lawton",
		"state": "oklahoma"
	},
	"581": {
		"city": "levis",
		"state": "quebec"
	},
	"585": {
		"city": "arcade",
		"state": "new york"
	},
	"586": {
		"city": "sterling heights",
		"state": "michigan"
	},
	"587": {
		"city": "calgary",
		"state": "alberta"
	},
	"601": {
		"city": "hattiesburg",
		"state": "mississippi"
	},
	"602": {
		"city": "phoenix",
		"state": "arizona"
	},
	"603": {
		"city": "dover",
		"state": "new hampshire"
	},
	"605": {
		"city": "rapid city",
		"state": "south dakota"
	},
	"606": {
		"city": "ashland",
		"state": "kentucky"
	},
	"607": {
		"city": "elmira",
		"state": "new york"
	},
	"608": {
		"city": "janesville",
		"state": "wisconsin"
	},
	"609": {
		"city": "allentown",
		"state": "new jersey"
	},
	"610": {
		"city": "allentown",
		"state": "pennsylvania"
	},
	"612": {
		"city": "minneapolis",
		"state": "minnesota"
	},
	"613": {
		"city": "kingston",
		"state": "ontario"
	},
	"614": {
		"city": "columbus",
		"state": "ohio"
	},
	"615": {
		"city": "murfreesboro",
		"state": "tennessee"
	},
	"616": {
		"city": "grand rapids",
		"state": "michigan"
	},
	"617": {
		"city": "boston",
		"state": "massachusetts"
	},
	"618": {
		"city": "alton",
		"state": "illinois"
	},
	"619": {
		"city": "chula vista",
		"state": "california"
	},
	"620": {
		"city": "dodge city",
		"state": "kansas"
	},
	"623": {
		"city": "phoenix",
		"state": "arizona"
	},
	"626": {
		"city": "alhambra",
		"state": "california"
	},
	"627": {
		"city": "santa rosa",
		"state": "california"
	},
	"628": {
		"city": "san francisco",
		"state": "california"
	},
	"630": {
		"city": "naperville",
		"state": "illinois"
	},
	"631": {
		"city": "babylon",
		"state": "new york"
	},
	"636": {
		"city": "st. charles",
		"state": "missouri"
	},
	"641": {
		"city": "mason city",
		"state": "iowa"
	},
	"646": {
		"city": "new york city",
		"state": "new york"
	},
	"647": {
		"city": "toronto",
		"state": "ontario"
	},
	"649": {
		"city": "cockburn town",
		"state": ""
	},
	"650": {
		"city": "daly city",
		"state": "california"
	},
	"651": {
		"city": "st. paul",
		"state": "minnesota"
	},
	"657": {
		"city": "anaheim",
		"state": "california"
	},
	"659": {
		"city": "birmingham",
		"state": "alabama"
	},
	"660": {
		"city": "marshall",
		"state": "missouri"
	},
	"661": {
		"city": "earlimart",
		"state": "california"
	},
	"662": {
		"city": "starkville",
		"state": "mississippi"
	},
	"664": {
		"city": "brades estate",
		"state": ""
	},
	"667": {
		"city": "baltimore",
		"state": "maryland"
	},
	"669": {
		"city": "san jose",
		"state": "california"
	},
	"670": {
		"city": "saipan",
		"state": ""
	},
	"671": {
		"city": "hagatna",
		"state": ""
	},
	"678": {
		"city": "atlanta",
		"state": "georgia"
	},
	"679": {
		"city": "detroit",
		"state": "michigan"
	},
	"681": {
		"city": "charleston",
		"state": "west virginia"
	},
	"682": {
		"city": "arlington",
		"state": "texas"
	},
	"684": {
		"city": "pago pago",
		"state": ""
	},
	"689": {
		"city": "orlando",
		"state": "florida"
	},
	"701": {
		"city": "bismarck",
		"state": "north carolina"
	},
	"702": {
		"city": "henderson",
		"state": "nevada"
	},
	"703": {
		"city": "alexandria",
		"state": "virginia"
	},
	"704": {
		"city": "charlotte",
		"state": "north carolina"
	},
	"705": {
		"city": "sault ste. marie",
		"state": "ontario"
	},
	"706": {
		"city": "athens",
		"state": "georgia"
	},
	"707": {
		"city": "benicia",
		"state": "california"
	},
	"708": {
		"city": "berwyn",
		"state": "illinois"
	},
	"712": {
		"city": "council bluffs",
		"state": "iowa"
	},
	"713": {
		"city": "houston",
		"state": "texas"
	},
	"714": {
		"city": "anaheim",
		"state": "california"
	},
	"715": {
		"city": "chippewa falls",
		"state": "wisconsin"
	},
	"716": {
		"city": "cattaraugus",
		"state": "new york"
	},
	"717": {
		"city": "lancaster",
		"state": "pennsylvania"
	},
	"718": {
		"city": "bellerose",
		"state": "new york"
	},
	"719": {
		"city": "alamosa",
		"state": "colorado"
	},
	"720": {
		"city": "boulder",
		"state": "colorado"
	},
	"721": {
		"city": "marigot",
		"state": ""
	},
	"724": {
		"city": "new castle",
		"state": "pennsylvania"
	},
	"727": {
		"city": "clearwater",
		"state": "florida"
	},
	"730": {
		"city": "alton",
		"state": "illinois"
	},
	"731": {
		"city": "jackson",
		"state": "tennessee"
	},
	"732": {
		"city": "brick township",
		"state": "new jersey"
	},
	"734": {
		"city": "ann arbor",
		"state": "michigan"
	},
	"737": {
		"city": "austin",
		"state": "texas"
	},
	"740": {
		"city": "athens",
		"state": "ohio"
	},
	"747": {
		"city": "burbank",
		"state": "california"
	},
	"752": {
		"city": "anaheim",
		"state": "california"
	},
	"754": {
		"city": "coral springs",
		"state": "florida"
	},
	"757": {
		"city": "chesapeake",
		"state": "virginia"
	},
	"758": {
		"city": "castries",
		"state": ""
	},
	"760": {
		"city": "apple valley",
		"state": "california"
	},
	"762": {
		"city": "athens",
		"state": "georgia"
	},
	"763": {
		"city": "brooklyn park",
		"state": "minnesota"
	},
	"764": {
		"city": "daly city",
		"state": "california"
	},
	"765": {
		"city": "kokomo",
		"state": "indiana"
	},
	"767": {
		"city": "roseau",
		"state": ""
	},
	"769": {
		"city": "hattiesburg",
		"state": "mississippi"
	},
	"770": {
		"city": "atlanta",
		"state": "georgia"
	},
	"772": {
		"city": "port st. lucie",
		"state": "florida"
	},
	"773": {
		"city": "chicago",
		"state": "illinois"
	},
	"774": {
		"city": "brockton",
		"state": "massachusetts"
	},
	"775": {
		"city": "carson city",
		"state": "nevada"
	},
	"779": {
		"city": "joliet",
		"state": "illinois"
	},
	"780": {
		"city": "edmonton",
		"state": "alberta"
	},
	"781": {
		"city": "lynn",
		"state": "massachusetts"
	},
	"784": {
		"city": "kingstown",
		"state": ""
	},
	"785": {
		"city": "abilene",
		"state": "kansas"
	},
	"786": {
		"city": "hialeah",
		"state": "florida"
	},
	"801": {
		"city": "ogden",
		"state": "utah"
	},
	"802": {
		"city": "bennington",
		"state": "vermont"
	},
	"803": {
		"city": "columbia",
		"state": "south carolina"
	},
	"804": {
		"city": "mechanicsville",
		"state": "virginia"
	},
	"805": {
		"city": "camarillo",
		"state": "california"
	},
	"806": {
		"city": "amarillo",
		"state": "texas"
	},
	"807": {
		"city": "thunber bay",
		"state": "ontario"
	},
	"808": {
		"city": "honolulu",
		"state": "hawaii"
	},
	"809": {
		"city": "santo domingo",
		"state": ""
	},
	"810": {
		"city": "flint",
		"state": "michigan"
	},
	"812": {
		"city": "bloomington",
		"state": "indiana"
	},
	"813": {
		"city": "tampa",
		"state": "florida"
	},
	"814": {
		"city": "erie",
		"state": "pennsylvania"
	},
	"815": {
		"city": "joliet",
		"state": "illinois"
	},
	"816": {
		"city": "kansas city",
		"state": "missouri"
	},
	"817": {
		"city": "arlington",
		"state": "texas"
	},
	"818": {
		"city": "agoura hills",
		"state": "california"
	},
	"819": {
		"city": "drummondville",
		"state": "quebec"
	},
	"828": {
		"city": "asheville",
		"state": "north carolina"
	},
	"829": {
		"city": "santo domingo",
		"state": ""
	},
	"830": {
		"city": "medina",
		"state": "texas"
	},
	"831": {
		"city": "salinas",
		"state": "california"
	},
	"832": {
		"city": "baytown",
		"state": "texas"
	},
	"835": {
		"city": "bethlehem",
		"state": "pennsylvania"
	},
	"843": {
		"city": "charleston",
		"state": "south carolina"
	},
	"845": {
		"city": "kingston",
		"state": "new york"
	},
	"847": {
		"city": "arlington heights",
		"state": "illinois"
	},
	"848": {
		"city": "brick township",
		"state": "new jersey"
	},
	"849": {
		"city": "santo domingo",
		"state": ""
	},
	"850": {
		"city": "pensacola",
		"state": "florida"
	},
	"856": {
		"city": "camden",
		"state": "new jersey"
	},
	"857": {
		"city": "boston",
		"state": "massachusetts"
	},
	"858": {
		"city": "san diego",
		"state": "california"
	},
	"859": {
		"city": "lexington",
		"state": "kentucky"
	},
	"860": {
		"city": "bristol",
		"state": "connecticut"
	},
	"862": {
		"city": "clifton",
		"state": "new jersey"
	},
	"863": {
		"city": "lakeland",
		"state": "florida"
	},
	"864": {
		"city": "greenville",
		"state": "south carolina"
	},
	"865": {
		"city": "knoxville",
		"state": "tennessee"
	},
	"867": {
		"city": "white horse",
		"state": "northwest territories"
	},
	"868": {
		"city": "chaguanas",
		"state": ""
	},
	"869": {
		"city": "basseterre",
		"state": ""
	},
	"870": {
		"city": "jonesboro",
		"state": "arkansas"
	},
	"872": {
		"city": "chicago",
		"state": "illinois"
	},
	"876": {
		"city": "kingston",
		"state": ""
	},
	"878": {
		"city": "pittsburgh",
		"state": "pennsylvania"
	},
	"901": {
		"city": "memphis",
		"state": "tennessee"
	},
	"903": {
		"city": "longview",
		"state": "texas"
	},
	"904": {
		"city": "jacksonville",
		"state": "florida"
	},
	"905": {
		"city": "brampton",
		"state": "ontario"
	},
	"906": {
		"city": "sault ste marie",
		"state": "michigan"
	},
	"907": {
		"city": "anchorage",
		"state": "alaska"
	},
	"908": {
		"city": "elizabeth",
		"state": "alaska"
	},
	"909": {
		"city": "anaheim",
		"state": "california"
	},
	"910": {
		"city": "fayetteville",
		"state": "north carolina"
	},
	"912": {
		"city": "savannah",
		"state": "georgia"
	},
	"913": {
		"city": "kansas city",
		"state": "kansas"
	},
	"914": {
		"city": "mount vernon",
		"state": "new york"
	},
	"915": {
		"city": "el paso",
		"state": "texas"
	},
	"916": {
		"city": "elk grove",
		"state": "california"
	},
	"917": {
		"city": "new york city",
		"state": "new york"
	},
	"918": {
		"city": "broken arrow",
		"state": "oklahoma"
	},
	"919": {
		"city": "cary",
		"state": "north carolina"
	},
	"920": {
		"city": "appleton",
		"state": "wisconsin"
	},
	"925": {
		"city": "antioch",
		"state": "california"
	},
	"927": {
		"city": "orlando",
		"state": "florida"
	},
	"928": {
		"city": "flagstaff",
		"state": "arizona"
	},
	"931": {
		"city": "clarksville",
		"state": "tennessee"
	},
	"935": {
		"city": "san diego",
		"state": "california"
	},
	"936": {
		"city": "huntsville",
		"state": "texas"
	},
	"937": {
		"city": "dayton",
		"state": "ohio"
	},
	"938": {
		"city": "huntsville",
		"state": "alabama"
	},
	"940": {
		"city": "denton",
		"state": "texas"
	},
	"941": {
		"city": "sarasota",
		"state": "florida"
	},
	"947": {
		"city": "farmington hills",
		"state": "michigan"
	},
	"949": {
		"city": "costa mesa",
		"state": "california"
	},
	"951": {
		"city": "corona",
		"state": "california"
	},
	"952": {
		"city": "bloomington",
		"state": "minnesota"
	},
	"954": {
		"city": "fort lauderdale",
		"state": "florida"
	},
	"956": {
		"city": "laredo",
		"state": "texas"
	},
	"957": {
		"city": "albuquerque",
		"state": "new mexico"
	},
	"959": {
		"city": "hartford",
		"state": "connecticut"
	},
	"970": {
		"city": "durango",
		"state": "colorado"
	},
	"971": {
		"city": "beaverton",
		"state": "oregon"
	},
	"972": {
		"city": "carrollton",
		"state": "texas"
	},
	"973": {
		"city": "newark",
		"state": "new jersey"
	},
	"975": {
		"city": "kansas city",
		"state": "missouri"
	},
	"978": {
		"city": "haverhill",
		"state": "massachusetts"
	},
	"979": {
		"city": "bryan",
		"state": "texas"
	},
	"980": {
		"city": "charlotte",
		"state": "north carolina"
	},
	"984": {
		"city": "raleigh",
		"state": "north carolina"
	},
	"985": {
		"city": "hammond",
		"state": "louisiana"
	},
	"989": {
		"city": "alma",
		"state": "michigan"
	}
}

},{}],4:[function(require,module,exports){
"use strict";

var myArray = Array;

if ( !myArray.isArray ) {
	myArray = {
		isArray: function( arg ) {
			return Object.prototype.toString.call( arg ) === '[object Array]';
		}
	};
}

function isArray( arg ) {
	return myArray.isArray( arg );
}

function isObject( arg ) {
	return typeof arg === 'object' && !Array.isArray( arg ) && arg !== null;
}

function getType( arg ) {

	// handle exceptions that typeof doesn't handle
	if ( arg === null ) {
		return 'null';
	}
	else if ( Array.isArray( arg ) ) {
		return 'array';
	}

	var type = typeof arg;

	// more resolution on numbers
	if ( type === 'number' ) {
		if ( Math.ceil( arg ) > Math.floor( arg ) ) {
			type = 'float';
		}
		else {
			type = 'integer';
		}
	}

	return type;

}

var cloneDepth = 0;
function clone( arg ) {

	cloneDepth++;

	if ( cloneDepth >= 100 ) {
		cloneDepth = 0;
		throw new Error( 'max clone depth of 100 reached' );
	}

	var target = null;

	if ( arg instanceof Date ) {
		target = new Date( arg.toISOString() );
	}
	else if ( isArray( arg ) ) {
		target = [];
		for ( var i = 0; i < arg.length; i++ ) {
			target[i] = clone( arg[i] );
		}
	}
	else if ( isObject( arg ) ) {
		target = {};
		for ( var field in arg ) {
			if ( arg.hasOwnProperty( field ) ) {
				target[field] = clone( arg[field] );
			}
		}
	}
	else { // functions, etc. not clonable, and will pass through, though for primitives like strings and numbers, arg is cloning
		target = arg;
	}

	cloneDepth--;

	return target;
}

var mixinDepth = 0;
function mixin( arg ) {

	mixinDepth++;

	if ( mixinDepth >= 100 ) {
		mixinDepth = 0;
		throw new Error( 'max mixin depth of 100 reached' );
	}

	var target = clone( arg ); // clone so we don't modify the original

	// handle arbitrary number of mixins. precedence is from last to first item passed in.
	for ( var i = 1; i < arguments.length; i++ ) {

		var source = arguments[i];

		// mixin the source differently depending on what is in the destination
		switch ( getType( target ) ) {

			case 'object':
			case 'array':
			case 'function':

				// mixin in the source differently depending on its type
				switch ( getType( source ) ) {

					case 'array':
					case 'object':
					case 'function':

						// we don't care what descendant of object the source is
						for ( var field in source ) {

							// don't mixin parent fields
							if ( source.hasOwnProperty( field ) ) {

								// if the target is an array, only take fields that are integers
								if ( Array.isArray( target ) ) {

									var fieldFloat = parseFloat( field );

									// the field started with a number, or no number at all, then had non-numeric characters
									if ( isNaN( fieldFloat ) || fieldFloat.toString().length !== field.length || getType( fieldFloat ) !== 'integer' ) {
										continue;
									}

								}

								// recurse mixin differently depending on what the target value is
								switch ( getType( target[field] ) ) {

									// for any non-objects, do this
									case 'undefined':
									case 'null':

										switch ( getType( source[field] ) ) {
											case 'undefined':
												// NO-OP undefined doesn't override anything
												break;
											case 'null':
												target[field] = null;
												break;
											default:
												target[field] = clone( source[field] );
												break;
										}

										break;

									// if the target is already an object, we can mixin on it
									default:

										target[field] = mixin( target[field], source[field] );

										break;
								}

							}
						}

						break;

					default:
						// NO-OP, primitives can't mixin to objects, arrays and functions
						break;

				}

				break;

			default:

				// mixin in the source differently depending on its type
				switch ( getType( source ) ) {

					// arrays and objects just replace primitives
					case 'array':
					case 'object':

						// override primitives by just passing through a clone of parent
						target = clone( source );

						break;

					default:

						// target is a primitive and can't be null or undefined here, and all other primitives have equal precedence, so just pass through
						target = source;

						break;

				}

				break;
		}

	}

	mixinDepth--;

	return target;

}

module.exports = function( obj ) {
	return {
		isObject: function() {
			return isObject( obj );
		},
		isArray: function() {
			return isArray( obj );
		},
		getType: function() {
			return getType( obj );
		},
		mixin: function() {
			var args = [obj];
			for ( var i in  arguments ) {
				if ( arguments.hasOwnProperty( i ) ) {
					args.push( arguments[i] );
				}
			}
			return mixin.apply( module.exports, args );
		},
		clone: function() {
			return clone( obj );
		}
	};
};

module.exports.mixin = mixin;
module.exports.clone = clone;
module.exports.isObject = isObject;
module.exports.isArray = isArray;
module.exports.getType = getType;

},{}],5:[function(require,module,exports){
'use strict';

var sound = require('./emitSound');
var _data = require('./dataSync');

var reminder;

function createTR(data, key, n) {

    var tr = document.createElement('tr');
    tr.id = key;
    var created = moment();

    var baseRef = new Firebase('https://dialr.firebaseio.com/data/' + key);

    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');

    if (n) {
        var phone = document.createElement('span');
        phone.innerHTML = '<a href="tel:' + data.phone + '">' + data.phone + '</a>';


        var fav = document.createElement('span');
        fav.innerHTML = '<button type="button" class="btn btn-default btn-sm">' +
            '<span class = "glyphicon glyphicon-heart" aria-hidden = "true" style="color:'+ (data.fav ? '#d61a7f' : '') +'"></span></button>';

        var remind = document.createElement('span');
        remind.innerHTML = '<button style="margin-left:3px;" type="button" class="btn btn-default btn-sm"><span class = "glyphicon glyphicon-bullhorn" aria-hidden = "true"></span></button>';

        var remove = document.createElement('span');
        remove.innerHTML = '<button style="margin-left:3px;" type="button" class="btn btn-default btn-sm"><span class = "glyphicon glyphicon-remove" aria-hidden = "true"></span></button>';

        td1.appendChild(phone);
        td2.appendChild(document.createTextNode(data.state.toUpperCase()));
        td3.appendChild(document.createTextNode(moment().format("h:mm a")));
        td4.appendChild(document.createTextNode('a few seconds ago'));
        td5.appendChild(fav);
        td5.appendChild(remind);
        td5.appendChild(remove);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        baseRef.once('child_removed', function(data) {
            listBody.deleteRow(tr.rowIndex - 1);
        });


        phone.onclick = function() {
            tr.style.color = 'black';
            clearTimeout(reminder);
            remind.childNodes[0].style.color = '';
        };


        fav.onclick = function() {
            var favIcon = this.childNodes[0].childNodes[0].style.color;
            _data.update(favIcon, key, tr.rowIndex);
        };

        remind.onclick = function() {

            var isReminded = remind.childNodes[0].style.color;

            remind.childNodes[0].style.color = isReminded ? '' : 'orange';

            tr.style.color = phone.style.color ? '' : 'orange';

            if (remind.childNodes[0].style.color) {
                if (notify.permissionLevel()) {

                    var minutes = ~~prompt('Remind me in .. ? (minutes)', '10');

                    if (minutes > 0) {
                        reminder = setTimeout(function() {
                            notify.createNotification("Make a call", {
                                body: data.phone,
                                icon: "alert.ico"
                            });
                            sound.playSound(function() {});
                            remind.childNodes[0].style.color = '';
                        }, minutes * 60000);
                    }else{
                        alert('Please type a non-zero value');
                    }
                }

            } else {
                tr.style.color = '';
                clearTimeout(reminder);
            }
        };

        remove.onclick = function() {
            clearTimeout(reminder);
            _data.remove(key);
        };

        setInterval(function() {
            td4.innerHTML = moment().from(created, true) + " ago"
        }, 1000);

        //void sync after 5 secs
        setTimeout(function() {
            baseRef.update({
                UISync: 0
            });
        }, 5000);

        return listBody.appendChild(tr);
    }
}

exports.createTR = createTR;
},{"./dataSync":6,"./emitSound":7}],6:[function(require,module,exports){
'use strict';


var dialr = new Firebase('https://dialr.firebaseio.com/');
var dataRef = dialr.child("data");
var table = require('./createTableEntry');
var trIndex;

//syncs data
(function sync() {

    dataRef.orderByValue().on('child_added', function(data) {
        table.createTR(data.exportVal(), data.key(), data.exportVal().UISync || data.exportVal().fav)
    });

})();

//save a new entry
//UISync allows to add the entry to the table but it will remove 
//next time it loads if not saved or fav
function save(phone, state, sync) {
    var data = {
        phone: phone,
        state: state,
        fav: false,
        UISync: sync,
        time: moment().toString()
    };

    dataRef.push(data);
}

//remove an entry 
function remove(key) {
    var onComplete = function(error) {
        if (error) {
            console.log('Synchronization failed');
        } else {
            console.log('Synchronization succeeded');
        }
    };
    dataRef.child(key).remove(onComplete);
}

function update(fav, key, index) {
    

    var onComplete = function(error) {
        if (error) {
            console.log('Synchronization failed');
        } else {
        	trIndex = index;
            console.log('Synchronization succeeded');
        }
    };

    dataRef.child(key).update({
        fav: fav ? false : true
    }, onComplete);
}


dataRef.on('child_changed', function(data) {
    var tr = document.getElementById(data.key());
    tr.childNodes[4].childNodes[0].childNodes[0].childNodes[0].style.color = data.exportVal().fav ? '#d61a7f' : '';
});


dataRef.off("value");

exports.save = save;
exports.update = update;
exports.remove = remove;
},{"./createTableEntry":5}],7:[function(require,module,exports){
'use strict';

function playSound(cb) {

    var sine1 = T("sin", {
        freq: 240,
        mul: 0.51
    });
    var sine2 = T("sin", {
        freq: 400,
        mul: 0.54
    });

    T("perc", {
        r: 675
    }, sine1, sine2).on("ended", function() {
        this.pause();
    }).bang().play();

    cb();
}

exports.playSound = playSound;
},{}],8:[function(require,module,exports){
'use strict';

function eventHandlerDetector(input, e){
	return (e.type === 'click') ? input : e.target;
}

exports.eventHandlerDetector = eventHandlerDetector;
},{}],9:[function(require,module,exports){
//Checks notification permission on the browser.

function checkNotificationPermission() {
    notify.config({
        pageVisibility: false,
        autoClose: 0
    });

    if (notify.permissionLevel() == notify.PERMISSION_DEFAULT) {
        notify.requestPermission(function(v) {
            return 1;
        })
    } else if (notify.permissionLevel == notify.PERMISSION_GRANTED) {
        return 1;
    }
    return 0;
}

exports.checkNotificationPermission = checkNotificationPermission;
},{}],10:[function(require,module,exports){
var AreaCodes = require('areacodes');
//tollfree codes
var tollfree = ['800', '888', '877', '866', '855', '844'];

var reg = new RegExp(/\+?(1)?\d{3}/);

function isTollFreeNumber(phone){
	return tollfree.indexOf(reg.exec(formatLocal("US", phone))[0]);
}

function numberWithAreaCode (phone){
	return formatLocal("US", phone);
}

function areaCode () {
	return new AreaCodes();
}

function isValid(phone){
	return isValidNumber(phone, "US");
}

exports.isTollFreeNumber = isTollFreeNumber;
exports.numberWithAreaCode = numberWithAreaCode;
exports.areaCode = areaCode;
exports.isValid = isValid;
},{"areacodes":2}]},{},[1]);
