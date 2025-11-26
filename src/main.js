import './style.css'

const overlay = document.getElementById('overlay')
const sidebar = document.getElementById('sidebar')
const closeButton = document.getElementById('close-sidebar')
const toggleBotton = document.getElementById('toogle-sidebar')

//console.log(overlay);
//console.log(sidebar);
//console.log(closeSidebar);
//console.log(toogleSidebar);

const openSidebar = () => {
    console.log('openSidebar')
    sidebar.classList.remove('-translate-x-full')
    overlay.classList.remove('hidden')
}

const closeSidebar = () => {
    console.log('closeSidebar')
    sidebar.classList.add('-translate-x-full')
    overlay.classList.add('hidden')
}

toggleBotton.addEventListener('click', openSidebar)
closeButton.addEventListener('click', closeSidebar)
overlay.addEventListener('click', closeSidebar)