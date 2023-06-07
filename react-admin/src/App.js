import React from 'react';
import {
    Switch, Route, routerRedux,
} from 'dva/router';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { dynamic } from 'dva';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// import App from '@/frameConfig/routes/app';
// import routers from '@/frameConfig/routes/list';
import routers from "@/routers";
const { ConnectedRouter } = routerRedux;
const App = () => {
    return (
        <ConfigProvider locale={zh_CN}>
            {/*<ConnectedRouter history={history}>*/}
                <DndProvider backend={HTML5Backend}>
                    <App>
                        <Switch>
                            {
                                routers.map(({ path, component }, key) => (
                                    <Route
                                        // eslint-disable-next-line react/no-array-index-key
                                        key={key}
                                        exact
                                        path={path}
                                        component={dynamic({
                                            loader:component,
                                            loading: () => <div>loading</div>,
                                        })}
                                    />
                                ))
                            }
                            <Route component={error} />
                        </Switch>
                    </App>
                </DndProvider>
            {/*</ConnectedRouter>*/}
        </ConfigProvider>
    );
};




export default App;
