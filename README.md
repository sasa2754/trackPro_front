# TrackPro - Interface Web (Frontend)

**Status do Projeto:** Em Desenvolvimento

## Sobre a Interface

Este projeto é a interface web do sistema de rastreabilidade de peças **TrackPro**. Desenvolvido com Angular, ele consome a API RESTful do backend para fornecer uma experiência de usuário rica, moderna e totalmente responsiva para o gerenciamento de peças e estações.

O foco foi criar uma interface que não só seja funcional, mas também intuitiva, esteticamente agradável e que demonstre a aplicação de boas práticas de desenvolvimento frontend.

## Funcionalidades

A interface implementa todos os casos de uso definidos para o sistema:

✅ **Gerenciamento de Estações**: Componentes para listar, criar, editar e deletar as estações do fluxo de processo.  
✅ **Gerenciamento de Peças**: Funcionalidades completas de CRUD para as peças.  
✅ **Movimentação de Peças**: Interface dedicada para avançar uma peça para a próxima estação, respeitando as regras de negócio validadas pelo backend.  
✅ **Histórico de Rastreabilidade**: Visualização clara e detalhada de todo o histórico de movimentações de uma peça específica.  
✅ **Feedback ao Usuário**: Uso de notificações (toasts) e diálogos de confirmação para uma experiência de usuário fluida e informativa.

## Arquitetura e Tecnologias

A aplicação foi construída utilizando as versões e práticas mais recentes do ecossistema Angular.

- **Framework**: Angular 17+  
- **Arquitetura**: *Standalone Components*, a abordagem moderna e simplificada para componentização, que elimina a necessidade de NgModules.  
- **Estilização**: Uma combinação de:
  - **Tailwind CSS**: Para um desenvolvimento rápido e consistente de layouts responsivos através de classes utilitárias.
  - **PrimeNG**: Uma rica biblioteca de componentes de UI (tabelas, botões, modais, etc.) para garantir funcionalidades avançadas e um visual profissional.
- **Comunicação com API**: A integração com o backend é feita através de *Serviços Angular*, que utilizam `HttpClient` para realizar as chamadas HTTP.
- **Formulários**: Implementação de *Reactive Forms* para a criação de formulários robustos e com validação customizada.

## Como Executar o Projeto

Siga os passos abaixo para rodar a interface web localmente.

### Pré-requisitos

- Node.js e npm (versão LTS recomendada)
- Angular CLI instalado globalmente:
```bash
  npm install -g @angular/cli
```

* O backend do TrackPro deve estar em execução, pois a interface precisa da API para funcionar.

### Passos para Execução

1. **Navegue para a pasta do projeto**:

   ```bash
   cd trackpro_front
   ```

2. **Instale as dependências**:
   Este comando irá baixar todas as bibliotecas listadas no `package.json`.

   ```bash
   npm install
   ```

3. **Configure a URL da API**:
   Abra o arquivo `src/environments/environment.ts` e certifique-se de que a `apiUrl` corresponde ao endereço e porta em que seu backend está rodando:

   ```ts
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:5147',
   };
   ```

4. **Inicie o servidor de desenvolvimento**:

   ```bash
   ng serve
   ```

5. **Acesse a aplicação**:
   Abra seu navegador e acesse:
   [http://localhost:5147/](http://localhost:5147/)
   A aplicação estará disponível e pronta para uso.

