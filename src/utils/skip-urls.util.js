// these are your public routes : no token is required
const skipUrls = [
    { method: ["post"], url: "/auth/login" },
    { method: ["post"], url: "/auth/register" },
    { method: ["get"], url: "/product" },
    //{ method: ["get"], url: "/order" },
  ];
  const checkIfToBeSkipped = (request) => {
    // check if url is listed
    const filtered = skipUrls.find((s) => request.url.includes(s.url));
    if (filtered) {
      // check if method is listed
      return filtered.method.includes(request.method.toLowerCase());
    }
    return false;
  };
  module.exports = checkIfToBeSkipped;
  