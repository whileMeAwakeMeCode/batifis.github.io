module.exports.protectImages = () => {
    // lock context menu (disable right click on images)
    document.querySelector('body').addEventListener('contextmenu', (e) => { e.preventDefault(); }) 
    // lock drag and drop on images // dragstart drop
    document.querySelector('body').addEventListener('dragstart drop', (e) => { e.preventDefault(); }) 
}