# Agenda de Remédios

*Esse projeto é dedicado a minha avó, que vive esquecendo a data e horário em que tomou seu remédio.*

**OBS**: Como ela só utiliza um celular, a responsividade não está adaptada para grandes telas, então dê preferência a utilizar em um layout mobile, também não foi utilizado o DRY ou o KISS, então não se assuste com o código, os dados são salvos no localStorage, algumas funções funcionam melhor em um celular, pois utilizei funções específicas do DOM para o Touchscreen.

**Intenção do projeto:**
A intenção é que você não precise ficar adicionando os MESMOS DADOS, imagine que você vai tomar o MESMO REMÉDIO NOVAMENTE, e você precisa ficar anotando os horários em que os remédios foram ingeridos, seria bem trabalhoso, então a agenda de remédios vai te permitir inserir um NOVO REGISTRO dos remédio apenas com 1 clique, quando você clicar, ela vai se basear em QUAL CARD de remédio você clicou, e vai pegar as informações dele e preencher para você no formulário de cadastro de remédio, a questão é que você é livre para modificar as informações do formulário que serão pegas para você, e a Data e a Hora sendo pegos automaticamente.


**Funcionalidades:**
Um Clique Segurando em cima qualquer card: abre o formulário de inserção de um remédio tomado, esse formulário terá seus campos preenchidos com o CARD em que você manteve o dedo pressionado.
Dois Cliques consecutivos: Pop up para remoção do card de remédio.

**Link do Projeto Online:** [Clique aqui](https://agendaremedios.pages.dev/)
