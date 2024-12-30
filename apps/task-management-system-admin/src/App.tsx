import React, { useEffect, useState } from "react";
import { Admin, DataProvider } from "react-admin";
import buildGraphQLProvider from "./data-provider/graphqlDataProvider";
import { theme } from "./theme/theme";
import Login from "./Login";
import "./App.scss";
import Dashboard from "./pages/Dashboard";
import { createBrowserHistory as createHistory } from "history";
import { BrowserRouter } from "react-router-dom";
import { UserList } from "./user/UserList";
import { UserCreate } from "./user/UserCreate";
import { UserEdit } from "./user/UserEdit";
import { UserShow } from "./user/UserShow";
import { PlanList } from "./plan/PlanList";
import { PlanCreate } from "./plan/PlanCreate";
import { PlanEdit } from "./plan/PlanEdit";
import { PlanShow } from "./plan/PlanShow";
import { TaskList } from "./task/TaskList";
import { TaskCreate } from "./task/TaskCreate";
import { TaskEdit } from "./task/TaskEdit";
import { TaskShow } from "./task/TaskShow";
import { auth0AuthProvider } from "./auth-provider/ra-auth-auth0";

const history = createHistory();

const App = (): React.ReactElement => {
  const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);
  useEffect(() => {
    buildGraphQLProvider
      .then((provider: DataProvider) => {
        setDataProvider(() => provider);
      })
      .catch((error: unknown) => {
        console.log(error);
      });
  }, []);
  if (!dataProvider) {
    return <div>Loading</div>;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Admin
          history={history}
          title={"Task Management System"}
          dataProvider={dataProvider}
          authProvider={auth0AuthProvider}
          theme={theme}
          dashboard={Dashboard}
          loginPage={Login}
        >
          <Resource
            name="User"
            list={UserList}
            edit={UserEdit}
            create={UserCreate}
            show={UserShow}
          />
          <Resource
            name="Plan"
            list={PlanList}
            edit={PlanEdit}
            create={PlanCreate}
            show={PlanShow}
          />
          <Resource
            name="Task"
            list={TaskList}
            edit={TaskEdit}
            create={TaskCreate}
            show={TaskShow}
          />
        </Admin>
      </BrowserRouter>
    </div>
  );
};

export default App;
