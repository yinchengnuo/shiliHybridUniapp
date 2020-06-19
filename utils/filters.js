export const sliceStr = (str, len = 10) => str.length < len ? str : str.slice(0, len) + '...'

export const getAddress = item => item ? `${item.province}${item.city}${item.area} ${item.address}` : ''