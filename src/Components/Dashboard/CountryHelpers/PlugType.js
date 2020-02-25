import fetchWithTimeout from './fetchWithTimeout';

const PlugType = async (countryName) => {
  try {
    const Types = [];
    const Volts = [];
    const ret = {};
    const temp = await fetchWithTimeout('plug-type.json');
    const response = await temp.json();
    response
      .filter((country) => country.name === countryName)
      .forEach((country) => {
        Types.push(country.plug_type);
        Volts.push(country.voltage);
      });
    ret.type = Types;
    ret.volt = Volts;
    return Types.length !== 0 ? ret : null;
  } catch {
    return null;
  }
};
export default PlugType;
