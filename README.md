# Desafio Proxy Reverso com NGINX, Node.js e MySQL
O desafio, foi para aplicar os conhecimentos sobre o uso do NGINX como proxy reverso. Tendo como objetivo configurar o NGINX para encaminhar solicitações de usuários para nossa aplicação Node.js. Essa aplicação, por sua vez, irá inserir um registro em nosso banco de dados MySQL, cadastrando um nome na tabela people.

Como executar
Para rodar este projeto, siga estas etapas:

Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

Clone este repositório:

```bash
git clone https://github.com/joseaugustoss/desafio-docker-nginx-node.git
```
Navegue até o diretório do projeto:
```bash
cd desafio-docker-nginx-node
```
Execute o comando Docker Compose:
```bash
docker-compose up -d
```
Isso iniciará os serviços NGINX, Node.js e MySQL em contêineres Docker. O NGINX estará acessível em http://localhost:8080.

### Tecnologias Utilizadas
- NGINX
- Node.js
- MySQL

## Referências

- [ Docker com healthcheck](https://github.com/devfullcycle/docker-healthcheck)

