import styled from "styled-components";
import { BiSolidError } from "react-icons/bi";
import { useTranslation } from 'react-i18next'
import { Link } from "react-router-dom";

function Error(){ 
    const { t } = useTranslation()

    return(
        <Container>
            <ErrorIcon/>

            <TitleError>{t('page_not_found')}</TitleError>

            <Link to={'/'}>
                <Button>{t('go_to_home')}</Button>
            </Link>
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const ErrorIcon = styled(BiSolidError)`
    font-size: 10em;
`

const TitleError = styled.h1`
    font-size: 1.2em;
    font-weight: bold;
`

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
    margin-left: 15px;
    margin-inline: auto;
`

export default Error;