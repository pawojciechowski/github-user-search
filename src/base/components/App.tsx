import React from 'react';
import ThemeProvider from 'modules/themes/components/ThemeProvider';
import StateProvider from 'config/state/components/StateProvider';
import UserSearchContainer from 'modules/user-search/components/UserSearch';

function App() {
  return (
    <StateProvider>
      <ThemeProvider>
        <UserSearchContainer />
      </ThemeProvider>
    </StateProvider>
  );
}

export default App;
