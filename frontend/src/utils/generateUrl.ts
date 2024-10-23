export const generateUrl = (url: string | undefined) => {
    if (!url) {
      // Handle the case where 'url' is undefined or null
      return '';
    }
  
    const [baseUrl, ...rest] = url.split("/upload/");
  
    return `https://${baseUrl.slice(7)}/upload/c_fill,w_400/f_auto/q_auto/${rest.join("/upload/")}`;
  };



  


  export const generateSeoUrl = (url: string | undefined) => {
    if (!url) {
      // Handle the case where 'url' is undefined or null
      return '';
    }
  
    const [baseUrl, ...rest] = url.split("/upload/");
  
    return `https://${baseUrl.slice(7)}/upload/c_fill,w_640/f_auto/q_auto/${rest.join("/upload/")}`;
  };


  export const generatedeskSeoUrl = (url: string | undefined) => {
    if (!url) {
      // Handle the case where 'url' is undefined or null
      return '';
    }
  
    const [baseUrl, ...rest] = url.split("/upload/");
  
    return `https://${baseUrl.slice(7)}/upload/c_fill,w_1970/f_auto/q_auto/${rest.join("/upload/")}`;
  };