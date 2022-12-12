import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsers, selectUsers, selectError, selectLoading } from '../../slices/searchSlice';
import SearchIcon from '@mui/icons-material/Search';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import ClearIcon from '@mui/icons-material/Clear';
import Snackbar from '@mui/material/Snackbar';
import { List } from '../../components/List';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Search, SearchIconWrapper, StyledInputBase, StyledBox, Alert, SearchButton } from './styled';
import store from '../../store';

export enum SearchOptions {
    USERS = 'Users',
    ORGANIZATIONS = 'Organizations',
}
export type SearchOption = SearchOptions.USERS | SearchOptions.ORGANIZATIONS;
export type AppDispatch = typeof store.dispatch


export const SearchResults = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [searchOption, setSearchOption] = useState<SearchOption>(SearchOptions.USERS); 
    const [q, setQ] = useState('');
    const [showError, setShowError] = useState(false);
    const users = useSelector(selectUsers);
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const isSearchOptionUsers = searchOption === SearchOptions.USERS;

    useEffect(() => {
        setShowError(!!error)
    }, [error])

    const handleSearch = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
  
        if(q) {
            dispatch(searchUsers({ 
                q,
                ...(!isSearchOptionUsers && { type: 'org' }),
             }));
        }
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setQ(e.target.value);
    }

    const handleChangeSearchOption = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchOption((event.target as HTMLInputElement).value as SearchOption);
    };

    const handleClearSearch = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.stopPropagation();
        setQ('');
        setShowError(false);
    }

    return <Container data-testid='searchWrapper' maxWidth="md">
                <StyledBox>
                    <div style={{ display: 'flex' }}>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                endAdornment={<ClearIcon data-testid='clearIcon' onClick={handleClearSearch} />}
                                autoFocus
                                value={q || ''}
                                onChange={handleSearchChange}
                                placeholder="Search ..."
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                        <SearchButton disabled={!q} onClick={handleSearch} variant="contained">
                            Search
                        </SearchButton>
                    </div>
                    <RadioGroup 
                        row
                        value={searchOption}
                        onChange={handleChangeSearchOption}
                    >
                        {Object.values(SearchOptions).map((option: SearchOption) => (
                            <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                        ))}
                    </RadioGroup>
                </StyledBox>
                { loading ? <CircularProgress /> : <List data={users} /> }
                <Snackbar open={showError} autoHideDuration={3000}>
                    <Alert onClose={() => setShowError(false)} severity={error?.type}>{error?.message}</Alert>
                </Snackbar>         
    </Container>
}
