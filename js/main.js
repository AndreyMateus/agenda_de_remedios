document.getElementById('btn-add').addEventListener("click", insertFormOnHtml);

function insertFormOnHtml() {
    document.getElementById('btn-add').innerText = "Confirmar";


    const sectionRemedies = document.getElementById('section-remedies');

    // sectionRemedies.style.setProperty("visibility", "hidden");

    const newForm = createFormAddRemedie();

    document.body.appendChild(newForm);

    disableBtnCreateForm();
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
    labelDosage.type = "text";
    labelDosage.id = "dosage";
    divDosage.name = "dosage";

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