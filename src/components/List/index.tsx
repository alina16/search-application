import { User } from '../../slices/searchSlice';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';

export const List = ({ data }: { data: User[] }) => (
    <>
        {
            data.length ? data.map(item => (
                <Card style={{ marginBottom: '12px' }} key={item.id}>
                    <CardHeader
                        avatar={<Avatar src={item.avatar_url} />}
                        title={item.login}
                        subheader={item.organizations_url}
                    />
                </Card>
            )) : 'No items'
        }
    </>
);
