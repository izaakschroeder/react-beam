/** @jsx createElement */

import { Component, PropTypes, createElement } from 'react';

/**
 * Create a higher-order component from the given component that listens and
 * reacts to updates from some event sources.
 *
 * Use as an ES7 mixin:
 *
 * @observe(stores => [stores.a, stores.b], (a, b) => {
 *   foo: a.foo,
 *   bar: b.bar
 * })
 *
 * When any of `streamA`, `streamB`, etc. updates, then the state properties
 * `foo` and `bar` get updated and passed down as properties to the wrapped
 * component.
 *
 * You may also pass strings instead of stream objects; the current value of
 * the given prop will be used as the stream.
 *
 * See: https://medium.com/@dan_abramov/94a0d2f9e750
 *
 */
export default function observe(props) {

	// Create the higher-order component.
	return function wrap(Target) {

		return class HerpDerp extends Component {

			/**
			 * Context we wish to inherit from our parents.
			 * @type {Object}
			 */
			static contextTypes = types;

			render() {
				return <Target {...this.context} {...this.props}/>;
			}
		};
	};
}
