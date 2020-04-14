import React from 'react';
import { SearchBar } from '../../components/SearchBar';
import { IGithubUserStore } from 'modules/user-search/stores/GithubUserStore';
import { renderWithThemeProvider } from 'config/tests/utils';
import { fireEvent } from '@testing-library/react';

const getTestUserStore = (data: {} = {}) =>
  (({
    fetchUserWithRepos: jest.fn<IGithubUserStore['fetchUserWithRepos'], any[]>(),
    isLoading: false,
    ...data,
  } as unknown) as IGithubUserStore);

const testUsername = 'testUsername';

describe('<SearchBar />', () => {
  it('should render without crashing', () => {
    renderWithThemeProvider(<SearchBar userStore={getTestUserStore()} />);
  });

  it('should match snapshot', () => {
    const { container } = renderWithThemeProvider(<SearchBar userStore={getTestUserStore()} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should properly update value of the input', () => {
    const { container } = renderWithThemeProvider(<SearchBar userStore={getTestUserStore()} />);
    const input = container.querySelector('input')!;

    expect(input).toBeTruthy();

    fireEvent.change(input, {
      target: {
        value: testUsername,
      },
    });

    expect(input.value).toBe(testUsername);
  });

  it('should fetchUserWithRepos on key press (Enter)', () => {
    const userStore = getTestUserStore();
    const fetchUserWithReposMock = userStore.fetchUserWithRepos as jest.MockedFunction<
      IGithubUserStore['fetchUserWithRepos']
    >;
    const { container } = renderWithThemeProvider(<SearchBar userStore={userStore} />);
    const input = container.querySelector('input')!;

    expect(input).toBeTruthy();

    fireEvent.change(input, {
      target: {
        value: testUsername,
      },
    });
    fireEvent.keyPress(input, {
      key: 'Enter',
      keyCode: 13,
    });

    expect(fetchUserWithReposMock.mock.calls.length).toBe(1);
    expect(fetchUserWithReposMock.mock.calls[0][0]).toBe(testUsername);
  });

  it('should fetchUserWithRepos on button click', () => {
    const userStore = getTestUserStore();
    const fetchUserWithReposMock = userStore.fetchUserWithRepos as jest.MockedFunction<
      IGithubUserStore['fetchUserWithRepos']
    >;
    const { container } = renderWithThemeProvider(<SearchBar userStore={userStore} />);
    const input = container.querySelector('input')!;
    const button = container.querySelector('button')!;

    expect(input).toBeTruthy();
    expect(button).toBeTruthy();

    fireEvent.change(input, {
      target: {
        value: testUsername,
      },
    });
    fireEvent.click(button);

    expect(fetchUserWithReposMock.mock.calls.length).toBe(1);
    expect(fetchUserWithReposMock.mock.calls[0][0]).toBe(testUsername);
  });

  it('should disable button when store is in `isLoading` state', () => {
    const { container } = renderWithThemeProvider(<SearchBar userStore={getTestUserStore({ isLoading: true })} />);
    const button = container.querySelector('button')!;

    expect(button).toBeTruthy();
    expect(button.disabled).toBeTruthy();
  });

  it('should disable input when store is in `isLoading` state', () => {
    const { container } = renderWithThemeProvider(<SearchBar userStore={getTestUserStore({ isLoading: true })} />);
    const input = container.querySelector('input')!;

    expect(input).toBeTruthy();
    expect(input.disabled).toBeTruthy();
  });

  it('should not fire fetchUserWithRepos, when isLoading is true - button is disabled', () => {
    const userStore = getTestUserStore({ isLoading: true });
    const fetchUserWithReposMock = userStore.fetchUserWithRepos as jest.MockedFunction<
      IGithubUserStore['fetchUserWithRepos']
    >;
    const { container } = renderWithThemeProvider(<SearchBar userStore={userStore} />);
    const input = container.querySelector('input')!;
    const button = container.querySelector('button')!;

    expect(input).toBeTruthy();
    expect(button).toBeTruthy();

    fireEvent.change(input, {
      target: {
        value: testUsername,
      },
    });
    fireEvent.click(button);

    expect(fetchUserWithReposMock.mock.calls.length).toBe(0);
  });

  it('should not fire fetchUserWithRepos, when isLoading is true - input is disabled', () => {
    const userStore = getTestUserStore({ isLoading: true });
    const fetchUserWithReposMock = userStore.fetchUserWithRepos as jest.MockedFunction<
      IGithubUserStore['fetchUserWithRepos']
    >;
    const { container } = renderWithThemeProvider(<SearchBar userStore={userStore} />);
    const input = container.querySelector('input')!;

    expect(input).toBeTruthy();

    fireEvent.change(input, {
      target: {
        value: testUsername,
      },
    });
    fireEvent.keyPress(input, {
      key: 'Enter',
      keyCode: 13,
    });

    expect(fetchUserWithReposMock.mock.calls.length).toBe(0);
  });
});
