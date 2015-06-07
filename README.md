# react-beam

Send/receive context easily in React components.

![build status](http://img.shields.io/travis/izaakschroeder/react-beam/master.svg?style=flat)
![coverage](http://img.shields.io/coveralls/izaakschroeder/react-beam/master.svg?style=flat)
![license](http://img.shields.io/npm/l/react-beam.svg?style=flat)
![version](http://img.shields.io/npm/v/react-beam.svg?style=flat)
![downloads](http://img.shields.io/npm/dm/react-beam.svg?style=flat)

Ever wanted an easy way to pass properties all the way down the tree without explicitly specifying them in `props`? Well now you can!

```javascript
import { createElement, Component, render } from 'react';
import { send, receive } from 'react-beam';

// You must pass anything you send in as props to this component - i.e. the
// props `foo` and `bar` are now required. In turn, these props are passed down
// to children as context values.
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
```

You can also specify property types explicitly.

```javascript
import { PropTypes, Component } from 'react';
import { send } from 'react-beam';

@send({ foo: PropTypes.object.isRequired });
class App extends Component {

}
```

https://www.tildedave.com/2014/11/15/introduction-to-contexts-in-react-js.html
https://github.com/wycats/javascript-decorators
