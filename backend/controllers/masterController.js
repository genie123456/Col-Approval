const db = require('../dbConfig');

exports.getAllData = (req, res) => {
    const query = `
        SELECT 
            u.username, 
            u.email, 
            u.phone_number,
            f.selectedDistrict, 
            f.area, 
            f.body, 
            f.choosingCorporation,
            a.fullName, 
            a.registrationDate,
            file.file_name
        FROM 
            master_table mt
            JOIN users u ON mt.user_id = u.id
            JOIN formfields f ON mt.form_id = f.id
            JOIN applicantdata a ON mt.applicant_data_id = a.applicantdata
            JOIN file_uploads file ON mt.file_id = file.id;
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};
