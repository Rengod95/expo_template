import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {TamaguiProvider} from 'tamagui';
import tamaguiConfig from '@/tamagui/tamagui.config';

const queryClient = new QueryClient();

export const AppProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18next}>
        <TamaguiProvider config={tamaguiConfig}>{children}</TamaguiProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
};
