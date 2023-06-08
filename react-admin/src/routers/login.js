import url from "./url";
import React ,{lazy}from "react";
export default  [
    // 示例
    {
        title: '首页',
        path: url.layout,
        Component: lazy( () => import( `@/view/Layout` ) ),
        // powerDot: POWERDOT.liveVisit,
    },
    {
        title: '登陆',
        path: url.login,
        Component: lazy( () => import( `@/view/login` ) ),
        // powerDot: POWERDOT.liveVisit,
    },
    {
        title: '产品',
        path: url.products,
        Component: lazy( () => import( `@/view/Products` ) ),
        // powerDot: POWERDOT.liveVisit,
    },
    {
        title: '404',
        path: url.notFound,
        Component: lazy( () => import( `@/view/NotFound` ) ),
        // powerDot: POWERDOT.liveVisit,
    },
];
