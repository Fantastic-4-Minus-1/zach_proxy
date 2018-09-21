const getCompanyName = () => {
  return `${window.location.pathname}`.split("/")[1];
}

export default getCompanyName;