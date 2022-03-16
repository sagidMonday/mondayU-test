import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";

const Layout = () => {
  return (
    <BrowserRouter>
      <section className="layout">
        <main>
          <Switch>
            <Route path="/home">
              <WelcomePage />
            </Route>
            <Route path="/quiz"></Route>
            <Redirect from="/" to="/home" exact />
          </Switch>
        </main>
      </section>
    </BrowserRouter>
  );
};

export default Layout;
