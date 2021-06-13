import moment from "moment";

const formatDate = (date, format='DD.MM.YYYY') => {
    if (!date) return ''
    return moment(date).format(format)
}

export default formatDate
