package formats.sdf

import io.github.tetherlessworld.scena.RdfReader
import org.apache.jena.rdf.model.{RDFNode, Resource}
import org.apache.jena.vocabulary.RDF

object RdfListRdfReader extends RdfReader[List[RDFNode]]{
  override def read(resource: Resource): List[RDFNode] = {
    val first = Option(resource.getProperty(RDF.first)) flatMap {
      statement => Option(statement.getObject)
    } getOrElse {
      throw new IllegalArgumentException("List resource missing rdf:first")
    }

    val rest = Option(resource.getProperty(RDF.rest)) flatMap {
      statement => Option(statement.getObject)
    } getOrElse {
      throw new IllegalArgumentException("List resource missing rdf:rest")
    }

    rest.asResource match {
      case RDF.nil => List(first)
      case restResource: Resource => first :: read(restResource)
    }
  }
}
