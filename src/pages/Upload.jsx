import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import { RiDragDropFill } from "react-icons/ri";
import { FaFileCircleCheck } from "react-icons/fa6";
import genresData from '../assets/genres.json';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Upload() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        description: "",
        genres: [],
        isPrivate: false,
        file: null,
    });
    const [isDragging, setIsDragging] = useState(false);

    const getGenreName = (genre) => i18n.language === 'pt' ? genre.nome : genre.name;

    const handleFileSelect = (file) => {
        if (file && file.type === "application/pdf") {
            setFormData((prev) => ({ ...prev, file }));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleGenreSelect = (genreId) => {
        setFormData((prev) => {
            const genres = [...prev.genres];
            const index = genres.indexOf(genreId);
            if (index === -1) genres.push(genreId);
            else genres.splice(index, 1);
            return { ...prev, genres };
        });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFileSelect(file);
    };

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        handleFileSelect(file);
    };

    const handleDiscard = () => {
        setFormData({
            title: "",
            author: "",
            description: "",
            genres: [],
            isPrivate: false,
            file: null,
        });
    };

    const handleCheckboxChange = () => {
        setFormData((prev) => ({ ...prev, isPrivate: !prev.isPrivate }));
    };

    const handleSubmit = async () => {
        if (!formData.file) {
            alert(t('file_required'));
            return;
        }
        const form = new FormData();
        form.append("file", formData.file);
        form.append("title", formData.title);
        form.append("author", formData.author);
        form.append("description", formData.description);
        form.append("isPrivate", formData.isPrivate);
        form.append("genre", JSON.stringify(formData.genres));
    
        try {
            const response = await api.post('/upload', form, {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
                },
            });
    
            navigate(`/details/${response.data.ipfsHash}`);
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };
    
    return (
        <Container>
            <DragAndDrop
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{ opacity: isDragging || formData.file ? 1 : 0.5 }}
            >
                {formData.file ? <IconCheck /> : <IconDragAndDrop />}
                <TextDragAndDrop>
                    {formData.file ? `${t('file_received')}:\n${formData.file.name}` : t('drag_file')}
                </TextDragAndDrop>
                <input
                    type="file"
                    accept="application/pdf"
                    style={{ display: 'none' }}
                    id="fileInput"
                    onChange={handleFileInput}
                />
            </DragAndDrop>

            <DivOr>
                <Hr />
                <TextOr>{t('or')}</TextOr>
                <Hr />
            </DivOr>

            <Button onClick={() => document.getElementById('fileInput').click()}>
                {t('select_file')}
            </Button>

            <DivInput>
                <Input
                    name="title"
                    placeholder={t('title')}
                    value={formData.title}
                    onChange={handleInputChange}
                />
            </DivInput>
            <DivInput>
                <Input
                    name="author"
                    placeholder={t('author')}
                    value={formData.author}
                    onChange={handleInputChange}
                />
            </DivInput>
            <DivInput>
                <TextArea
                    name="description"
                    placeholder={t('description')}
                    value={formData.description}
                    onChange={handleInputChange}
                    maxLength={280}
                />
                <TextAreaSize>{`${formData.description.length}/280`}</TextAreaSize>
            </DivInput>
            <Title>{t('genres')}</Title>
            <GenresContainer style={{ marginTop: '5px' }}>
                {genresData.map((genre) => (
                    <Genre
                        key={genre.id}
                        selected={formData.genres.includes(genre.id)}
                        onClick={() => handleGenreSelect(genre.id)}
                    >
                        {getGenreName(genre)}
                    </Genre>
                ))}
            </GenresContainer>

            <DivCheckbox>
                <CheckInput type="checkbox" checked={formData.isPrivate} onChange={handleCheckboxChange}/>
                <Title style={{ marginTop: '0px', marginLeft: '10px', cursor: 'pointer' }} onClick={handleCheckboxChange}>{t('private')}</Title>
            </DivCheckbox>

            <DivButtons>
                <SimpleButton
                    style={{ backgroundColor: 'var(--secondary-color)', color: 'var(--primary-text-color)' }}
                    onClick={handleDiscard}
                >
                    {t('discard')}
                </SimpleButton>
                <SimpleButton onClick={handleSubmit}>
                    {t('send')}
                </SimpleButton>
            </DivButtons>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: top;
    flex-direction: column;
    padding-top: 80px;
    align-items: top;

    @media screen and (min-width: 700px) {
        width: 40%;
        margin-left: 60px;
        padding-top: 20px;
    }

    @media screen and (max-width: 1100px) {
        width: 65%;
    }

    @media screen and (max-width: 900px) {
        width: 75%;
    }

    @media screen and (max-width: 700px) {
        width: 90%;
        padding-top: 100px;
    }
`

const DragAndDrop = styled.div`
    background-color: var(--secondary-color);
    width: 100%;
    height: 250px;
    border-radius: 15px;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    opacity: ${(props) => props.dragging ? 1 : 0.5};
    border: 2px dashed var(--primary-text-color);
`

const IconDragAndDrop = styled(RiDragDropFill)`
    fill: var(--primary-text-color);
    font-size: 5em;
`

const IconCheck = styled(FaFileCircleCheck)`
    fill: var(--primary-text-color);
    font-size: 5em;
`

const TextDragAndDrop = styled.p`
    font-weight: bold;
    font-size: 1em;
    margin-top: 5px;
    white-space: pre;
    text-align: center;
`

const DivOr = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-block: 10px;
`

const Hr = styled.hr`
    height: 2px;
    width: 100%;
    background-color: var(--primary-text-color);
    border: none;
    margin-top: 2px;
    opacity: 0.5;
    margin-inline: 10px;
    border-radius: 5px;
`

const TextOr = styled.p`
    font-weight: bold;
    font-size: 1em;
    margin-top: 5px;
    margin-inline: 25px;
`

const Button = styled.button`
    width: 100%;
    background-color: var(--primary-text-color);
    border-radius: 15px;
    height: 45px;
    color: var(--primary-color);
    font-weight: bold;
    padding-inline: 25px;
    border: none;
    cursor: pointer;
    margin-block: 5px;

    &:hover {
        background-color: var(--secondary-color);
        color: var(--primary-text-color);
    }
`

const DivInput = styled.div`
    display: flex;
    flex-direction: row;
    background-color: var(--secondary-color);
    width: 100%;
    border-radius: 15px;
    padding-block: 10px;
    margin-top: 25px;
    height: auto;
    flex-direction: column;
`

const Input = styled.input`
    display: flex;
    border: none;
    font-size: 1em;
    background-color: transparent;
    width: 100%;
    outline: none;
    margin-inline: 20px;
    color: var(--primary-text-color);
    font-weight: bold;
`

const TextArea = styled.textarea`
    border: none;
    font-size: 1em;
    background-color: transparent;
    width: 94%;
    outline: none;
    margin-inline: 20px;
    color: var(--primary-text-color);
    font-weight: bold;
    height: 130px !important;
    resize: none;
    margin-top: 3px;
`

const TextAreaSize = styled.p`
    font-weight: bold;
    opacity: 0.7;
    font-size: .7em;
    margin-left: auto;
    margin-right: 20px;
    margin-bottom: 2px;
`

const Title = styled.p`
    font-weight: bold;
    font-size: 1em;
    margin-left: 5px;
    margin-top: 25px;
`

const GenresContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-block: 15px;
    flex-wrap: wrap;
    justify-content: flex-start;

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
    margin-top: 10px;
    transition: background-color 0.3s, color 0.3s;
    white-space: nowrap;
    user-select: none;

    &:hover {
        background-color: var(--primary-text-color);
        color: var(--primary-color);
    }
`;

const DivButtons = styled.div`
    width: 100%;
    justify-content: end;
    align-items: end;
    flex-direction: row;
    display: flex;
    margin-block: 25px;
`

const SimpleButton = styled.button`
    width: 130px;
    margin-left: 15px;
    background-color: var(--primary-text-color);
    border-radius: 15px;
    height: 45px;
    color: var(--primary-color);
    font-weight: bold;
    padding-inline: 25px;
    border: none;
    cursor: pointer;
    margin-block: 5px;
`

const DivCheckbox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    width: 100%;
    margin-top: 15px;
`

const CheckInput = styled.input`
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 4px;
    background-color: transparent;
    border: 2px solid var(--primary-text-color);
    outline: none;
    cursor: pointer;
    transition: background-color 0.3s;

    &:checked {
        background-color: var(--primary-text-color);
    }
`;

export default Upload;