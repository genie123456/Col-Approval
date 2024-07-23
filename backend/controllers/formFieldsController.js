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
    const formId = result.insertId || result[0].insertId;

    console.log('FormFields query result:', result);
console.log('FormId:', formId);


    const sqlApplicantData = `INSERT INTO applicantdata (
      formId, fullName, LUB, Srno, registrationDate, Hno, neighbourhoodColony, district, 
      surveyNumber, land_area, village, neighbourhoodColony4, district4, developedLandName, 
      village5, neighbourhoodColony5, district5, relinquishment, permitPurpose, 
      mobileNumber, email, tinGstnNumber, EWS, EWS_Less, outside_res_area, inside_res_area, 
      CGR_Residential_Area, CGR_Land_Area, EWS_Residential_Area, EWS_Land_Area, CGRAmount, 
      clearancePWD, clearanceWRD, clearanceCSEB, clearanceCECB, clearanceNHAI, clearancePHED, 
      clearancePMGSY, clearanceFOREST, clearanceFireNOC, clearanceGramPanchayat, 
      clearanceNNNPTP, clearanceRevenue, clearanceRES
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const valuesApplicantData = [
      formId, data.applicantData.fullName, data.applicantData.LUB, data.applicantData.Srno, data.applicantData.registrationDate, data.applicantData.Hno, 
      data.applicantData.neighbourhoodColony, data.applicantData.district, data.applicantData.surveyNumber, data.applicantData.land_area, data.applicantData.village, 
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

    console.log('ApplicantData:', data.applicantData);

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
      
      const responseData = {
        formFieldsData,
        applicantData: resultApplicantData.length > 0 ? resultApplicantData[0] : null
      };

      res.status(200).json(responseData);
    }
    conn.release();
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: err.message });
  }
};
const getAllFormFieldsData = async (req, res) => {
  const sql = `
    SELECT 
      ff.*, ad.*
    FROM formfields ff
    LEFT JOIN applicantdata ad ON ff.id = ad.formId
  `;

  try {
    const conn = await pool.getConnection();
    console.log('Connected to database');

    const rows = await conn.query(sql);
    console.log('Query executed');
    console.log('SQL Query:', sql);
    console.log('Number of rows fetched:', rows.length);
    console.log('Rows:', JSON.stringify(rows, null, 2));

    // Convert rows to a plain JavaScript array
    const plainRows = rows.map(row => ({...row}));

    if (plainRows.length === 0) {
      res.status(404).json({ message: 'No form fields data found' });
    } else {
      res.status(200).json(plainRows);
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

// Controller to get all form fields data
// const getAllFormFieldsData = async (req, res) => {
//   const sql = `
//     SELECT 
//       ff.id, ff.selectedDistrict, ff.area, ff.body, ff.choosingCorporation, 
//       ff.choosingCouncil, ff.choosingJury, ff.khasraIntegrated, ff.integratedKhasraNumber, ff.office,
//       ad.fullName, ad.LUB, ad.Srno, ad.registrationDate, ad.Hno, ad.neighbourhoodColony, ad.district, 
//       ad.surveyNumber, ad.area AS applicantArea, ad.village, ad.neighbourhoodColony4, ad.district4, 
//       ad.developedLandName, ad.village5, ad.neighbourhoodColony5, ad.district5, ad.relinquishment, 
//       ad.permitPurpose, ad.mobileNumber, ad.email, ad.tinGstnNumber, ad.EWS, ad.EWS_Less, ad.outside_res_area, 
//       ad.inside_res_area, ad.CGR_Residential_Area, ad.CGR_Land_Area, ad.EWS_Residential_Area, 
//       ad.EWS_Land_Area, ad.CGRAmount, ad.clearancePWD, ad.clearanceWRD, ad.clearanceCSEB, 
//       ad.clearanceCECB, ad.clearanceNHAI, ad.clearancePHED, ad.clearancePMGSY, ad.clearanceFOREST, 
//       ad.clearanceFireNOC, ad.clearanceGramPanchayat, ad.clearanceNNNPTP, ad.clearanceRevenue, 
//       ad.clearanceRES
//     FROM formfields ff
//     LEFT JOIN applicantdata ad ON ff.id = ad.formId
//   `;

//   try {
//     const conn = await pool.getConnection();
//     const [result] = await conn.query(sql);

//     console.log('Fetched form fields and applicant data:', result); // Add this line for logging

//     if (result.length === 0) {
//       res.status(404).json({ message: 'No form fields data found' });
//     } else {
//       res.status(200).json(result);
//     }
//     conn.release();
//   } catch (err) {
//     console.error('Database error:', err);
//     res.status(500).json({ error: err.message });
//   }
// };