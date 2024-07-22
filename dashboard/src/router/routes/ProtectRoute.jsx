import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectRoute = ({ route, children }) => {

    const { role, userInfo } = useSelector(state => state.auth);

    console.log('route = ');
    console.log(route);
    console.log('userInfo = ');
    console.log(userInfo);
    if (role)
    {
        if (route.role)
        {
            if (userInfo)
            {
                if (userInfo.role === route.role)
                {
                    if (route.status)
                    {
                        if (route.status == userInfo.status)
                        {
                            return <Suspense fallback={null}>{children}</Suspense>
                        }
                        else
                        {
                            if (userInfo.status === 'pending')
                            {
                                return <Navigate to='/seller/account-pending' replace />
                            }
                            else
                            {
                                return <Navigate to='/seller/account-deactive' replace />
                            }
                        }
                    }
                    else
                    {
                        if (route.visiblity)
                        {
                            if (route.visiblity.some(r => r === userInfo.status))
                            {
                                return <Suspense fallback={null}>{children}</Suspense>
                            }
                            else
                            {
                                return <Navigate to='/seller/account-pending' replace />
                            }
                        }
                        else
                        {
                            return <Suspense fallback={null}>{children}</Suspense>
                        }
                    }
                }
            }
            else
            {
                return <Navigate to='/unauthorized' replace />
            }
        }
        else
        {
            if (route.ability === 'seller' || route.ability === 'admin')
            {
                return <Suspense fallback={null}>{children}</Suspense>
            }
        }
    }
    else
    {
        return <Navigate to='/login' replace />
    }

};

export default ProtectRoute;