const { db } = require('./db.js');
db.query("ALTER TABLE contact ADD COLUMN project_name VARCHAR(255) DEFAULT NULL", (err, result) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Column added successfully", result);
    }
    process.exit();
});
