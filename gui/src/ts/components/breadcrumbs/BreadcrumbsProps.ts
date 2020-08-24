export interface BreadcrumbsProps {
  sdfDocument: {
    id: string;
    label: string;
    primitive?: {id: string; label: string};
    schema?: {id: string; label: string};
  };
}
