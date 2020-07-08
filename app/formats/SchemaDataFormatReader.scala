package formats

import java.io.Reader

import org.apache.jena.rdf.model.ModelFactory
import org.apache.jena.riot.Lang

final class SchemaDataFormatReader(reader: Reader) extends AutoCloseable {
  override def close(): Unit =
    reader.close()

  def read(): Unit = {
    val model = ModelFactory.createDefaultModel()
    model.read(reader, "http://example.com", Lang.JSONLD.getName)
    model.write(System.out, Lang.TTL.getName)
  }
}
