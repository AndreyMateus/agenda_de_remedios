document.getElementById('btn-add').addEventListener("click", insertFormOnHtml);

function insertFormOnHtml() {
    // Mudando o texto do botão e retirando o evento dele.
    const btnConfirm = document.getElementById('btn-add');
    btnConfirm.innerText = "Confirmar";
    btnConfirm.style.backgroundColor = "#1FEB00";
    disableBtnCreateForm();

    //  criando o formulário e adicionando no body, para que apareça na tela.
    const newForm = createFormAddRemedie();
    document.body.appendChild(newForm);

    //? adicionando um novo evento ao botão que agora irá salvar.
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

    // container dos inputs radio
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
    document.getElementById('btn-add').style.backgroundColor = "#50A7FF";
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

// le os cards e salve em um array.
function readCardRemedie() {
    const objsCardRemedies = [];

    const sectionRemediesChilds = document.getElementById("section-remedies");

    const namesCardRemedie = document.querySelectorAll('h2[data-name] span');
    const datesCardRemedie = document.querySelectorAll('span[data-date]');
    const timesCardRemedie = document.querySelectorAll('span[data-time]');
    const dosageCardRemedie = document.querySelectorAll('span[data-dosage]');
    const descriptionCardRemedie = document.querySelectorAll('span[data-description]');

    for (let index = 0; index < sectionRemediesChilds.children.length; index++) {
        objsCardRemedies.push({
            nameRemedie: namesCardRemedie[index]?.textContent,
            dateRemedie: datesCardRemedie[index]?.textContent,
            timeRemedie: timesCardRemedie[index]?.textContent,
            dosageRemedie: dosageCardRemedie[index]?.textContent,
            descriptionRemedie: descriptionCardRemedie[index]?.textContent,
        });

    }

    return objsCardRemedies;
}

// pega o array com os OBJs que contém a informação dos CARDS e salva no localStorage (quando clicamos em CONFIRMAR no formulário).
function saveCardsLocalStorage() {
    document.getElementById('btn-add').removeEventListener("click", saveCardsLocalStorage);
    document.getElementById('btn-add').addEventListener("click", insertFormOnHtml);

    // pega os dados do formulário, cria um card novo e passa pra eles.
    dataForCreateNewCardRemedie();

    // removendo o formulário da tela após confirmar.
    document.querySelector('.cancel')?.parentNode.remove();

    const btnConfirm = document.getElementById('btn-add');
    btnConfirm.innerText = "Adicionar";
    btnConfirm.style.backgroundColor = "#50A7FF";

    //! IMPORTANTE - é necessário que os CARDS só sejam PEGOS após o NOVO CARD ser CRIADO, caso contrário esse novo CARD ficará FALTANDO, por isso o "readCardRemedie()" e salvamento está aqui embaixo.
    const newCardsToSave = readCardRemedie();

    const cardsToJSON = JSON.stringify(newCardsToSave);
    localStorage.setItem('meusObjetos', cardsToJSON);
}

function dataForCreateNewCardRemedie() {
    const name = document.getElementById('name');
    const dosage = document.getElementById("dosage");
    const description = document.getElementById("description");
    const ingestNow = document.querySelector(`input[name="ingestNow"]:checked`);

    // valida os valores dos inputs.
    const isValid = validateValueInputs(name, ingestNow);

    if (isValid) {
        createCardremedieInHtml({
            name: name?.value,
            dosage: dosage?.value,
            description: description?.value,
            ingestNow: ingestNow?.value,
        });
    }
}

function validateValueInputs(inputName, inputIngestNow) {
    let flag = true;

    if (!inputName?.value) {
        flag = false;
    } else if (!inputIngestNow?.value) {
        flag = false;
    }

    return flag;
}

function createFormConfirm(myCard) {
    const myCardArray = Array.from(myCard.children);
    const nameCard = myCardArray[0].textContent;
    const spanChilds = [];
    // pegando o "textContent" do CAMPOS/INPUTS do cards e colocando no formulário que gerará um novo card.
    myCardArray.forEach(childElement => {
        if (childElement.tagName === "P") {
            spanChilds.push(childElement.children[1].textContent);
        }
    });
    console.log(spanChilds);

    const boxForm = document.createElement("div");
    boxForm.classList.add("box-form");

    const box = document.createElement("div");
    box.classList.add("card-remedie", "formConfirm");
    box.style.position = "absolute";

    const h2 = document.createElement("h2");
    h2.textContent = "Você está ingerindo agora ?";
    h2.style.color = "#000";
    h2.classList.add("h1");

    const divName = document.createElement("div");
    const labelName = document.createElement("label");
    labelName.textContent = "Nome";
    labelName.setAttribute("for", "inputName");
    labelName.classList.add("sarala-bold");

    const inputName = document.createElement("input");
    inputName.setAttribute("id", "inputName");
    inputName.classList.add("inputForm");
    inputName.value = nameCard;
    divName.append(labelName, inputName);

    //! As datas e horas não poderão ser alteradas.
    const divDate = document.createElement("div");
    const pDate = document.createElement("p");
    pDate.textContent = `Data: ${pickDateNow()}`;
    pDate.classList.add("sarala-bold");

    divDate.append(pDate);

    const divTime = document.createElement("div");
    const pTime = document.createElement("p");
    pTime.textContent = `Hora: ${pickTimeNow()}`;
    pTime.classList.add("sarala-bold");
    divTime.append(pTime);

    const divDosage = document.createElement("div");
    const labelDosage = document.createElement("label");
    labelDosage.textContent = "Dosagem";
    labelDosage.classList.add("sarala-bold");
    labelDosage.setAttribute("for", "dosage");
    const inputDosage = document.createElement("input");
    inputDosage.setAttribute("id", "dosage");
    inputDosage.classList.add("inputForm");
    inputDosage.value = spanChilds[2];
    divDosage.append(labelDosage, inputDosage);

    const divDescription = document.createElement("div");
    const labelDescription = document.createElement("label");
    labelDescription.setAttribute("for", "textDescription");
    labelDescription.classList.add("sarala-bold");
    labelDescription.textContent = "Descrição";
    const textAreaDescription = document.createElement("textarea");
    textAreaDescription.setAttribute("id", "textDescription");
    textAreaDescription.value = spanChilds[3];
    divDescription.append(labelDescription, textAreaDescription);

    const divObs = document.createElement("div");
    const pObs = document.createElement("p");
    pObs.textContent = "OBS: A Data e a Hora são pegos automaticamente do seu dispositivo.";
    pObs.classList.add("sarala-bold");
    divObs.append(pObs);

    const containerBtns = document.createElement("div");

    const btnYes = document.createElement("button");
    btnYes.textContent = "Sim";
    btnYes.classList.add("btn-remove-yes", "sarala-bold");
    btnYes.addEventListener("click", () => {
        // TODO:  mandar para a função que cria um CARD.
        // createCardremedieInHtml({
        //     name: inputName.value,
        //     dosage: inputDosage.value,
        //     description: textAreaDescription.value,
        // });
        console.log({
            name: inputName.value,
            dosage: inputDosage.value,
            description: textAreaDescription.value,
        });
    });
    btnYes.addEventListener("click", removeCard);

    const btnNo = document.createElement("button");
    btnNo.textContent = "Não";
    btnNo.classList.add("btn-remove-no", "sarala-bold");
    btnNo.addEventListener("click", function deleteForm(e) {
        boxForm.remove();

        const allChildsSectionRemedies = document.getElementById("section-remedies").children;
        Array.from(allChildsSectionRemedies).forEach(child => {
            child.style.opacity = 1;
        });
    });

    containerBtns.append(btnYes, btnNo);

    box.append(h2, divName, divDate, divTime, divDosage, divDescription, divObs, containerBtns);
    boxForm.append(box);

    return boxForm;
}

function createCardremedieInHtml(objCardRemedie) {
    const sectionRemedies = document.getElementById('section-remedies');
    const article = document.createElement('article');
    article.classList.add('card-remedie');
    article.addEventListener("dblclick", hideContent);

    // evento que simulará o CLICK LONGO.
    let timer;
    article.addEventListener('touchstart', () => {
        timer = setTimeout(() => {
            const allChildsSectionRemedies = sectionRemedies.children;
            Array.from(allChildsSectionRemedies).forEach(child => {
                child.style.opacity = 0;
            });

            const formConfirm = createFormConfirm(article);
            sectionRemedies.append(formConfirm);

        }, 550);
    });
    article.addEventListener('touchend', () => {
        clearTimeout(timer);
    });

    const h2 = document.createElement('h2');
    h2.classList.add("sarala-regular");
    h2.setAttribute('data-name', objCardRemedie?.name);

    const spanTitle = document.createElement("span");
    spanTitle.classList.add("sarala-bold");
    spanTitle.innerText = objCardRemedie?.name;
    h2.appendChild(spanTitle);

    article.append(h2);

    const pDate = document.createElement('p');
    const spanDate = document.createElement("span");
    spanDate.classList.add("sarala-bold");
    spanDate.innerText = "Data: ";

    const spanDateValue = document.createElement("span");
    spanDateValue.classList.add("sarala-regular");

    // caso não vá ingerir na hora.
    if (objCardRemedie.ingestNow === "no") {
        spanDateValue.setAttribute('data-date', "Não ingeriu ainda");
        spanDateValue.innerText = "Não ingeriu ainda";
    } else {
        // verificando se a data já está preenchida ou não.
        if (objCardRemedie.date) {
            spanDateValue.setAttribute('data-date', objCardRemedie.date);
            spanDateValue.innerText = objCardRemedie.date;
        } else {
            spanDateValue.setAttribute('data-date', pickDateNow());
            spanDateValue.innerText = pickDateNow();
        };
    }

    pDate.append(spanDate, spanDateValue);

    const pTime = document.createElement('p');
    const spanTime = document.createElement("span");
    spanTime.classList.add("sarala-bold");
    spanTime.innerText = "Hora: ";
    const spanTimeValue = document.createElement("span");
    spanTimeValue.classList.add("sarala-regular");

    // caso não vá ingerir na hora.
    if (objCardRemedie.ingestNow === "no") {
        spanTimeValue.setAttribute('data-time', "Não ingeriu ainda");
        spanTimeValue.innerText = "Não ingeriu ainda";
    } else {
        // verificando se a HORA já está preenchida ou não.
        if (objCardRemedie.time) {
            spanTimeValue.setAttribute('data-time', objCardRemedie.time);
            spanTimeValue.innerText = objCardRemedie.time;
        } else {
            spanTimeValue.setAttribute('data-time', pickTimeNow());
            spanTimeValue.innerText = pickTimeNow();
        }
    }

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

//  adiciona um evento a todos os cards criados que conterá essa função.
function hideContent(event) {
    const article = event.currentTarget;
    const chrildrens = Array.from(article.children);

    // percorrendo TODOS os elementos e deixando eles invisiveis, com opacidade baixa.
    chrildrens.forEach(child => {
        child.style.opacity = 0;
    });

    // passando os elementos que tiveram sua OPACIDADE REDUZIDA.
    createBtnsRemove(article, chrildrens);
}

function createBtnsRemove(parent, chrildrens) {
    parent.style.position = "relative";
    const title = document.createElement("h2");
    title.classList.add("sarala-bold");
    title.textContent = "Deseja Remover";

    const box = document.createElement("div");
    box.classList.add("box");

    const btnYes = document.createElement("button");
    btnYes.textContent = "Sim";
    btnYes.classList.add("btn-remove-yes", "sarala-bold");
    btnYes.addEventListener("click", removeCard);

    const btnNo = document.createElement("button");
    btnNo.textContent = "Não";
    btnNo.classList.add("btn-remove-no", "sarala-bold");
    //  dontRemoveCaard deve restaurar o card ao estado inicial.
    btnNo.addEventListener("click", function dontRemoveCard(e) {
        const boxParent = e.currentTarget.parentNode;
        boxParent.remove();

        chrildrens.forEach(child => {
            child.style.opacity = 1;
        });
    });

    box.append(title, btnYes, btnNo);
    parent.append(box);
}

//  adiciona um evento a todos os cards criados que conterá essa função para remover a si mesmos.
function removeCard(event) {
    const card = event.currentTarget.parentNode.parentNode;
    card.remove();
    saveCardsLocalStorage();
}

function readLocalStorage() {
    const remediesArray = localStorage.getItem('meusObjetos');
    const arrObjsCards = JSON.parse(remediesArray);

    for (let i = 0; i < arrObjsCards.length; i++) {
        createCardremedieInHtml({
            name: arrObjsCards[i].nameRemedie,
            dosage: arrObjsCards[i].dosageRemedie,
            description: arrObjsCards[i].descriptionRemedie,
            date: arrObjsCards[i].dateRemedie,
            time: arrObjsCards[i].timeRemedie
        });
    }

    return arrObjsCards;
}

// lendo todos os dados no localStorage, criando os cards e colocando na tela.
// será executada sempre que a página for aberta.
readLocalStorage();