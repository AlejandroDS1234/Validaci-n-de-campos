const form = document.getElementById("form")

form.addEventListener("submit", async (e) => {

    e.preventDefault()

    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const text = document.getElementById("text").value

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
        comentario.innerHTML = m.mensaje
        msg.appendChild(comentario)
        
        msg.className = "message"
        list.prepend(msg)
    })
}

document.addEventListener("DOMContentLoaded", () => {
    cargarMensajes()
})