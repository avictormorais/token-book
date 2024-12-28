import styled from "styled-components";
import { useTranslation } from 'react-i18next'
import { IoIosAdd } from "react-icons/io";
import { Link } from "react-router-dom";

function ButtonNewBook(){
    const { t } = useTranslation();

    return(
        <Link to="/new">
            <Container>
                <StyledAddIcon/>
                <Line/>
                <Text>{t('new')}</Text>
            </Container>
        </Link>
    )
}

const Container = styled.div`
    height: 50px;
    border-radius: 15px;
    background-color: var(--primary-text-color);
    position: fixed;
    right: 40px;
    bottom: 40px;
    display: flex;
    flex-direction: row;
    padding-inline: 10px;
    cursor: pointer;
    text-decoration: none;

    @media screen and (max-width: 700px) {
        border-radius: 100%;
    }
`

const StyledAddIcon  = styled(IoIosAdd)`
    font-size: 2em;
    margin-block: auto;
    height: 100%;
    fill: var(--primary-color);
`

const Line = styled.div`
    width: 2px;
    height: 30px;
    margin-block: auto;
    border-radius: 5px;
    margin-inline: 5px;
    background-color: var(--primary-color);
    opacity: 0.5;

    @media screen and (max-width: 700px) {
        display: none;
    }
`

const Text = styled.p`
    font-size: 1em;
    font-weight: bold;
    color: var(--primary-color);
    margin-block: auto;
    margin-inline: 20px;
    margin-right: 25px;

    @media screen and (max-width: 700px) {
        display: none;
    }
`

export default ButtonNewBook;