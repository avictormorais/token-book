import styled from "styled-components";
import { useTranslation } from "react-i18next";
import genresData from '../assets/genres.json';

function Genres({ selectedGenre, setSelectedGenre }) {
    const { i18n } = useTranslation();

    const getGenreName = (genre) => {
        return i18n.language === 'pt' ? genre.nome : genre.name;
    };

    const isSelected = (genre) => {
        const genreName = getGenreName(genre);
        return selectedGenre === genreName;
    };

    return(
        <Container>
            {genresData.map((genre) => (
                <Genre 
                    key={genre.id} 
                    selected={isSelected(genre)} 
                    onClick={() => setSelectedGenre(getGenreName(genre))}
                >
                    {getGenreName(genre)}
                </Genre>
            ))}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-block: 15px;
    flex-wrap: wrap;

    @media screen and (max-width: 600px) {
        flex-wrap: nowrap;
        overflow-x: scroll;
    }
`;

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
`;

export default Genres;