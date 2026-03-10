from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

mensajes=[]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/enviar", methods=["POST"])
def enviar():
    datos= request.get_json()
    nombre = datos["nombre"]
    correo= datos["correo"]
    mensaje = datos["mensaje"]
    print(nombre, correo, mensaje)
    mensajes.append({"nombre": nombre, "correo": correo, "mensaje": mensaje})
    return jsonify({"status": "success", "message": "Mensaje enviado correctamente"})

@app.route("/cargar_mensajes", methods=["POST"])
def cargar_mensajes():
    return jsonify({"mensajes": mensajes})

if __name__ == "__main__":
    app.run(debug=True, port=4999, host="0.0.0.0")
    
    
