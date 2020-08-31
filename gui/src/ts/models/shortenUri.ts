import {NamespacePrefixFragment} from "api/queries/types/NamespacePrefixFragment";

export const shortenUri = (kwds: {
  namespacePrefixes: readonly NamespacePrefixFragment[] | null | undefined;
  uri: string;
}) => {
  const {namespacePrefixes, uri} = kwds;
  if (!namespacePrefixes) {
    return uri;
  }
  for (const namespacePrefix of namespacePrefixes) {
    if (uri.startsWith(namespacePrefix.uri)) {
      return (
        namespacePrefix.prefix + ":" + uri.substring(namespacePrefix.uri.length)
      );
    }
  }
  return uri;
};
