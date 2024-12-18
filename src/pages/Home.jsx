import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

function Home(){
    const { t } = useTranslation()

    return(
        <Container>
            <DivExample>
                <h1>{t('welcome')}</h1>
            </DivExample>
        </Container>
    )
}

const Container = styled.div`
    height: 150vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const DivExample = styled.div`
    background-color: var(--secondary-color);
    width: 700px;
    height: 150px;
    border-radius: 10px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default Home