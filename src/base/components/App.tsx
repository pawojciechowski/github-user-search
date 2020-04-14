import React from 'react';
import ThemeProvider from 'modules/themes/components/ThemeProvider';
import UserSearchContainer from 'modules/user-search/components/UserSearch';
import { AppStores } from 'config/state/appStores';
import { Provider } from 'mobx-react';
import appStores from 'config/state/appStores';

interface AppProps {
  stores?: AppStores;
}

function App({ stores = appStores }: AppProps) {
  return (
    <Provider {...stores}>
      <ThemeProvider>
        <UserSearchContainer />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
