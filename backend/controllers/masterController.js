const db = require('../dbConfig');

exports.getAllData = (req, res) => {
    const query = `
        select DISTINCT * FROM master_table mt 
        JOIN users u ON u.username = mt.master_user 
        JOIN formfields ff on mt.master_form = ff.formfields_id 
        JOIN applicantdata ad ON ad.formId = ff.formfields_id 
        JOIN file_uploads fu ON fu.file_id = mt.master_file
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};
