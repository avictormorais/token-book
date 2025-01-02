import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import SearchBar from '../components/SearchBar'
import ButtonNewBook from '../components/ButtonNewBook'
import Genres from '../components/Genres'
import GridCardsBook from '../components/GridCardsBook'
import api from '../services/api'
import genresData from '../assets/genres.json';

function Home(){
    const { t, i18n } = useTranslation()
    const [selectedGenre, setSelectedGenre] = useState(2)
    const [allBooks, setAllBooks] = useState([]);
    const [books, setBooks] = useState([]);

    const getGenreName = (id) => {
        const genreObj = genresData.find(genre => genre.id === id);
        if (!genreObj) return "";
        return i18n.language === 'pt' ? genreObj.nome : genreObj.name;
    };
    
    useEffect(() => {
        const fetchBooksByGenre = async () => {
            try {
                const response = await api.post('/list-books', { genre: [selectedGenre] });
                setBooks(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                setBooks([]);
            }
        };
        fetchBooksByGenre();
    }, [selectedGenre]);

    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const response = await api.post('/list-books');
                setAllBooks(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                setAllBooks([]);
            }
        };
        fetchAllBooks();
    }, []);

    return(
        <Container>
            <SearchBar/>
            <Genres selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />

            <Title>{getGenreName(selectedGenre)}</Title>
            <GridCardsBook books={books.map(book => ({
                    id: book.ipfs_pin_hash,
                    title: book.metadata?.name.replace('.pdf', '') || 'Título desconhecido',
                    author: book.metadata?.keyvalues?.author || 'Autor desconhecido',
                }))}/>

            <Title>{t('collection')}</Title>
            <GridCardsBook books={allBooks.map(book => ({
                    id: book.ipfs_pin_hash,
                    title: book.metadata?.name.replace('.pdf', '') || 'Título desconhecido',
                    author: book.metadata?.keyvalues?.author || 'Autor desconhecido',
                }))}/>

            <ButtonNewBook/>
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

const Title = styled.h2`
    font-size: 1.7em;
    margin-left: 15px;
    margin-block: 10px;
`

export default Home;