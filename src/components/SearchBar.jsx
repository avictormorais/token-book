import styled from "styled-components";
import { useTranslation } from 'react-i18next'
import { HiSearch } from "react-icons/hi";

function SearchBar(){
    const { t } = useTranslation();

    return(
        <Container>
            <DivInput>
                <SearchIcon/>
                <Line/>
                <Input type="Text" placeholder={t('search_placeholder')}/>
            </DivInput>
            <Button>{t('search')}</Button>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    overflow: hidden;
`

const DivInput = styled.div`
    display: flex;
    flex-direction: row;
    background-color: var(--secondary-color);
    width: 100%;
    border-radius: 15px;
    padding-block: 10px;
`

const Input = styled.input`
    display: flex;
    border: none;
    font-size: 1.2em;
    background-color: transparent;
    width: 100%;
    outline: none;
    margin-inline: 10px;
    color: var(--primary-text-color);
    font-weight: bold;
`

const SearchIcon = styled(HiSearch)`
    margin-block: auto;
    margin-left: 20px;
    height: 100%;
    font-size: 1.8em;
`

const Line = styled.div`
    background-color: var(--primary-text-color);
    height: 25px;
    width: 2px;
    margin-block: auto;
    margin-inline: 15px;
    opacity: 0.5;
`

const Button = styled.button`
    background-color: var(--primary-text-color);
    border-radius: 15px;
    height: 45px;
    color: var(--primary-color);
    font-weight: bold;
    padding-inline: 25px;
    margin-left: 20px;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: var(--secondary-color);
        color: var(--primary-text-color);
    }
`

export default SearchBar;