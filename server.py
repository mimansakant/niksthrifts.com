from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html", page="home")

@app.route("/about")
def about():
    return render_template("about.html", page="about")

@app.route("/sustainability")
def sustainability():
    return render_template("sustainability.html", page="sustainability")

@app.route("/events")
def events():
    return render_template("events.html", page="events")

@app.route("/map")
def map_page():
    return render_template("map.html", page="map")

@app.route('/memory')
def memory():
    return render_template('memory.html', page='memory')

@app.post("/collect-email")
def collect_email():
    data  = request.get_json()
    email = (data.get("email") or "").strip().lower()
    if not email:
        return {"ok": False}, 400

    with open("emails.txt", "a") as f:
        f.write(email + "\n")

    return {"ok": True}


if __name__ == '__main__':
   app.run(debug = True, port=5001)
