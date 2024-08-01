const pool = require('../dbConfig');

// Controller to save applying form data and applicant data
const saveApplyingFormData = async (req, res) => {
  const data = req.body;

  const sqlFormFields = `INSERT INTO formfields (
    username, selectedDistrict, area, body, choosingCorporation, choosingCouncil, 
    choosingJury, khasraIntegrated, integratedKhasraNumber, office
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
  const valuesFormFields = [
    data.username, data.selectedDistrict, data.area, data.body, data.choosingCorporation,
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
      formId, username, fullName, LUB, Srno, registrationDate, Hno, 
      neighbourhoodColony, district, surveyNumber, land_area, village, 
      neighbourhoodColony4, district4, developedLandName, village5, 
      neighbourhoodColony5, district5, relinquishment, permitPurpose, 
      mobileNumber, applicant_email, tinGstnNumber, EWS, EWS_Less, 
      outside_res_area, inside_res_area, CGR_Residential_Area, CGR_Land_Area, 
      EWS_Residential_Area, EWS_Land_Area, CGRAmount, clearancePWD, clearanceWRD, 
      clearanceCSEB, clearanceCECB, clearanceNHAI, clearancePHED, 
      clearancePMGSY, clearanceFOREST, clearanceFireNOC, clearanceGramPanchayat, 
      clearanceNNNPTP, clearanceRevenue, clearanceRES
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const valuesApplicantData = [
      formId,
      data.username || null,  
      data.applicantData.fullName || null,
      data.applicantData.LUB || null,
      data.applicantData.Srno || null,
      data.applicantData.registrationDate || null,
      data.applicantData.Hno || null,
      data.applicantData.neighbourhoodColony || null,
      data.applicantData.district || null,
      data.applicantData.surveyNumber || null,
      data.applicantData.land_area || null,
      data.applicantData.village || null,
      data.applicantData.neighbourhoodColony4 || null,
      data.applicantData.district4 || null,
      data.applicantData.developedLandName || null,
      data.applicantData.village5 || null,
      data.applicantData.neighbourhoodColony5 || null,
      data.applicantData.district5 || null,
      data.applicantData.relinquishment || null,
      data.applicantData.permitPurpose || null,
      data.applicantData.mobileNumber || null,
      data.applicantData.applicant_email || null,
      data.applicantData.tinGstnNumber || null,
      data.applicantData.EWS || null,
      data.applicantData.EWS_Less || null,
      data.applicantData.outside_res_area || null,
      data.applicantData.inside_res_area || null,
      data.applicantData.CGR_Residential_Area || null,
      data.applicantData.CGR_Land_Area || null,
      data.applicantData.EWS_Residential_Area || null,
      data.applicantData.EWS_Land_Area || null,
      data.applicantData.CGRAmount || null,
      data.applicantData.clearancePWD || null,
      data.applicantData.clearanceWRD || null,
      data.applicantData.clearanceCSEB || null,
      data.applicantData.clearanceCECB || null,
      data.applicantData.clearanceNHAI || null,
      data.applicantData.clearancePHED || null,
      data.applicantData.clearancePMGSY || null,
      data.applicantData.clearanceFOREST || null,
      data.applicantData.clearanceFireNOC || null,
      data.applicantData.clearanceGramPanchayat || null,
      data.applicantData.clearanceNNNPTP || null,
      data.applicantData.clearanceRevenue || null,
      data.applicantData.clearanceRES || null
    ];

    console.log('ApplicantData:', valuesApplicantData);

    await conn.query(sqlApplicantData, valuesApplicantData);
    res.status(200).json({ message: 'Data saved successfully' });
    conn.release();
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: err.message });
  }
};

// getApplyingFormData
const getApplyingFormData = async (req, res) => {
  const id = req.params.id;
  console.log(`Received request for applying form data with ID: ${id}`);

  const sqlFormFields = 'SELECT * FROM formfields WHERE formfields_id = ?';
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
        applicantData: resultApplicantData.length > 0 ? resultApplicantData[0] : {}
      };

      res.status(200).json(responseData);
    }
    conn.release();
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: err.message });
  }
};

// getAllFormFieldsData
const getAllFormFieldsData = async (req, res) => {
  const sql = `
    SELECT ff.*, ad.* 
    FROM formfields ff 
    LEFT JOIN applicantdata ad ON ff.formfields_id = ad.formId
  `;

  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query(sql);
    console.log('Query executed');
    console.log('Number of rows fetched:', rows.length);

    if (rows.length === 0) {
      res.status(404).json({ message: 'No form fields data found' });
    } else {
      res.status(200).json(rows);
    }
    conn.release();
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: err.message });
  }
};

// getJoinedFormFieldsDataById
const getJoinedFormFieldsDataById = async (req, res) => {
  const id = req.params.id;
  console.log(`Received request for joined form data with ID: ${id}`);

  const sql = `
    SELECT ff.*, ad.* 
    FROM formfields ff 
    LEFT JOIN applicantdata ad ON ff.formfields_id = ad.formId 
    WHERE ff.formfields_id = ?
  `;

  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query(sql, [id]);
    console.log('Query executed');
    // console.log('Fetched rows:', rows);

    if (rows.length === 0) {
      res.status(404).json({ message: 'No form fields data found' });
    } else {
      const formFieldsData = rows[0];
      const applicantData = rows[0];  // Use the first row for applicant data if it exists
      
      res.status(200).json({
        formFieldsData,
        applicantData: applicantData || {}  // Ensure applicantData is not undefined
      });
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
  getAllFormFieldsData,
  getJoinedFormFieldsDataById,
};