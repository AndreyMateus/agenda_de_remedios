document.getElementById('btn-add').addEventListener("click", insertFormOnHtml);

function insertFormOnHtml() {
    // Mudando o texto do botão e retirando o evento dele.
    const btnConfirm = document.getElementById('btn-add');
    btnConfirm.innerText = "Confirmar";
    disableBtnCreateForm();

    //  criando o formulário e adicionando no body, para que apareça na tela.
    const newForm = createFormAddRemedie();
    document.body.appendChild(newForm);

    // adicionando um novo evento ao botão que agora irá salvar.
    document.getElementById('btn-add').addEventListener("click", saveCardsLocalStorage);


}

//  função que desabilitará par ao usuário não criar mais de UM FORMULÁRIO, até que confirme ou cancele a opção de adicionar.
function disableBtnCreateForm() {
    document.getElementById('btn-add').removeEventListener("click", insertFormOnHtml);
}

function createFormAddRemedie() {
    // card (container de tudo)
    const divContainer = document.createElement('div');
    divContainer.classList.add('card-add-remedie');
    divContainer.style.setProperty("position", "absolute");

    //  container do input
    const divInputName = document.createElement('div');
    divInputName.classList.add('container-name');

    // label do input nome do remédio
    const labelName = document.createElement("label");
    labelName.setAttribute("for", "name");
    labelName.innerText = "Digite o nome do remédio:";

    //  input nome nome do remédio
    const inputName = document.createElement("input");
    inputName.type = "text";
    inputName.id = "name";
    inputName.name = "name";

    // inserindo o input e a label dentro do container do input nome.
    divInputName.append(labelName, inputName);

    // divContainer.appendChild(divInputName);

    //  container dos inputs de dosagem
    const divDosage = document.createElement('div');
    divDosage.classList.add('container-dosage');

    const labelDosage = document.createElement("label");
    labelDosage.innerText = "Digite a Dosagem do remédio:";
    labelDosage.setAttribute("for", "dosage");

    const inputDosage = document.createElement("input");
    inputDosage.type = "text";
    inputDosage.id = "dosage";
    divDosage.setAttribute('name', "dosage");

    divDosage.append(labelDosage, inputDosage);

    // container dos inputs de descrição
    const divDescription = document.createElement("div");
    divDescription.classList.add("container-description");

    const labelDescription = document.createElement("label");
    labelDescription.innerText = "Descrição (Opcional)";
    labelDescription.setAttribute('for', 'description');

    const textAreaDescription = document.createElement("textarea");
    textAreaDescription.setAttribute("name", "description");
    textAreaDescription.setAttribute("id", "description");
    textAreaDescription.setAttribute("cols", "30");
    textAreaDescription.setAttribute("rows", "8");
    textAreaDescription.setAttribute("placeholder", "Digite aqui alguma observação");

    divDescription.append(labelDescription, textAreaDescription);

    // container ods inputs radio
    const divIngetNow = document.createElement('div');
    divIngetNow.classList.add("container-ingetNow");
    const p = document.createElement('p');
    p.innerText = "Vai ingerir agora ?";
    divIngetNow.append(p);

    // container inputs
    const containerInputs = document.createElement("div");
    containerInputs.classList.add("container-inputs");

    const containerInputYes = document.createElement("div");
    containerInputYes.classList.add("input-radio");

    // input radio (sim/yes)
    const inputRadioYes = document.createElement("input");
    inputRadioYes.type = "radio";
    inputRadioYes.id = "ingestNowYes";
    inputRadioYes.value = "yes";
    inputRadioYes.setAttribute('name', 'ingestNow');

    const labelRadioYes = document.createElement("label");
    labelRadioYes.textContent = "Sim";
    labelRadioYes.setAttribute('for', 'ingestNowYes');
    containerInputYes.append(inputRadioYes, labelRadioYes);

    // input radio (não/no)
    const containerInputNo = document.createElement("div");
    containerInputNo.classList.add("input-radio");

    const inputRadioNo = document.createElement("input");
    inputRadioNo.type = "radio";
    inputRadioNo.id = "ingestNowNo";
    inputRadioNo.value = "no";
    inputRadioNo.setAttribute('name', 'ingestNow');

    const labelRadioNo = document.createElement("label");
    labelRadioNo.innerText = "Não";
    labelRadioNo.setAttribute('for', "ingestNowNo");
    containerInputNo.append(inputRadioNo, labelRadioNo);

    // p com  observação
    const pObservation = document.createElement('p');
    pObservation.classList.add("observation");
    pObservation.innerText = "OBS: A Data e a Hora são pegos automaticamente do seu dispositivo";

    //  div que contém as divs que contém os inputs
    containerInputs.append(containerInputYes, containerInputNo);

    divIngetNow.append(containerInputs, pObservation);

    // Botão de exclusão
    const btnRemoveForm = document.createElement('button');
    btnRemoveForm.type = "button";
    btnRemoveForm.classList.add('cancel');
    btnRemoveForm.innerText = "Cancelar";

    btnRemoveForm.addEventListener("click", removeForm);

    // inserindo todos os containers no card.
    divContainer.append(divInputName, divDosage, divDescription, divIngetNow, btnRemoveForm);

    // retornando o formulário pronto
    return divContainer;
}

function removeForm(e) {
    e.currentTarget.parentNode.remove();
    document.getElementById('btn-add').addEventListener("click", insertFormOnHtml);
    document.getElementById('btn-add').innerText = "Adicionar";
}
// TODO: ler todos os CARDS(remedios) no HTML, transforma em OBJ, inserir em um array, e salvar esse array no local.
function readCardRemedie() {
    const objsCardRemedies = [];

    const namesCardRemedie = document.querySelectorAll('h2[date-name]');
    const datesCardRemedie = document.querySelectorAll('[data-date]');
    const timesCardRemedie = document.querySelectorAll('[data-time]');

    for (let i = 0; i < namesCardRemedie.length; i++) {
        objsCardRemedies.push({
            nameRemedie: namesCardRemedie[i].dataset.name,
            dateRemedie: datesCardRemedie[i].dateset.date,
            timeRemedie: timesCardRemedie[i].dataset.time,
        });
    }

    return objsCardRemedies;
}

function saveCardsLocalStorage() {
    const newCardsToSave = readCardRemedie();
    localStorage.setItem('cardsSaves', newCardsToSave);
    document.getElementById('btn-add').removeEventListener("click", saveCardsLocalStorage);
    document.getElementById('btn-add').addEventListener("click", insertFormOnHtml);


    // TODO: criando o novo card de remedio na tela.
    dataForCreateNewCardRemedie();

    // removendo o formulário da tela após confirmar.
    document.querySelector('.cancel').parentNode.remove();

    const btnConfirm = document.getElementById('btn-add');
    btnConfirm.innerText = "Adicionar";
}

function dataForCreateNewCardRemedie() {
    const name = document.getElementById('name').value;
    const dosage = document.getElementById("dosage").value;
    const description = document.getElementById("description").value;
    const ingestNow = document.querySelector(`input[name="ingestNow"]:checked`).value;

    // TODO: passar os dados para a função que cria um elemento de card na tela.
    console.log(`Nome:${name}, Dosagem:${dosage}, Descrição:${description}, ingerir agora ?: ${ingestNow}`);

    createCardremedieInHtml({
        name,
        dosage,
        description,
        ingestNow,
    });
}

function createCardremedieInHtml(objCardRemedie) {
    const sectionRemedies = document.getElementById('section-remedies');
    const article = document.createElement('article');
    article.classList.add('card-remedie');

    // <h2 class="sarala-regular" data-name="Clonazepam"><span class="sarala-bold">Nome:</span> Clonazepam</h2>;

    const h2 = document.createElement('h2');
    h2.classList.add("sarala-regular");
    h2.setAttribute('data-name', objCardRemedie.name);

    const spanTitle = document.createElement("span");
    spanTitle.classList.add("sarala-bold");
    spanTitle.innerText = objCardRemedie.name;
    h2.appendChild(spanTitle);

    article.append(h2);

    const pDate = document.createElement('p');
    const spanDate = document.createElement("span");
    spanDate.classList.add("sarala-bold");
    spanDate.innerText = "Data: ";

    const spanDateValue = document.createElement("span");
    spanDateValue.classList.add("sarala-regular");
    spanDateValue.setAttribute('data-date', pickDateNow());
    spanDateValue.innerText = pickDateNow();
    pDate.append(spanDate, spanDateValue);

    const pTime = document.createElement('p');
    const spanTime = document.createElement("span");
    spanTime.classList.add("sarala-bold");
    spanTime.innerText = "Hora: ";
    const spanTimeValue = document.createElement("span");
    spanTimeValue.classList.add("sarala-regular");
    spanTimeValue.setAttribute('data-time', pickTimeNow());
    spanTimeValue.innerText = pickTimeNow();

    pTime.append(spanTime, spanTimeValue);

    const pDosage = document.createElement("p");
    const spanDosage = document.createElement("span");
    spanDosage.classList.add("sarala-bold");
    spanDosage.innerText = "Dosagem: ";

    const spanDosageValue = document.createElement("span");
    spanDosageValue.classList.add("sarala-regular");
    spanDosageValue.setAttribute('data-dosage', objCardRemedie.dosage);
    spanDosageValue.innerText = objCardRemedie.dosage;

    pDosage.append(spanDosage, spanDosageValue);


    //  Descrição
    const pDescription = document.createElement("p");
    const spanDescription = document.createElement("span");
    spanDescription.classList.add("sarala-bold");
    spanDescription.innerText = "Descrição: ";

    const spanDescriptionValue = document.createElement("span");
    spanDescriptionValue.classList.add("sarala-regular");
    spanDescriptionValue.setAttribute('data-description', objCardRemedie.description);
    spanDescriptionValue.innerText = objCardRemedie.description;

    pDescription.append(spanDescription, spanDescriptionValue);


    // Adicionando todos os elementos ao Pai(article')
    article.append(pDate, pTime, pDosage, pDescription);

    // Adicionando o card completo na seção
    sectionRemedies.appendChild(article);
}

function readLocalStorage() {
    const remediesArray = localStorage.getItem('arrayRemedies');

    console.log(remediesArray);
}

function pickDateNow() {
    const dayOfMoth = new Date().getDate();
    // a contagem do mês começa em 0, por isso o +1;
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    return `${dayOfMoth}/${month}/${year}`;
}

function pickTimeNow() {
    const minutes = new Date().getMinutes();
    const hours = new Date().getHours();
    return `${hours}:${minutes}`;
}