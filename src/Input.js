
const Input = ({onChange, type, value}) => {

    return <input onChange={e=>onChange(e.target.value)} type={type} value={value} />
}

export default Input;
