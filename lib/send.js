/** @jsx createElement */

import { Component, createElement } from 'react';
import { keys, pick } from 'lodash';
import { normalize } from './util'

/**
 * Create a component which passes down the specified properties to all of its
 * children. Likely only your top-level components should be an instance of
 * this.
 */
export default function send() {

	const propTypes = normalize(arguments);
	const propNames = keys(propTypes);

	// Create the higher-order component.
	return function wrap(Target) {
		return class Sender extends Component {

			/**
			 * You must pass both `stores` and `actions` down for your children.
			 * @type {Object}
			 */
			static propTypes = propTypes;

			/**
			 * Specify the context we're passing down to our children.
			 * @type {Object}
			 */
			static childContextTypes = propTypes;

			/**
			 * Get the context we're passing down to our children.
			 * @returns {Object} Context.
			 */
			getChildContext() {
				return pick(this.props, propNames);
			}

			/**
			 * Just render whatever's been wrapped.
			 * @returns {Object} Output data.
			 */
			render() {
				return <Target {...this.props}/>;
			}

		};
	}
}
