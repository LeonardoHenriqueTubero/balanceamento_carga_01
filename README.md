# Projeto: Nginx com Balanceamento de Carga e Dashboard em Tempo Real

Este projeto demonstra, de forma visual e prática, como o **Nginx** atua
como **Reverse Proxy** e **Balanceador de Carga (Load Balancer)** entre
duas APIs idênticas.\
Além disso, um **dashboard em tempo real** mostra dinamicamente como as
requisições estão sendo distribuídas entre os servidores.

------------------------------------------------------------------------

## Objetivo do Projeto

-   Mostrar como o **Nginx** funciona como proxy reverso.\
-   Demonstrar **load balancing** distribuindo requisições entre duas
    APIs.\
-   Visualizar em tempo real quais APIs estão sendo chamadas.\
-   Realizar **testes de carga** com o **k6** para simular usuários
    simultâneos.\
-   Usar Docker e Docker Compose para orquestrar todo o ambiente.

------------------------------------------------------------------------

## Tecnologias Utilizadas

  Tecnologia                    Função
  ----------------------------- --------------------------------------
  **Docker / Docker Compose**   Orquestração dos serviços
  **Nginx**                     Reverse Proxy + Load Balancer
  **Node.js (Express)**         APIs de backend
  **Chart.js**                  Visualização dos dados em tempo real
  **k6**                        Testes de carga
  **HTML / CSS / JS**           Dashboard

------------------------------------------------------------------------

## Estrutura do Projeto

    projeto-nginx-visual/
    ├── api-01/
    │   ├── index.js
    │   ├── package.json
    │   └── Dockerfile
    ├── api-02/
    │   ├── index.js
    │   ├── package.json
    │   └── Dockerfile
    ├── nginx/
    │   ├── nginx.conf
    │   └── Dockerfile
    ├── visualizer/
    │   ├── index.html
    │   └── chart.js
    ├── docker-compose.yml
    └── load-test.js

------------------------------------------------------------------------

## Explicação das Partes

### 1. APIs de Backend

As pastas `api-01` e `api-02` contêm duas APIs idênticas que retornam:

``` json
{
  "servidor": "API-01",
  "timestamp": "2025-..."
}
```

A única diferença entre elas é o nome do servidor.

Essas APIs são importantes para demonstrar o balanceamento de carga.

------------------------------------------------------------------------

### 🟩 2. Nginx como Load Balancer

O arquivo `nginx.conf` define um grupo:

``` nginx
upstream backend_servers {
    server api-01:3000;
    server api-02:3000;
}
```

E a rota `/api` faz proxy para este grupo:

``` nginx
location /api {
    rewrite /api(.*) /$1 break;
    proxy_pass http://backend_servers;
}
```

O balanceamento padrão usado é o **round-robin**, distribuindo as
requisições de forma igualitária.

------------------------------------------------------------------------

### 3. Dashboard de Visualização

O dashboard acessado em `http://localhost`:

-   Faz chamadas constantes a `/api`
-   Conta quantas respostas vieram de cada servidor
-   Atualiza um **gráfico de pizza** (com Chart.js)
-   Mostra números totais

Isso permite ver o load balancing funcionando na prática.

------------------------------------------------------------------------

### 4. Teste de Carga com k6

O arquivo `load-test.js` envia várias requisições ao Nginx:

``` js
http.get('http://localhost/api');
```

Assim podemos observar o comportamento do balanceamento sob estresse.

------------------------------------------------------------------------

## Como Executar o Projeto

### 1. Subir o ambiente

``` bash
docker-compose up --build
```

Isso inicia:

-   API-01\
-   API-02\
-   Nginx (servindo o dashboard)

------------------------------------------------------------------------

### 2. Acessar o dashboard

Abra no navegador:

    http://localhost

Você verá:

-   Gráfico de pizza \
-   Contadores subindo\
-   Requisições alternando entre API-01 e API-02

------------------------------------------------------------------------

## Executando o Teste de Carga com k6

### Instalação (Windows 11)

``` bash
winget install k6 --source winget
```

### Rodar o teste

Em outro terminal:

``` bash
k6 run load-test.js
```

O dashboard mostrará rapidamente as requisições sendo distribuídas.

------------------------------------------------------------------------

## Desligar o ambiente

``` bash
docker-compose down
```
