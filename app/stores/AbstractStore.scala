package stores

import edu.rpi.tw.twks.uri.Uri
import formats.sdf.SdfDocument
import models.schema.{Primitive, Schema}

abstract class AbstractStore extends Store {
  override def getPrimitiveById(id: Uri): Option[Primitive] =
    getPrimitives.find(_.id == id)

  override def getPrimitives: List[Primitive] =
    getSdfDocuments.flatMap(_.primitives)

  override def getSchemaById(id: Uri): Option[Schema] =
    getSchemas.find(_.id == id)

  override def getSchemas: List[Schema] =
    getSdfDocuments.flatMap(_.schemas)

  override def getSdfDocumentById(id: Uri): Option[SdfDocument] =
    getSdfDocuments.find(_.id == id)
}
