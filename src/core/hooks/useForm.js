import { useState } from "react"
import { validate } from '../utils/validate'


export const useForm = (rules) =>{
    const [form, setForm] = useState({})
    const [error, setError] = useState({})

    const _validate = () =>{
        const errorObj = validate(form, rules)

        setError(errorObj)
        return Object.keys(errorObj).length === 0
    }

    return {
        form, 
        setForm,
        error,
        validate: _validate
    }
}