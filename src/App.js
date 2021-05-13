import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import View from "./pages/View";

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/view/:recipeId">
              <View />
            </Route>
          </Switch>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
