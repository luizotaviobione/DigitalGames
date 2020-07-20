/*variaveis*/
secaoJogos = document.querySelector(".jogos");
efeitoCarrinho = document.querySelector(".efeito-carrinho");
carrinho = document.querySelector(".carrinho");
fecharJanelaCarrinho = document.querySelector(".botao-carrinho");
elementosCarrinho = document.querySelector(".conteudo-carrinho");
botaoCarrinho = document.querySelector(".carrinho-nav");
precoTotal = document.querySelector(".preco-total");
limparCarrinho = document.querySelector(".limpar-carrinho");

var produtosCarrinho = [];

const arrayJogos = [
  {
    nome: "Grand theft auto - Ps4",
    img: "images/jogos/gta.png",
    preco: 19.95,
  },
  {
    nome: "Bully",
    img: "images/jogos/bully.png",
    preco: 15.35,
  },
  {
    nome: "Star Wars Battlefront",
    img: "images/jogos/battlefront.jpeg",
    preco: 12.45,
  },
  {
    nome: "Uncharted The Lost Legacy",
    img: "images/jogos/uncharted.jpg",
    preco: 12.43,
  },
  {
    nome: "Minecraft",
    img: "images/jogos/minecraft.jpg",
    preco: 10.42,
  },
  {
    nome: "Crash Bandicoot",
    img: "images/jogos/crash.jpg",
    preco: 13.22,
  },
];

class Produtos {
  mostrarProdutos() {
    var i = 0;
    var adicionando = "";
    //console.log(arrayJogos);
    arrayJogos.forEach((jogo) => {
      //console.log(jogo);
      adicionando += `
      <div class="borda col-md-6 col-lg-4 mt-2 mb-2" align="center" id="${i}">
          <div class="produto">
            <img
              class="mt-4"
              src=${jogo.img}
              alt=""
              width="220px"
              height="300px" id="${i}"
            />
            <button class="botao-item"  id="${i}">
              <i class="fas fa-shopping-cart"></i>
              Add no Carrinho
              
            </button>
          </div>

          <h4 class="formatoh4">${jogo.nome}</h4>
          <span class="priceitem">${jogo.preco}R$</span>
      </div>`;
      i++;
    });

    secaoJogos.innerHTML = adicionando;
  }

  clicarCarrinho() {
    botaoCarrinho.addEventListener("click", () => {
      this.aparecerCarrinho();
      console.log(this);
    });

    //limpar todos os itens
    limparCarrinho.addEventListener("click", () => {
      var itens = document.querySelectorAll(".item-carrinho");
      let botaoitem = document.querySelectorAll(".botao-item");
      console.log(itens);
      /*excluir elementos da div*/
      itens.forEach((item) => {
        item.remove();
        var childrenId = item.children[2].id;
        console.log(botaoitem[childrenId]);
        botaoitem[
          childrenId
        ].innerHTML = `<i class="fas fa-shopping-cart"></i>Add no Carrinho`;
      });

      /*exclui todos elementos do array*/
      while (produtosCarrinho.length) {
        produtosCarrinho.pop();
      }

      this.updatevalores();
    });
  }

  clicarnoProduto() {
    const itens = document.querySelectorAll(".borda");
    var botaoitem = document.querySelectorAll(".botao-item");
    //console.log(botaoitem);

    //abrir o carrinho
    itens.forEach((produto) => {
      //produto.addEventListener("click", this.adicionarProduto);
      produto.addEventListener("click", (e) => {
        var z = true;
        var click = e.target;
        var jogo = arrayJogos[click.id];
        jogo.id = click.id;
        jogo.amount = 1;
        //console.log(botaoitem[click.id]);
        var textobotao = botaoitem[click.id];
        textobotao.innerHTML = `<i class="fas fa-shopping-cart"></i> No Carrinho <i class="fa fa-check"></i>`;
        produtosCarrinho.forEach((produtocarrinho) => {
          if (jogo.id === produtocarrinho.id) {
            swal(
              "Aviso",
              "Este produto ja foi adicionado ao carrinho",
              "warning"
            );
            z = false;
          }
        });
        if (z === true) {
          produtosCarrinho.push(jogo);
          this.aparecerCarrinho();
          this.updatevalores();
          this.adicionarProCarrinho(jogo, click.id);
        }

        console.log(z);
      });
    });
  }

  updatevalores() {
    let preco = 0;
    produtosCarrinho.map((produto) => {
      preco += produto.preco * produto.amount;
    });
    //console.log(precoTotal.innerText);
    preco = parseFloat(preco);
    precoTotal.innerText = preco.toFixed(2);
    //console.log(precoTotal.innerHTML);
    ///console.log(produtosCarrinho);
  }

  adicionarProCarrinho(jogo, id) {
    var elemento = "";
    elemento = `
          <div class="item-carrinho d-flex">
            <div class="img-item-carrinho">
              <img src=${jogo.img} width="120" height="160" alt="" />
            </div>

            <div class="info-item">
              <h4 class="">${jogo.nome}</h4>
              <h4 align="left" class="mt-4 mb-4">${jogo.preco}R$</h4>
              <span class="remove-item" id=${id}>Remove</span>
            </div>

            <div class="ml-auto pr-3 pt-4 qtdelemento" id=${id}>
              <i class="fas fa-chevron-up" ></i>
              <p class="pt-2 number">1</p>
              <i class="fas fa-chevron-down"></i>
            </div>
          </div>`;

    elementosCarrinho.innerHTML += elemento;

    /*remover produtos do carrinho*/
    var botaoRemoverItem = document.querySelectorAll(".remove-item");
    var botaoitem = document.querySelectorAll(".botao-item");

    botaoRemoverItem.forEach((botao) => {
      botao.addEventListener("click", (e) => {
        var id = e.target.id;
        var div = e.target.parentNode.parentNode;
        var i = 0;

        produtosCarrinho.forEach((produtos) => {
          if (id === produtos.id) {
            produtosCarrinho.splice(i, 1);
          }
          i++;
        });
        var textobotao = botaoitem[id];
        textobotao.innerHTML = `<i class="fas fa-shopping-cart"></i> Add No Carrinho`;
        div.remove();
        this.updatevalores();
      });
    });
    /*fim remoção produtos*/

    var qtdelemento = document.querySelectorAll(".qtdelemento");

    qtdelemento.forEach((qtd) => {
      qtd.addEventListener("click", (e) => {
        let click = e.target;
        var idAmount = click.parentNode.id;
        console.log(idAmount);
        if (click.classList.contains("fa-chevron-down")) {
          var number = click.previousElementSibling;
          number.innerText = parseInt(number.innerText) - 1;
          if (parseInt(number.innerText) === 0) {
            console.log("entrei aqui");
            var removerProduto = number.parentNode.parentNode;
            removerProduto.remove();
            var texto = botaoitem[idAmount];
            texto.innerHTML = `<i class="fas fa-shopping-cart"></i> Add No Carrinho`;
          }
        } else if (click.classList.contains("fa-chevron-up")) {
          var number = click.nextElementSibling;
          number.innerText = parseInt(number.innerText) + 1;
        }
        this.amountVetor(number, idAmount);
        this.updatevalores();
      });
    });
  }

  aparecerCarrinho() {
    efeitoCarrinho.classList.add("showcart");
    carrinho.classList.add("aparecerCarrinho");

    fecharJanelaCarrinho.addEventListener("click", () => {
      //console.log(precoTotal.innerText);
      efeitoCarrinho.classList.remove("showcart");
      carrinho.classList.remove("aparecerCarrinho");
      //console.log(precoTotal.innerText);
    });
  }

  amountVetor(number, id) {
    console.log(number);
    let k = 0;
    console.log(id);
    produtosCarrinho.forEach((jogo) => {
      if (jogo.id === id) {
        if (parseInt(number.innerText) != 0) {
          jogo.amount = parseInt(number.innerText);
        } else {
          produtosCarrinho.splice(k, 1);
        }
      }
      k++;
    });
    console.log(produtosCarrinho);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const produtos = new Produtos();

  produtos.mostrarProdutos();
  produtos.clicarnoProduto();
  produtos.clicarCarrinho();
});
