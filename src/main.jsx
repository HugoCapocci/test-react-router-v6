import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';

import Root  from './routes/root';
import { rootLoader } from './loaders/root';
import { contactLoader } from './loaders/contact';
import { rootAction } from './actions/root';
import { favoriteAction } from './actions/favorite';
import { editAction } from './actions/edit';
import { destroyAction } from './routes/destroy';
import ErrorPage from './error-page';
import './index.css'

const Index = React.lazy(() => import('./routes/index'));
const Contact = React.lazy(() => import('./routes/contact'));
const EditContact = React.lazy(() => import('./routes/edit'));

const Lazy = ({children }) =>
  <React.Suspense fallback={<div>wait for it</div>}>
    {children}
  </React.Suspense>

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Lazy><Root /></Lazy>}
      loader={rootLoader}
      action={rootAction}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Lazy><Index /></Lazy>} />
        <Route
          path="contacts/:contactId"
          element={<Lazy><Contact /></Lazy>}
          loader={contactLoader}
          action={favoriteAction}
        />
        <Route
          path="contacts/:contactId/edit"
          element={<Lazy><EditContact /></Lazy>}
          loader={contactLoader}
          action={editAction}
        />
        <Route
          path="contacts/:contactId/destroy"
          action={destroyAction}
        />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
