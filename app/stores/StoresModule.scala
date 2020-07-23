package stores

import java.nio.file.{Files, Path, Paths}

import com.google.inject.AbstractModule
import org.slf4j.LoggerFactory

final class StoresModule extends AbstractModule {
  private val logger = LoggerFactory.getLogger(classOf[StoresModule])

  override def configure(): Unit = {
    val useTestStore = System.getProperty("test") != null
    if (useTestStore) {
      logger.info("using test stores for integration testing")
      bind(classOf[Store]).to(classOf[TestStore])
      return
    }

    val dataDirectoryPaths = List(
      Paths.get("/data"),
      Paths.get("conf").resolve("data").resolve("examples")
    )
    for (dataDirectoryPath <- dataDirectoryPaths) {
      if (Files.isDirectory(dataDirectoryPath)) {
        val store = new FsStore(dataDirectoryPath)
        bind(classOf[Store]).toInstance(store)
        logger.info("using data at {}: {} SDF documents", dataDirectoryPath, store.getSdfDocuments.size)
        return
      }
    }

    logger.warn("unable to locate data on the file system, using the test store")
    bind(classOf[Store]).to(classOf[TestStore])
  }
}
