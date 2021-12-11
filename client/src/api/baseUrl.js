let baseUrl
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  baseUrl = `http://localhost:5000`
} else {
  baseUrl = process.env.REACT_APP_API_ADDRESS
}
export default baseUrl