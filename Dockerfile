FROM node

# Cria o diretório de trabalho
WORKDIR /usr/src/app

COPY package.json .

COPY . .

RUN apk add --no-cache yarn

# Instala as dependências usando o Yarn
RUN yarn install --production

# Expõe a porta 3000 do contêiner
EXPOSE 3000

# Define o comando de inicialização
CMD ["yarn", "dev"]
