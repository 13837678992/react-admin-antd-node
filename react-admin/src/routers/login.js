import React ,{lazy}from "react";
export default  [
    // 示例
    {
        path: '/',
        component: lazy( () => import( `@/view/Layout` ) ),
        children: [
            {
                path:'/products',
                component: lazy( () => import( `@/view/Products` ) ),
            }
        ]
        // powerDot: POWERDOT.liveVisit,
    },
    {
       path: '/login',
        component: lazy( () => import( '@/view/Login' ) ),
        // powerDot: POWERDOT.liveVisit,
    },
    {
        path: '*',
        component: lazy( () => import( `@/view/NotFound` ) ),
        // powerDot: POWERDOT.liveVisit,
    },
];
