import styled, { keyframes } from "styled-components";
import { useParams } from 'react-router-dom';
import { PiBookFill } from "react-icons/pi";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import api from '../services/api';
import ButtonNewBook from '../components/ButtonNewBook';
import { useNavigate } from 'react-router-dom';
import genresData from '../assets/genres.json';
import { VscLoading } from "react-icons/vsc";

function Details(){
    const { id } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { i18n } = useTranslation();

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [genres, setGenres] = useState([]);

    const getGenreName = (id) => {
        const genreObj = genresData.find(genre => genre.id === id);
        if (!genreObj) return "";
        return i18n.language === 'pt' ? genreObj.nome : genreObj.name;
    };
    

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await api.post('/list-books', { cid: id });
                const book = response.data[0];
                console.log(book)
                if (book.metadata?.name) {
                    setTitle(book.metadata?.name.replace('.pdf', '') || 'Titulo');
                    setAuthor(book.metadata?.keyvalues.author || 'Autor');
                    setDescription(book.metadata?.keyvalues.description || 'Descrição não disponível.');
                    setGenres(book.metadata?.keyvalues.genre ? JSON.parse(book.metadata.keyvalues.genre) : []);
                } else{
                    navigate(`/error`);
                }
            } catch (error) {
                console.error('Erro ao buscar detalhes do livro:', error);
            }
        };
        fetchBookDetails();
    }, [id]);

    const handleDownload = async () => {
        try {
            const response = await api.get(`/download`, { params: { cid: id }, responseType: 'blob' });
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const link = document.createElement('a');
            const fileName = `${title || 'download'}.pdf`;
            link.href = URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('Erro ao realizar download:', error);
        }
    };

    return(
        <>
            {title == '' ? (
                <LoadingDiv>
                    <IconLoad/>
                    <Loading>{t('loading')}</Loading>
                </LoadingDiv>
            ) : (
                <Container>
                    <DivTop>
                        <IconBook/>
                        <DivBookInfos>
                            <TitleBook>{title}</TitleBook>
                            <Author>{author}</Author>
                        </DivBookInfos>
                    </DivTop>
                    <Description>{description}</Description>
                    <DivGenres>
                        {genres
                            .filter((genre) => getGenreName(genre) !== '')
                            .map((genre) => (
                                <Genre key={genre}>{getGenreName(genre)}</Genre>
                        ))}
                    </DivGenres>
                    <Button onClick={handleDownload}>{t('download_book')}</Button>
                    <ButtonNewBook/>
                </Container>
            )}
        </>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: 80px;
    align-items: top;
    width: 90%;
    min-height: 90vh;

    @media screen and (min-width: 700px) {
        width: 50%;
        margin-left: 60px;
        padding-top: 20px;
    }

    @media screen and (max-width: 700px) {
        width: 90%;
        padding-top: 100px;
    }
`

const DivTop = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-inline: auto;

    @media screen and (max-width: 555px) {
        flex-direction: column;
    }
`

const IconBook = styled(PiBookFill)`
    fill: var(--primary-text-color);
    font-size: 15em;
`

const DivBookInfos = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: auto;
    margin-bottom: 25px;

    @media screen and (max-width: 555px) {
        margin-left: 25px;
    }
`

const TitleBook = styled.h1`
    font-size: 2em;
    margin-top: auto;

    @media screen and (min-width: 555px) {
        margin-left: 25px;
        margin-top: 10px;
    }
`

const Author = styled.p`
    font-weight: bold;
    font-size: 1em;
    width: 95%;
    margin-inline: auto;
    opacity: 0.85;
    margin-inline: 25px;

    @media screen and (max-width: 555px) {
        margin: 0;
    }
`

const Description = styled.p`
    font-weight: bold;
    font-size: 1em;
    width: 95%;
    margin-top: 25px;
    margin-inline: auto;
`

const DivGenres = styled.div`
    display: flex;
    width: 95%;
    margin-inline: auto;
    margin-top: 25px;
`

const Genre = styled.div`
    display: flex;
    background-color: ${(props) => (props.selected ? "var(--primary-text-color)" : "var(--secondary-color)")};
    color: ${(props) => (props.selected ? "var(--secondary-color)" : "var(--primary-text-color)")};
    font-weight: bold;
    padding: 10px;
    padding-inline: 20px;
    border-radius: 10px;
    margin-right: 10px;
    cursor: pointer;
    font-size: .8em;
    margin-top: 5px;
    transition: background-color 0.3s, color 0.3s;
    white-space: nowrap;
    user-select: none;
    width: min-content;
`;

const Button = styled.button`
    width: 180px;
    margin-left: 15px;
    background-color: var(--primary-text-color);
    border-radius: 15px;
    height: 35px;
    color: var(--primary-color);
    font-weight: bold;
    padding-inline: 25px;
    border: none;
    cursor: pointer;
    margin-block: 5px;
    margin-right: auto;
    margin-top: 25px;
    margin-left: 20px;
`

const LoadingDiv = styled.div`
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-block: auto;
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
    margin-top: auto;
    margin-top: 40vh;
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

export default Details;