'use strict';

function eventHandlerDetector(input, e){
	return (e.type === 'click') ? input : e.target;
}

exports.eventHandlerDetector = eventHandlerDetector;