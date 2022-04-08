export const Util = {
    formatCurrency: (amount, currency) => {
        return Number(amount).toLocaleString(currency === "TRY" ? "tr-TR" : "en-EN", { style: "currency", currency })
    }
}



// 1. paratmetresi - locale(dil)
// 2. parametresi object -> style ve para birimi
