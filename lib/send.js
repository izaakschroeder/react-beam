/** @jsx createElement */

import { Component, PropTypes, createElement } from 'react';
import { pick, keys, isObject, isArray, map, constant, object, clone } from 'lodash';

/**
 * Create a container which passes down the specified properties to all of its
 * children. Likely only your top-level component should be an instance of this.
 * @param  {Object|Array} types Which properties to pass down.
 * @return {Function} Wrapper function.
 */
export default function container(types) {
	let props;
	if (isArray(types)) {
		props = types.slice();
		types = object(props, map(keys, constant(PropTypes.any.isRequired)));
	} else if (isObject(props)) {
		props = keys(props);
		types = clone(props);
	} else {
		throw new TypeError();
	}

	return function wrap(Wrapped) {
		return class Container extends Component {

			/**
			 * You must pass both `stores` and `actions` down for your children.
			 * @type {Object}
			 */
			static propTypes = types;

			/**
			 * Specify the context we're passing down to our children.
			 * @type {Object}
			 */
			static childContextTypes = types;

			/**
			 * Get the context we're passing down to our children.
			 * @returns {Object} Context.
			 */
			getChildContext() {
				return pick(this.props, props);
			}

			/**
			 * Just render whatever's been wrapped.
			 * @returns {Object} Output data.
			 */
			render() {
				return <Wrapped {...this.props}/>;
			}

		};
	}
}
