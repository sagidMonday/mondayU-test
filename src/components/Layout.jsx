import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import QuizPage from "./pages/QuizPage";
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
            <Route path="/quiz">
              <QuizPage />
            </Route>
            <Redirect from="/" to="/home" exact />
          </Switch>
        </main>
      </section>
    </BrowserRouter>
  );
};

export default Layout;
