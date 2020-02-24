const Vaccines = async (code) => {
  try {
    const url = `https://api.tugo.com/v1/travelsafe/countries/${code}`;
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Auth-API-Key': '7bq7gsk46t2dw37j4dcaaccu',
      },
    });
    const res = await response.json();
    const vaccinesArray = res.health.diseasesAndVaccinesInfo.Vaccines;
    return vaccinesArray.slice(2, vaccinesArray.length).map((v) => v.category).join(', ');
  } catch {
    return 'No vaccination information could be found';
  }
};

export default Vaccines;
