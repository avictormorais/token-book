import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoMdSunny } from "react-icons/io";
import { FiMoon } from "react-icons/fi";
import { GiBrazilFlag } from "react-icons/gi";
import { FaFlagUsa } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { useTranslation } from 'react-i18next';

function NavBar() {
    const [isLight, setIsLight] = useState(() => {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme ? storedTheme === 'light' : true;
    });

    const { i18n } = useTranslation();

    const [isPT, setIsPT] = useState(() => {
        const storedLanguage = localStorage.getItem('language');
        if (storedLanguage === 'pt') {
        i18n.changeLanguage('pt');
        return true;
        } else if (storedLanguage === 'en') {
        i18n.changeLanguage('en');
        return false;
        } else {
        const browserLanguage = navigator.language.split('-')[0];
        if (browserLanguage === 'pt') {
            i18n.changeLanguage('pt');
            localStorage.setItem('language', 'pt');
            return true;
        } else {
            i18n.changeLanguage('en');
            localStorage.setItem('language', 'en');
            return false;
        }
        }
    });  

    useEffect(() => {
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        document.body.setAttribute('data-theme', isLight ? 'light' : 'dark');
    }, [isLight]);

    useEffect(() => {
        localStorage.setItem('language', isPT ? 'pt' : 'en');
        if(localStorage.getItem('language') === 'pt'){
        i18n.changeLanguage('pt');
        } else{
        i18n.changeLanguage('en');
        }
    }, [isPT]);

    const handleIconClick = () => {
        setIsLight(!isLight);
    }

    const handleLanguageClick = () => {
        setIsPT(!isPT);
    }

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <StyledNav>
            <TemporaryIcon/>
            <StyledDiv>
                {isPT ? (
                    <Containericon onClick={handleLanguageClick}>
                        <StyledBrazil/>
                    </Containericon>
                ) : (
                    <Containericon onClick={handleLanguageClick}>
                        <StyledUSA/>
                    </Containericon>
                )}

                {isLight ? (
                    <Containericon onClick={handleIconClick}>
                        <StyledSun/>
                    </Containericon>
                ) : (
                    <Containericon onClick={handleIconClick}>
                        <StyledMoon/>
                    </Containericon>
                )}
                <Containericon>
                    <AccountIcon/>
                </Containericon>
            </StyledDiv>
        </StyledNav>
    )
}

const StyledNav = styled.nav`
    display: flex;
    background-color: var(--primary-color);
    justify-content: start;
    padding-block: 20px;
    align-items: center;
    width: 100vw;
    position: fixed;
    top: 0;
    border-bottom: 2px solid var(--secondary-color);

    @media screen and (max-width: 700px) {
        padding-block: 15px;
    }
`

const StyledDiv = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    margin-right: var(--padding-inline-layout);
    flex-direction: row;
    margin-left: auto;
`

const Containericon = styled.div`
    background-color: var(--secondary-color);
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-inline: 10px;
    aspect-ratio: 1;
    width: 40px;
    height: 40px;

    &:hover {
        cursor: pointer;
        background-color: var(--primary-text-color);
    }

    &:hover svg {
        fill: var(--secondary-color);
    }
`

const AccountIcon = styled(MdAccountCircle)`
    font-size: 1.8em;
`

const StyledMoon = styled(FiMoon)`
    font-size: 1.45em;
`

const StyledSun = styled(IoMdSunny)`
    font-size: 1.45em;
`

const StyledBrazil = styled(GiBrazilFlag)`
    font-size: 1.6em;
`

const StyledUSA = styled(FaFlagUsa)`
    font-size: 1.15em;
`

const TemporaryIcon = styled(FaBook)`
    margin-left: var(--padding-inline-layout);
    font-size: 1.8em;
    cursor: pointer;
`

export default NavBar;