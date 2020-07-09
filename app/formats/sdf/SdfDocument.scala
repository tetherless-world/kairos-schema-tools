package formats.sdf

import edu.rpi.tw.twks.uri.Uri
import models.schema.Schema
import org.apache.jena.rdf.model.Resource

case class SdfDocument(id: Uri, schemas: List[Schema], sdfVersion: String, sourceJson: String)
