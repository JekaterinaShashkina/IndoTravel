export const loadStyle = (url) => {
const link = document.createElement('link')
link.rel = 'stylesheet';
link.href = url
document.head.append(link)
}
export default loadStyle