import { render, screen } from '@testing-library/react';
import Orders from '../Orders';

let mockSearch = '?order=1';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        search: mockSearch,
    }),
}));

jest.mock('@/hooks', () => ({
    api: {
        order: {
            useGetList: () => ({
                data: [],
                isFetching: false,
                isLoading: false,
                loadMoreOrders: () => undefined,
            }),
        },
    },
}));

jest.mock('@/hooks/custom-hooks', () => ({
    useGetPhoneNumberVerification: jest.fn().mockReturnValue({ shouldShowVerification: false }),
    useIsAdvertiser: jest.fn().mockReturnValue(true),
    useQueryString: () => ({ queryString: { get: () => 'Active orders' } }),
}));

jest.mock('../OrdersTable', () => ({
    OrdersTable: () => <div>OrdersTable</div>,
}));

jest.mock('../OrdersTableHeader', () => ({
    OrdersTableHeader: () => <div>OrdersTableHeader</div>,
}));

jest.mock('@deriv-com/ui', () => ({
    useDevice: () => ({ isDesktop: true }),
}));

describe('Orders', () => {
    it('should render the OrdersTable if order id is not in the search query', () => {
        mockSearch = '';

        render(<Orders />);

        expect(screen.getByText('OrdersTableHeader')).toBeInTheDocument();
        expect(screen.getByText('OrdersTable')).toBeInTheDocument();
    });
});
