import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 10 }, // Simula 10 usuários por 30 segundos
    ],
};

export default function () {
    // Acessa o endpoint da API através do Nginx
    http.get('http://localhost/api');
    sleep(0.5); // Espera 500ms entre requisições
}