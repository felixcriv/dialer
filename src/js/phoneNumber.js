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