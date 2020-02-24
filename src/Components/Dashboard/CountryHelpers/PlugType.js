const PlugType = async (countryName) => {
  if (countryName) {
    const Types = [];
    const Volts = [];
    const ret = {};
    const temp = await fetch('plug-type.json');
    const response = await temp.json();
    response
      .filter((country) => country.name === countryName)
      .forEach((country) => {
        Types.push(country.plug_type);
        Volts.push(country.voltage);
      });
    ret.type = Types;
    ret.volt = Volts;
    return ret;
  }
  return undefined;
};
export default PlugType;
