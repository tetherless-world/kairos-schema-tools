package stores

import com.google.inject.AbstractModule
import org.slf4j.LoggerFactory

final class StoresModule extends AbstractModule {
  private val logger = LoggerFactory.getLogger(classOf[StoresModule])

  override def configure(): Unit = {
    val useTestStores = System.getProperty("test") != null
    if (useTestStores) {
      logger.info("using test stores for integration testing")
    }
    bind(classOf[Store]).to(if (useTestStores) classOf[TestStore] else classOf[MemStore])
  }
}
