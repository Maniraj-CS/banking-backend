function escapeHtml(input) {
    return input
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
function formatAmount(amount) {
    // banking: always show 2 decimals
    return Number.isFinite(amount) ? amount.toFixed(2) : String(amount);
}
function maskAccount(toAccount) {
    const s = toAccount.trim();
    if (s.length <= 6)
        return s;
    return `${s.slice(0, 2)}••••${s.slice(-4)}`;
}
export { escapeHtml, formatAmount, maskAccount };
//# sourceMappingURL=email.controller.js.map