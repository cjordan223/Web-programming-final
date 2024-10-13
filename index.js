const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./dbPool");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  const query = "SELECT * FROM c_variants ORDER BY date_first_detected DESC";
  db.query(query, (err, results) => {
    if (err) throw err;
    res.render("index", { variants: results });
  });
});

app.get("/update-variant/:id", (req, res) => {
  const variantId = req.params.id;

  db.query(
    "SELECT * FROM c_variants WHERE variant_id = ?",
    [variantId],
    (err, variantResult) => {
      if (err) throw err;

      db.query(
        "SELECT * FROM c_classification",
        (err, classificationResult) => {
          if (err) throw err;

          res.render("update-variant", {
            variant: variantResult[0],
            classifications: classificationResult,
          });
        },
      );
    },
  );
});

app.post("/update-variant/:id", (req, res) => {
  const variantId = req.params.id;
  const { country_first_detected, classification_id } = req.body;

  db.query(
    "UPDATE c_variants SET country_first_detected = ?, classification_id = ? WHERE variant_id = ?",
    [country_first_detected, classification_id, variantId],
    (err, result) => {
      if (err) throw err;
      res.redirect("/");
    },
  );
});

app.get('/add-variant', (req, res) => {
    db.query('SELECT * FROM c_classification', (err, results) => {
        if (err) throw err;
        res.render('add-variant', { classifications: results });
    });
});

app.post('/add-variant', (req, res) => {
    const { variant_name, country_first_detected, date_first_detected, description, classification_id } = req.body;

    db.query('INSERT INTO c_variants (variant_name, country_first_detected, date_first_detected, description, classification_id) VALUES (?, ?, ?, ?, ?)', 
    [variant_name, country_first_detected, date_first_detected, description, classification_id], 
    (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.get('/trivia', (req, res) => {
    db.query('SELECT * FROM c_variants ORDER BY RAND() LIMIT 1', (err, results) => {
        if (err) throw err;
        const variant = results[0];
        res.render('trivia', { variant: variant });
    });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
