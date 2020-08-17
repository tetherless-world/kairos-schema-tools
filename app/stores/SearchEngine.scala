package stores

import com.outr.lucene4s.{DirectLucene, _}
import com.outr.lucene4s.field.FieldType
import com.outr.lucene4s.field.value.FieldAndValue
import edu.rpi.tw.twks.uri.Uri
import formats.sdf.SdfDocument
import models.schema.{Schema, SchemaSlot, SdfDocumentPath, Step}
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
    val schemaId = lucene.create.field[String]("schemaId", fieldType = FieldType.Untokenized)
    val schemaSlotId = lucene.create.field[String]("schemaSlotId", fieldType = FieldType.Untokenized)
    val sdfDocumentId = lucene.create.field[String]("sdfDocumentId", fieldType = FieldType.Untokenized)
    val stepId = lucene.create.field[String]("stepId", fieldType = FieldType.Untokenized)
    val `type` = lucene.create.field[String](name = "type", fieldType = FieldType.Untokenized)
  }

  final def deleteAll(): Unit =
    lucene.deleteAll()

  final def putSdfDocument(sdfDocument: SdfDocument): Unit = {
    def putSchema(schema: Schema): Unit = {
      def putSlot(slot: SchemaSlot): Unit =
        putSearchDocument(SearchDocument(
          aka = slot.aka,
          comments = slot.comments,
          id = slot.id,
          label = slot.label,
          path = SdfDocumentPath.builder(sdfDocument.id).schema(schema.id).slot(slot.id),
          `type` = SearchDocumentType.Slot))

      def putStep(step: Step): Unit =
        putSearchDocument(SearchDocument(
          aka = step.aka,
          comments = step.comments,
          id = step.id,
          label = step.label,
          path = SdfDocumentPath.builder(sdfDocument.id).schema(schema.id).step(step.id).build,
          `type` = SearchDocumentType.Step
        ))

      putSearchDocument(SearchDocument(
        aka = schema.aka,
        comments = schema.comments,
        id = schema.id,
        label = schema.label,
        path = SdfDocumentPath.builder(sdfDocument.id).schema(schema.id).build,
        `type` = SearchDocumentType.Schema))
      schema.slots.foreach(putSlot(_))
      schema.steps.foreach(putStep(_))
    }

    def putSearchDocument(searchDocument: SearchDocument): Unit = {
      lucene.doc()
        .facets(Facets.`type`(searchDocument.`type`.value))
        .fields(
          (List(
            Fields.id(searchDocument.id.toString),
            Fields.label(searchDocument.label),
            Fields.sdfDocumentId(searchDocument.path.id.toString),
            Fields.`type`(searchDocument.`type`.value)
          ) ++
            searchDocument.aka.map(aka => Fields.aka(aka.mkString(" "))).toList ++
            searchDocument.comments.map(comments => Fields.comments(comments.mkString(" "))).toList ++
            searchDocument.path.schema.toList.flatMap(schema => {
              var schemaFields: List[FieldAndValue[String]] = List()
              schemaFields = schemaFields :+ Fields.schemaId(schema.id.toString)
              if (schema.slot.isDefined) {
                schemaFields = schemaFields :+ Fields.schemaSlotId(schema.slot.get.id.toString)
              }
              if (schema.step.isDefined) {
                schemaFields = schemaFields :+ Fields.stepId(schema.step.get.id.toString)
              }
              schemaFields
            })
            ): _*)
        .index()
    }

    putSearchDocument(SearchDocument(
      id = sdfDocument.id,
      label = sdfDocument.label,
      path = SdfDocumentPath.builder(sdfDocument.id).build,
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

        val pathBuilder = SdfDocumentPath.builder(sdfDocumentId)
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
