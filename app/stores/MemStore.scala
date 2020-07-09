package stores

import edu.rpi.tw.twks.uri.Uri
import models.schema.Schema

import scala.collection.mutable

class MemStore extends Store {
  final override def getSchemaById(id: Uri): Option[Schema] =
    schemasById.get(id)

  final override def getSchemas: List[Schema] =
    schemasById.values.toList

  final override def putSchema(schema: Schema): Unit =
    schemasById.update(schema.id, schema)

  private val schemasById = new mutable.HashMap[Uri, Schema]
}
