package models.schema

import edu.rpi.tw.twks.uri.Uri

final case class SdfDocumentPath(sdfDocument: SdfDocumentPath.SdfDocumentPathSdfDocument)

object SdfDocumentPath {
  final case class SdfDocumentPathPrimitive(id: Uri, slot: Option[SdfDocumentPathPrimitiveSlot]) {}

  final case class SdfDocumentPathPrimitiveSlot(id: Uri)

  final case class SdfDocumentPathStep(id: Uri, participant: Option[SdfDocumentPathStepParticipant])

  final case class SdfDocumentPathStepParticipant(id: Uri)

  final case class SdfDocumentPathSchema(id: Uri, slot: Option[SdfDocumentPathSchemaSlot], step: Option[SdfDocumentPathStep]) {
    if (slot.isDefined && step.isDefined) {
      throw new IllegalArgumentException("may only specify one of slot or step")
    }
  }

  final case class SdfDocumentPathSchemaSlot(id: Uri)

  final case class SdfDocumentPathSdfDocument(id: Uri, primitive: Option[SdfDocumentPathPrimitive], schema: Option[SdfDocumentPathSchema]) {
    if (primitive.isDefined && schema.isDefined) {
      throw new IllegalArgumentException("may only specify one of primitive or schema")
    }
  }

  class SdfDocumentPathBuilder(sdfDocumentId: Uri) {
    class SdfDocumentPathPrimitiveBuilder(primitiveId: Uri) {
      def build = SdfDocumentPath(sdfDocument = SdfDocumentPathSdfDocument(id = sdfDocumentId, primitive = Some(SdfDocumentPathPrimitive(id = primitiveId, slot = None)), schema = None))
      def slot(id: Uri) = SdfDocumentPath(sdfDocument = SdfDocumentPathSdfDocument(id = sdfDocumentId, primitive = Some(SdfDocumentPathPrimitive(id = primitiveId, slot = Some(SdfDocumentPathPrimitiveSlot(id = id)))), schema = None))
    }

    class SdfDocumentPathSchemaBuilder(schemaId: Uri) {
      class SdfDocumentPathSchemaStepBuilder(stepId: Uri) {
        def build = SdfDocumentPath(sdfDocument = SdfDocumentPathSdfDocument(id = sdfDocumentId, primitive = None, schema = Some(SdfDocumentPathSchema(id = schemaId, slot = None, step = Some(SdfDocumentPathStep(id = stepId, participant = None))))))
        def participant(id: Uri) = SdfDocumentPath(sdfDocument = SdfDocumentPathSdfDocument(id = sdfDocumentId, primitive = None, schema = Some(SdfDocumentPathSchema(id = schemaId, slot = None, step = Some(SdfDocumentPathStep(id = stepId, participant = Some(SdfDocumentPathStepParticipant(id = id))))))))
      }

      def build = SdfDocumentPath(sdfDocument = SdfDocumentPathSdfDocument(id = sdfDocumentId, primitive = None, schema = Some(SdfDocumentPathSchema(id = schemaId, slot = None, step = None))))
      def slot(id: Uri) = SdfDocumentPath(sdfDocument = SdfDocumentPathSdfDocument(id = sdfDocumentId, primitive = None, schema = Some(SdfDocumentPathSchema(id = schemaId, slot = Some(SdfDocumentPathSchemaSlot(id = id)), step = None))))
      def step(id: Uri) = new SdfDocumentPathSchemaStepBuilder(stepId = id)
    }


    def build = SdfDocumentPath(sdfDocument = SdfDocumentPathSdfDocument(id = sdfDocumentId, primitive = None, schema = None))
    def primitive(id: Uri) = new SdfDocumentPathPrimitiveBuilder(primitiveId = id)
    def schema(id: Uri) = new SdfDocumentPathSchemaBuilder(schemaId = id)
  }

  def builder(id: Uri) = new SdfDocumentPathBuilder(id)
}
