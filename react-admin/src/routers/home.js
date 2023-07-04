import React, {lazy} from "react";
import {PieChartOutlined} from "@ant-design/icons";

export  default [
    {
        title: '产品',
        path:'/products',
        component: lazy( () => import( `@/view/Products` ) ),
        icon: <PieChartOutlined />,
    },
    {
        title: '产品1',
        path:'/Live2D',
        component: lazy( () => import( `@/view/Products/Live2D` ) ),
        icon: <PieChartOutlined />,
    }
]
