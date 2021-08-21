const getIDfromBase64 = (ID) => {
    return window.atob(ID).split(':')[1]
}

export default getIDfromBase64
