import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Alert } from './Components/Alert';
import { NavBarTop } from './Components/NavBarTop';
import { AuthContextProvider } from './Context/AuthContext';
import { AdminRoom } from './Pages/AdminRoom';
import { Home } from './Pages/Home';
import { MyRoom } from './Pages/MyRooms';
import { NewRoom } from './Pages/NewRoom';
import { Room } from './Pages/Room';

function App() {

  return (
    <>
      <Alert />

      <BrowserRouter>
        <AuthContextProvider>
          <NavBarTop />

          <Switch>{/* previne que rotas sejam sobrepostas ( rotas que tem path inicial iguais ) */}
            <Route path="/" exact={true} component={Home} />
            <Route path="/my/rooms" exact={true} component={MyRoom} />
            <Route path="/rooms/new" exact={true} component={NewRoom} />
            <Route path="/rooms/:id" exact={true} component={Room} />
            <Route path="/admin/rooms/:id" component={AdminRoom} />
          </Switch>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App;