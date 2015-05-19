/** @jsx createElement */

import { createElement, Component, render } from 'react';
import { send, receive } from 'react-beam';

// You must pass anything you send in as props to this component - i.e. the
// props `foo` and `bar` are now required. In turn, these props are passed
// down to children as context values.
@send('foo', 'bar')
class Parent extends Component {
	render() {
		return <Child/>;
	}
}

class Child extends Component {
	render() {
		return <Grandchild/>;
	}
}

// These values are picked up from context by the sender and assigned to the
// corresponding props. If props already exist for these values then they will
// override what comes from the parent.
@receive('foo', 'bar')
class Grandchild extends Component {
	render() {
		return <div>{this.props.foo} = {this.props.bar}</div>;
	}
}

// Et voilà.
const root = document.querySelector('#content');
render(<Parent foo='hello' bar='world'/>, root);
