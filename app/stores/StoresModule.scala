package stores

import java.nio.file.{Files, Path, Paths}

import com.google.inject.AbstractModule
import com.google.inject.name.Names
import org.slf4j.LoggerFactory
import play.api.{Configuration, Environment}

final class StoresModule(environment: Environment, configuration: Configuration) extends AbstractModule {
  private val logger = LoggerFactory.getLogger(classOf[StoresModule])

  override def configure(): Unit = {
    val useTestStore = System.getProperty("test") != null
    if (useTestStore) {
      logger.info("using test stores for integration testing")
      bind(classOf[Store]).to(classOf[TestStore])
      return
    }

    val fsStoreConfiguration = FsStoreConfiguration.fromConfiguration(configuration)
    if (fsStoreConfiguration.isDefined) {
      bind(classOf[FsStoreConfiguration]).toInstance(fsStoreConfiguration.get)
      bind(classOf[Store]).to(classOf[FsStore]).asEagerSingleton()
      logger.info("using data at {}", fsStoreConfiguration.get.dataDirectoryPath)
      return
    }

    logger.warn("unable to locate data on the file system, using the test store")
    bind(classOf[Store]).to(classOf[TestStore])
  }
}
