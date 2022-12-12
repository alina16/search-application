import { render, screen, fireEvent } from '@testing-library/react';
import { SearchResults } from './';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const initialState = { 
    search: {
        loading: false,
        error: null,
        users: [],
    }
};
const mockStore = configureStore();
let store;

describe('SearchResults', () => {
    describe('Search input', () => {
        test('Renders Search input', () => {  
            store = mockStore(initialState);
            render( <Provider store={store}><SearchResults /></Provider>);
            const searchInput = screen.getByPlaceholderText(/Search .../i);
            expect(searchInput).toBeInTheDocument();
        });
        
        test('Change Search input value', () => {  
            store = mockStore(initialState);
            render( <Provider store={store}><SearchResults /></Provider>);
            const searchInput = screen.getByPlaceholderText(/Search .../i);
            
            fireEvent.change(searchInput, {target: {value: 'user'}});
            expect(searchInput).toHaveValue('user');
        });

        test('Renders clear icon', () => {  
            store = mockStore(initialState);
            render( <Provider store={store}><SearchResults /></Provider>);
            const clearIcon = screen.getByTestId(/clearIcon/i);
            
            expect(clearIcon).toBeInTheDocument();
        });

        test('Clear icon delete input value', () => {  
            store = mockStore(initialState);
            render( <Provider store={store}><SearchResults /></Provider>);
            const searchInput = screen.getByPlaceholderText(/Search .../i);
            const clearIcon = screen.getByTestId(/clearIcon/i);
            
            fireEvent.change(searchInput, {target: {value: 'user'}});
            fireEvent.click(clearIcon);
            expect(searchInput).toHaveValue('');
        });
    })

    describe('Search button', () => {
        test('Renders Search button', () => {  
            store = mockStore(initialState);
            render( <Provider store={store}><SearchResults /></Provider>);
            const searchButton = screen.getByText(/Search/i);
            expect(searchButton).toBeInTheDocument();
            expect(searchButton).toBeDisabled();
        });

        test('Change the search input text enables Search button', () => {  
            store = mockStore(initialState);
            render( <Provider store={store}><SearchResults /></Provider>);
            const searchInput = screen.getByPlaceholderText(/Search .../i);
            const searchButton = screen.getByText(/Search/i);
            
            fireEvent.change(searchInput, {target: {value: 'user'}});
            expect(searchButton).not.toBeDisabled();
        });
    })
})
