
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
    transacoes.forEach((t, index) => {
        const li = document.createElement("li");
        li.textContent = `${t.tipo === "entrada" ? "+" : "-"} R$${t.valor.toFixed(2)} - ${t.desc}`;
        ul.appendChild(li);
    });
}

function addTransacao() {
    const desc = document.getElementById("desc").value;
    const valor = parseFloat(document.getElementById("value").value);
    const tipo = document.getElementById("type").value;

    if (!desc || isNaN(valor)) return alert("Preencha todos os campos corretamente.");

    transacoes.push({ desc, valor, tipo });
    localStorage.setItem("transacoes", JSON.stringify(transacoes));
    atualizarSaldo();
    atualizarHistorico();

    document.getElementById("desc").value = "";
    document.getElementById("value").value = "";
}

atualizarSaldo();
atualizarHistorico();
