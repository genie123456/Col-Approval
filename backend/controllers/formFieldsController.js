const pool = require('../dbConfig');

// Controller to save applying form data
const saveApplyingFormData = (req, res) => {
  const data = req.body;
  //console.log('Received Applying form data:', data);


  const sql = `INSERT INTO formfields (
    selectedDistrict, area, body, choosingCorporation, choosingCouncil, choosingJury, 
    khasraIntegrated, integratedKhasraNumber, office
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
  const values = [
    data.selectedDistrict, data.area, data.body, data.choosingCorporation,
    data.choosingCouncil, data.choosingJury, data.khasraIntegrated, 
    data.integratedKhasraNumber, data.office
  ];

  const sql1 = `INSERT INTO applicantdata (
    formId, fullName, LUB, Srno, registrationDate, Hno, neighbourhoodColony, district, 
    surveyNumber, area, village, neighbourhoodColony4, district4, developedLandName, 
    village5, neighbourhoodColony5, district5, relinquishment, permitPurpose, 
    mobileNumber, email, tinGstnNumber, EWS, EWS_Less, outside_res_area, inside_res_area, 
    CGR_Residential_Area, CGR_Land_Area, EWS_Residential_Area, EWS_Land_Area, CGRAmount, 
    clearancePWD, clearanceWRD, clearanceCSEB, clearanceCECB, clearanceNHAI, clearancePHED, 
    clearancePMGSY, clearanceFOREST, clearanceFireNOC, clearanceGramPanchayat, 
    clearanceNNNPTP, clearanceRevenue, clearanceRES
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values1 = [
    data.applicantData.formId, data.applicantData.fullName, data.applicantData.LUB, data.applicantData.Srno, data.applicantData.registrationDate, data.applicantData.Hno, 
    data.applicantData.neighbourhoodColony, data.applicantData.district, data.applicantData.surveyNumber, data.applicantData.area, data.applicantData.village, 
    data.applicantData.neighbourhoodColony4, data.applicantData.district4, data.applicantData.developedLandName, data.applicantData.village5, 
    data.applicantData.neighbourhoodColony5, data.applicantData.district5, data.applicantData.relinquishment, data.applicantData.permitPurpose, 
    data.applicantData.mobileNumber, data.applicantData.email, data.applicantData.tinGstnNumber, data.applicantData.EWS, data.applicantData.EWS_Less, data.applicantData.outside_res_area, 
    data.applicantData.inside_res_area, data.applicantData.CGR_Residential_Area, data.applicantData.CGR_Land_Area, data.applicantData.EWS_Residential_Area, 
    data.applicantData.EWS_Land_Area, data.applicantData.CGRAmount, data.applicantData.clearancePWD || null, data.applicantData.clearanceWRD || null, 
    data.applicantData.clearanceCSEB || null, data.applicantData.clearanceCECB || null, data.applicantData.clearanceNHAI || null, 
    data.applicantData.clearancePHED || null, data.applicantData.clearancePMGSY || null, data.applicantData.clearanceFOREST || null, 
    data.applicantData.clearanceFireNOC || null, data.applicantData.clearanceGramPanchayat || null, data.applicantData.clearanceNNNPTP || null, 
    data.applicantData.clearanceRevenue || null, data.applicantData.clearanceRES || null
  ];

  // console.log('SQL Query:', sql);
  // console.log('Values:', values);

  pool.getConnection()
    .then(conn => {
      conn.query(sql, values)
        .then(result => {
        //  console.log('Applying form Data inserted successfully:', result);
          conn.query(sql1, values1).then(result1 => {
            console.log( data.applicantData.surveyNumber,'1')

            console.log('Done');
          });
          console.log('DOneeee');
          res.status(200).json({ message: 'Applying form data saved successfully' });
          
        })
        .catch(err => {
          console.error('Database error:', err);
          res.status(500).json({ error: err.message });
           
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

const saveApplicantData = (req, res) => {
  console.log('Received applicant data:'); // , data
  const data = req.body;
  // console.log('Received applicant data:', data);

  return;
  const sql = `INSERT INTO applicantdata (
    formId, fullName, LUB, Srno, registrationDate, Hno, neighbourhoodColony, district, 
    surveyNumber, area, village, neighbourhoodColony4, district4, developedLandName, 
    village5, neighbourhoodColony5, district5, relinquishment, permitPurpose, 
    mobileNumber, email, tinGstnNumber, EWS, EWSLess, outside_res_area, inside_res_area, 
    CGR_Residential_Area, CGR_Land_Area, EWS_Residential_Area, EWS_Land_Area, CGRAmount, 
    clearancePWD, clearanceWRD, clearanceCSEB, clearanceCECB, clearanceNHAI, clearancePHED, 
    clearancePMGSY, clearanceFOREST, clearanceFireNOC, clearanceGramPanchayat, 
    clearanceNNNPTP, clearanceRevenue, clearanceRES
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    data.formId, data.fullName, data.LUB, data.Srno, data.registrationDate, data.Hno, 
    data.neighbourhoodColony, data.district, data.surveyNumber, data.area, data.village, 
    data.neighbourhoodColony4, data.district4, data.developedLandName, data.village5, 
    data.neighbourhoodColony5, data.district5, data.relinquishment, data.permitPurpose, 
    data.mobileNumber, data.email, data.tinGstnNumber, data.EWS, data.EWSLess, data.outside_res_area, 
    data.inside_res_area, data.CGR_Residential_Area, data.CGR_Land_Area, data.EWS_Residential_Area, 
    data.EWS_Land_Area, data.CGRAmount, data.clearances.clearancePWD || null, data.clearances.clearanceWRD || null, 
    data.clearances.clearanceCSEB || null, data.clearances.clearanceCECB || null, data.clearances.clearanceNHAI || null, 
    data.clearances.clearancePHED || null, data.clearances.clearancePMGSY || null, data.clearances.clearanceFOREST || null, 
    data.clearances.clearanceFireNOC || null, data.clearances.clearanceGramPanchayat || null, data.clearances.clearanceNNNPTP || null, 
    data.clearances.clearanceRevenue || null, data.clearances.clearanceRES || null
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