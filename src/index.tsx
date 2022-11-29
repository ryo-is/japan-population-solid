/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from 'solid-app-router';

import './index.css';
import { App } from './App';
import { Layout } from '@layouts/Layout';

render(
  () => (
    <Router>
      <Layout>
        <App />
      </Layout>
    </Router>
  ),
  document.getElementById('root') as HTMLElement
);
