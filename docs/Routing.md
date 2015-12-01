# Routing

## Client

On the frontend, we use the [react-router](https://www.npmjs.com/package/react-router) module for routing.

**Redirection**

Use the [History Mixin](https://github.com/rackt/react-router/blob/master/docs/API.md#history-mixin) for programatic routing in the app.

_app/components/ExampleComponent.js_

```javascript
'use strict';

import React from 'react';

var ExampleComponent = React.createClass({
  mixins: [ History ],
  handleClick: function() {
    this.pushState(null, <new url>);
  }
  render: function() {
    return (
      <button onClick='{ this.handleClick }'>
        Click Me!
      </button>
    );
  }
});

module.exports = ExampleComponent;
```

## Server

During a user session, the app periodically need to fetch server.  For server requests, we use [React Asynchronous Actions](https://github.com/reflux/refluxjs/blob/master/README.md#asynchronous-actions) with the [superagent-promise](https://www.npmjs.com/package/superagent-promise) module.

**Example**

_app/actions/ExampleActions.js_

```javascript
'use strict;'

import Reflux from 'reflux';

import Promise from 'promise'; 
import Superagent from 'superagent';
import SuperagentPromise from 'superagent-promise';
var request = SuperagentPromise(Superagent, Promise);

var ExampleActions = Reflux.createActions({
  'requestData': {
    children: ['completed', 'failed']
  },
  ...
});

ExampleActions.requestData.listen(function() {
  request.get(<server url>)
    .then(this.completed)
    .catch(this.failed);  
});

module.exports = ExampleActions;
```

_app/stores/ExampleStore.js_

```javascript
'use strict;'

import ExampleActions from '../actions/ExampleActions';

var ExampleStore = Reflux.createStore({
  listenables: [ ExampleActions ],
  onRequestDataCompleted: function(resp) {
    console.log("%s: %s", resp.status, resp.text);
  },
  onRequestDataFailed: function(resp) {
    console.log("%s: %s", resp.status, resp.text);
  },
  ...
});

module.exports = ExampleStore;
```