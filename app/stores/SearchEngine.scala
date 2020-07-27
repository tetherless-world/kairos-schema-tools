package stores

import com.outr.lucene4s._
import com.outr.lucene4s.DirectLucene
import edu.rpi.tw.twks.uri.Uri
import formats.sdf.SdfDocument
import models.schema.{Schema, Slot, Step}
import models.search.{SearchDocument, SearchDocumentType, SearchResults}

final class SearchEngine {
  private val lucene = new DirectLucene(List("label", "schemaId", "sdfDocumentId", "type"), autoCommit = false)

  private object Facets {
    val `type` = lucene.create.facet("type")
  }

  private object Fields {
    val label = lucene.create.field[String]("label", fullTextSearchable = true)
    val schemaId = lucene.create.field[String]("schemaId")
    val sdfDocumentId = lucene.create.field[String]("sdfDocumentField")
    val `type` = lucene.create.field[String](name = "type")
  }

  final def putSdfDocument(sdfDocument: SdfDocument): Unit = {
    def putSchema(schema: Schema): Unit = {
      def putSlot(slot: Slot): Unit =
        putSearchDocument(SearchDocument(
          aka = slot.aka,
          comments = slot.comments,
          label = slot.roleName,
          schemaId = Some(schema.id),
          sdfDocumentId = sdfDocument.id,
          slotId = Some(slot.id),
          `type` = SearchDocumentType.Slot))

      def putStep(step: Step): Unit =
        putSearchDocument(SearchDocument(
          aka = step.aka,
          comments = step.comments,
          label = step.name,
          schemaId = Some(schema.id),
          sdfDocumentId = sdfDocument.id,
          stepId = Some(step.id),
          `type` = SearchDocumentType.Step
        ))

      putSearchDocument(SearchDocument(
        aka = schema.aka,
        comments = schema.comments,
        label = schema.name,
        schemaId = Some(schema.id),
        sdfDocumentId = sdfDocument.id,
        `type` = SearchDocumentType.Schema))
      schema.slots.foreach(putSlot(_))
      schema.steps.foreach(putStep(_))
    }

    def putSearchDocument(searchDocument: SearchDocument): Unit = {
      lucene.doc()
        .facets(Facets.`type`(searchDocument.`type`.value))
        .fields(
          (List(
            Fields.label(searchDocument.label),
            Fields.sdfDocumentId(searchDocument.sdfDocumentId.toString),
            Fields.`type`(searchDocument.`type`.value)
          ) ++
            searchDocument.schemaId.map(schemaId => Fields.schemaId(schemaId.toString)).toList
            ): _*)
        .index()
    }

    putSearchDocument(SearchDocument(
      label = sdfDocument.name,
      sdfDocumentId = sdfDocument.id,
      `type` = SearchDocumentType.SdfDocument
    ))
    sdfDocument.schemas.foreach(putSchema(_))
    lucene.commit()
  }

  final def search(limit: Int, offset: Int, query: String): SearchResults = {
    val luceneResults = lucene.query().filter(string2ParsableSearchTerm(query)).limit(limit).offset(offset).search()
    SearchResults(
      documents = luceneResults.results.toList.map(result =>
        SearchDocument(
          label = result(Fields.label),
          schemaId = Option(result(Fields.schemaId)).map(Uri.parse(_)),
          sdfDocumentId = Uri.parse(result(Fields.sdfDocumentId)),
          `type` = SearchDocumentType.values.find(result(Fields.`type`) == _.value).get
        )),
      total = luceneResults.total.intValue()
    )
  }
}
