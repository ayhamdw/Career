const errorFunction = (errorBit, msg, data) => {
  if (errorBit) return { isError: errorBit, message: msg };
  else return { isError: errorBit, message: msg, data: data };
};
module.exports = errorFunction;
//! errorBit: For Checking IF the Error Occur Or Nor
//! msg: For Display The Message When The Error Occur OR Not
//! data: To Send The Data When The Error Not Occur
//* Whenever an error occurs, it will return – errorBit and msg or else errorBit, msg and data.
//* Whenever an error occurs, it will return – errorBit and msg or else errorBit, msg and data.
