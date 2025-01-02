import styled, { keyframes } from "styled-components";
import { useParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { FaFaceSadTear } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import api from '../services/api';
import GridCardsBook from "../components/GridCardsBook";
import ButtonNewBook from '../components/ButtonNewBook';
import { VscLoading } from "react-icons/vsc";

function Search() {
    const { q } = useParams();
    const { t } = useTranslation();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                if(q){
                    const response = await api.post('/list-books', { name: q });
                    setBooks(Array.isArray(response.data) ? response.data : []);
                } else {
                    setBooks([]);
                }
            } catch (error) {
                console.error('Erro ao buscar livros:', error);
                setBooks([]);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, [q]);

    return (
        <Container>
            <SearchBar />
            <ButtonNewBook />

            {loading ? (
                <LoadingDiv>
                    <IconLoad/>
                    <Loading>{t('loading')}</Loading>
                </LoadingDiv>
            ) : books.length > 0 ? (
                <GridCardsBook books={books.map(book => ({
                    id: book.ipfs_pin_hash,
                    title: book.metadata?.name.replace('.pdf', '') || 'Título desconhecido',
                    author: book.metadata?.keyvalues?.author || 'Autor desconhecido',
                }))} />
            ) : (
                <DivNotFound>
                    <IconNotFound />
                    <TextNotFound>{t('nothing_found')}</TextNotFound>
                </DivNotFound>
            )}
        </Container>
    );
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
`;

const LoadingDiv = styled.div`
    align-items: center;
    justify-content: center;
    overflow: hidden;
`

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const IconLoad = styled(VscLoading)`
    margin-top: 5%;
    font-size: 7em;
    width: 100%;
    animation: ${spin} 1s linear infinite;
`;

const Loading = styled.p`
    font-weight: bold;
    font-size: 1.5em;
    text-align: center;
    margin: 20px 0;
    opacity: 0.8;
`;

const DivNotFound = styled.div`
    display: flex;
    width: 100%;
    height: 90vh;
    justify-content: center;
    align-content: center;
    flex-direction: column;
`;

const IconNotFound = styled(FaFaceSadTear)`
    font-size: 10em;
    margin-top: auto;
    margin-inline: auto;
`;

const TextNotFound = styled.p`
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: auto;
    margin-inline: auto;
    margin-top: 25px;
    opacity: 0.8;
    text-align: center;
`;

export default Search;