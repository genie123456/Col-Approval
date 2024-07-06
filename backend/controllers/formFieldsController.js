const pool = require('../dbConfig');

// Controller to save applying form data and applicant data
const saveApplyingFormData = (req, res) => {
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

  pool.getConnection()
    .then(conn => {
      conn.query(sqlFormFields, valuesFormFields)
        .then(result => {
          const formId = result.insertId; // Get the ID of the inserted formfields row
          console.log('Applying form data saved successfully with ID:', formId);

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

          return conn.query(sqlApplicantData, valuesApplicantData)
            .then(result1 => {
              console.log('Applicant data saved successfully');
              res.status(200).json({ message: 'Data saved successfully' });
              conn.release();
            });
        })
        .catch(err => {
          console.error('Database error:', err);
          res.status(500).json({ error: err.message });
          conn.release();
        });
    })
    .catch(err => {
      console.error('Error getting connection:', err);
      res.status(500).json({ error: err.message });
    });
};


// Controller to get applying form and applicant data by ID
const getApplyingFormData = (req, res) => {
  const id = req.params.id;
  console.log(`Received request for applying form data with ID: ${id}`);
  
  const sqlFormFields = 'SELECT * FROM formfields WHERE id = ?';
  const sqlApplicantData = 'SELECT * FROM applicantdata WHERE formId = ?';

  pool.getConnection()
    .then(conn => {
      conn.query(sqlFormFields, [id])
        .then(resultFormFields => {
          console.log(`Executing query: ${sqlFormFields} with id: ${id}`);
          if (resultFormFields.length === 0) {
            console.log(`No data found for id: ${id}`);
            res.status(404).json({ message: 'Applying form data not found' });
          } else {
            const formFieldsData = resultFormFields[0];
            conn.query(sqlApplicantData, [id])
              .then(resultApplicantData => {
                console.log(`Executing query: ${sqlApplicantData} with formId: ${id}`);
                if (resultApplicantData.length === 0) {
                  console.log(`No applicant data found for formId: ${id}`);
                  res.status(404).json({ message: 'Applicant data not found' });
                } else {
                  const applicantData = resultApplicantData[0];
                  res.status(200).json({ formFieldsData, applicantData });
                }
                conn.release(); // Release the connection
              });
          }
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

module.exports = {
  saveApplyingFormData,
  getApplyingFormData,
  // getApplicantData
};
