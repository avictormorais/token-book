import styled from "styled-components";
import IconComponent from '../components/IconComponent'
import addresses from '../assets/addresses.json'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next'

function AddressSelector(){
    const { t } = useTranslation()
    const [selectedAddress, setSelectedAddress] = useState('');

    const handleSelect = (event) => {
        const address = event.target.value;
        setSelectedAddress(address);
        localStorage.setItem("UserAddress", address);
    };

    return(
        <Container>
            <LinkComponent to={'/'}>
                <IconComponent height={'23vw'} width={'23vw'} fill={'var(--primary-text-color)'}/>
            </LinkComponent>

            <SelectorContainer>
                <Title>{t('select_address')}</Title>
                <TextSelected>{`${t('selected_address')}:\n ${localStorage.getItem("UserAddress") ? localStorage.getItem("UserAddress") : ''}`}</TextSelected>

                <StyledSelect value={selectedAddress} onChange={handleSelect}>
                    <option value="" disabled>{t('select_address')}</option>
                    {addresses.map((address, index) => (
                        <option key={index} value={address}>{address}</option>
                    ))}
                </StyledSelect>
            </SelectorContainer>
        </Container>
    )
}

const LinkComponent = styled(Link)`
    margin: 0;
    padding: 0;
    height: auto;
    width: auto;
    margin-block: auto;

    @media (max-width: 1000px) {
        margin-inline: auto;
        margin-top: auto;
    }
`

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-content: center;

    @media (max-width: 1000px) {
        flex-direction: column;
    }
`

const SelectorContainer = styled.div`
    background-color: var(--secondary-color);
    border-radius: 10px;
    margin-left: 80px;
    margin-block: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    flex-direction: column;

    @media (max-width: 1000px) {
        width: 70%;
        margin-inline: auto;
        margin-bottom: auto;
        margin-top: 0;
    }
`

const Title = styled.h1`
    font-size: 1.25em;
    font-weight: bold;
    margin-right: auto;
    margin-bottom: 5px;
`

const TextSelected = styled.p`
    font-size: .7em;
    font-weight: bold;
    opacity: 0.7;
    margin-block: 10px;
    word-wrap: break-word;
    width: 100%;
`

const StyledSelect = styled.select`
    height: 40px;
    border-radius: 5px;
    border: none;
    background-color: var(--primary-color);
    color: var(--primary-text-color);
    font-size: 1rem;
    padding: 0 10px;
    outline: none;
    font-weight: bold;
    width: 100%;

    option {
        background-color: var(--secondary-color);
        color: var(--primary-text-color);
    }
`

export default AddressSelector;