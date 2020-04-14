import React, { PropsWithChildren } from 'react';
import { Provider } from 'mobx-react';
import { default as appStores, AppStores } from '../appStores';

interface StateProviderProps {
  stores?: AppStores;
}

export function StateProvider({ children, stores = appStores }: PropsWithChildren<StateProviderProps>) {
  return <Provider {...stores}>{children}</Provider>;
}

export default StateProvider;
