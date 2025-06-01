function mascaraCNPJ(v) {
    v = v.replace(/\D/g, "").slice(0, 14);
    v = v.replace(/^(\d{2})(\d)/, "$1.$2");
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
    v = v.replace(/(\d{4})(\d)/, "$1-$2");
    return v
}

function mascaraCEP(v) {
    v = v.replace(/\D/g, "").slice(0, 8);
    v = v.replace(/^(\d{5})(\d)/, "$1-$2");
    return v;
}

function mascaraTelefone(v) {
    v = v.replace(/\D/g, "").slice(0, 8);
    v = v.replace(/(\d{4})(\d)/, "$1-$2");
    return v;
}