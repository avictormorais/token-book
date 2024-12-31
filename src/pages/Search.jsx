import styled from "styled-components";
import { useParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar'
import { FaFaceSadTear } from "react-icons/fa6";
import { useTranslation } from 'react-i18next'
import GridCardsBook from "../components/GridCardsBook";
import ButtonNewBook from '../components/ButtonNewBook'

function Search(){
    const { q } = useParams();
    const { t } = useTranslation();

    const books = [
        { id: 1, title: "Livro 1", author: "Autor 1" },
        { id: 2, title: "Livro 2", author: "Autor 2" },
        { id: 3, title: "Livro 3", author: "Autor 3" },
        { id: 4, title: "Livro 4", author: "Autor 4" },
        { id: 5, title: "Livro 5", author: "Autor 5" },
        { id: 6, title: "Livro 6", author: "Autor 6" },
        { id: 7, title: "Livro 7", author: "Autor 7" },
        { id: 8, title: "Livro 8", author: "Autor 8" },
        { id: 9, title: "Livro 9", author: "Autor 9" },
        { id: 10, title: "Livro 10", author: "Autor 10" },
        { id: 11, title: "Livro 11", author: "Autor 11" },
        { id: 12, title: "Livro 12", author: "Autor 12" },
        { id: 13, title: "Livro 13", author: "Autor 13" },
        { id: 14, title: "Livro 14", author: "Autor 14" },
        { id: 15, title: "Livro 15", author: "Autor 15" },
    ];  

    return(
        <Container>
            <SearchBar/>
            <ButtonNewBook/>

            {q ? (
                <GridCardsBook books={books} />
            ) : (
                <DivNotFound>
                    <IconNotFound/>
                    <TextNotFound>{t('nothing_found')}</TextNotFound>
                </DivNotFound>
            )}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: top;
    flex-direction: column;
    padding-top: 80px;
    align-items: top;
    width: 90%;

    @media screen and (min-width: 700px) {
        width: 91%;
        margin-left: 60px;
        padding-top: 20px;
    }

    @media screen and (max-width: 1100px) {
        width: 85%;
    }

    @media screen and (max-width: 900px) {
        width: 85%;
    }

    @media screen and (max-width: 700px) {
        width: 90%;
        padding-top: 100px;
    }
`

const DivNotFound = styled.div`
    display: flex;
    width: 100%;
    height: 90vh;
    justify-content: center;
    align-content: center;
    flex-direction: column;
`

const IconNotFound = styled(FaFaceSadTear)`
    font-size: 10em;
    margin-top: auto;
    margin-inline: auto;
`

const TextNotFound = styled.p`
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: auto;
    margin-inline: auto;
    margin-top: 25px;
    opacity: 0.8;
    text-align: center;
`

export default Search;