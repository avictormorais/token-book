import styled from "styled-components";
import CardBook from "./CardBook";

function GridCardsBook({ books }) {
    return (
        <GridContainer>
            {books.map((book) => (
                <CardBook key={book.id} title={book.title} author={book.author} id={book.id} />
            ))}
        </GridContainer>
    );
}

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0px;
    width: 100%;
    padding: 20px;

    @media screen and (max-width: 600px) {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: scroll;
    }
`;

export default GridCardsBook;