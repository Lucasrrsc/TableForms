document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.querySelector('form[name="formulario"]');
  formulario.addEventListener("submit", function (event) {
    const nomeInput = document.getElementById("nome");
    const sobrenomeInput = document.getElementById("sobrenome");
    const emailInput = document.getElementById("email");
    const datainiInput = document.getElementById("dataini");
    const datafimInput = document.getElementById("datafim");
    const websiteInput = document.getElementById("website");
    const legend = document.getElementById("legend");
    const per = document.getElementById("per");
    const reg = document.getElementById("reg");
    const regiaoRadios = document.querySelectorAll('input[name="regiao"]');
    const atividadeCheckboxes = document.querySelectorAll(
      'input[name="atividade"]:checked'
    );

    // Remover mensagens de erro existentes
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(function (errorMessage) {
      errorMessage.remove();
    });

    let errors = [];

    // Validação para exibir mensagens de erro
    function displayError(field, message) {
      field.style.border = "1px solid red";
      const errorDiv = document.createElement("div");
      errorDiv.className = "error-message";
      errorDiv.style.color = "red";
      errorDiv.innerHTML = message;
      field.parentNode.appendChild(errorDiv);
    }

    // Valida o campo "Nome"
    if (nomeInput.value.trim().length < 3) {
      errors.push("O campo Nome deve conter pelo menos 3 caracteres.");
      displayError(
        nomeInput,
        "O campo nome deve conter pelo menos 3 caracteres."
      );
    } else {
      nomeInput.style.border = "";
    }

    // Valida o campo "Sobrenome"
    if (sobrenomeInput.value.trim() === "") {
      errors.push("O campo é obrigatório.");
      displayError(sobrenomeInput, "Campo Obrigatório.");
    } else {
      sobrenomeInput.style.border = "";
    }

    // Valida as datas
    const dataIni = new Date(datainiInput.value);
    const dataFim = new Date(datafimInput.value);
    const dataAtual = new Date();

    if (datainiInput.value.trim() === "") {
      errors.push("O campo Data Inicial é obrigatório.");
      datainiInput.style.border = "1px solid red";
      displayError(per, "");
      displayError(datainiInput, "Campo obrigatório.");
    } else if (dataIni >= dataFim) {
      errors.push("A Data Final deve ser posterior à Data Inicial.");
      datainiInput.style.border = "1px solid red";
      datafimInput.style.border = "1px solid red";
      displayError(
        datafimInput,
        "A Data Final deve ser posterior à Data Inicial."
      );
    } else {
      datainiInput.style.border = "";
      datafimInput.style.border = "";
      per.style.border = "";
    }

    if (datafimInput.value.trim() === "") {
      errors.push("O campo Data Final é obrigatório.");
      datafimInput.style.border = "1px solid red";
    } else if (dataIni < dataAtual) {
      errors.push("A Data Inicial não pode ser anterior à data atual.");
      datainiInput.style.border = "1px solid red";
      displayError(
        datainiInput,
        "A Data Inicial não pode ser anterior à data atual."
      );
    }

    // Valida o campo E-mail
    if (emailInput.value.indexOf("@") === -1) {
      errors.push("O campo E-mail deve estar em um formato válido (nn@nn.nn).");
      emailInput.style.border = "1px solid red";
      displayError(emailInput, "O campo e-mail deve conter email@email.com");
    } else {
      emailInput.style.border = "";
    }

    // Valida o campo Website
    if (websiteInput.value.trim() !== "") {
      try {
        const websiteURL = new URL(websiteInput.value);

        // Verifica se a URL é válida
        if (
          websiteURL.protocol === "http:" ||
          websiteURL.protocol === "https:"
        ) {
          websiteInput.style.border = "";
        } else {
          errors.push(
            "O campo Website deve estar em um formato válido (http[s]://xxx.xx)."
          );
          websiteInput.style.border = "1px solid red";
          displayError(
            websiteInput,
            "O campo Website deve estar em um formato válido (http[s]://xxx.xx)."
          );
        }
      } catch (error) {
        errors.push(
          "O campo Website deve estar em um formato válido (http[s]://xxx.xx)."
        );
        websiteInput.style.border = "1px solid red";
      }
    }

    // Valida as atividades pretendidas
    const minAtividades = 1;
    const maxAtividades = 3;

    if (
      atividadeCheckboxes.length < minAtividades ||
      atividadeCheckboxes.length > maxAtividades
    ) {
      errors.push(
        `Selecione de ${minAtividades} a ${maxAtividades} atividades pretendidas.`
      );
      displayError(legend, "Selecione no mínimo 1 e no máximo 3 atividades.");
    } else {
      legend.style.border = "";
    }

    // Valida o campo "Região"
    let regiaoSelecionada = false;

    regiaoRadios.forEach(function (radio) {
      if (radio.checked) {
        regiaoSelecionada = true;
        reg.style.border = "";
      }
    });

    if (!regiaoSelecionada) {
      errors.push("Selecione uma região obrigatoriamente.");
      displayError(reg, "Selecione uma região.");
      regiaoRadios.forEach(function (radio) {});
    }

    // Impedir o envio de formulários se houver erros
    if (errors.length > 0) {
      event.preventDefault(); // Impedir o envio de formulários

      // Exibir uma mensagem de erro geral na parte superior do formulário
      const generalErrorDiv = document.getElementById("error-message");
      generalErrorDiv.style.color = "red";
      generalErrorDiv.style.border = "1px solid red";
      generalErrorDiv.style.padding = "5px";
      generalErrorDiv.style.marginTop = "10px";
      generalErrorDiv.innerHTML =
        "Por favor, corrija os erros no formulário.<br> Preencha todos os campos obrigatórios. (*)";

      // Exibir a mensagem de erro
      generalErrorDiv.style.display = "block";
    }
  });
});
