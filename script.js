
let transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

function atualizarSaldo() {
    const saldo = transacoes.reduce((acc, t) => {
        return acc + (t.tipo === "entrada" ? t.valor : -t.valor);
    }, 0);
    document.getElementById("saldo").textContent = saldo.toFixed(2);
}

function atualizarHistorico() {
    const ul = document.getElementById("historico");
    ul.innerHTML = "";
    transacoes.forEach(t => {
        const li = document.createElement("li");
        li.textContent = `${t.data} | ${t.tipo === "entrada" ? "+" : "-"} R$${t.valor.toFixed(2)} - ${t.desc} [${t.categoria}] - Banco: ${t.banco} - Detalhe: ${t.detalhe}`;
        ul.appendChild(li);
    });
}

function addTransacao() {
    const data = document.getElementById("data").value;
    const desc = document.getElementById("desc").value.trim();
    const detalhe = document.getElementById("detalhe").value.trim();
    const valor = parseFloat(document.getElementById("value").value);
    const tipo = document.getElementById("type").value;
    const categoria = document.getElementById("categoria").value;
    const banco = document.getElementById("banco").value;

    if (!data || !desc || isNaN(valor) || valor <= 0) {
        return alert("Preencha todos os campos obrigatórios corretamente.");
    }

    transacoes.push({ data, desc, detalhe, valor, tipo, categoria, banco });
    localStorage.setItem("transacoes", JSON.stringify(transacoes));
    atualizarSaldo();
    atualizarHistorico();

    document.getElementById("data").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("detalhe").value = "";
    document.getElementById("value").value = "";
    document.getElementById("categoria").value = "Alimentação";
    document.getElementById("banco").value = "Caixa";
}

const botaoTema = document.getElementById("toggleTema");

botaoTema.addEventListener("click", () => {
    document.body.classList.toggle("claro");
});

const inputImgFundo = document.getElementById("imgFundoInput");

inputImgFundo.addEventListener("change", () => {
    const file = inputImgFundo.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
        document.body.style.backgroundImage = `url(${e.target.result})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
    };
    reader.readAsDataURL(file);
});

atualizarSaldo();
atualizarHistorico();
