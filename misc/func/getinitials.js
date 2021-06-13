const getInitials = (name = '', join = '') => {
    const nameArr = name
        .replace(/\s+/, ' ')
        .split(' ')
        .slice(0, 2)
        .map((v) => v && v[0].toUpperCase())
    return nameArr.length === 0 || nameArr.length === 1 ? nameArr.join('') : nameArr.join(join)
};

export default getInitials;
