package stores

import edu.rpi.tw.twks.uri.Uri
import models.schema.Schema

trait Store {
  def getSchemaById(id: Uri): Option[Schema]
  def getSchemas: List[Schema]

  def putSchema(schema: Schema)
}
