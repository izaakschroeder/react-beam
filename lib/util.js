
import { isObject, flatten, map, zipObject, isString, pairs } from 'lodash';
import { PropTypes } from 'react';

function extract(value) {
	if (isObject(value)) {
		return pairs(value);
	} else if (isString(value)) {
		return [ value, PropTypes.any.isRequired ];
	} else {
		throw new TypeError();
	}
}

/**
 * Derp de derp.
 * @param  {[type]} values [description]
 * @return {[type]}        [description]
 */
export function normalize(values) {
	return zipObject(map(flatten(values, true), extract));
}
