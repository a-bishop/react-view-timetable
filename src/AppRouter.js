import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MyCourses from './MyCourses';

const AppRouter = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div>
      <Route path="/" exact component={MyCourses} />
      <Route path="/:id" component={MyCourses} />
      </div>
    </Router>
  );
};

export default AppRouter;