export interface SdfDocumentPath {
  sdfDocument: {
    id: string;
    primitive?: {
      id: string;
      slot?: {
        id: string;
      } | null;
    } | null;
    schema?: {
      id: string;
      slot?: {
        id: string;
      } | null;
      step?: {
        id: string;
        participant?: {
          id: string;
        } | null;
      } | null;
    } | null;
  };
}
