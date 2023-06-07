import url from "./url";
export const login = [
    // 示例
    {
        title: '首页',
        path: url.home,
        component: () => import('@/view/login'),
        exact: true,
        // powerDot: POWERDOT.liveVisit,
    },
    {
        title: '登陆',
        path: url.login,
        component: () => import('@/view/login'),
        exact: true,
        // powerDot: POWERDOT.liveVisit,
    },
    {
        title: '产品',
        path: url.products,
        component: () => import('@/routers/products'),
        exact: true,
        // powerDot: POWERDOT.liveVisit,
    },

];
