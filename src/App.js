import Header from './components/Header'
import Routes from './config/routes'
import { CartContextProvider } from "./context/Cart"





const App = () => {


  return (
    <div>
     <CartContextProvider>
         <Header/>
         <Routes/>
     </CartContextProvider>
    </div>
  );
}

export default App;