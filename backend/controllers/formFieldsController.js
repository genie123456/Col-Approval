const pool = require('../dbConfig');

// Controller to save applying form data and applicant data
const saveApplyingFormData = async (req, res) => {
  const data = req.body;

  // Ensure username is extracted from session
  const username = req.session.user && req.session.user.username;

  if (!username) {
    return res.status(401).json({ message: 'User not logged in' });
  }

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
    const [result] = await conn.query(sqlFormFields, valuesFormFields);
    const formId = result.insertId;

    console.log('FormFields query result:', result);
    console.log('FormId:', formId);

    const sqlApplicantData = `INSERT INTO applicantdata (
      formId, username, fullName, LUB, Srno, registrationDate, Hno, neighbourhoodColony, district, 
      surveyNumber, land_area, village, neighbourhoodColony4, district4, developedLandName, 
      village5, neighbourhoodColony5, district5, relinquishment, permitPurpose, 
      mobileNumber, email, tinGstnNumber, EWS, EWS_Less, outside_res_area, inside_res_area, 
      CGR_Residential_Area, CGR_Land_Area, EWS_Residential_Area, EWS_Land_Area, CGRAmount, 
      clearancePWD, clearanceWRD, clearanceCSEB, clearanceCECB, clearanceNHAI, clearancePHED, 
      clearancePMGSY, clearanceFOREST, clearanceFireNOC, clearanceGramPanchayat, 
      clearanceNNNPTP, clearanceRevenue, clearanceRES
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const valuesApplicantData = [
      formId, username, data.applicantData.fullName, data.applicantData.LUB, data.applicantData.Srno, data.applicantData.registrationDate, data.applicantData.Hno, 
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
    console.log('Form Fields Data:', resultFormFields);

    if (!resultFormFields || resultFormFields.length === 0) {
      res.status(404).json({ message: 'Applying form data not found' });
    } else {
      const formFieldsData = resultFormFields[0];
      const [resultApplicantData] = await conn.query(sqlApplicantData, [id]);
      console.log('Applicant Data:', resultApplicantData);

      const responseData = {
        formFieldsData: formFieldsData,
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
    const [rows] = await conn.query(sql);
    console.log('Query executed');
    // console.log('SQL Query:', sql);
    console.log('Number of rows fetched:', rows.length);
    // console.log('Rows:', JSON.stringify(rows, null, 2));
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

const getJoinedFormFieldsDataById = async (req, res) => {
  const id = req.params.id;
  console.log(`Received request for joined form data with ID: ${id}`);

  const sql = `
    SELECT 
      ff.*, ad.*
    FROM formfields ff
    LEFT JOIN applicantdata ad ON ff.id = ad.formId
    WHERE ff.id = ?
  `;

  let conn; // Define the connection variable outside the try block

  try {
    conn = await pool.getConnection();
    const [rows] = await conn.query(sql, [id]);
    console.log('Query executed');
    // console.log('Raw query result:', rows);

    // Since rows is an object, we don't need to check if it's an array
    if (rows === null) {
      res.status(404).json({ message: 'No form fields data found' });
    } else {
      res.status(200).json(rows); // Directly return the object
    }
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: err.message });
  } finally {
    if (conn) conn.release(); // Ensure the connection is released
  }
};

module.exports = {
  saveApplyingFormData,
  getApplyingFormData,
  getAllFormFieldsData,
  getJoinedFormFieldsDataById,
};