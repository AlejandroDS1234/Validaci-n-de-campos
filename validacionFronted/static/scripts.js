const form = document.getElementById("form")

form.addEventListener("submit", async (e) => {

    e.preventDefault()

    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const text = document.getElementById("text").value

    let error = false

    if (!name || !email || !text) {
        error = "Todos los campos son obligatorios."
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        error = "El correo electrónico no es válido."
    }
    if (text && text.length < 10) {
        error = "El mensaje debe tener al menos 10 caracteres."
    }
    if (error) {
        let mensaje_area = document.getElementById("response")
        mensaje_area.innerText = error
        mensaje_area.className = "error"
        mensaje_area.style.display = "block"
        return
    }

    let pro = await fetch("/enviar", {method: "POST", headers: { "Content-Type": "application/json" },body: JSON.stringify({ "nombre": name, "correo": email, "mensaje": text })})
    let res = await pro.json()
    let tipo = res.status
    let mensaje = res.message
    let mensaje_area = document.getElementById("response")
    mensaje_area.innerText = mensaje
    mensaje_area.className = tipo
    mensaje_area.style.display = "block"
    await cargarMensajes()
    form.reset()

})

async function cargarMensajes() {
    const list = document.getElementById("messageList")
    const response = await fetch("/cargar_mensajes", { method: "POST" })
    const data = await response.json()
    list.innerHTML = ""
    data.mensajes.forEach(m => {
        let msg = document.createElement("div")
        let titulo = document.createElement("strong")
        titulo.innerText = `${m.nombre} (${m.correo})`
        msg.appendChild(titulo)

        let comentario = document.createElement("p")
        comentario.innerText = m.mensaje
        msg.appendChild(comentario)
        
        msg.className = "message"
        list.prepend(msg)
    })
}

document.addEventListener("DOMContentLoaded", () => {
    cargarMensajes()
})