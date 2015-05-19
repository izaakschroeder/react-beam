/** @jsx createElement */

import { Component, createElement } from 'react';
import { normalize } from './util';

/**
 * Create a component which receives the specified properties from any of its
 * parents. The specified properties can also be overridden locally using the
 * same `props` values.
 */
export default function receive() {

	const propTypes = normalize(arguments);

	// Create the higher-order component.
	return function wrap(Target) {

		return class Receiver extends Component {

			/**
			 * Context we wish to inherit from our parents.
			 * @type {Object}
			 */
			static contextTypes = propTypes;

			render() {
				return <Target {...this.context} {...this.props}/>;
			}
		};
	};
}
