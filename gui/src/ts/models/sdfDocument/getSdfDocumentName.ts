export const getSdfDocumentName = (sdfDocument: {
  id: string;
  schemas: {id: string; name: string}[];
}) => {
  if (sdfDocument.schemas.length === 1) {
    return sdfDocument.schemas[0].name;
  } else {
    return sdfDocument.id;
  }
};
