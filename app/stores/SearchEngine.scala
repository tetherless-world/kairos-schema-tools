package stores

import com.outr.lucene4s.{DirectLucene, _}
import com.outr.lucene4s.field.FieldType
import com.outr.lucene4s.field.value.FieldAndValue
import edu.rpi.tw.twks.uri.Uri
import models.schema.{DefinitionPath, Primitive, PrimitiveSlot, Schema, SchemaSlot, Step, StepParticipant}
import models.sdfDocument.SdfDocument
import models.search.{SearchDocument, SearchDocumentType, SearchResults}

final class SearchEngine {
  private val lucene = new DirectLucene(List("aka", "comments", "label", "schemaId", "sdfDocumentId", "type"), autoCommit = false)

  private object Facets {
    val `type` = lucene.create.facet("type")
  }

  private object Fields {
    val aka = lucene.create.field[String]("aka", fieldType = FieldType.NotStored, fullTextSearchable = true)
    val comments = lucene.create.field[String]("comments", fieldType = FieldType.NotStored, fullTextSearchable = true)
    val id = lucene.create.field[String]("id", fieldType = FieldType.Untokenized)
    val label = lucene.create.field[String]("label", fullTextSearchable = true)
    val primitiveId = lucene.create.field[String]("primitiveId", fieldType = FieldType.Untokenized)
    val primitiveSlotId = lucene.create.field[String]("primitiveSlotId", fieldType = FieldType.Untokenized)
    val schemaId = lucene.create.field[String]("schemaId", fieldType = FieldType.Untokenized)
    val schemaSlotId = lucene.create.field[String]("schemaSlotId", fieldType = FieldType.Untokenized)
    val sdfDocumentId = lucene.create.field[String]("sdfDocumentId", fieldType = FieldType.Untokenized)
    val stepId = lucene.create.field[String]("stepId", fieldType = FieldType.Untokenized)
    val stepParticipantId = lucene.create.field[String]("stepParticipantId", fieldType = FieldType.Untokenized)
    val `type` = lucene.create.field[String](name = "type", fieldType = FieldType.Untokenized)
  }

  final def deleteAll(): Unit =
    lucene.deleteAll()

  final def putSdfDocument(sdfDocument: SdfDocument): Unit = {
    def putPrimitive(primitive: Primitive): Unit = {
      def putPrimitiveSlot(slot: PrimitiveSlot): Unit = {
        putSearchDocument(SearchDocument(
          aka = slot.aka,
          comments = slot.comments,
          id = slot.id,
          label = slot.label,
          path = DefinitionPath.sdfDocument(sdfDocument.id).primitive(primitive.id).slot(slot.id),
          `type` = SearchDocumentType.PrimitiveSlot
        ))
      }

      putSearchDocument(SearchDocument(
        aka = primitive.aka,
        comments = primitive.comments,
        id = primitive.id,
        label = primitive.label,
        path = DefinitionPath.sdfDocument(sdfDocument.id).primitive(primitive.id).build,
        `type` = SearchDocumentType.Primitive
      ))
      primitive.slots.foreach(putPrimitiveSlot(_))
    }

    def putSchema(schema: Schema): Unit = {
      def putSchemaSlot(slot: SchemaSlot): Unit =
        putSearchDocument(SearchDocument(
          aka = slot.aka,
          comments = slot.comments,
          id = slot.id,
          label = slot.label,
          path = DefinitionPath.sdfDocument(sdfDocument.id).schema(schema.id).slot(slot.id),
          `type` = SearchDocumentType.SchemaSlot))

      def putStep(step: Step): Unit = {
        def putStepParticipant(participant: StepParticipant): Unit =
          putSearchDocument(SearchDocument(
            aka = participant.aka,
            comments = participant.comments,
            id = participant.id,
            label = participant.label,
            path = DefinitionPath.sdfDocument(sdfDocument.id).schema(schema.id).step(step.id).participant(participant.id),
            `type` = SearchDocumentType.StepParticipant
          ))

        putSearchDocument(SearchDocument(
          aka = step.aka,
          comments = step.comments,
          id = step.id,
          label = step.label,
          path = DefinitionPath.sdfDocument(sdfDocument.id).schema(schema.id).step(step.id).build,
          `type` = SearchDocumentType.Step
        ))
        step.participants.foreach(_.foreach(putStepParticipant(_)))
      }

      putSearchDocument(SearchDocument(
        aka = schema.aka,
        comments = schema.comments,
        id = schema.id,
        label = schema.label,
        path = DefinitionPath.sdfDocument(sdfDocument.id).schema(schema.id).build,
        `type` = SearchDocumentType.Schema))
      schema.slots.foreach(putSchemaSlot(_))
      schema.steps.foreach(putStep(_))
    }

    def putSearchDocument(searchDocument: SearchDocument): Unit = {
      lucene.doc()
        .facets(Facets.`type`(searchDocument.`type`.value))
        .fields(
          (List(
            Fields.id(searchDocument.id.toString),
            Fields.label(searchDocument.label),
            Fields.sdfDocumentId(searchDocument.path.sdfDocument.id.toString),
            Fields.`type`(searchDocument.`type`.value)
          ) ++
            searchDocument.aka.map(aka => Fields.aka(aka.mkString(" "))).toList ++
            searchDocument.comments.map(comments => Fields.comments(comments.mkString(" "))).toList ++
            searchDocument.path.sdfDocument.primitive.toList.flatMap(primitive => {
              var fieldAndValues: List[FieldAndValue[String]] = List(Fields.primitiveId(primitive.id.toString))
              if (primitive.slot.isDefined) {
                fieldAndValues :+= Fields.primitiveSlotId(primitive.slot.get.id.toString)
              }
              fieldAndValues
            }) ++
            searchDocument.path.sdfDocument.schema.toList.flatMap(schema => {
              var fieldAndValues: List[FieldAndValue[String]] = List(Fields.schemaId(schema.id.toString))
              if (schema.slot.isDefined) {
                fieldAndValues :+= Fields.schemaSlotId(schema.slot.get.id.toString)
              }
              if (schema.step.isDefined) {
                fieldAndValues :+= Fields.stepId(schema.step.get.id.toString)
                if (schema.step.get.participant.isDefined) {
                  fieldAndValues :+= Fields.stepParticipantId(schema.step.get.participant.get.id.toString)
                }
              }
              fieldAndValues
            })
            ): _*)
        .index()
    }

    putSearchDocument(SearchDocument(
      id = sdfDocument.id,
      label = sdfDocument.label,
      path = DefinitionPath.sdfDocument(sdfDocument.id).build,
      `type` = SearchDocumentType.SdfDocument
    ))
    sdfDocument.schemas.foreach(putSchema(_))
    lucene.commit()
  }

  final def search(limit: Int, offset: Int, query: String): SearchResults = {
    val luceneResults = lucene.query().filter(string2ParsableSearchTerm(query)).limit(limit).offset(offset).search()
    SearchResults(
      documents = luceneResults.results.toList.map(result => {
        val schemaId = Option(result(Fields.schemaId)).map(Uri.parse(_))
        val sdfDocumentId = Uri.parse(result(Fields.sdfDocumentId))
        val schemaSlotId = Option(result(Fields.schemaSlotId)).map(Uri.parse(_))
        val stepId = Option(result(Fields.stepId)).map(Uri.parse(_))

        val pathBuilder = DefinitionPath.sdfDocument(sdfDocumentId)
        val path =
          if (schemaId.isDefined) {
            if (schemaSlotId.isDefined) {
              pathBuilder.schema(schemaId.get).slot(schemaSlotId.get)
            } else {
              pathBuilder.schema(schemaId.get).build
            }
          } else {
            pathBuilder.build
          }

        SearchDocument(
          id = Uri.parse(result(Fields.id)),
          label = result(Fields.label),
          path = path,
          `type` = SearchDocumentType.values.find(result(Fields.`type`) == _.value).get
        )}
      ),
      total = luceneResults.total.intValue()
    )
  }
}
