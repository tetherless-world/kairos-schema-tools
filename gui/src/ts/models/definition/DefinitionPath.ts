// Define a DefinitionPath interface instead of using the generated fragment everywhere,
// because it needs to be constructed and deserialized by hand,
// and we don't want to require __typename.
export interface DefinitionPath {
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
      entity?: {
        id: string;
      } | null;
      provenanceDataObject?: {
        id: string;
      } | null;
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
