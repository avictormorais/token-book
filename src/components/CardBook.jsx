import styled from "styled-components";
import { PiBookFill } from "react-icons/pi";
import { Link } from "react-router-dom";

function CardBook({ title, author, id }) {
    return (
        <Link to={`/details/${id}`} style={{ textDecoration: 'none' }}>
            <Container>
                <Icon />
                <Title>{title}</Title>
                <Author>{author}</Author>
            </Container>
        </Link>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 130px;
    border-radius: 10px;
    padding-bottom: 10px;

    &:hover {
        cursor: pointer;
        background-color: var(--secondary-color);
    }
`;

const Icon = styled(PiBookFill)`
    fill: var(--primary-text-color);
    font-size: 9em;
    width: 130px;
`;

const Title = styled.h3`
    font-weight: bold;
    font-size: .9em;
    margin-left: 10px;
    width: 90%;
    line-height: 1;
    white-space: break-spaces;
`;

const Author = styled.p`
    font-weight: regular;
    font-size: .85em;
    margin-left: 10px;
    margin-block: 5px;
`;

export default CardBook;