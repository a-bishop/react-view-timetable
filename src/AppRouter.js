import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MyCourses from './MyCourses';

const AppRouter = () => {
  return (
    <Router>
      <div>
      <Route path="/" exact component={MyCourses} />
      <Route key=":id" path="/section/:id" component={MyCourses} />
      </div>
    </Router>
  );
};

export default AppRouter;