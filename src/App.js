import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import View from './pages/View'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Router>
      <div className='App'>
        <Layout>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/view/:recipeId'>
              <View />
            </Route>
            <Route path='/dashboard'>
              <Dashboard />
            </Route>
          </Switch>
        </Layout>
      </div>
    </Router>
  )
}

export default App
