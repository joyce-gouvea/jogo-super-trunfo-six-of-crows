var carta1 = {
  nome: "Kaz Brekker",
  imagem:
    "https://static.wikia.nocookie.net/shadowandbone/images/e/e5/Kaz_by_Bon_Orthwick.png",
  atributos: {
    ataque: 7,
    defesa: 7,
    magia: 1
  }
};

var carta2 = {
  nome: "Inej Ghafa",
  imagem:
    "https://static.wikia.nocookie.net/shadowandbone/images/3/30/Inej_by_Bon_Orthwick.png",
  atributos: {
    ataque: 7,
    defesa: 9,
    magia: 1
  }
};

var carta3 = {
  nome: "Nina Zenik",
  imagem:
    "https://static.wikia.nocookie.net/shadowandbone/images/1/1c/Nina_by_Bon_Orthwick_01.png",
  atributos: {
    ataque: 9,
    defesa: 1,
    magia: 9
  }
};
var carta4 = {
  nome: "Jesper Fahey",
  imagem:
    "https://static.wikia.nocookie.net/shadowandbone/images/7/70/Jesper_by_Bon_Orthwick.png",
  atributos: {
    ataque: 8,
    defesa: 6,
    magia: 7
  }
};

var carta5 = {
  nome: "Wylan Van Eck",
  imagem:
    "https://static.wikia.nocookie.net/shadowandbone/images/7/7a/Wylan_by_Bon_Orthwick.png",
  atributos: {
    ataque: 1,
    defesa: 5,
    magia: 8
  }
};

var carta6 = {
  nome: "Matthias Helvar",
  imagem:
    "https://static.wikia.nocookie.net/shadowandbone/images/d/d9/Matthias_by_Bon_Orthwick.png",
  atributos: {
    ataque: 9,
    defesa: 9,
    magia: 1
  }
};

var baralhoJogador = [carta1, carta2, carta3];
var baralhoMaquina = [carta4, carta5, carta6];

var cartaMaquina;
var cartaJogador;

function sortearCarta() {
  var numeroCartaMaquina = parseInt(Math.random() * baralhoMaquina.length);
  cartaMaquina = baralhoMaquina[numeroCartaMaquina];

  var numeroCartaJogador = parseInt(Math.random() * baralhoJogador.length);

  while (numeroCartaJogador == numeroCartaMaquina) {
    numeroCartaJogador = parseInt(Math.random() * baralhoJogador.length);
  }
  cartaJogador = baralhoJogador[numeroCartaJogador];

  document.getElementById("btnSortear").disabled = true;
  document.getElementById("btnJogar").disabled = false;

  exibirCartaJogador();
  tirarCartaMaquina();
}

function obtemAtributoSelecionado() {
  var radioAtributos = document.getElementsByName("atributo");
  for (var i = 0; i < radioAtributos.length; i++) {
    if (radioAtributos[i].checked == true) {
      return radioAtributos[i].value;
    }
  }
}

function jogar() {
  var atributoSelecionado = obtemAtributoSelecionado();
  var divResultado = document.getElementById("resultado");

  var valorCartaJogador = cartaJogador.atributos[atributoSelecionado];
  var valorCartaMaquina = cartaMaquina.atributos[atributoSelecionado];

  if (valorCartaJogador > valorCartaMaquina) {
    baralhoJogador.push(cartaMaquina);
    var n = baralhoMaquina.indexOf(cartaMaquina);
    var x = baralhoMaquina.splice(n, 1);
    divResultado.innerHTML =
      "<p class='resultado-final'>Você venceu e pegou a carta da máquina. Agora, seu baralho tem " +
      baralhoJogador.length +
      " carta(s) e o da máquina " +
      baralhoMaquina.length +
      ".</p>";
  } else if (valorCartaJogador < valorCartaMaquina) {
    baralhoMaquina.push(cartaJogador);
    var n = baralhoJogador.indexOf(cartaJogador);
    var x = baralhoJogador.splice(n, 1);
    divResultado.innerHTML =
      "<p class='resultado-final'>Você perdeu e sua carta foi pega pela máquina. Agora, seu baralho tem " +
      baralhoJogador.length +
      " carta(s) e o da máquina " +
      baralhoMaquina.length +
      ".</p>";
  } else if (valorCartaMaquina == null || valorCartaJogador == null) {
    alert("Selecione um atributo.");
  } else {
    divResultado.innerHTML = "<p class='resultado-final'>Empatou.</p>";
  }

  document.getElementById("btnJogar").disabled = true;
  document.getElementById("btnSortear").disabled = false;

  exibirCartaMaquina();

  if (baralhoJogador.length == 0) {
    document.getElementById("btnJogar").disabled = true;
    document.getElementById("btnSortear").disabled = true;
    divResultado.innerHTML =
      "<p class='resultado-final'>Que pena, você perdeu...</p>";
  }

  if (baralhoMaquina.length == 0) {
    document.getElementById("btnJogar").disabled = true;
    document.getElementById("btnSortear").disabled = true;
    divResultado.innerHTML =
      "<p class='resultado-final'>Parabéns! Você venceu!</p>";
  }
}

function exibirCartaJogador() {
  var divCartaJogador = document.getElementById("carta-jogador");

  divCartaJogador.style.backgroundImage = `url(${cartaJogador.imagem})`;
  var moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
  var tagHTML = "<div id='opcoes' class='carta-status'>";
  var opcoesTexto = "";
  for (var atributo in cartaJogador.atributos) {
    opcoesTexto +=
      "<input type='radio' name='atributo' value='" +
      atributo +
      "'>" +
      atributo +
      " " +
      cartaJogador.atributos[atributo] +
      "<br>";
  }
  var nome = `<p class="carta-subtitle">${cartaJogador.nome}</p>`;
  divCartaJogador.innerHTML = moldura + nome + tagHTML + opcoesTexto + "</div>";
}

function exibirCartaMaquina() {
  var divCartaMaquina = document.getElementById("carta-maquina");

  divCartaMaquina.style.backgroundImage = `url(${cartaMaquina.imagem})`;
  var moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
  var tagHTML = "<div id='opcoes' class='carta-status'>";
  var opcoesTexto = "";
  for (var atributo in cartaMaquina.atributos) {
    opcoesTexto +=
      "<p type='text' name='atributo' value='" +
      atributo +
      "'>" +
      atributo +
      " " +
      cartaMaquina.atributos[atributo] +
      "</p>";
  }
  var nome = `<p class="carta-subtitle">${cartaMaquina.nome}</p>`;
  divCartaMaquina.innerHTML = moldura + nome + tagHTML + opcoesTexto + "</div>";
}

function tirarCartaMaquina() {
  var divCartaMaquina = document.getElementById("carta-maquina");
  divCartaMaquina.style.backgroundImage = ``;
  var moldura =
    '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
  var tagHTML = "<div id='opcoes' class='carta-status'>";
  var opcoesTexto = "";
  var nome = ``;
  divCartaMaquina.innerHTML = moldura + "</div>";
}