import React from 'react';

import {
  // Post,
  // Posts,
  // Profile,
  // NotFound,
  // UsersList,
  // GhostMap,
  // NotAuth,
  // TestMap,
  TestComponent
} from './components/containers';
import App from './components/App';

export default [
  {
    ...App,
    routes: [
      {
        component: TestComponent,
        path: '/'
      }
    ]
  }
];
