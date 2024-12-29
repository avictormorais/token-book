import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import styled from 'styled-components'
import SearchBar from '../components/SearchBar'
import ButtonNewBook from '../components/ButtonNewBook'
import Genres from '../components/Genres'
import GridCardsBook from '../components/GridCardsBook'

function Home(){
    const { t } = useTranslation()
    const [selectedGenre, setSelectedGenre] = useState("Romance");

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
            <Genres selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} />

            <Title>{selectedGenre}</Title>
            <GridCardsBook books={books} />

            <Title>Popular</Title>
            <GridCardsBook books={books.slice(0,5)} />

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