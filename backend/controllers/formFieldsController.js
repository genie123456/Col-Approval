const pool = require('../dbConfig');

// Controller to save applying form data and applicant data
const saveApplyingFormData = async (req, res) => {
  const data = req.body;

  const sqlFormFields = `INSERT INTO formfields (
    selectedDistrict, area, body, choosingCorporation, choosingCouncil, choosingJury, 
    khasraIntegrated, integratedKhasraNumber, office
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const valuesFormFields = [
    data.selectedDistrict, data.area, data.body, data.choosingCorporation,
    data.choosingCouncil, data.choosingJury, data.khasraIntegrated, 
    data.integratedKhasraNumber, data.office
  ];

  try {
    const conn = await pool.getConnection();
    const result = await conn.query(sqlFormFields, valuesFormFields);
    const formId = result[0].insertId; // Get the ID of the inserted formfields row

    const sqlApplicantData = `INSERT INTO applicantdata (
      formId, fullName, LUB, Srno, registrationDate, Hno, neighbourhoodColony, district, 
      surveyNumber, area, village, neighbourhoodColony4, district4, developedLandName, 
      village5, neighbourhoodColony5, district5, relinquishment, permitPurpose, 
      mobileNumber, email, tinGstnNumber, EWS, EWS_Less, outside_res_area, inside_res_area, 
      CGR_Residential_Area, CGR_Land_Area, EWS_Residential_Area, EWS_Land_Area, CGRAmount, 
      clearancePWD, clearanceWRD, clearanceCSEB, clearanceCECB, clearanceNHAI, clearancePHED, 
      clearancePMGSY, clearanceFOREST, clearanceFireNOC, clearanceGramPanchayat, 
      clearanceNNNPTP, clearanceRevenue, clearanceRES
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const valuesApplicantData = [
      formId, data.applicantData.fullName, data.applicantData.LUB, data.applicantData.Srno, data.applicantData.registrationDate, data.applicantData.Hno, 
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

    await conn.query(sqlApplicantData, valuesApplicantData);
    res.status(200).json({ message: 'Data saved successfully' });
    conn.release();
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Controller to get applying form and applicant data by ID
const getApplyingFormData = async (req, res) => {
  const id = req.params.id;
  console.log(`Received request for applying form data with ID: ${id}`);
  
  const sqlFormFields = 'SELECT * FROM formfields WHERE id = ?';
  const sqlApplicantData = 'SELECT * FROM applicantdata WHERE formId = ?';

  try {
    const conn = await pool.getConnection();
    const [resultFormFields] = await conn.query(sqlFormFields, [id]);
    
    if (resultFormFields.length === 0) {
      res.status(404).json({ message: 'Applying form data not found' });
    } else {
      const formFieldsData = resultFormFields[0];
      const [resultApplicantData] = await conn.query(sqlApplicantData, [id]);
      
      if (resultApplicantData.length === 0) {
        res.status(404).json({ message: 'Applicant data not found' });
      } else {
        const applicantData = resultApplicantData[0];
        res.status(200).json({ formFieldsData, applicantData });
      }
    }
    conn.release();
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Controller to get all form fields data
const getAllFormFieldsData = async (req, res) => {
  const sql = 'SELECT * FROM formfields';

  try {
    const conn = await pool.getConnection();
    const [result] = await conn.query(sql);

    if (result.length === 0) {
      res.status(404).json({ message: 'No form fields data found' });
    } else {
      res.status(200).json(result);
    }
    conn.release();
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  saveApplyingFormData,
  getApplyingFormData,
  getAllFormFieldsData
};

// const getApplyingFormData = (req, res) => {
//   const id = req.params.id;
//   console.log(`Received request for applying form data with ID: ${id}`);
//   const sql = 'SELECT * FROM formfields WHERE id = ?';

//   pool.getConnection()
//     .then(conn => {
//       conn.query(sql, [id])
//         .then(result => {
//           console.log(`Executing query: ${sql} with id: ${id}`);
//           if (result.length === 0) {
//             console.log(`No data found for id: ${id}`);
//             res.status(404).json({ message: 'Applying form data not found' });
//           } else {
//             console.log(`Data found for id: ${id}`, result[0]);
//             res.status(200).json(result[0]);
//           }
//           conn.release(); // Release the connection
//         })
//         .catch(err => {
//           console.error('Database error:', err);
//           res.status(500).json({ error: err.message });
//           conn.release(); // Release the connection on error
//         });
//     })
//     .catch(err => {
//       console.error('Error getting connection:', err);
//       res.status(500).json({ error: err.message });
//     });
// };

// const getApplicantData = (req, res) => {
//   const id = req.params.id;
//   console.log(`Received request for applicant data with ID: ${id}`);
//   const sql = 'SELECT * FROM applicantdata WHERE application_id = ?';

//   pool.getConnection()
//     .then(conn => {
//       conn.query(sql, [id])
//         .then(result => {
//           console.log(`Executing query: ${sql} with id: ${id}`);
//           if (result.length === 0) {
//             console.log(`No data found for id: ${id}`);
//             res.status(404).json({ message: 'Applicant data not found' });
//           } else {
//             console.log(`Data found for id: ${id}`, result[0]);
//             res.status(200).json(result[0]);
//           }
//           conn.release(); // Release the connection
//         })
//         .catch(err => {
//           console.error('Database error:', err);
//           res.status(500).json({ error: err.message });
//           conn.release(); // Release the connection on error
//         });
//     })
//     .catch(err => {
//       console.error('Error getting connection:', err);
//       res.status(500).json({ error: err.message });
//     });
// };
