import './App.css';
import {useState, useEffect, useRef} from "react";
import Input from "./Input";
import axios from "axios";
import {Util} from "./helpers";

function App() {

    const [currencies, setCurrencies] = useState(["EUR", "USD", "TRY", "RUB"])
    const [first, setFirst] = useState("EUR")
    const [second, setSecond] = useState("TRY")
    const [rate, setRate] = useState(null)
    const [amount, setAmount] = useState(2)

    const newCurrency = useRef()


    useEffect(() => {

        // 1 first kaç second dır.
        let param = first + "_" + second
        axios(`https://free.currconv.com/api/v7/convert?q=${param}&compact=ultra&apiKey=9d451b8387efce59b195`)
            .then((response) => {
                // response.data = {RUB_USD: 0.012461}
                // response.data = {AAT_USD: 0.012461}

                // response.data.RUB_USD ->  0.012461
                // param = "EUR_TRY"
                // response.data[param] = response.data.EUR_TRY
                setRate(response.data[param])

            })

    }, [first, second])


    const addNewCurrency = () => {

        // eklenecek olan currency =  newCurrency.current.value
        let _new = newCurrency.current.value.toUpperCase()
        if (!currencies.find((c) => c === _new)) {
            currencies.push(_new)
            let newCurrencies = currencies
            setCurrencies([...newCurrencies])
            newCurrency.current.value = ""
            alert("Eklendiiii")
        } else {
            alert("Bu para birimi zaten listede ekli.")
        }

    }

    useEffect(() => {
        // mount olduktan sonra input fokuslaması
        newCurrency.current.focus()
    }, [])
    return (

        <>
            <div className="flex items-center">
                <div className="my-2 flex items-center justify-between w-20">
                    <select placeholder="First Currency" className="border border-slate-300"
                            value={first}
                            onChange={(event) => {
                                setFirst(event.target.value)
                            }}
                    >
                        {
                            currencies.map((currency) => (
                                <option key={currency}>{currency}</option>
                            ))
                        }
                    </select>

                    <Input type="number" value={amount} onChange={setAmount}/>
                </div>
                {"<>"}
                <div className="my-2 flex items-center justify-between w-20">
                    <select placeholder="Second Currency" className="border border-slate-300"
                            value={second}
                            onChange={(event) => {
                                setSecond(event.target.value)
                            }}
                    >
                        {
                            currencies.map((currency) => (
                                <option key={currency}>{currency}</option>
                            ))
                        }
                    </select>
                    {Util.formatCurrency((amount * rate), second)}
                </div>
            </div>
            <div className="my-2 flex items-center justify-between w-20">
                <input ref={newCurrency} type="text"/>
                <button onClick={() => {
                    addNewCurrency()
                }}>Add
                </button>
            </div>

        </>
    );
}

export default App;


// // bu url de base to selects
// let url = "http://api.exchangeratesapi.io/v1/latest?access_key=cca414571952d791fd6bd85ec9d20aee&format=1"
//
// // USD_TRY -> 1 USD kaç TRY (EUR_TRY -> 1 EUR kaç TRY)
// let url2 = "https://free.currconv.com/api/v7/convert?q=USD_TRY&compact=ultra&apiKey=9d451b8387efce59b195"
