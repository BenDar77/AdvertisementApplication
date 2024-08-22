
import { ToastContainer } from 'react-toastify';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SiteRouter from './Components/SiteRouter';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  
  return (
    <div className="App">
       <QueryClientProvider client={queryClient}>
      <ToastContainer/>
      <SiteRouter/>
      </QueryClientProvider>
    </div>
  );
}

export default App;
