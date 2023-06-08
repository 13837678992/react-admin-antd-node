import React, {Suspense} from 'react';
import { BrowserRouter as Router , Route ,Routes} from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import routers from "@/routers";
const NotFound = React.lazy(() => import('@/view/NotFound'));
const Layout = React.lazy(() => import('@/view/Layout').catch(error => {
    console.error("Failed to load Layout component", error);
    throw error;
}));
const Login = React.lazy(() => import('@/view/login').catch(error => {
    console.error("Failed to load Layout component", error);
    throw error;
}));
function App ()  {
    return (
        <ConfigProvider locale={zhCN}>
          <DndProvider backend={HTML5Backend}>
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {
                            routers.map(({ path,exact, Component }, key) => (
                                <Route
                                    path={path}
                                    key={key}
                                    element={<Component/>}

                                />
                            ))
                    }
                </Routes>
                </Suspense>
            </Router>
             </DndProvider>
        </ConfigProvider>
    );
}




export default App;
