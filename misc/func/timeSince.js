import moment from "moment";

const timeSince = (startDate = moment(), endDate = moment(), unitOfTime = 'years') => {
    if (!startDate || !endDate) return ''
    return moment(endDate).diff(startDate, unitOfTime)
}

export default timeSince
