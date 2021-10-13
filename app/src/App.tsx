import '@/assets/styles/global.less';
import AppRoutes from '@/routes';
import AppLayout from '@/layouts';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, DataProvider } from './contexts';

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <BrowserRouter>
          <AppLayout>
            <AppRoutes />
          </AppLayout>
        </BrowserRouter>
      </DataProvider>
    </AuthProvider>
  );
}
