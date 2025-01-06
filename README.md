<p align="center">
  <img src="https://raw.githubusercontent.com/avictormorais/token-book/refs/heads/main/src/assets/icon.png" width="150" height="150" alt="Posterfy Logo">
</p>

<h1 align="center">Token Book</h1>

<p align="center">
  <em>Uma biblioteca digital utilizando Ethereum e blockchain para compartilhar livros de forma segura.</em>
</p>

Tokenbook é um acervo digital de livros que usa um ambiente Ethereum proporcionado pelo [hardhat](https://hardhat.org/) em conjunto com contratos inteligentes em Solidity.

O back-end e configurações da blockchain e contratos estão disponíveis no seguinte repositório: [TokenBook back](https://github.com/Alepaulas/OurLibrary)


## Iniciar front-end

Para iniciar o front-end, é preciso realizar algumas etapas base e algumas de configurações de conexão entre estruturas.

1. **Clone o repositório**
   ```bash
    git clone https://github.com/avictormorais/token-book
   ```

2. **Acesse a raiz do projeto**
    ```bash
    cd token-book
    ```

3. **Instale as Dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

4. **Crie o Arquivo `.env`**
   O projeto inclui um arquivo `.env.example` com variáveis de ambiente de exemplo. Para configurar suas próprias variáveis:
   
   - Copie o arquivo `.env.example` para `.env`:
     ```bash
     cp .env.example .env
     ```
   - O valor `PINATA_JWT` deve ser o mesmo que foi disponibilizado pelo pinata e usado no back-end.

5. **Configure os Endereços da Blockchain**
   O projeto utiliza um arquivo `address.json` localizado na pasta `assets` para armazenar endereços da blockchain. Estes endereços são utilizados para simular diferentes usuários no sistema. Para configurá-los:
   
   - Abra o arquivo `assets/address.json`.
   - Insira os endereços fornecidos pelo nó hardhat conforme o formato JSON. Exemplo:
     ```json
        {
            "0x1234567890abcdef1234567890abcdef12345678",
            "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65"
        }
     ```

6. **Endereço da API**
   Por padrão, o arquivo `services/api.js` está configurado para consumir a seguinte url como back-end: `'http://localhost:3000'`. Caso tenha alterado a porta no back-end, é preciso alterá-la também aqui.

7. **Inicie o Servidor de Desenvolvimento**
   Para rodar o projeto localmente:
    ```bash
    npm run dev
    # ou
    yarn dev
    ```
   O servidor será iniciado e estará disponível no endereço padrão `http://localhost:5173/`.

## Uso

No front-end há uma barra lateral onde é possível selecionar idioma, tema de cores e um botão que leva para a seleção de endereços. Ao selecionar um endereço, todas as ações realizadas no front serão autenticadas pelo back-end, permitindo ou revogando o acesso a determinados livros conforme suas especificações.

Por exemplo, se o usuário X fez upload de um livro como privado, apenas o usuário X verá o livro na homepage, nos resultados de busca e na página de detalhes. Porém, se ele fazer o upload como público, todos os usuários terão acesso ao livro e poderão fazer o download do conteúdo.

Este sistema de controle de acesso garante que os livros possam ser compartilhados de forma segura e personalizada, conforme as preferências de cada usuário.