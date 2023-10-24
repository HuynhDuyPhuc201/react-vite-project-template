
const REGEXP = {
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    phone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
    fb: /https?:\/\/(www\.)facebook.com\/[-a-zA-Z0-9]+/,
    password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{0,}$/
}

const ERROR_MESSAGE = {
    required: 'Trường này là bắt buộc',
    regexp: 'Trường này không đúng định dạng'
}

// form = {
//     name: 'Dang Thuyen Vuong',
//     email: 'aaaaa'
// }


// rules = {
//     name: [
//         { required: true, message: '......' }
//     ],
//     email: [
//         { required: true },
//         { regexp: 'email' | /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ }
//     ]
// }


export function validate(form, rules) {

    const errorObj = {}

    for (let i in rules) {
        for (let j in rules[i]) {
            const rule = rules[i][j]

            if (rule.required) {
                if (!form[i]) {
                    errorObj[i] = rule.message || ERROR_MESSAGE.required
                    break;
                }
            }


            if (rule.regexp) {
                const regexp = REGEXP?.[rule.regexp] || rule.regexp

                if (typeof regexp.test === 'function' && !regexp.test(form[i])) {
                    errorObj[i] = rule.message || ERROR_MESSAGE.regexp
                    break;
                }
            }


            if (rule.min || rule.max) {
                if (rule.min && rule.max) {
                    if (form[i].length < rule.min || form[i].length > rule.max) {
                        errorObj[i] = rule.message || `Độ dài bắt buộc ${rule.min}-${rule.max} ký tự`
                        break;
                    }
                } else if (rule.min) {
                    if (form[i].length < rule.min) {
                        errorObj[i] = rule.message || `Độ dài bắt buộc lớn hơn ${rule.min} ký tự`
                        break;
                    }
                } else if (rule.max) {
                    if (form[i].length > rule.max) {
                        errorObj[i] = rule.message || `Độ dài bắt buộc nhỏ hơn ${rule.max} ký tự`
                        break;
                    }
                }
            }
        }
    }

    return errorObj
}