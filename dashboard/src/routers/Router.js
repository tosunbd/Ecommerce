import React from 'react';

const Router = ({ allRoutes }) => {
    const routes = useRoutes([...allRoutes]);
    return routes;
};

export default Router;