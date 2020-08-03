package formats.sdf

import edu.rpi.tw.twks.uri.Uri
import models.schema.Schema
import models.validation.ValidationMessage
import org.apache.jena.rdf.model.Resource

case class SdfDocument(id: Uri, schemas: List[Schema], sdfVersion: String, sourceJson: String, validationMessages: List[ValidationMessage]) {
  def name: String =
    if (!schemas.isEmpty) {
      schemas(0).name
    } else {
      id.toString
    }
}
