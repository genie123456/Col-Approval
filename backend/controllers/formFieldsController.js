const pool = require('../dbConfig');

// Controller to save applying form data
const saveApplyingFormData = (req, res) => {
  const data = req.body;
  console.log('Received data:', data);

  const sql = `INSERT INTO formfields (
    selectedDistrict, area, body, choosingCorporation, choosingCouncil, choosingJury, 
    khasraIntegrated, integratedKhasraNumber, office
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
  const values = [
    data.selectedDistrict, data.area, data.body, data.choosingCorporation,
    data.choosingCouncil, data.choosingJury, data.khasraIntegrated, 
    data.integratedKhasraNumber, data.office
  ];

  pool.getConnection()
    .then(conn => {
      conn.query(sql, values)
        .then(result => {
          console.log('Data inserted successfully:', result);
          res.status(200).json({ message: 'Applying form data saved successfully' });
          conn.release(); // Release the connection
        })
        .catch(err => {
          console.error('Database error:', err);
          res.status(500).json({ error: err.message });
          conn.release(); // Release the connection on error
        });
    })
    .catch(err => {
      console.error('Error getting connection:', err);
      res.status(500).json({ error: err.message });
    });
};

// Controller to get applying form data by ID
const getApplyingFormData = (req, res) => {
  const id = req.params.id;
  console.log(`Received request for applying form data with ID: ${id}`);
  const sql = 'SELECT * FROM formfields WHERE id = ?';

  pool.getConnection()
    .then(conn => {
      conn.query(sql, [id])
        .then(result => {
          console.log(`Executing query: ${sql} with id: ${id}`);
          if (result.length === 0) {
            console.log(`No data found for id: ${id}`);
            res.status(404).json({ message: 'Applying form data not found' });
          } else {
            console.log(`Data found for id: ${id}`, result[0]);
            res.status(200).json(result[0]);
          }
          conn.release(); // Release the connection
        })
        .catch(err => {
          console.error('Database error:', err);
          res.status(500).json({ error: err.message });
          conn.release(); // Release the connection on error
        });
    })
    .catch(err => {
      console.error('Error getting connection:', err);
      res.status(500).json({ error: err.message });
    });
};

// Controller to save applicant data
const saveApplicantData = (req, res) => {
  const data = req.body;
  console.log('Received applicant data:', data);

  const sql = `INSERT INTO applicantdata (
    formId, fullName, LUB, Srno, registrationDate, Hno, neighbourhoodColony, 
    district, surveyNumber, area, village, neighbourhoodColony4, district4, 
    developedLandName, village5, neighbourhoodColony5, district5, relinquishment, 
    permitPurpose, mobileNumber, email, tinGstnNumber, EWS, EWSb, side, 
    CGRResidential, CGRLand, EWSAreaResidential, EWSAreaLand, CGRAmount, 
    clearancePWD, clearanceWRD, clearanceCSEB, clearanceCECB, clearanceNHAI, 
    clearancePHED, clearancePMGSY, clearanceFOREST, clearanceFireNOC, 
    clearanceGramPanchayat, clearanceNNNPTP, clearanceRevenue, clearanceRES
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    data.formId, data.fullName, data.LUB, data.Srno, data.registrationDate,
    data.Hno, data.neighbourhoodColony, data.district, data.surveyNumber, data.area,
    data.village, data.neighbourhoodColony4, data.district4, data.developedLandName,
    data.village5, data.neighbourhoodColony5, data.district5, data.relinquishment,
    data.permitPurpose, data.mobileNumber, data.email, data.tinGstnNumber, data.EWS,
    data.EWSb, data.side, data.CGRResidential, data.CGRLand, data.EWSAreaResidential,
    data.EWSAreaLand, data.CGRAmount, data.clearancePWD || null, data.clearanceWRD || null,
    data.clearanceCSEB || null, data.clearanceCECB || null, data.clearanceNHAI || null,
    data.clearancePHED || null, data.clearancePMGSY || null, data.clearanceFOREST || null,
    data.clearanceFireNOC || null, data.clearanceGramPanchayat || null,
    data.clearanceNNNPTP || null, data.clearanceRevenue || null, data.clearanceRES || null
  ];

  console.log('SQL Query:', sql);
  console.log('Values:', values);

  pool.getConnection()
    .then(conn => {
      conn.query(sql, values)
        .then(result => {
          console.log('Applicant data inserted successfully:', result);
          res.status(200).json({ message: 'Applicant data saved successfully' });
          conn.release(); // Release the connection
        })
        .catch(err => {
          console.error('Database error:', err);
          res.status(500).json({ error: err.message });
          conn.release(); // Release the connection on error
        });
    })
    .catch(err => {
      console.error('Error getting connection:', err);
      res.status(500).json({ error: err.message });
    });
};

// Controller to get applicant data by ID
const getApplicantData = (req, res) => {
  const id = req.params.id;
  console.log(`Received request for applicant data with ID: ${id}`);
  const sql = 'SELECT * FROM applicantdata WHERE application_id = ?';

  pool.getConnection()
    .then(conn => {
      conn.query(sql, [id])
        .then(result => {
          console.log(`Executing query: ${sql} with id: ${id}`);
          if (result.length === 0) {
            console.log(`No data found for id: ${id}`);
            res.status(404).json({ message: 'Applicant data not found' });
          } else {
            console.log(`Data found for id: ${id}`, result[0]);
            res.status(200).json(result[0]);
          }
          conn.release(); // Release the connection
        })
        .catch(err => {
          console.error('Database error:', err);
          res.status(500).json({ error: err.message });
          conn.release(); // Release the connection on error
        });
    })
    .catch(err => {
      console.error('Error getting connection:', err);
      res.status(500).json({ error: err.message });
    });
};

module.exports = {
  saveApplyingFormData,
  getApplyingFormData,
  saveApplicantData,
  getApplicantData
};
