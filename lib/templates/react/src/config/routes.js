import React, { lazy, Suspense } from 'react';
import { createBrowserHistory, createMemoryHistory } from 'history';
import PreLoader from 'components/PreLoader';

const lazyload = (component = () => {}) => {
  const LazyComponent = lazy(component);

  return props => (
    <Suspense fallback={<PreLoader />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

const history = SSR === 'yes' ? createMemoryHistory() : createBrowserHistory();

const Application = lazyload(() =>
  import('components/Application/Application'),
);
const PageNotFound = lazyload(() => import('pages/PageNotFound'));
const WelcomePage = lazyload(() => import('pages/WelcomePage'));

export { history };

export default [
  {
    component: Application,
    routes: [
      { path: '/', exact: true, component: WelcomePage },
      { path: '/404', component: PageNotFound },
      { path: '*', component: PageNotFound },
    ],
  },
];
