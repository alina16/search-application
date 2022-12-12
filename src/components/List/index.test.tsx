import { render, screen } from '@testing-library/react';
import { List } from './';

const mockedList = [
    {
        followers_url: '',
        following_url: '',
        gists_url: '',
        gravatar_id: '',
        html_url: '',
        received_events_url: '',
        score: 0,
        site_admin: false,
        starred_url: '',
        subscriptions_url: '',
        type: '',
        id: 1, 
        events_url: '',
        node_id: '',
        repos_url: '',
        url: '',
        avatar_url: 'avatar_url',
        organizations_url: 'organizations_url',
        login: 'login',
    }
];

describe('List', () => {
    test('Renders List', () => { 
        render(<List data={[]} />) 
        const noItemsText = screen.getByText(/No items/i);

        expect(noItemsText).toBeInTheDocument();
    });

    test('Renders List with items', () => { 
        render(<List data={mockedList} />) 
        const noItemsText = screen.queryByText(/No items/i);
        const avatar = screen.getByRole('img');
        const header = screen.queryByText('login');
        const subHeader = screen.queryByText('organizations_url');

        expect(avatar).toHaveAttribute('src', 'avatar_url');
        expect(noItemsText).not.toBeInTheDocument();
        expect(header).toBeInTheDocument();
        expect(subHeader).toBeInTheDocument();
    });
})